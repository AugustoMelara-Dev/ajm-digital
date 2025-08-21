// --- FILE: src/lib/blog.ts ---
import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type PostMeta = {
  title: string;
  slug: string;              // derivado del filename
  date: string;              // ISO-8601
  excerpt: string;
  cover?: string;
  tags: string[];
  author: string;
  draft: boolean;
};

export type Post = {
  meta: PostMeta;
  content: string;
  readingTimeText: string;    // "3 min de lectura"
  readingTimeMinutes: number; // 3
};

type Frontmatter = Partial<{
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: string[] | string;
  author: string;
  draft: boolean;
}>;

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/* ------------------------- helpers ------------------------- */

function ensureDir(): boolean {
  return fs.existsSync(CONTENT_DIR);
}

function getAllMdxFiles(): string[] {
  if (!ensureDir()) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.toLowerCase().endsWith('.mdx'));
}

function safeRead(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function fileMtimeISO(filePath: string): string {
  try {
    const st = fs.statSync(filePath);
    return st.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function normalizeDate(input: unknown, fallbackISO: string): string {
  if (typeof input === 'string') {
    const d = new Date(input);
    if (!Number.isNaN(d.valueOf())) return d.toISOString();
  }
  return fallbackISO;
}

function plainExcerpt(md: string, max = 180): string {
  // Limpia MDX sin matar palabras
  const stripped = md
    // quitar bloques de código
    .replace(/```[\s\S]*?```/g, ' ')
    // quitar inline code
    .replace(/`([^`]+)`/g, '$1')
    // quitar imágenes ![alt](url)
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    // convertir links [txt](url) -> txt
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    // quitar títulos/quotes/listas al inicio de línea
    .replace(/^\s{0,3}(#{1,6}\s|>\s|[-*+]\s)/gm, '')
    // colapsar espacios
    .replace(/\s{2,}/g, ' ')
    .trim();

  return stripped.length > max ? stripped.slice(0, max).trimEnd() + '…' : stripped;
}

function rtEs(minutesFloat: number): { text: string; minutes: number } {
  const mins = Math.max(1, Math.ceil(minutesFloat));
  return { text: `${mins} min de lectura`, minutes: mins };
}

function sanitizeSlug(input: string): string {
  // evita traversal y caracteres extraños; conserva mayúsculas/minúsculas tal cual
  if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
    throw new Error(`Slug inválido: "${input}"`);
  }
  return input;
}

function parseTags(tags?: string[] | string): string[] {
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

/* ------------------------- cache en memoria ------------------------- */

const postCache = new Map<string, Post>();

/* ------------------------- API pública ------------------------- */

export function getPostSlugs(): string[] {
  return getAllMdxFiles().map((f) => f.replace(/\.mdx$/i, ''));
}

export function getPostBySlug(slug: string): Post {
  const clean = sanitizeSlug(slug);

  if (postCache.has(clean)) return postCache.get(clean)!;

  const fullPath = path.join(CONTENT_DIR, `${clean}.mdx`);
  const raw = safeRead(fullPath);

  if (!raw) {
    // Fallback seguro para no romper build/render (marcado como borrador)
    const now = new Date().toISOString();
    const fallback: Post = {
      meta: {
        title: clean,
        slug: clean,
        date: now,
        excerpt: '',
        cover: '',
        tags: [],
        author: 'AJM Digital Solutions',
        draft: true,
      },
      content: '',
      readingTimeText: '1 min de lectura',
      readingTimeMinutes: 1,
    };
    postCache.set(clean, fallback);
    return fallback;
  }

  const { content, data } = matter(raw);
  const fm = (data ?? {}) as Frontmatter;

  const fallbackISO = fileMtimeISO(fullPath);
  const rt = readingTime(content, { wordsPerMinute: 200 });

  const meta: PostMeta = {
    title: fm.title ?? clean,
    slug: clean, // se mantiene derivado del filename
    date: normalizeDate(fm.date, fallbackISO),
    excerpt: fm.excerpt ?? plainExcerpt(content),
    cover: fm.cover ?? '',
    tags: parseTags(fm.tags),
    author: fm.author ?? 'AJM Digital Solutions',
    draft: Boolean(fm.draft),
  };

  const result: Post = {
    meta,
    content,
    readingTimeText: rtEs(rt.minutes).text,
    readingTimeMinutes: rtEs(rt.minutes).minutes,
  };

  postCache.set(clean, result);
  return result;
}

export function getAllPostsMeta(
  { includeDrafts = false }: { includeDrafts?: boolean } = {}
): PostMeta[] {
  const metas = getPostSlugs()
    .map((slug) => getPostBySlug(slug).meta)
    .filter((m) => (includeDrafts ? true : !m.draft));

  // Orden por fecha desc; estable por slug si empatan
  return metas.sort((a, b) => {
    const ta = Date.parse(a.date);
    const tb = Date.parse(b.date);
    if (tb === ta) return a.slug.localeCompare(b.slug);
    return tb - ta;
  });
}

export function getAllPosts(
  { includeDrafts = false }: { includeDrafts?: boolean } = {}
): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p) => (includeDrafts ? true : !p.meta.draft))
    .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date));
}

export function getTagStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const meta of getAllPostsMeta()) {
    for (const t of meta.tags) stats[t] = (stats[t] || 0) + 1;
  }
  return stats;
}
// --- END OF FILE: src/lib/blog.ts ---
