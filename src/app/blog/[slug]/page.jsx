// src/app/blog/[slug]/page.jsx
import Image from 'next/image';
import Script from 'next/script';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const { meta } = getPostBySlug(params.slug);
  return {
    title: `${meta.title} | Blog AJM Digital Solutions`,
    description: meta.excerpt || undefined,
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: {
      type: 'article',
      url: `/blog/${meta.slug}`,
      title: meta.title,
      description: meta.excerpt || undefined,
      images: meta.cover ? [{ url: meta.cover }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.excerpt || undefined,
      images: meta.cover ? [meta.cover] : undefined,
    },
  };
}

export default function BlogPostPage({ params }) {
  const { meta, content, readingTimeText } = getPostBySlug(params.slug);

  return (
    <article className="py-12">
      <div className="w-[92%] max-w-[900px] mx-auto">
        <header className="mb-6">
          <h1 className="text-balance text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
            {meta.title}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {new Date(meta.date).toLocaleDateString('es-HN', { dateStyle: 'long' })} · {readingTimeText}
            {meta.author ? ` · ${meta.author}` : null}
          </p>
          {meta.cover ? (
            <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200">
              <Image
                src={meta.cover}
                alt={`Portada: ${meta.title}`}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
          ) : null}
        </header>

        {/* Contenido del artículo con tipografía bonita */}
        {/* Las clases 'prose' de @tailwindcss/typography aplican estilos por defecto */}
        <div className="prose prose-slate lg:prose-lg max-w-none">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
              },
            }}
          />
        </div>

        {/* JSON-LD para SEO de artículo */}
        <Script
          id="article-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              datePublished: meta.date,
              dateModified: meta.date,
              author: {
                '@type': 'Person',
                name: meta.author || 'Augusto José Melara Milla',
              },
              image: meta.cover ? [meta.cover] : undefined,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `/blog/${meta.slug}`,
              },
            }),
          }}
        />
      </div>
    </article>
  );
}
