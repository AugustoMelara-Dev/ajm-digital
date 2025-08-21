// --- FILE: src/app/blog/[slug]/page.jsx ---
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getPostBySlug, getAllPostsMeta } from '@/lib/blog';

// Solo generamos rutas para posts publicados (no draft)
export function generateStaticParams() {
  return getAllPostsMeta({ includeDrafts: false }).map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const { meta } = getPostBySlug(params.slug);

  const envBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajmdigitalsolutions.com';
  let base = envBase;
  try {
    base = new URL(envBase).origin;
  } catch {
    base = 'https://ajmdigitalsolutions.com';
  }
  const canonical = `${base}/blog/${meta.slug}`;
  const ogImage = meta.cover ? (meta.cover.startsWith('http') ? meta.cover : `${base}${meta.cover}`) : undefined;

  return {
    title: `${meta.title} | Blog AJM Digital Solutions`,
    description: meta.excerpt || undefined,
    keywords: Array.isArray(meta.tags) ? meta.tags.join(', ') : undefined,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: meta.title,
      description: meta.excerpt || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.excerpt || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  const { meta, content, readingTimeText } = post;

  // No mostrar borradores en producción
  if (meta.draft && process.env.NODE_ENV === 'production') {
    return notFound();
  }

  // Navegación prev/next
  const all = getAllPostsMeta({ includeDrafts: process.env.NODE_ENV !== 'production' });
  const idx = all.findIndex((m) => m.slug === meta.slug);
  const prev = idx > 0 ? all[idx - 1] : null; // más reciente
  const next = idx < all.length - 1 ? all[idx + 1] : null; // más antiguo

  const isoDate = (() => {
    try {
      const d = new Date(meta.date);
      return Number.isNaN(d.valueOf()) ? undefined : d.toISOString();
    } catch {
      return undefined;
    }
  })();

  return (
    <article
      className="py-12"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <div className="w-[92%] max-w-[900px] mx-auto">
        <header className="mb-6">
          <h1
            className="text-balance text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900"
            itemProp="headline"
          >
            {meta.title}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {isoDate && (
              <time dateTime={isoDate} itemProp="datePublished">
                {new Intl.DateTimeFormat('es-HN', { dateStyle: 'long' }).format(new Date(isoDate))}
              </time>
            )}
            {readingTimeText ? ` · ${readingTimeText}` : null}
            {meta.author ? (
              <>
                {' · '}
                <span itemProp="author">{meta.author}</span>
              </>
            ) : null}
          </p>

          {meta.cover ? (
            <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200">
              <Image
                src={meta.cover}
                alt={`Portada: ${meta.title}`}
                width={1200}
                height={630}
                sizes="(max-width: 900px) 100vw, 900px"
                className="w-full h-auto object-cover"
                priority={false}
                itemProp="image"
              />
            </div>
          ) : null}

          {/* Etiquetas */}
          {Array.isArray(meta.tags) && meta.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Etiquetas">
              {meta.tags.map((t) => (
                <li
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </header>

        {/* Contenido del artículo */}
        <div className="prose prose-slate lg:prose-lg max-w-none" itemProp="articleBody">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'wrap',
                      properties: {
                        className: ['anchor'],
                        ariaLabel: 'Enlace al encabezado',
                      },
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="sm:w-1/2">
              {prev && (
                <a
                  href={`/blog/${prev.slug}`}
                  className="block p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                  rel="prev"
                >
                  <div className="text-xs text-slate-500 mb-1">Anterior</div>
                  <div className="font-medium text-slate-900 line-clamp-2">{prev.title}</div>
                </a>
              )}
            </div>
            <div className="sm:w-1/2 sm:text-right">
              {next && (
                <a
                  href={`/blog/${next.slug}`}
                  className="block p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                  rel="next"
                >
                  <div className="text-xs text-slate-500 mb-1">Siguiente</div>
                  <div className="font-medium text-slate-900 line-clamp-2">{next.title}</div>
                </a>
              )}
            </div>
          </nav>
        )}

        {/* JSON-LD para SEO (con URLs absolutas) */}
        <Script
          id="article-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              datePublished: isoDate,
              dateModified: isoDate,
              author: {
                '@type': 'Person',
                name: meta.author || 'AJM Digital Solutions',
              },
              image: meta.cover ? [meta.cover] : undefined,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id':
                  (process.env.NEXT_PUBLIC_SITE_URL || 'https://ajmdigitalsolutions.com').replace(/\/$/, '') +
                  `/blog/${meta.slug}`,
              },
            }),
          }}
        />
      </div>
    </article>
  );
}
