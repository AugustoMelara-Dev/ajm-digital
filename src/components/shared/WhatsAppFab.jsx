// --- FILE: src/components/shared/WhatsAppFab.jsx ---
'use client';

import { useAnyInViewport } from '@/hooks/useAnyInViewport';
import { MessageCircle } from 'lucide-react';

/* ====================== Config / Env ====================== */
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, ''); // E.164 sin "+"
const DEFAULT_MSG =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vengo desde el sitio. Quiero una cotización.';

/* ====================== i18n mínimo inline ====================== */
const DICT = {
  es: {
    btn: 'WhatsApp',
    title: 'Escríbenos por WhatsApp',
    aria: (tel) => (tel ? `Abrir chat de WhatsApp con AJM Digital Solutions al ${tel}` : 'Abrir chat de WhatsApp'),
    noPhoneHint: 'Configura NEXT_PUBLIC_WA_NUMBER',
  },
  en: {
    btn: 'WhatsApp',
    title: 'Message us on WhatsApp',
    aria: (tel) => (tel ? `Open WhatsApp chat with AJM Digital Solutions at ${tel}` : 'Open WhatsApp chat'),
    noPhoneHint: 'Set NEXT_PUBLIC_WA_NUMBER',
  },
};

const getInitialLang = () => {
  try {
    const ls = localStorage.getItem('ajm_lang');
    if (ls === 'es' || ls === 'en') return ls;
    const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    if (htmlLang.startsWith('en')) return 'en';
    if (htmlLang.startsWith('es')) return 'es';
    return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  } catch { return 'es'; }
};

const applyLang = (lang) => {
  try {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('ajm_lang', lang);
    window.dispatchEvent?.(new CustomEvent('ajm:lang-changed', { detail: { lang } }));
  } catch {}
};

/* ====================== Helper: teléfono bonito ====================== */
// Soporta HN (+504 9999-9999) y US (+1 (AAA) BBB-CCCC). Fallback genérico por grupos.
const prettyPhone = (raw) => {
  if (!raw) return '';
  const d = raw.replace(/\D/g, '');
  if (d.startsWith('504')) {
    const n = d.slice(3);
    if (n.length === 8) return `+504 ${n.slice(0, 4)}-${n.slice(4)}`;
    return `+504 ${n}`;
  }
  if (d.startsWith('1') && d.length >= 11) {
    const area = d.slice(1, 4), b = d.slice(4, 7), c = d.slice(7, 11);
    return `+1 (${area}) ${b}-${c}`;
  }
  // Fallback: +CC XXXX-XXXX-...
  if (d.length > 4) {
    const cc = d.slice(0, Math.max(1, d.length - 9)); // heurística
    const rest = d.slice(cc.length).replace(/(\d{4})(?=\d)/g, '$1-');
    return `+${cc} ${rest}`;
  }
  return `+${d}`;
};

/* ====================== Component ====================== */
export default function WhatsAppFab() {
  // Oculta el FAB cuando el footer o la sección de contacto están visibles (no estorbar).
  const hide = useAnyInViewport(['#site-footer', '#contacto']);

  // Si no hay número, no renderizamos (evita enlace muerto)
  if (!RAW_PHONE) return null;

  // i18n
  const lang = getInitialLang();
  const t = DICT[lang] || DICT.es;
  // Asegura que <html lang> quede sincronizado si alguien cambió el idioma en otra parte.
  applyLang(lang);

  const telPretty = prettyPhone(RAW_PHONE);

  const handleClick = () => {
    try {
      const ts = new Date();
      const stamp =
        lang === 'en'
          ? ts.toLocaleString('en-US')
          : ts.toLocaleString('es-HN', { hour12: false });

      // Mensaje enriquecido con fuente, URL y fecha (útil para contexto y analítica cualitativa).
      const body = [
        DEFAULT_MSG,
        '',
        `— Origen: FAB`,
        `— URL: ${typeof window !== 'undefined' ? window.location.href : 'sitio'}`,
        `— Fecha: ${stamp}`,
      ].join('\n');

      const url = `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(body)}`;

      // Tracking opcional (no rompe si no existe)
      try {
        // Plausible
        window.plausible?.('cta_whatsapp', {
          props: { location: 'FAB', path: window.location.pathname },
        });
        // GA4
        window.gtag?.('event', 'click_whatsapp_fab', {
          event_category: 'engagement',
          event_label: window.location.pathname,
        });
      } catch {}

      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Silencio: FAB no debe romper UX
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t.aria(telPretty)}
      title={t.title}
      className={[
        'fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40',
        'inline-flex items-center gap-2 px-4 py-3 rounded-full font-semibold',
        'bg-emerald-600 text-white shadow-card hover:opacity-90',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
        'transition will-change-transform',
        'motion-safe:hover:translate-y-0.5 motion-safe:active:translate-y-0',
        'motion-reduce:transition-none motion-reduce:transform-none',
        'dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-white',
        'pb-[env(safe-area-inset-bottom)]', // iOS safe area
        hide ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
      data-analytics="whatsapp_fab"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="hidden sm:inline">{t.btn}</span>
      <span className="sr-only">{telPretty}</span>
    </button>
  );
}
