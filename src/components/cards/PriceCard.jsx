// --- FILE: src/components/cards/PriceCard.jsx ---
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useFadeUp } from '@/hooks/useFadeUp';

const PHONE = process.env.NEXT_PUBLIC_WA_NUMBER || ''; // E.164 sin "+"
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vengo desde el sitio. Quiero cotizar este plan.';
const WA_HREF = PHONE
  ? `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_DEFAULT)}`
  : '#contacto';

function formatUSD(price) {
  if (typeof price === 'number') {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return `$${price}`;
    }
  }
  return price; // si viene como string
}

const PriceCard = React.memo(function PriceCard({
  ribbon,
  title,
  price,      // number | string
  features = [],
  popular = false,
  savings,    // string (opcional)
}) {
  const fadeUp = useFadeUp();

  const isWA = Boolean(PHONE);
  const btnBase =
    'inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl font-semibold border w-full justify-center transition';

  return (
    <motion.div
      {...fadeUp}
      className={[
        'relative rounded-2xl border bg-white p-6 shadow-lg transition',
        popular ? 'ring-2 ring-blue-300/80 border-blue-200' : 'border-slate-200',
      ].join(' ')}
      data-popular={popular ? 'true' : 'false'}
    >
      {/* Cinta destacada */}
      {ribbon && (
        <span className="absolute -right-2 top-3 text-xs font-semibold rounded-full bg-blue-600 text-white px-3 py-1 z-10">
          {ribbon}
        </span>
      )}

      {/* Ahorro */}
      {savings && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Ahorra {savings}
          </span>
        </div>
      )}

      {/* Título */}
      <h3 className="text-slate-900 font-semibold text-lg leading-snug">{title}</h3>

      {/* Precio (USD) */}
      <div className="mt-1 text-4xl font-bold text-slate-900" aria-label={`Precio ${formatUSD(price)}`}>
        {formatUSD(price)}
      </div>
      <p className="text-xs text-slate-500 mt-1">Precios referenciales · Facturación en USD</p>

      {/* Características */}
      <ul className="mt-4 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
            <CheckCircle2 className="text-emerald-600 shrink-0" size={18} aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
        <li className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
          <ShieldCheck className="text-emerald-600 shrink-0" size={18} aria-hidden="true" />
          <span>Hosting + SSL + dominio 1 año · Garantía de satisfacción 7 días</span>
        </li>
      </ul>

      {/* CTA */}
      <a
        href={WA_HREF}
        aria-label={`Cotizar el plan ${title} — AJM Digital Solutions`}
        target={isWA ? '_blank' : undefined}
        rel={isWA ? 'nofollow noopener noreferrer' : undefined}
        title={isWA ? 'Solicitar plan por WhatsApp' : 'Ir a contacto'}
        className={[
          btnBase,
          popular
            ? isWA
              ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500'
              : 'bg-slate-900 text-white border-slate-900 hover:opacity-90'
            : isWA
            ? 'text-slate-900 border-slate-200 hover:bg-slate-50'
            : 'text-slate-900 border-slate-200 hover:bg-slate-50',
        ].join(' ')}
      >
        Solicitar plan <ArrowRight size={18} aria-hidden="true" />
      </a>
    </motion.div>
  );
});

export { PriceCard };
export default PriceCard;
