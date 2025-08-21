// --- FILE: src/components/blog/BlogHeroSection.jsx ---
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useFadeUp } from '@/hooks/useFadeUp';

/**
 * Hero del blog — sobrio, multinacional y accesible.
 * Sin degradados pesados ni emojis; foco en claridad y confianza.
 */
export default function BlogHeroSection() {
  const fadeUp = useFadeUp();

  return (
    <section
      aria-labelledby="blog-hero-title"
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      {/* Fondo sutil opcional (pattern muy tenue) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="w-full h-full" aria-hidden="true">
          <pattern id="tiny-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#0f172a" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tiny-dots)" />
        </svg>
      </div>

      <div className="relative z-10 w-[92%] max-w-[900px] mx-auto text-center">
        {/* Autor (opcional) */}
        <motion.div {...fadeUp} className="mb-8">
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-slate-200 shadow-sm">
            <Image
              src="/blog/author-augusto.jpg"
              alt="Augusto J. Melara — autor"
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>
          <p className="mt-4 text-xs font-medium tracking-wide text-slate-600 uppercase">
            Por Augusto J. Melara
          </p>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...fadeUp}
          className="inline-block mb-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-600"
        >
          Blog · Diseño, desarrollo y estrategia
        </motion.p>

        {/* Título */}
        <motion.h1
          {...fadeUp}
          id="blog-hero-title"
          className="text-balance text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight"
        >
          Ideas y guías prácticas para hacer crecer tu presencia digital
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          {...fadeUp}
          className="text-slate-700 mt-4 max-w-2xl mx-auto leading-relaxed text-lg"
        >
          Estrategia, UX/UI, rendimiento y SEO técnico. Contenido directo, sin humo:
          lo que funciona hoy para sitios y apps que convierten.
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp} className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold bg-slate-900 text-white hover:opacity-90 transition"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Enviar una pregunta
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#posts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border border-slate-200 text-slate-900 hover:bg-slate-50 transition"
          >
            Ver artículos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
