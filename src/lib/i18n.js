// --- FILE: src/lib/i18n.js ---
/**
 * i18n minimalista ES/EN con helpers para UI y SEO.
 * - t(path, params?, locale?) con fallback.
 * - Detección y persistencia de idioma.
 * - <html lang> y alternates/hreflang.
 * - Alias de compatibilidad: getLang(), setLang(), pick().
 */

export const SUPPORTED_LOCALES = /** @type {const} */ (['es', 'en']);
export const DEFAULT_LOCALE = /** @type {const} */ ('es');

/** Normaliza 'es-ES' -> 'es', 'en-US' -> 'en'. */
export function normalizeLocale(input) {
  const base = String(input || '').toLowerCase().slice(0, 2);
  return SUPPORTED_LOCALES.includes(base) ? base : DEFAULT_LOCALE;
}

/** Mejor intento de detección (solo client). */
export function detectBrowserLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const nav = navigator;
  const list = [nav.language, ...(Array.isArray(nav.languages) ? nav.languages : [])].filter(Boolean);
  return normalizeLocale(list[0] || DEFAULT_LOCALE);
}

/** Storage seguro (no rompe en SSR). */
const LS_KEY = 'locale';
export function getStoredLocale() {
  try {
    if (typeof window === 'undefined') return null;
    const v = localStorage.getItem(LS_KEY);
    return v ? normalizeLocale(v) : null;
  } catch {
    return null;
  }
}
export function setStoredLocale(locale) {
  try {
    if (typeof window !== 'undefined') localStorage.setItem(LS_KEY, normalizeLocale(locale));
  } catch {}
}

/** Locale actual con prioridad: storage > navegador > default. */
export function getCurrentLocale() {
  return getStoredLocale() || detectBrowserLocale() || DEFAULT_LOCALE;
}

/** Aplica <html lang> y data-locale (client). */
export function applyHtmlLang(locale) {
  try {
    if (typeof document !== 'undefined') {
      const lang = normalizeLocale(locale);
      const html = document.documentElement;
      html.setAttribute('lang', lang);
      html.dataset.locale = lang;
    }
  } catch {}
}

/** Alternates/hreflang (para Next Metadata o <link>). */
export function buildAlternates({ baseUrl, path = '' }) {
  const cleanBase = String(baseUrl || '').replace(/\/+$/, '');
  const cleanPath = String(path || '').replace(/^\/?/, '/');
  /** @type {Record<string,string>} */
  const languages = {};
  for (const loc of SUPPORTED_LOCALES) {
    const isDefault = loc === DEFAULT_LOCALE;
    const href = cleanBase + (isDefault ? '' : `/${loc}`) + cleanPath;
    languages[loc] = href;
  }
  return { languages };
}

/* ============================================================================
 * DICCIONARIOS (Header + Hero/CTAs)
 * ========================================================================== */
export const DICTS = {
  es: {
    localeName: 'Español',
    common: {
      menu: 'Menú',
      cotizar: 'Cotizar',
      whatsapp: 'WhatsApp',
      scheduleCall: 'Agendar llamada',
      viewServices: 'Ver servicios',
      requestQuote: 'Solicitar cotización',
      notAvailable: 'No disponible',
    },
    header: { cta: 'Cotizar', langLabel: 'Idioma' },
    hero: {
      headlineTop: 'Desarrollo web y apps',
      headlineEmphasis: 'que convierten visitas en clientes',
      subtitle:
        'Sitios corporativos, landing pages y e-commerce con rendimiento alto y SEO técnico, diseño sobrio y foco en conversión. Plazos serios, soporte directo.',
      badges: ['Entrega 72 h', 'Garantía 7 días', 'Facturación USD'],
      ctas: { whatsapp: 'Solicitar cotización', call: 'Agendar llamada', services: 'Ver servicios' },
      kpis: [
        { key: '72h', label: 'Entrega express' },
        { key: '99.9%', label: 'Uptime hosting' },
        { key: '7 días', label: 'Garantía total' },
      ],
      valueBullets: ['Código mantenible', 'Respuesta 24–48h', 'Propiedad del código'],
      defaultWaMessage: 'Hola, vengo desde el sitio. Quiero una cotización.',
      callTitleUnavailable: 'Teléfono no disponible',
    },
    process: { briefCta: 'Agendar brief de 30 min', avgResponse: 'Respuesta promedio: 2 horas hábiles.' },
  },

  en: {
    localeName: 'English',
    common: {
      menu: 'Menu',
      cotizar: 'Get a quote',
      whatsapp: 'WhatsApp',
      scheduleCall: 'Schedule a call',
      viewServices: 'View services',
      requestQuote: 'Request a quote',
      notAvailable: 'Not available',
    },
    header: { cta: 'Get a quote', langLabel: 'Language' },
    hero: {
      headlineTop: 'Web & app development',
      headlineEmphasis: 'that turn visitors into clients',
      subtitle:
        'Corporate sites, landing pages and e-commerce with high performance and technical SEO, clean design and conversion focus. Serious timelines, direct support.',
      badges: ['72h delivery', '7-day guarantee', 'USD invoicing'],
      ctas: { whatsapp: 'Request a quote', call: 'Schedule a call', services: 'View services' },
      kpis: [
        { key: '72h', label: 'Express delivery' },
        { key: '99.9%', label: 'Hosting uptime' },
        { key: '7 days', label: 'Full guarantee' },
      ],
      valueBullets: ['Maintainable code', '24–48h response', 'Code ownership'],
      defaultWaMessage: "Hi! I'm coming from the website. I'd like a quote.",
      callTitleUnavailable: 'Phone not available',
    },
    process: { briefCta: 'Schedule a 30-min brief', avgResponse: 'Average response: 2 business hours.' },
  },
};

/* ============================================================================
 * t() — acceso por path y reemplazos
 * ========================================================================== */
/**
 * @param {string} path
 * @param {Record<string,string|number>} [params]
 * @param {string} [locale]
 * @returns {any}
 */
export function t(path, params = {}, locale = getCurrentLocale()) {
  const loc = normalizeLocale(locale);
  const val =
    getByPath(DICTS[loc], path) ??
    getByPath(DICTS[DEFAULT_LOCALE], path) ??
    lastSegment(path);
  return interpolate(val, params);
}

/** Devuelve un traductor ligado a un locale concreto. */
export function bindT(locale) {
  const loc = normalizeLocale(locale);
  return (path, params = {}) => t(path, params, loc);
}

/* =========================
 * Utils internos
 * ========================= */
function getByPath(obj, path) {
  try {
    return String(path)
      .split('.')
      .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  } catch {
    return undefined;
  }
}
function lastSegment(path) {
  const segs = String(path).split('.');
  return segs[segs.length - 1] || path;
}
function interpolate(value, params) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
}

/* ============================================================================
 * ALIAS DE COMPATIBILIDAD (para no tocar componentes existentes)
 * ========================================================================== */

/** Alias para tu código existente: getLang() -> 'es' | 'en' */
export const getLang = () => getCurrentLocale();

/** Cambia idioma, persiste y actualiza <html lang>. */
export function setLang(locale) {
  const lang = normalizeLocale(locale);
  setStoredLocale(lang);
  if (typeof window !== 'undefined') applyHtmlLang(lang);
  return lang;
}

/**
 * pick(dict, lang) -> devuelve dict[lang] con fallback a default.
 * Útil si manejas tus propios diccionarios por sección.
 */
export function pick(dict, lang) {
  const l = normalizeLocale(lang);
  return (dict && dict[l]) || (dict && dict[DEFAULT_LOCALE]) || {};
}

/* ============================================================================
 * Ejemplos:
 *   import { getLang, pick, t } from '@/lib/i18n';
 *   const lang = getLang();
 *   const tx = bindT(lang);
 *   tx('hero.ctas.whatsapp'); // "Solicitar cotización" / "Request a quote"
 * ========================================================================== */

// --- END OF FILE ---
