// --- FILE: src/components/sections/PlansSection.jsx ---
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import PriceCard from '@/components/cards/PriceCard';
import { PLANS } from '@/lib/constants';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { t, getCurrentLocale } from '@/lib/i18n';

// Sanitiza número para WhatsApp (E.164 sin '+')
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vengo desde el sitio. Quiero una consulta sobre planes.';
const WA_HREF = RAW_PHONE
  ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}`
  : null;

/** Fallbacks locales si aún no existen claves "pricing" en i18n */
const FALLBACK = {
  es: {
    title: 'Planes con precios claros (USD)',
    subtitle:
      'Facturación internacional. Precios referenciales: el alcance final se define con el brief.',
    from: 'Desde',
    listLabel: 'Planes disponibles',
    includeLine:
      'Todos los planes incluyen hosting, SSL y dominio por 1 año, además de garantía de satisfacción de 7 días.',
    note: '* Impuestos o comisiones de pasarela pueden aplicar según el país y el medio de pago.',
    cta: '¿Dudas sobre el plan ideal? Hablemos',
    ctaTitleWA: 'Resolver dudas por WhatsApp',
    ctaTitleFallback: 'Usa el formulario de contacto',
  },
  en: {
    title: 'Plans with clear pricing (USD)',
    subtitle:
      'International invoicing. Prices are indicative; final scope is defined after the brief.',
    from: 'From',
    listLabel: 'Available plans',
    includeLine:
      'All plans include hosting, SSL and a domain for 1 year, plus a 7-day satisfaction guarantee.',
    note: '* Taxes or gateway fees may apply depending on country and payment method.',
    cta: 'Unsure which plan fits? Let’s talk',
    ctaTitleWA: 'Solve questions via WhatsApp',
    ctaTitleFallback: 'Use the contact form',
  },
};

/** t() con fallback: si no existe la clave, uso el texto por defecto */
function maybeT(path, fallback) {
  const out = t(path);
  if (typeof out === 'string') {
    const last = path.split('.').pop();
    return out === last ? fallback : out; // si t devolvió la "key", no existe => uso fallback
  }
  return fallback;
}

// Lee un precio numérico en USD sin asumir estructura fija
const getPriceUSD = (plan) => {
  const keys = ['priceUSD', 'price', 'from', 'startingAt'];
  for (const k of keys) {
    const v = plan?.[k];
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string') {
      const num = Number(v.replace(/[^0-9.]/g, ''));
      if (Number.isFinite(num) && num > 0) return num;
    }
  }
  return null;
};

const getMinUSD = (plans) => {
  const nums = (plans || []).map(getPriceUSD).filter((n) => typeof n === 'number');
  return nums.length ? Math.min(...nums) : null;
};

const fmtUSD = (n, locale) => {
  try {
    return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `USD $${n}`;
  }
};

// JSON-LD: OfferCatalog (incluye precio si se detecta)
function PricingJsonLd() {
  const items = (PLANS || []).map((p) => {
    const price = getPriceUSD(p);
    const base = { '@type': 'Offer', name: p?.title || 'Plan' };
    return price ? { ...base, price, priceCurrency: 'USD' } : base;
  });

  const json = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'AJM Digital Solutions — Pricing Plans',
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function PlansSection() {
  const reduce = useReducedMotion();
  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -80px 0px' },
    transition: { duration: reduce ? 0 : 0.25 },
  };

  const locale = getCurrentLocale();
  const L = FALLBACK[locale] || FALLBACK.es;
  const minPrice = getMinUSD(PLANS);

  return (
    <Section
      id="precios"
      title={maybeT('pricing.title', L.title)}
      subtitle={maybeT('pricing.subtitle', L.subtitle)}
      className="relative bg-slate-50 dark:bg-slate-950"
    >
      {/* Glow sutil de fondo (sobrio, enterprise) */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/10"
        aria-hidden
      />

      {/* JSON-LD para SEO */}
      <PricingJsonLd />

      {/* Línea de “Desde …” si hay precios */}
      {typeof minPrice === 'number' && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6" aria-live="polite">
          {maybeT('pricing.from', L.from)}{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {fmtUSD(minPrice, locale)}
          </span>
        </p>
      )}

      {/* Grid de planes */}
      <div
        role="list"
        aria-label={maybeT('pricing.listLabel', L.listLabel)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {(PLANS || []).map((plan, i) => (
          <motion.div
            key={plan?.title || i}
            role="listitem"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: reduce ? 0 : 0.24, delay: reduce ? 0 : i * 0.06 }}
          >
            <PriceCard {...plan} />
          </motion.div>
        ))}
      </div>

      {/* Nota de inclusión/garantía */}
      <motion.div
        initial={fadeUp.initial}
        whileInView={fadeUp.whileInView}   // ✅ bugfix (antes: whichInView)
        viewport={fadeUp.viewport}
        transition={fadeUp.transition}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
          <ShieldCheck className="text-emerald-600" size={20} aria-hidden="true" />
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            {maybeT('pricing.includeLine', L.includeLine)}
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {maybeT('pricing.note', L.note)}
        </p>
      </motion.div>

      {/* CTA sobria para dudas sobre precios */}
      <div className="mt-8 text-center">
        <a
          href={WA_HREF || '#contacto'}
          target={WA_HREF ? '_blank' : undefined}
          rel={WA_HREF ? 'noopener noreferrer' : undefined}
          aria-disabled={!WA_HREF}
          data-analytics-id="plans_whatsapp_cta"
          className={[
            'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition shadow-card',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
            WA_HREF ? 'bg-brand text-white hover:opacity-90' : 'bg-slate-200 text-slate-500 cursor-not-allowed',
          ].join(' ')}
          title={
            WA_HREF
              ? maybeT('pricing.ctaTitleWA', L.ctaTitleWA)
              : maybeT('pricing.ctaTitleFallback', L.ctaTitleFallback)
          }
        >
          <MessageCircle size={18} aria-hidden="true" />
          {maybeT('pricing.cta', L.cta)}
        </a>
      </div>
    </Section>
  );
}
// --- END FILE ---
