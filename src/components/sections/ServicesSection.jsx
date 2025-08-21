// --- FILE: src/components/sections/ServicesSection.jsx ---
'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import ServiceCard from '@/components/cards/ServiceCard';
import { SERVICES } from '@/lib/constants';
import { useFadeUp } from '@/hooks/useFadeUp';
import { ArrowRight } from 'lucide-react';

// Teléfono: solo dígitos (E.164 sin "+")
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vengo desde el sitio. Quiero una consulta sobre servicios.';
const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}` : '#contacto';

function ServicesJsonLd({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      // Describimos cada servicio para SEO
      item: {
        '@type': 'Service',
        name: s?.title || `Servicio ${i + 1}`,
        description: s?.desc || 'Servicio ofrecido por AJM Digital Solutions',
        provider: {
          '@type': 'Organization',
          name: 'AJM Digital Solutions',
        },
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function ServicesSection() {
  const fadeUp = useFadeUp();
  const hasServices = Array.isArray(SERVICES) && SERVICES.length > 0;

  return (
    <Section
      id="servicios"
      title="Servicios para crecer con solidez"
      subtitle="Web, apps y e-commerce con estándares de clase mundial. Diseño sobrio, rendimiento alto y soporte directo."
    >
      {/* JSON-LD de servicios para SEO */}
      <ServicesJsonLd items={hasServices ? SERVICES : []} />

      <div className="container-tight">
        {/* Intro breve */}
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Cada proyecto se construye con foco en conversión, claridad y mantenimiento. Sin circo, con resultados.
          </p>
        </motion.div>

        {/* Listado de servicios o vacío elegante */}
        {hasServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title || index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mb-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-600 dark:text-slate-300">
            Aún no hay servicios publicados.{' '}
            <a className="underline font-medium" href={WA_HREF} target={RAW_PHONE ? '_blank' : undefined} rel={RAW_PHONE ? 'noopener noreferrer' : undefined}>
              Escríbenos
            </a>{' '}
            y armamos una propuesta a la medida.
          </div>
        )}

        {/* CTA sobria */}
        <motion.div {...fadeUp} className="text-center">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-10 shadow-card">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
              ¿No encuentras exactamente lo que necesitas?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
              Cuéntanos tu caso y preparamos una propuesta a la medida. Respuesta en 24–48&nbsp;h.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={WA_HREF}
                target={RAW_PHONE ? '_blank' : undefined}
                rel={RAW_PHONE ? 'noopener noreferrer' : undefined}
                aria-disabled={!RAW_PHONE}
                title={RAW_PHONE ? 'Solicitar consulta por WhatsApp' : 'Ir a contacto'}
                className={[
                  'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
                  RAW_PHONE ? 'bg-brand text-white hover:opacity-90' : 'bg-slate-200 text-slate-500 cursor-not-allowed',
                ].join(' ')}
                data-analytics-id="services_whatsapp_cta"
              >
                Solicitar consulta
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                data-analytics-id="services_contact_cta"
              >
                Ver opciones de contacto
              </a>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Transparencia total: precios fijos, propiedad del código y soporte directo.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
