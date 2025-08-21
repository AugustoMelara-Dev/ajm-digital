// --- FILE: src/components/sections/FaqSection.jsx ---
'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import FaqItem, { FaqJsonLd } from '@/components/ui/FaqItem';
import { FAQS } from '@/lib/constants';
import { ArrowRight, Search as SearchIcon } from 'lucide-react';

// Sanitiza el número (solo dígitos) y arma URLs seguras
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Tengo unas preguntas.';
const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}` : null;

export default function FaqSection() {
  const shouldReduce = useReducedMotion();
  const [query, setQuery] = useState('');
  const faqs = Array.isArray(FAQS) ? FAQS : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((item) => {
      const textQ = (item.q || '').toLowerCase();
      const textA = (item.a || '').toLowerCase();
      return textQ.includes(q) || textA.includes(q);
    });
  }, [faqs, query]);

  const hasPhone = Boolean(RAW_PHONE);
  const ctaHref = hasPhone ? WA_HREF : '#contacto';

  return (
    <Section
      id="faq"
      title="Preguntas frecuentes"
      subtitle="Resolvemos las dudas más comunes sobre nuestros servicios."
    >
      {/* JSON-LD (solo si hay data) */}
      {faqs.length > 0 ? <FaqJsonLd faqs={faqs} /> : null}

      {/* Buscador rápido */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: shouldReduce ? 0 : 0.25 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <label htmlFor="faq-search" className="sr-only">
          Buscar en preguntas frecuentes
        </label>
        <div className="relative">
          <SearchIcon
            size={18}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="faq-search"
            type="search"
            inputMode="search"
            placeholder="Buscar (ej. precios, SEO, tiempos, soporte)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          />
        </div>
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
        </div>
      </motion.div>

      {/* Lista */}
      {filtered.length > 0 ? (
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: shouldReduce ? 0 : 0.25 }}
          className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto"
        >
          {filtered.map((faq) => (
            <FaqItem key={faq.q} {...faq} />
          ))}
        </motion.div>
      ) : (
        <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            No encontramos resultados para <strong>“{query}”</strong>. Escríbenos y te respondemos en
            menos de 24–48&nbsp;h.
          </p>
          <div className="mt-4">
            <a
              href={ctaHref}
              target={hasPhone ? '_blank' : undefined}
              rel={hasPhone ? 'noopener noreferrer' : undefined}
              className={[
                'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition shadow-card',
                hasPhone
                  ? 'bg-brand text-white hover:opacity-90'
                  : 'bg-slate-200 text-slate-600 cursor-not-allowed',
              ].join(' ')}
            >
              Contactar
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      {/* CTA final */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: shouldReduce ? 0 : 0.25 }}
        className="text-center mt-8"
      >
        <a
          href={ctaHref}
          target={hasPhone ? '_blank' : undefined}
          rel={hasPhone ? 'noopener noreferrer' : undefined}
          className={[
            'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition shadow-card',
            hasPhone
              ? 'bg-brand text-white hover:opacity-90'
              : 'bg-slate-200 text-slate-600',
          ].join(' ')}
          aria-label={hasPhone ? 'Escríbenos por WhatsApp' : 'Ir a la sección de contacto'}
          title={hasPhone ? 'Escríbenos por WhatsApp' : 'Ir a la sección de contacto'}
        >
          ¿Tienes más preguntas? Contáctanos
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Respuesta promedio en 2&nbsp;horas hábiles. También puedes escribirnos desde{' '}
          <a href="#contacto" className="font-medium underline underline-offset-2">
            contacto
          </a>
          .
        </p>
      </motion.div>
    </Section>
  );
}
