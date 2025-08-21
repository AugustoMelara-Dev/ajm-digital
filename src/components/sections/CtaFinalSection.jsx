// --- FILE: src/components/sections/CtaFinalSection.jsx ---
'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { useFadeUp } from '@/hooks/useFadeUp';
import { MessageCircle, ArrowRight, Phone } from 'lucide-react';

// Sanitiza el número a solo dígitos (E.164 sin "+")
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ajmds.contact@gmail.com';
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero una consulta.';
const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}` : '#contacto';
const TEL_HREF = RAW_PHONE ? `tel:+${RAW_PHONE}` : '#contacto';

// Precio inicial (USD) con formateo robusto y fallback seguro
const START_USD_RAW = Number(process.env.NEXT_PUBLIC_START_PRICE_USD || 199);
const START_USD = Number.isFinite(START_USD_RAW) ? START_USD_RAW : 199;

const fmtUSD = (n) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `USD $${n}`;
  }
};

export default function CtaFinalSection() {
  const fadeUp = useFadeUp();

  return (
    <Section
      id="cta-final"
      title="¿Listo para impulsar tu presencia digital?"
      subtitle="Empresas de todos los tamaños confían en AJM Digital Solutions."
      className="relative"
    >
      {/* Fondo sutil con soporte dark */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/10"
        aria-hidden="true"
      />

      <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto">
        {/* Métricas destacadas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">72h</div>
            <div className="text-slate-600 dark:text-slate-300">Entrega express</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
            <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-soft">
              {fmtUSD(START_USD)}
            </div>
            <div className="text-slate-600 dark:text-slate-300">Desde</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">7 días</div>
            <div className="text-slate-600 dark:text-slate-300">Garantía total</div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={WA_HREF}
            target={RAW_PHONE ? '_blank' : undefined}
            rel={RAW_PHONE ? 'noopener noreferrer' : undefined}
            className={[
              'px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-3 shadow-card transition',
              RAW_PHONE
                ? 'bg-brand text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed',
            ].join(' ')}
            aria-disabled={!RAW_PHONE}
            aria-label="Solicitar consulta por WhatsApp"
            title={RAW_PHONE ? 'Solicitar consulta por WhatsApp' : 'Ir a contacto'}
          >
            <MessageCircle size={20} aria-hidden="true" />
            Solicitar consulta
            <ArrowRight size={20} aria-hidden="true" />
          </a>

          <a
            href={TEL_HREF}
            className={[
              'px-6 py-4 border-2 rounded-2xl font-semibold inline-flex items-center gap-2 transition',
              RAW_PHONE
                ? 'border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40'
                : 'border-slate-200 text-slate-500 cursor-not-allowed',
            ].join(' ')}
            aria-disabled={!RAW_PHONE}
            aria-label={RAW_PHONE ? `Llamar +${RAW_PHONE}` : 'Ir a contacto'}
            title={RAW_PHONE ? `Llamar +${RAW_PHONE}` : 'Ir a contacto'}
          >
            <Phone size={18} aria-hidden="true" />
            Llamar
          </a>
        </div>

        {/* Fallback de contacto por email */}
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          ¿Prefieres correo? Escríbenos a{' '}
          <a
            className="underline underline-offset-2 decoration-slate-400 hover:decoration-slate-700 dark:hover:decoration-slate-200"
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('Solicitud de consulta — AJM Digital Solutions')}`}
            aria-label={`Enviar correo a ${EMAIL}`}
          >
            {EMAIL}
          </a>
          .
        </p>

        {/* Nota accesible invisible para lectores */}
        <span className="sr-only">
          Respuesta promedio en 2 horas hábiles por WhatsApp o correo.
        </span>
      </motion.div>
    </Section>
  );
}
