'use client'; // Este componente ES un Cliente Component

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useFadeUp } from '@/hooks/useFadeUp';

/**
 * Componente Cliente para la sección de bienvenida del blog.
 * Contiene animaciones y lógica interactiva.
 */
export default function BlogHeroSection() {
  const fadeUp = useFadeUp();

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden min-h-[60vh]"> {/* CORRECCIÓN: Se quitó el degradado, ahora es fondo blanco */}
      {/* Fondo sutil (se mantiene el patrón de círculos si lo deseas) */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#e0f2fe" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <div className="relative z-10 w-[92%] max-w-[900px] mx-auto text-center">
        <motion.div {...fadeUp} className="mb-8">
          {/* Tu foto de perfil */}
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-sky-300 shadow-lg">
            <Image
              src="/blog/author-augusto.jpg" // RUTA DE TU FOTO DE PERFIL (Crea esta imagen en public/blog/)
              alt="Augusto José Melara Milla - Autor del Blog"
              fill
              className="object-cover"
              sizes="96px"
              priority={true}
            />
          </div>
          <p className="mt-4 text-sm font-semibold text-sky-700">Augusto Jose Melara Milla</p>
        </motion.div>

        <motion.h1 {...fadeUp} className="text-balance text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Bienvenido al Blog de <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">AJM Digital Solutions</span>
        </motion.h1>
        <motion.p {...fadeUp} className="text-slate-700 mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
          Aquí, comparto guías prácticas, estrategias de marketing digital y casos reales para ayudarte a **transformar tu negocio en Honduras** con una presencia online efectiva.
        </motion.p>
        <motion.div {...fadeUp} className="mt-8">
          <a
            href="/#contacto" // Enlace a tu sección de contacto o un formulario de suscripción
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-lg"
          >
            💬 ¿Tienes una pregunta? Contáctame
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
