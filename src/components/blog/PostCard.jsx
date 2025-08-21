// --- FILE: src/components/blog/PostCard.jsx ---
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useFadeUp } from '@/hooks/useFadeUp';
import { Clock } from 'lucide-react';

function formatDate(value) {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.valueOf())) return '';
    return new Intl.DateTimeFormat('es-HN', { dateStyle: 'medium' }).format(d);
  } catch {
    return '';
  }
}

export default function PostCard({ post, className = '' }) {
  const fade = useFadeUp();

  // Acepta tanto { meta, ... } como meta plano
  const meta = post?.meta ?? post ?? {};
  const {
    slug = '',
    title = 'Artículo',
    excerpt = '',
    cover = '/blog/placeholder.jpg',
    date = new Date().toISOString(),
    tags = [],
  } = meta;

  const readingText =
    post?.readingTimeText ??
    (typeof post?.readingTimeMinutes === 'number'
      ? `${Math.max(1, Math.ceil(post.readingTimeMinutes))} min de lectura`
      : null);

  const iso = (() => {
    try {
      const d = new Date(date);
      return Number.isNaN(d.valueOf()) ? undefined : d.toISOString();
    } catch {
      return undefined;
    }
  })();

  return (
    <motion.article
      {...fade}
      itemScope
      itemType="https://schema.org/BlogPosting"
      aria-labelledby={`post-${slug}-title`}
      className={[
        'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm',
        'hover:shadow-lg transition',
        className,
      ].join(' ')}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-xl"
        prefetch
        aria-label={`Leer: ${title}`}
      >
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={cover || '/blog/placeholder.jpg'}
            alt={`Portada: ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
            itemProp="image"
          />
        </div>

        <h3
          id={`post-${slug}-title`}
          className="mt-3 font-semibold text-slate-900 leading-tight group-hover:underline underline-offset-4"
          itemProp="headline"
        >
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-slate-600 mt-1" itemProp="description">
            {excerpt}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
          {iso && (
            <time dateTime={iso} itemProp="datePublished">
              {formatDate(iso)}
            </time>
          )}
          {readingText && (
            <>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} aria-hidden="true" /> {readingText}
              </span>
            </>
          )}
        </div>

        {Array.isArray(tags) && tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Etiquetas">
            {tags.slice(0, 4).map((t) => (
              <li
                key={t}
                className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {/* Microdatos extra (opcionales) */}
        <meta itemProp="dateModified" content={iso || ''} />
        <meta itemProp="author" content="AJM Digital Solutions" />
      </Link>
    </motion.article>
  );
}
