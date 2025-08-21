// --- FILE: src/components/shared/Header.jsx ---
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import MobileMenu from '@/components/shared/MobileMenu';
import { Menu, Moon, Sun } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

/* ===================== WhatsApp CTA (robusta) ===================== */
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const DEFAULT_MSG = process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero una cotización.';
const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}` : '#contacto';

/* ===================== i18n mínimo (ES/EN) ===================== */
const DICT = {
  es: {
    brand: 'AJM Digital Solutions',
    cta: 'Cotizar',
    aria: {
      openMenu: 'Abrir menú de navegación',
      themeToDark: 'Cambiar a tema oscuro',
      themeToLight: 'Cambiar a tema claro',
      langSelector: 'Selector de idioma',
      whatsapp: 'Solicitar cotización por WhatsApp',
    },
    langs: { es: 'ES', en: 'EN' },
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
    brand: 'AJM Digital Solutions',
    cta: 'Get a quote',
    aria: {
      openMenu: 'Open navigation menu',
      themeToDark: 'Switch to dark theme',
      themeToLight: 'Switch to light theme',
      langSelector: 'Language selector',
      whatsapp: 'Request a quote via WhatsApp',
    },
    langs: { es: 'ES', en: 'EN' },
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
  } catch {}
};

/* ===================== Tema (dark / light) ===================== */
function useTheme() {
  const initial = () => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(initial);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return { theme, setTheme };
}

function ThemeToggle({ labelLight, labelDark }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      type="button"
      aria-label={isDark ? labelLight : labelDark}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={[
        'inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition',
        'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800',
        mounted ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function LangSwitcher({ lang, onChange, t }) {
  return (
    <div
      className="mx-2 px-1 py-1 rounded-full text-[11px] border text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 inline-flex items-center gap-1"
      role="group"
      aria-label={t.aria.langSelector}
    >
      {(['es', 'en']).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-pressed={lang === code}
          className={[
            'px-2 py-1 rounded-full transition',
            lang === code
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800',
          ].join(' ')}
        >
          {t.langs[code]}
        </button>
      ))}
    </div>
  );
}

/* =============================== Header =============================== */
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [lang, setLang] = useState('es');

  // Init idioma
  useEffect(() => {
    const l = getInitialLang();
    setLang(l);
    applyLang(l);
  }, []);

  const t = useMemo(() => DICT[lang] || DICT.es, [lang]);

  // Scroll + hash activo
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    const onHash = () => setActiveHash(window.location.hash || '');
    onScroll(); onHash();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHash, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('hashchange', onHash); };
  }, []);

  // Bloquear scroll al abrir menú
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => void (document.body.style.overflow = '');
  }, [isMenuOpen]);

  // Resaltar sección visible
  useEffect(() => {
    const ids = NAV_ITEMS.map(([, href]) =>
      href.startsWith('/#') ? href.slice(2) : href.startsWith('#') ? href.slice(1) : null
    ).filter(Boolean);
    if (!ids.length || typeof IntersectionObserver === 'undefined') return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveHash(`#${visible[0].target.id}`);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.3, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const isActive = (href) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      const normalized = href.startsWith('/#') ? href.slice(1) : href;
      return activeHash === normalized;
    }
    return pathname === href;
  };

  const translate = (label) => (t.navMap[label] || label);
  const nav = useMemo(() => NAV_ITEMS.slice(0, -1), []);

  const handleLang = (next) => {
    setLang(next);
    applyLang(next);
  };

  return (
    <>
      <header
        role="banner"
        className={[
          'sticky top-0 z-50 border-b transition-all',
          'backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:supports-[backdrop-filter]:bg-slate-950/70',
          'border-slate-200 dark:border-slate-800',
          isScrolled ? 'shadow-sm' : '',
        ].join(' ')}
      >
        <div className="container-tight flex items-center justify-between gap-3">
          {/* Marca */}
          <Link href="/" className="flex items-center gap-2 py-3 md:py-2">
            <span className="text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {t.brand}
            </span>
            <span className="sr-only">— Web & Apps</span>
          </Link>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {nav.map(([label, href]) => {
              const active = isActive(href);
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'px-3 py-2 rounded-xl transition',
                    active
                      ? 'text-brand bg-slate-100 dark:bg-slate-800/60'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white',
                  ].join(' ')}
                >
                  {translate(label)}
                </a>
              );
            })}

            {/* Idioma */}
            <LangSwitcher lang={lang} onChange={handleLang} t={t} />

            {/* Toggle tema */}
            <ThemeToggle labelLight={t.aria.themeToLight} labelDark={t.aria.themeToDark} />

            {/* CTA WhatsApp */}
            <a
              href={WA_HREF}
              target={RAW_PHONE ? '_blank' : undefined}
              rel={RAW_PHONE ? 'noopener noreferrer' : undefined}
              className="ml-1 px-4 py-2 rounded-xl bg-brand text-white hover:opacity-90 transition font-semibold"
              aria-label={t.aria.whatsapp}
              title={t.cta}
            >
              {t.cta}
            </a>
          </nav>

          {/* Botón menú móvil */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setMenuOpen(true)}
            aria-label={t.aria.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence mode="wait">
        {isMenuOpen && <MobileMenu id="mobile-menu" onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
