// src/lib/blog.ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
  author?: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(raw);

  const meta: PostMeta = {
    title: data.title ?? slug,
    slug,
    date: data.date ?? new Date().toISOString(),
    excerpt: data.excerpt ?? '',
    cover: data.cover ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? 'Augusto José Melara Milla',
  };

  const stats = readingTime(content);

  return {
    meta,
    content,
    readingTimeText: stats.text,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug).meta)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}