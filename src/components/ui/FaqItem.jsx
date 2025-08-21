// --- FILE: src/components/ui/FaqItem.jsx ---
// Debe ser Client Component (interacciones/animaciones)
'use client';

import React, { useId, memo, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFadeUp } from '@/hooks/useFadeUp';
import { ChevronDown } from 'lucide-react';

/**
 * Props:
 * - q: React.ReactNode | string    → pregunta
 * - a: React.ReactNode | string    → respuesta
 * - defaultOpen?: boolean          → abre por defecto
 * - idSuffix?: string              → usar para anclajes (#faq-idSuffix)
 * - className?: string
 * - onToggle?(open: boolean): void → callback para analítica
 */
const FaqItem = memo(function FaqItem({ q, a, defaultOpen = false, idSuffix, className = '', onToggle }) {
  const fadeUp = useFadeUp();
  const reduceMotion = useReducedMotion();
  const summaryId = useId();
  const contentId = useId();
  const detailsRef = useRef(null);

  // Emite eventos y callback al abrir/cerrar
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    const handler = () => {
      const open = el.open;
      onToggle?.(open);
      // Evento custom para analítica sin dependencias
      try {
        el.dispatchEvent(new CustomEvent('faq:toggle', { detail: { open } }));
      } catch {}
    };
    el.addEventListener('toggle', handler);
    return () => el.removeEventListener('toggle', handler);
  }, [onToggle]);

  const anchorId = idSuffix ? `faq-${idSuffix}` : undefined;

  return (
    <motion.div
      {...fadeUp}
      id={anchorId}
      className={className}
      // Reduce animaciones si el usuario lo solicita
      transition={reduceMotion ? { duration: 0 } : undefined}
    >
      <details
        ref={detailsRef}
        open={defaultOpen}
        className={[
          'group rounded-2xl border p-5 shadow-card transition-colors',
          'border-slate-200 bg-white focus-within:border-slate-300 open:border-slate-300',
          'dark:border-slate-800 dark:bg-slate-900 dark:focus-within:border-slate-700 dark:open:border-slate-700',
        ].join(' ')}
      >
        {/* Ocultamos el marcador nativo y usamos uno propio */}
        <summary
          id={summaryId}
          aria-controls={contentId}
          className={[
            'flex items-start gap-3 cursor-pointer list-none select-none text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-xl p-1',
          ].join(' ')}
        >
          <span
            className={[
              'mt-0.5 grid place-items-center rounded-lg border p-1.5 transition-colors',
              'border-slate-200 bg-slate-50 text-slate-600',
              'group-open:text-slate-700',
              'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:group-open:text-slate-200',
            ].join(' ')}
            aria-hidden="true"
          >
            <ChevronDown
              size={16}
              className={[
                'transition-transform',
                reduceMotion ? '' : 'duration-200',
                'group-open:rotate-180',
              ].join(' ')}
            />
          </span>

          <span className="text-slate-900 dark:text-slate-100 font-semibold leading-snug">
            {q}
          </span>
        </summary>

        <div
          id={contentId}
          role="region"
          aria-labelledby={summaryId}
          className="mt-3"
        >
          <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {a}
          </div>
        </div>
      </details>
    </motion.div>
  );
});

/**
 * FaqJsonLd — Datos estructurados para SEO (FAQPage).
 * Espera faqs: Array<{ q: string; a: string }>
 * (Proveer texto plano en 'a' para mejor parsing por motores de búsqueda.)
 */
export function FaqJsonLd({ faqs }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export { FaqItem };
export default FaqItem;
