// --- FILE: src/components/sections/ProjectsSection.jsx ---
'use client';

import { useMemo, useState, useDeferredValue } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, XCircle } from 'lucide-react';
import Section from '@/components/ui/Section';
import ProjectCard from '@/components/cards/ProjectCard';
import { PROJECTS } from '@/lib/constants';

// Teléfono saneado (E.164 sin "+") para evitar enlaces rotos
const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const WA_DEFAULT =
  process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hola, vengo desde el sitio. Quiero ver más proyectos.';
const WA_HREF = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(WA_DEFAULT)}` : '#contacto';

// JSON-LD para SEO (lista de proyectos)
function ProjectsJsonLd({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.slice(0, 12).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: p.href || (typeof p.link === 'string' ? p.link : undefined) || 'https://ajmdigitalsolutions.com/#proyectos',
      name: p.title,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function ProjectsSection() {
  const hasProjects = Array.isArray(PROJECTS) && PROJECTS.length > 0;

  // Estado filtros
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('Todos');
  const deferredQuery = useDeferredValue(query);

  // Tags únicos (robusto ante PROJECTS vacío)
  const tags = useMemo(() => {
    if (!hasProjects) return ['Todos'];
    const t = new Set(['Todos']);
    for (const p of PROJECTS) (p?.tags || []).forEach((tag) => t.add(tag));
    return Array.from(t);
  }, [hasProjects]);

  // Filtrado por texto + tag (con query diferida para UX suave)
  const filtered = useMemo(() => {
    if (!hasProjects) return [];
    const q = deferredQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const title = (p.title || '').toLowerCase();
      const desc = (p.desc || '').toLowerCase();
      const pTags = (p.tags || []).map((t) => t.toLowerCase());
      const byTag = activeTag === 'Todos' || pTags.includes(activeTag.toLowerCase());
      const byText = !q || title.includes(q) || desc.includes(q) || pTags.some((t) => t.includes(q));
      return byTag && byText;
    });
  }, [hasProjects, deferredQuery, activeTag]);

  const gridId = 'projects-grid';

  // Animación discreta
  const fade = {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -80px 0px' },
    transition: { duration: 0.25 },
  };

  return (
    <Section
      id="proyectos"
      title="Proyectos recientes"
      subtitle="Casos de estudio: problema → solución → impacto."
      className="bg-white dark:bg-slate-950"
    >
      {/* JSON-LD SEO */}
      <ProjectsJsonLd items={filtered} />

      {/* Barra de filtros */}
      <motion.div
        {...fade}
        className="max-w-5xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        {/* Buscador */}
        <div className="relative w-full md:max-w-sm">
          <label htmlFor="projects-search" className="sr-only">
            Buscar proyectos
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
          <input
            id="projects-search"
            type="search"
            placeholder="Buscar por sector, función, palabra clave…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-brand/30
                       dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800"
            aria-controls={gridId}
            data-analytics-id="projects_search_input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              aria-label="Limpiar búsqueda"
            >
              <XCircle size={18} />
            </button>
          )}
        </div>

        {/* Filtros por tag (radiogrupo accesible) */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="radiogroup"
          aria-label="Filtrar por etiqueta"
        >
          <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Filter size={14} aria-hidden="true" /> Filtrar:
          </span>
          {tags.map((tag) => {
            const selected = activeTag === tag;
            return (
              <button
                key={tag}
                role="radio"
                aria-checked={selected}
                onClick={() => setActiveTag(tag)}
                className={[
                  'px-3 py-1.5 rounded-full text-sm border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
                  selected
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                    : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800',
                ].join(' ')}
                data-analytics-id="projects_tag_filter"
              >
                {tag}
              </button>
            );
          })}

          {(activeTag !== 'Todos' || query) && (
            <button
              type="button"
              onClick={() => {
                setActiveTag('Todos');
                setQuery('');
              }}
              className="ml-1 px-3 py-1.5 rounded-full text-sm border border-slate-200 text-slate-700 hover:bg-slate-50
                         dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Limpiar filtros"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </motion.div>

      {/* Contador accesible */}
      <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        {activeTag !== 'Todos' && (
          <>
            {' '}• Etiqueta: <span className="font-semibold">{activeTag}</span>
          </>
        )}
        {query && <> • Búsqueda: “{query}”</>}
      </div>

      {/* Grid de proyectos / estados vacíos */}
      {hasProjects ? (
        filtered.length > 0 ? (
          <motion.div
            {...fade}
            id={gridId}
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </motion.div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-600 dark:text-slate-300">
            No encontramos proyectos que coincidan.{' '}
            <a className="underline font-medium" href={WA_HREF}>
              Pide el portafolio completo
            </a>
            .
          </div>
        )
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-600 dark:text-slate-300">
          Aún no hay proyectos publicados.{' '}
          <a className="underline font-medium" href={WA_HREF}>
            Escríbenos
          </a>{' '}
          y te compartimos casos.
        </div>
      )}

      {/* CTA suave */}
      <div className="text-center mt-8">
        <a
          href={WA_HREF}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border border-slate-200 text-slate-900 hover:bg-slate-50 transition
                     dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          title="Solicitar portafolio completo"
          data-analytics-id="projects_portfolio_cta"
        >
          Solicitar portafolio completo <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  );
}
