// --- FILE: src/components/sections/WhyUsSection.jsx ---
'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import ReasonCard from '@/components/cards/ReasonCard';
import { REASONS } from '@/lib/constants';
import { useFadeUp } from '@/hooks/useFadeUp';
import { MessageCircle, ArrowRight } from 'lucide-react';

// Sanitiza teléfono (E.164 sin "+") y arma WA seguro
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vi su sitio y quiero conversar sobre un proyecto.';
const WA_HREF = RAW_PHONE
  ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}`
  : '#contacto';

// JSON-LD como ItemList para reforzar SEO de la sección
function WhyUsJsonLd({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Razones para elegir AJM Digital Solutions',
    itemListElement: items.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Thing',
        name: r?.title || `Razón ${i + 1}`,
        description: r?.desc || 'Valor diferencial de AJM Digital Solutions',
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function WhyUsSection() {
  const fadeUp = useFadeUp();
  const hasReasons = Array.isArray(REASONS) && REASONS.length > 0;

  return (
    <Section
      id="por-que"
      title="¿Por qué elegir AJM Digital Solutions?"
      subtitle="Estándares de clase mundial, plazos serios y soporte directo. Resultados sin humo."
      className="relative bg-slate-50 dark:bg-slate-950"
    >
      {/* Glow sutil para jerarquía visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(55%_55%_at_50%_0%,#000_25%,transparent_70%)]"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full bg-brand/10 blur-3xl dark:bg-brand/15" />
      </div>

      {/* JSON-LD */}
      <WhyUsJsonLd items={hasReasons ? REASONS : []} />

      <div className="container-tight">
        {/* Grid o vacío elegante */}
        {hasReasons ? (
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {REASONS.map((reason, index) => (
              <motion.div
                key={reason?.title || index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
              >
                <ReasonCard {...reason} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-600 dark:text-slate-300">
            Aún no hay razones cargadas.{' '}
            <a
              className="underline font-medium"
              href={WA_HREF}
              target={RAW_PHONE ? '_blank' : undefined}
              rel={RAW_PHONE ? 'noopener noreferrer' : undefined}
            >
              Escríbenos
            </a>{' '}
            y te contamos nuestro enfoque.
          </div>
        )}

        {/* CTA coherente con la sección */}
        <motion.div {...fadeUp} className="text-center mt-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <a
              href={WA_HREF || '#contacto'}
              target={RAW_PHONE ? '_blank' : undefined}
              rel={RAW_PHONE ? 'noopener noreferrer' : undefined}
              aria-disabled={!RAW_PHONE}
              title={RAW_PHONE ? 'Hablar por WhatsApp' : 'Ir a contacto'}
              className={[
                'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
                RAW_PHONE ? 'bg-brand text-white hover:opacity-90' : 'bg-slate-200 text-slate-500 cursor-not-allowed',
              ].join(' ')}
              data-analytics-id="whyus_whatsapp_cta"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Conversemos ahora
              <ArrowRight size={18} aria-hidden="true" />
            </a>

            <a
              href="#servicios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              data-analytics-id="whyus_services_cta"
            >
              Ver servicios
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Transparencia total: precios fijos, propiedad del código y soporte directo.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
