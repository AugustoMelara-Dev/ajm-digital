// --- FILE: src/components/sections/ProcessSection.jsx ---
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Step from '@/components/ui/Step';
import { ClipboardList, FileCheck2, Code2, Rocket } from 'lucide-react';
import { getCurrentLocale, normalizeLocale, DEFAULT_LOCALE } from '@/lib/i18n';

// ========= i18n (ES/EN) =========
const dict = {
  es: {
    title: 'Proceso claro en 4 pasos',
    subtitle: 'Fechas realistas, comunicación directa y entregables a tiempo.',
    steps: [
      { n: '1', title: 'Brief inicial (30 min)', desc: 'Revisamos objetivos, alcance y referencias por WhatsApp o videollamada.', short: 'Brief (30 min)' },
      { n: '2', title: 'Propuesta y cronograma (24 h)', desc: 'Alcance detallado, hitos, precio fijo y próximos pasos confirmados.', short: 'Propuesta (24 h)' },
      { n: '3', title: 'Diseño y desarrollo', desc: 'Iteraciones rápidas con revisiones incluidas. Avances en un entorno de prueba.', short: 'Diseño + Dev' },
      { n: '4', title: 'Lanzamiento y soporte', desc: 'Deploy, analítica, optimización inicial y 30 días de soporte post-entrega.', short: 'Lanzamiento' },
    ],
    chips: ['Tiempo de arranque 7–10 días', 'Propiedad total del código', 'Facturación en USD'],
    cta: { brief: 'Agendar brief de 30 min', note: 'Respuesta promedio: 2 horas hábiles.' },
    aria: { list: 'Pasos del proceso', timeline: 'Línea de tiempo del proceso' },
    waMessage: 'Hola, quiero agendar el brief de 30 minutos.',
    waTitle: (ok) => (ok ? 'Agendar brief de 30 minutos' : 'Usa el formulario de contacto'),
    jsonldName: 'Proceso de proyecto — AJM Digital Solutions',
  },
  en: {
    title: 'A clear 4-step process',
    subtitle: 'Realistic timelines, direct communication, and on-time deliverables.',
    steps: [
      { n: '1', title: 'Initial brief (30 min)', desc: 'We review goals, scope, and references via WhatsApp or video call.', short: 'Brief (30 min)' },
      { n: '2', title: 'Proposal & schedule (24 h)', desc: 'Detailed scope, milestones, fixed price, and next steps confirmed.', short: 'Proposal (24 h)' },
      { n: '3', title: 'Design & development', desc: 'Fast iterations with included reviews. Progress on a staging environment.', short: 'Design + Dev' },
      { n: '4', title: 'Launch & support', desc: 'Deploy, analytics, initial optimization, and 30-day post-delivery support.', short: 'Launch' },
    ],
    chips: ['Kickoff in 7–10 days', 'Full code ownership', 'USD invoicing'],
    cta: { brief: 'Book a 30-min brief', note: 'Average reply time: 2 business hours.' },
    aria: { list: 'Process steps', timeline: 'Process timeline' },
    waMessage: 'Hi, I’d like to book the 30-minute brief.',
    waTitle: (ok) => (ok ? 'Book a 30-minute brief' : 'Use the contact form'),
    jsonldName: 'Project process — AJM Digital Solutions',
  },
};

// ========= Helpers =========
const ICONS = [ClipboardList, FileCheck2, Code2, Rocket];

/** Acceso seguro por ruta "a.b.c" */
function byPath(obj, path) {
  try {
    return String(path)
      .split('.')
      .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
  } catch {
    return undefined;
  }
}

/** Devuelve función t(path, ...args) para el locale actual, con fallback al default. */
function makeT(locale) {
  const lang = normalizeLocale(locale);
  const local = dict[lang] || dict[DEFAULT_LOCALE];
  return (path, ...args) => {
    let val = byPath(local, path);
    if (val === undefined) val = byPath(dict[DEFAULT_LOCALE], path);
    if (typeof val === 'function') return val(...args);
    return val;
  };
}

/** Normaliza a dígitos E.164 (sin "+"). */
function getRawPhone() {
  return (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
}

export default function ProcessSection() {
  const t = makeT(getCurrentLocale());
  const reduce = useReducedMotion();

  const RAW_PHONE = getRawPhone();
  const waText = process.env.NEXT_PUBLIC_WA_MESSAGE || t('waMessage');
  const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(waText)}` : null;

  const steps = (t('steps') || []).map((s, i) => ({ ...s, Icon: ICONS[i] || ClipboardList }));

  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.25 },
    viewport: { once: true, margin: '0px 0px -80px 0px' },
  };

  const waTitle = t('waTitle');

  return (
    <Section
      id="proceso"
      title={t('title')}
      subtitle={t('subtitle')}
      className="relative bg-white dark:bg-slate-950"
    >
      {/* Accento de fondo sobrio */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/10" />

      {/* JSON-LD HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: t('jsonldName'),
            step: steps.map((s) => ({ '@type': 'HowToStep', name: s.title, text: s.desc })),
          }),
        }}
      />

      {/* Timeline decorativa (md+) */}
      <motion.div
        {...fadeUp}
        aria-label={t('aria.timeline')}
        className="
          relative hidden md:block max-w-5xl mx-auto
          before:content-[''] before:absolute before:top-1/2 before:left-3 before:right-3
          before:h-px before:bg-gradient-to-r before:from-transparent before:via-slate-200 before:to-transparent
          dark:before:via-slate-800
        "
      >
        <div className="grid grid-cols-4 gap-6">
          {steps.map(({ short, Icon }) => (
            <div key={short} className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full grid place-items-center bg-gradient-to-b from-blue-600 to-cyan-600 text-white shadow-sm">
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 text-center">
                {short}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lista de pasos accesible */}
      <ol
        role="list"
        aria-label={t('aria.list')}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {steps.map((s, i) => (
          <li key={s.n} className="contents">
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: reduce ? 0 : 0.22, delay: reduce ? 0 : i * 0.05 }}
            >
              {/* Step renderiza como div; evitamos rol duplicado */}
              <Step n={s.n} title={s.title} desc={s.desc} role="none" />
            </motion.div>
          </li>
        ))}
      </ol>

      {/* Chips de confianza */}
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {(t('chips') || []).map((chip) => (
          <li
            key={chip}
            className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs md:text-sm font-semibold
                       dark:bg-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
          >
            {chip}
          </li>
        ))}
      </ul>

      {/* CTA: agendar brief */}
      <motion.div {...fadeUp} className="mt-6 text-center">
        <a
          href={WA_HREF || '#contacto'}
          target={WA_HREF ? '_blank' : undefined}
          rel={WA_HREF ? 'noopener noreferrer' : undefined}
          aria-disabled={!WA_HREF}
          data-analytics-id="process_brief_cta"
          className={[
            'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition shadow-card',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
            WA_HREF ? 'bg-brand text-white hover:opacity-90' : 'bg-slate-200 text-slate-500 cursor-not-allowed',
          ].join(' ')}
          title={typeof waTitle === 'function' ? waTitle(!!WA_HREF) : waTitle}
        >
          {t('cta.brief')}
        </a>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t('cta.note')}</p>
      </motion.div>
    </Section>
  );
}
// --- END FILE ---
