// --- FILE: src/components/sections/ContactSection.jsx ---
'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import ContactForm from '@/components/shared/ContactForm';
import { Phone, Mail, MessageCircle, Shield } from 'lucide-react';
import { useFadeUp } from '@/hooks/useFadeUp';

// Sanitiza a dígitos (E.164 sin "+")
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ajmds.contact@gmail.com';
const MAILTO_SUBJECT = encodeURIComponent('Solicitud de cotización — AJM Digital Solutions');
const DEFAULT_MSG =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vengo desde el sitio. Quiero una cotización.';
const WA_HREF = RAW_PHONE
  ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}`
  : '#';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

function ContactJsonLd() {
  // Esquema básico de ContactPage + Organization.contactPoint
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto — AJM Digital Solutions',
    url: SITE_URL || undefined,
    mainEntity: {
      '@type': 'Organization',
      name: 'AJM Digital Solutions',
      url: SITE_URL || undefined,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: EMAIL,
          telephone: RAW_PHONE ? `+${RAW_PHONE}` : undefined,
          availableLanguage: ['es', 'en'],
          areaServed: 'HN',
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function ContactSection() {
  const fadeUp = useFadeUp();
  const telHref = RAW_PHONE ? `tel:+${RAW_PHONE}` : undefined;
  const mailHref = `mailto:${EMAIL}?subject=${MAILTO_SUBJECT}`;

  return (
    <Section
      id="contacto"
      title="Solicita tu cotización"
      subtitle="Cuéntanos sobre tu proyecto y recibirás una propuesta clara en menos de 24 horas."
      className="relative pb-24 bg-slate-50 dark:bg-slate-950"
    >
      {/* Glow sutil para jerarquía */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(55%_55%_at_50%_0%,#000_25%,transparent_65%)]"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full bg-brand/10 blur-3xl dark:bg-brand/15" />
      </div>

      {/* JSON-LD SEO */}
      <ContactJsonLd />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <motion.div
          {...fadeUp}
          className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-card"
        >
          <ContactForm />
        </motion.div>

        {/* Información de contacto */}
        <aside className="space-y-6">
          {/* Contacto directo */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card"
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              ¿Prefieres comunicarte directo?
            </h4>

            <div className="space-y-3">
              {/* WhatsApp */}
              <a
                href={WA_HREF}
                target={RAW_PHONE ? '_blank' : undefined}
                rel={RAW_PHONE ? 'noopener noreferrer nofollow' : undefined}
                aria-disabled={!RAW_PHONE}
                title={RAW_PHONE ? 'Escribir por WhatsApp' : 'Configura NEXT_PUBLIC_WA_NUMBER'}
                className={[
                  'w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
                  RAW_PHONE
                    ? 'bg-emerald-600 text-white hover:opacity-90'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed',
                ].join(' ')}
                data-analytics-id="contact_whatsapp_cta"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
                <span className="sr-only">
                  {RAW_PHONE ? ` al número +${RAW_PHONE}` : ''}
                </span>
              </a>

              {/* Teléfono */}
              <a
                href={telHref || '#'}
                aria-disabled={!telHref}
                title={telHref ? `Llamar +${RAW_PHONE}` : 'Configura NEXT_PUBLIC_WA_NUMBER'}
                className={[
                  'w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
                  telHref
                    ? 'bg-brand text-white hover:opacity-90'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed',
                ].join(' ')}
                data-analytics-id="contact_phone_cta"
              >
                <Phone size={18} aria-hidden="true" />
                {telHref ? `Llamar +${RAW_PHONE}` : 'Teléfono no disponible'}
              </a>

              {/* Correo */}
              <a
                href={mailHref}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-semibold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                title="Enviar correo"
                data-analytics-id="contact_email_cta"
              >
                <Mail size={18} aria-hidden="true" />
                Enviar correo
                <span className="sr-only"> a {EMAIL}</span>
              </a>
            </div>

            {/* SLA / Confianza */}
            <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" aria-hidden="true" />
                <span>
                  Respuesta promedio: <strong>2 horas</strong> hábiles.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Horarios */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card"
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              Horarios de atención
            </h4>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Lunes – Viernes</span>
                <span className="font-semibold">09:00 – 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span className="font-semibold text-rose-600">Cerrado</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos</span>
                <span className="font-semibold text-rose-600">Cerrado</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp disponible 24/7
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </Section>
  );
}
