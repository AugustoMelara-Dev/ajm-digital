// src/components/blog/PostCard.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useFadeUp } from '@/hooks/useFadeUp';

export default function PostCard({ post }) {
  const fade = useFadeUp();

  return (
    <motion.article
      {...fade}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-xl transition"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-2xl"
      >
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden bg-slate-100">
          <Image
            src={post.cover || '/blog/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>

        <h3 className="mt-3 font-bold text-slate-900 leading-tight">{post.title}</h3>
        {post.excerpt && (
          <p className="text-sm text-slate-600 mt-1">{post.excerpt}</p>
        )}
        <p className="text-xs text-slate-500 mt-1">
          {new Date(post.date).toLocaleDateString('es-HN', { dateStyle: 'medium' })}
        </p>
      </Link>
    </motion.article>
  );
}