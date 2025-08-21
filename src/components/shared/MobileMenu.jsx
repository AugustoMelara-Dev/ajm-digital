// --- FILE: src/components/shared/MobileMenu.jsx ---
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';
import { X, Moon, Sun } from 'lucide-react';

/** Normaliza a dígitos (E.164 sin "+") para evitar enlaces rotos */
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero una cotización.';
const waHref = RAW_PHONE
  ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}`
  : '#contacto';

/* ===================== i18n mínimo inline (ES/EN) ===================== */
const DICT = {
  es: {
    title: 'Menú',
    close: 'Cerrar menú',
    langGroup: 'Selector de idioma',
    themeGroup: 'Selector de tema',
    cta: 'Solicitar cotización',
    lang: { es: 'ES', en: 'EN' },
    theme: { light: 'Claro', dark: 'Oscuro' },
    navMap: {
      'Inicio': 'Inicio',
      'Servicios': 'Servicios',
      'Proceso': 'Proceso',
      'Proyectos': 'Proyectos',
      'Precios': 'Precios',
      'FAQ': 'FAQ',
      'Contacto': 'Contacto',
      'Nosotros': 'Nosotros',
      'Blog': 'Blog',
      'Sobre mí': 'Sobre mí',
    },
  },
  en: {
    title: 'Menu',
    close: 'Close menu',
    langGroup: 'Language selector',
    themeGroup: 'Theme selector',
    cta: 'Request a quote',
    lang: { es: 'ES', en: 'EN' },
    theme: { light: 'Light', dark: 'Dark' },
    navMap: {
      'Inicio': 'Home',
      'Servicios': 'Services',
      'Proceso': 'Process',
      'Proyectos': 'Projects',
      'Precios': 'Pricing',
      'FAQ': 'FAQ',
      'Contacto': 'Contact',
      'Nosotros': 'About',
      'Blog': 'Blog',
      'Sobre mí': 'About me',
    },
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
  } catch {
    return 'es';
  }
};
const applyLang = (lang) => {
  try {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('ajm_lang', lang);
    // Señal opcional para que otros componentes reaccionen si escuchan este evento
    window.dispatchEvent(new CustomEvent('ajm:lang-changed', { detail: { lang } }));
  } catch {}
};

/* ===================== Tema (dark / light) inline ===================== */
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
};

function MobileMenu({ onClose, id = 'mobile-menu' }) {
  const shouldReduce = useReducedMotion();
  const panelRef = useRef(null);
  const lastActiveRef = useRef(null);

  const [lang, setLang] = useState('es');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const l = getInitialLang();
    const th = getInitialTheme();
    setLang(l);
    setTheme(th);
    applyLang(l);
    applyTheme(th);
  }, []);

  const t = DICT[lang] || DICT.es;
  const isDark = theme === 'dark';
  const translate = (label) => t.navMap[label] || label;

  // Focus trap accesible + restaurar foco al cerrar
  useEffect(() => {
    lastActiveRef.current = document.activeElement;

    const panel = panelRef.current;
    if (!panel) return;

    const selectors =
      'a[href], button:not([disabled]), [tabindex="0"], select, input, textarea';
    const all = panel.querySelectorAll(selectors);
    const first = all[0];
    const last = all[all.length - 1];

    // Foco inicial
    if (first) first.focus();
    else panel.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key !== 'Tab' || all.length === 0) return;

      // Cicla foco
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);
    return () => {
      panel.removeEventListener('keydown', onKeyDown);
      // Restaurar foco al trigger que abrió el menú
      if (lastActiveRef.current && lastActiveRef.current.focus) {
        lastActiveRef.current.focus();
      }
    };
  }, [onClose]);

  // Animaciones
  const containerAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: shouldReduce ? 0 : 0.2 },
  };
  const panelAnim = {
    initial: { x: shouldReduce ? 0 : '100%' },
    animate: { x: 0 },
    exit: { x: shouldReduce ? 0 : '100%' },
    transition: shouldReduce
      ? { duration: 0 }
      : { type: 'spring', stiffness: 380, damping: 36, duration: 0.28 },
  };

  const handleLang = (code) => {
    setLang(code);
    applyLang(code);
  };
  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      {...containerAnim}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/55 dark:bg-black/65"
        aria-label={t.close}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        {...panelAnim}
        className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-slate-900 shadow-2xl flex flex-col outline-none border-l border-slate-200 dark:border-slate-800"
        id={id}
        tabIndex={-1}
      >
        {/* Header del panel */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 id={`${id}-title`} className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label={t.close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Controles: idioma + tema */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">
          {/* Idioma */}
          <div role="group" aria-label={t.langGroup}>
            {(['es', 'en']).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleLang(code)}
                aria-pressed={lang === code}
                className={[
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition border',
                  lang === code
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                    : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800',
                ].join(' ')}
              >
                {t.lang[code]}
              </button>
            ))}
          </div>

          {/* Tema */}
          <div role="group" aria-label={t.themeGroup}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {isDark ? t.theme.light : t.theme.dark}
            </button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Menú móvil">
          <ul className="space-y-1 px-4">
            {NAV_ITEMS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg font-medium transition
                             text-slate-700 hover:bg-slate-50 hover:text-slate-900
                             dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                  data-analytics={`mobilemenu_link:${label}`}
                >
                  {translate(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <a
            href={waHref}
            target={RAW_PHONE ? '_blank' : undefined}
            rel={RAW_PHONE ? 'noopener noreferrer' : undefined}
            onClick={onClose}
            className={[
              'block w-full text-center px-4 py-3 rounded-xl font-semibold transition',
              RAW_PHONE
                ? 'bg-brand text-white hover:opacity-90'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none',
            ].join(' ')}
            aria-disabled={!RAW_PHONE}
            title={RAW_PHONE ? t.cta : 'Configura NEXT_PUBLIC_WA_NUMBER'}
            data-analytics="mobilemenu_cta_whatsapp"
          >
            {t.cta}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MobileMenu;
