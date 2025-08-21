// --- FILE: src/components/shared/Footer.jsx ---
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Linkedin, Facebook, Shield } from 'lucide-react';
import { getCurrentLocale, normalizeLocale, DEFAULT_LOCALE } from '@/lib/i18n';
import { FOOTER_I18N } from '@/i18n/footer';
import { digitsOnly, formatPhoneE164ToDisplay } from '@/lib/phone';

/* =========================
 * Helpers i18n locales
 * ========================= */
function byPath(obj, path) {
  try {
    return String(path)
      .split('.')
      .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
  } catch {
    return undefined;
  }
}
function makeT(locale, dict) {
  const lang = normalizeLocale(locale);
  const local = dict[lang] || dict[DEFAULT_LOCALE];
  return (path, ...args) => {
    let v = byPath(local, path);
    if (v === undefined) v = byPath(dict[DEFAULT_LOCALE], path);
    if (typeof v === 'function') return v(...args);
    return v;
  };
}

/** ENV & helpers */
const RAW_PHONE = digitsOnly(process.env.NEXT_PUBLIC_WA_NUMBER || ''); // E.164 sin "+"
const PHONE_COUNTRY = (process.env.NEXT_PUBLIC_PHONE_COUNTRY || 'HN').toUpperCase();
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ajmds.contact@gmail.com';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ajmdigitalsolutions.com').replace(/\/$/, '');
const WA_TEXT = process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero una cotización.';
const waHref = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_TEXT)}` : '#contacto';

/** Social solo si están configuradas */
const socialLinks = [
  { name: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL, icon: Linkedin },
  { name: 'Facebook', href: process.env.NEXT_PUBLIC_FACEBOOK_URL, icon: Facebook },
].filter((s) => typeof s.href === 'string' && s.href.trim() && s.href !== '#');

function Footer() {
  const t = makeT(getCurrentLocale(), FOOTER_I18N);

  const phoneMeta = RAW_PHONE ? formatPhoneE164ToDisplay(RAW_PHONE, PHONE_COUNTRY) : null;
  const telHref = phoneMeta ? `tel:${phoneMeta.e164}` : undefined;

  const year = new Date().getFullYear();
  const displayUrl = SITE_URL.replace(/^https?:\/\//, '');
  const emailSubject = encodeURIComponent(String(t('contact.emailSubject') || 'Contacto desde el sitio'));

  // Diccionario de enlaces (texto por i18n, URL estable)
  const linkGroups = [
    {
      heading: t('headings.services'),
      items: [
        { label: t('links.dev'), href: '#servicios' },
        { label: t('links.ecommerce'), href: '#servicios' },
        { label: t('links.landing'), href: '#servicios' },
        { label: t('links.seo'), href: '#servicios' },
        { label: t('links.maintenance'), href: '#servicios' },
      ],
    },
    {
      heading: t('headings.company'),
      items: [
        { label: t('links.about'), href: '#sobre' },
        { label: t('links.process'), href: '#proceso' },
        { label: t('links.cases'), href: '#proyectos' },
        { label: t('links.blog'), href: '/blog', internal: true },
        { label: t('links.prices'), href: '#precios' }, // coherente con PlansSection
      ],
    },
    {
      heading: t('headings.resources'),
      items: [
        { label: t('links.faq'), href: '#faq' },
        { label: t('links.support'), href: '#contacto' },
        { label: t('links.terms'), href: '/legal/terminos', internal: true },
        { label: t('links.privacy'), href: '/legal/privacidad', internal: true },
        { label: t('links.guarantees'), href: '#precios' },
      ],
    },
  ];

  // JSON-LD Organization
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || `${SITE_URL}/logo.png`;
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AJM Digital Solutions',
    url: SITE_URL,
    logo: logoUrl,
    contactPoint: RAW_PHONE
      ? [
          {
            '@type': 'ContactPoint',
            telephone: `+${RAW_PHONE}`,
            contactType: 'customer service',
            areaServed: 'HN',
            availableLanguage: ['es', 'en'],
          },
        ]
      : undefined,
    sameAs: socialLinks.map((s) => s.href),
  };

  return (
    <footer id="site-footer" className="bg-slate-900 text-white border-t border-slate-800" role="contentinfo">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <div className="container-custom">
        {/* Main */}
        <div className="py-16 grid gap-10 lg:gap-8 lg:grid-cols-4">
          {/* Brand / About */}
          <div>
            <h3 className="text-2xl font-bold mb-2 tracking-[-0.02em]">{t('brand')}</h3>
            <p className="text-slate-400 leading-relaxed">{t('about')}</p>

            {/* Contacto directo */}
            <address className="not-italic mt-6 space-y-3 text-slate-300">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-slate-400" aria-hidden="true" />
                {t('location')}
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-slate-400" aria-hidden="true" />
                {telHref ? (
                  <a
                    href={telHref}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                    aria-label={String(t('contact.phoneAria') || '').replace('{phone}', phoneMeta.display)}
                    title={phoneMeta.display}
                  >
                    {phoneMeta.display}
                  </a>
                ) : (
                  <span className="opacity-70">{t('contact.phoneUnavailable')}</span>
                )}
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-slate-400" aria-hidden="true" />
                <a
                  href={`mailto:${EMAIL}?subject=${emailSubject}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                >
                  {EMAIL}
                </a>
              </p>
              <p className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-slate-400" aria-hidden="true" />
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                  aria-label={t('contact.webAria')}
                >
                  {displayUrl}
                </a>
              </p>
            </address>

            {/* Social */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={`Abrir ${name}`}
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg grid place-items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <nav className="lg:col-span-3 grid md:grid-cols-3 gap-8" aria-label="Site links">
            {linkGroups.map((group) => (
              <div key={group.heading}>
                <h4 className="font-semibold text-white mb-4">{group.heading}</h4>
                <ul className="space-y-2">
                  {group.items.map(({ label, href, internal }) => (
                    <li key={`${group.heading}-${label}`}>
                      {internal ? (
                        <Link
                          href={href}
                          className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm text-center md:text-left">
            © {year} AJM Digital Solutions. {normalizeLocale(getCurrentLocale()) === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              {t('bottom.response')}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-2">
              <Shield className="w-4 h-4" aria-hidden="true" />
              {t('bottom.billing')}
            </span>
            <span>•</span>
            <span>{t('bottom.guarantee')}</span>
          </div>
        </div>

        {/* Availability badge */}
        <div className="pb-8">
          <div className="inline-flex items-center px-4 py-2 bg-slate-800 rounded-full text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
            <span className="text-slate-300">{t('availability')}</span>
          </div>
        </div>
      </div>

      {/* CTA flotante (mobile) */}
      {RAW_PHONE ? (
        <div className="fixed bottom-6 right-6 md:right-8 z-40 md:hidden">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full font-semibold bg-emerald-600 text-white shadow-card hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 transition"
            aria-label={t('ctaWhatsapp')}
            title={t('ctaWhatsapp')}
          >
            WhatsApp
          </a>
        </div>
      ) : null}
    </footer>
  );
}

export default Footer;
// --- END FILE ---
