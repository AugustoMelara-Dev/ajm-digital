// --- FILE: src/components/sections/AboutMeSection.jsx ---
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import { useFadeUp } from '@/hooks/useFadeUp';
import { Layers, Award, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const DEFAULT_MSG =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola Augusto, vi tu sitio y quiero hablar sobre un proyecto web.';
const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}` : '#contacto';

export default function AboutMeSection() {
  const fadeUp = useFadeUp();
  const reduce = useReducedMotion();

  return (
    <Section
      id="sobre"
      title="Conoce a tu socio digital"
      subtitle="Augusto José Melara Milla — Fundador & Desarrollador Principal"
      className="bg-white dark:bg-slate-950"
    >
      {/* JSON-LD: Person (SEO) */}
      <Script
        id="person-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Augusto José Melara Milla',
            jobTitle: 'Fundador & Desarrollador Principal',
            worksFor: { '@type': 'Organization', name: 'AJM Digital Solutions' },
            url: 'https://ajmdigitalsolutions.com',
          }),
        }}
      />

      <motion.div
        {...fadeUp}
        className="grid lg:grid-cols-5 gap-8 items-start"
        aria-labelledby="about-heading"
      >
        {/* Foto + métricas */}
        <div className="lg:col-span-2">
          <figure
            className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-card ring-1 ring-slate-200 dark:ring-slate-800"
          >
            <Image
              src="/images/about-me.jpg" // reemplaza por tu foto real
              alt="Augusto J. Melara — Fundador y Desarrollador Principal en AJM Digital Solutions"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
            />
            <figcaption className="sr-only">
              Retrato de Augusto J. Melara
            </figcaption>
          </figure>

          {/* Métricas de confianza (semántica con <dl>) */}
          <dl className="mt-6 grid grid-cols-3 gap-3" aria-label="Indicadores de confianza">
            {[
              { k: 'Años entregando', v: '5+' },
              { k: 'Entrega express', v: '72h' },
              { k: 'Propiedad del código', v: '100%' },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm"
              >
                <dt className="text-xs text-slate-500 dark:text-slate-400">{m.k}</dt>
                <dd className="mt-1 text-xl font-bold text-slate-900 dark:text-white" aria-live="polite">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contenido */}
        <div className="lg:col-span-3">
          {/* Copy principal */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 id="about-heading" className="sr-only">Sobre Augusto</h3>
            <p className="text-slate-900 dark:text-white font-semibold">
              Soy Augusto Melara, desarrollador web y fundador de AJM Digital Solutions.
            </p>
            <p>
              Aquí no solo construimos páginas web; diseñamos{' '}
              <strong className="text-slate-900 dark:text-white">motores de crecimiento</strong> para tu negocio.
              Convertimos tu sitio en tu vendedor más eficaz: un sistema que atrae prospectos, genera confianza
              y transforma visitas en clientes leales, incluso mientras duermes.
            </p>
            <p>
              Escuchamos tu idea y la llevamos a una plataforma sólida, elegante y de alto rendimiento que refleje
              la calidad de tu servicio y te abra puertas a nuevos clientes. Creamos sitios rápidos, seguros y
              optimizados para una sola cosa:{' '}
              <strong className="text-slate-900 dark:text-white">resultados medibles</strong>.
            </p>
          </div>

          {/* Tarjetas: filosofía y garantías */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-card"
            >
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="text-brand" size={18} aria-hidden="true" />
                Filosofía de trabajo
              </h4>
              <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                {[
                  'Comunicación clara y directa',
                  'Entregas puntuales y medibles',
                  'Precios fijos y transparentes',
                  'Soporte directo por WhatsApp/Email',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="text-emerald-600 shrink-0 mt-[2px]" size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-card"
            >
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Award className="text-emerald-600" size={18} aria-hidden="true" />
                Garantías
              </h4>
              <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                {[
                  '7 días de satisfacción total',
                  '30 días de soporte post-entrega',
                  'Propiedad total del código',
                  'Capacitación para gestionar tu web',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="text-emerald-600 shrink-0 mt-[2px]" size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={WA_HREF}
              target={RAW_PHONE ? '_blank' : undefined}
              rel={RAW_PHONE ? 'noopener noreferrer nofollow' : undefined}
              className={[
                'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition shadow-card',
                RAW_PHONE
                  ? 'bg-emerald-600 text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed',
              ].join(' ')}
              aria-label="Hablar por WhatsApp con AJM Digital Solutions"
              aria-disabled={!RAW_PHONE}
              title={RAW_PHONE ? 'Hablar por WhatsApp' : 'Configura NEXT_PUBLIC_WA_NUMBER'}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Hablar por WhatsApp
            </a>

            <a
              href="#precios"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              aria-label="Ver planes y precios"
            >
              Ver planes
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
