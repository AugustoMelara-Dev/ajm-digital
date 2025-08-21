// --- FILE: src/components/sections/HeroSection.jsx ---
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { useFadeUp } from '@/hooks/useFadeUp';
import { CheckCircle2, MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { getCurrentLocale, normalizeLocale, DEFAULT_LOCALE } from '@/lib/i18n';

// ========= i18n (ES/EN) =========
const dict = {
  es: {
    badges: { fast: 'Entrega 72 h', guarantee: 'Garantía 7 días', billing: 'Facturación USD' },
    headline1: 'Desarrollo web y apps',
    headline2: 'que convierten visitas en clientes',
    sub:
      'Sitios corporativos, landing pages y e-commerce con {{strong}},' +
      ' diseño sobrio y foco en conversión. Plazos serios, soporte directo.',
    subStrong: 'rendimiento alto y SEO técnico',
    ctas: { wa: 'Solicitar cotización', call: 'Agendar llamada', services: 'Ver servicios' },
    bullets: ['Código mantenible', 'Respuesta 24–48h', 'Propiedad del código'],
    kpis: [
      { k: '72h', l: 'Entrega express' },
      { k: '99.9%', l: 'Uptime hosting' },
      { k: '7 días', l: 'Garantía total' },
    ],
    aria: {
      wa: 'Solicitar cotización por WhatsApp',
      kpiList: 'Indicadores clave de servicio',
      services: 'Ir a sección Servicios',
      phoneTitle: (p) => (p ? `Llamar ${p}` : 'Teléfono no disponible'),
      waTitle: (enabled) =>
        enabled ? 'Solicitar cotización' : 'Configura NEXT_PUBLIC_WA_NUMBER o usa el formulario de contacto',
    },
  },
  en: {
    badges: { fast: '72h delivery', guarantee: '7-day guarantee', billing: 'USD billing' },
    headline1: 'Web & app development',
    headline2: 'that turns visitors into clients',
    sub:
      'Corporate sites, landing pages, and e-commerce with {{strong}},' +
      ' sober design, and conversion focus. Serious timelines, direct support.',
    subStrong: 'high performance and technical SEO',
    ctas: { wa: 'Request a quote', call: 'Schedule a call', services: 'View services' },
    bullets: ['Maintainable code', '24–48h response', 'You own the code'],
    kpis: [
      { k: '72h', l: 'Express delivery' },
      { k: '99.9%', l: 'Hosting uptime' },
      { k: '7 days', l: 'Full guarantee' },
    ],
    aria: {
      wa: 'Request a quote via WhatsApp',
      kpiList: 'Key service indicators',
      services: 'Go to Services section',
      phoneTitle: (p) => (p ? `Call ${p}` : 'Phone not available'),
      waTitle: (enabled) =>
        enabled ? 'Request a quote' : 'Set NEXT_PUBLIC_WA_NUMBER or use the contact form',
    },
  },
};

// ========= Utils (in-file) =========
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
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero una cotización.';

/** Formatea bonito para HN (+504 ####-####). Fallback: +<digits>. */
function prettyPhone(rawDigits) {
  if (!rawDigits) return '';
  if (rawDigits.startsWith('504')) {
    const local = rawDigits.slice(3);
    if (local.length === 8) return `+504 ${local.slice(0, 4)}-${local.slice(4)}`;
  }
  return `+${rawDigits}`;
}

const WA_HREF = RAW_PHONE
  ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}`
  : null;
const TEL_HREF = RAW_PHONE ? `tel:+${RAW_PHONE}` : null;

export default function HeroSection() {
  const fadeUp = useFadeUp();
  const reduce = useReducedMotion();

  const t = makeT(getCurrentLocale());
  const phoneNice = prettyPhone(RAW_PHONE);

  // Subtítulo con <strong> no peligroso (sin dangerouslySetInnerHTML)
  const sub = String(t('sub') || '');
  const [subBefore, subAfter] = sub.split('{{strong}}');

  const waTitle = t('aria.waTitle');
  const phoneTitle = t('aria.phoneTitle');

  return (
    <Section
      id="inicio"
      className="relative pt-16 pb-14 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950"
    >
      {/* Glow & grid sutil (sin distraer) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[62rem] h-[34rem] rounded-full bg-brand/10 blur-3xl dark:bg-brand/20 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_25%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[linear-gradient(to_right,transparent_0_31px,rgba(0,0,0,0.6)_31px_32px),linear-gradient(to_bottom,transparent_0_31px,rgba(0,0,0,0.6)_31px_32px)] bg-[length:32px_32px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badges de confianza */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Badge tone="emerald">{t('badges.fast')}</Badge>
          <Badge tone="amber">{t('badges.guarantee')}</Badge>
          <Badge tone="cyan">{t('badges.billing')}</Badge>
        </div>

        {/* Headline */}
        <motion.h1
          {...fadeUp}
          className="mx-auto max-w-[22ch] text-balance text-[clamp(2rem,4.8vw,3.4rem)] font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100"
        >
          {t('headline1')}
          <span className="block bg-gradient-to-r from-brand to-brand-soft bg-clip-text text-transparent">
            {t('headline2')}
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          {...fadeUp}
          className="mx-auto mt-4 max-w-[56ch] text-[clamp(.98rem,1.35vw,1.15rem)] text-slate-700 dark:text-slate-300 leading-relaxed"
        >
          {subBefore}
          <strong className="text-slate-900 dark:text-slate-100">{t('subStrong')}</strong>
          {subAfter}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WA_HREF || '#contacto'}
            target={WA_HREF ? '_blank' : undefined}
            rel={WA_HREF ? 'noopener noreferrer' : undefined}
            aria-disabled={!WA_HREF}
            data-analytics-id="hero_whatsapp_cta"
            className={[
              'px-6 py-3 rounded-2xl font-semibold inline-flex items-center gap-2 shadow-card transition',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
              WA_HREF ? 'bg-brand text-white hover:opacity-90' : 'bg-slate-200 text-slate-500 cursor-not-allowed',
            ].join(' ')}
            aria-label={t('aria.wa')}
            title={typeof waTitle === 'function' ? waTitle(!!WA_HREF) : waTitle}
          >
            <MessageCircle size={20} aria-hidden="true" />
            {t('ctas.wa')}
            <ArrowRight size={18} aria-hidden="true" className="hidden sm:inline" />
          </a>

          <a
            href={TEL_HREF || '#contacto'}
            aria-disabled={!TEL_HREF}
            data-analytics-id="hero_call_cta"
            className={[
              'px-6 py-3 rounded-2xl font-semibold border inline-flex items-center gap-2 transition',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
              TEL_HREF
                ? 'border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900/60'
                : 'border-slate-200 text-slate-500 cursor-not-allowed',
            ].join(' ')}
            title={typeof phoneTitle === 'function' ? phoneTitle(phoneNice) : phoneTitle}
          >
            <Phone size={18} aria-hidden="true" />
            {t('ctas.call')}
          </a>
        </motion.div>

        {/* Bullets de valor */}
        <motion.ul {...fadeUp} className="mt-5 flex flex-wrap justify-center items-center gap-2">
          {(t('bullets') || []).map((txt) => (
            <li
              key={txt}
              className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs md:text-sm font-semibold inline-flex items-center gap-2"
            >
              <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={14} aria-hidden="true" />
              {txt}
            </li>
          ))}
        </motion.ul>

        {/* KPI bar */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="mt-10 grid grid-cols-3 max-w-3xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-card"
          role="list"
          aria-label={t('aria.kpiList')}
        >
          {(t('kpis') || []).map(({ k, l }) => (
            <div key={k} role="listitem" className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{k}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA secundaria */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="mt-6"
        >
          <a
            href="#servicios"
            data-analytics-id="hero_services_cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-label={t('aria.services')}
          >
            {t('ctas.services')}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
// --- END FILE ---
