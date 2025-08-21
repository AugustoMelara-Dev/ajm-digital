// --- FILE: src/components/cards/ServiceCard.jsx ---
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useFadeUp } from '@/hooks/useFadeUp';

const PHONE = process.env.NEXT_PUBLIC_WA_NUMBER || ''; // E.164 sin "+"
const BASE_MSG =
  process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero información.';

const ServiceCard = React.memo(function ServiceCard({
  icon: Icon,
  title,
  desc,
  points,
  time,
  popular,
}) {
  const fadeUp = useFadeUp();

  const waText = encodeURIComponent(`${BASE_MSG}\n\nServicio de interés: ${title}`);
  const WA_HREF = PHONE ? `https://wa.me/${PHONE}?text=${waText}` : '#contacto';

  return (
    <motion.article
      {...fadeUp}
      className={[
        'rounded-2xl border bg-white p-6 shadow-card transition will-change-transform',
        'hover:shadow-lg hover:-translate-y-0.5',
        popular ? 'ring-1 ring-brand/30 border-brand/30' : 'border-slate-200',
      ].join(' ')}
      data-popular={popular ? 'true' : 'false'}
    >
      <div className="flex items-center justify-between">
        {/* Icono sobrio (sin degradados) */}
        <div className="w-12 h-12 rounded-2xl grid place-items-center bg-brand/10 text-brand">
          <Icon size={22} aria-hidden="true" />
        </div>

        <div className="flex gap-2">
          {popular && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              Más elegido
            </span>
          )}
          {time && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {time}
            </span>
          )}
        </div>
      </div>

      <h3 className="text-slate-900 font-semibold mt-3 leading-snug">{title}</h3>
      <p className="text-slate-600 text-sm mt-1 leading-relaxed">{desc}</p>

      {Array.isArray(points) && points.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
          {points.map((p, i) => (
            <li key={i} className="flex gap-2 items-start">
              <CheckCircle2 className="text-emerald-600 shrink-0" size={16} aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="mt-4">
        <a
          href={WA_HREF}
          target={PHONE ? '_blank' : undefined}
          rel={PHONE ? 'noopener noreferrer' : undefined}
          aria-label={`Solicitar información sobre ${title}`}
          aria-disabled={!PHONE}
          title={PHONE ? 'Solicitar información por WhatsApp' : 'Ir a contacto'}
          className={[
            'inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold',
            PHONE
              ? 'bg-brand text-white hover:opacity-90 transition'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed',
          ].join(' ')}
        >
          Solicitar información <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
});

export default ServiceCard;
