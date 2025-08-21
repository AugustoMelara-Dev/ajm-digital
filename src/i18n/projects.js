// --- FILE: src/i18n/projects.js ---
export const PROJECTS_I18N = {
  es: {
    title: 'Proyectos recientes',
    subtitle: 'Casos de estudio reales: problema → solución → impacto.',
    searchPlaceholder: 'Buscar por sector, función, palabra clave…',
    filterLabel: 'Filtrar:',
    counter: ({ n, tag, q }) =>
      `${n} resultado${n !== 1 ? 's' : ''}${tag ? ` • Etiqueta: ${tag}` : ''}${q ? ` • Búsqueda: “${q}”` : ''}`,
    emptyFiltered: 'No encontramos proyectos que coincidan.',
    emptyAll: 'Aún no hay proyectos publicados.',
    askPortfolio: 'Pide el portafolio completo',
    writeUs: 'Escríbenos',
    cta: 'Solicitar portafolio completo',
  },
  en: {
    title: 'Recent projects',
    subtitle: 'Real case studies: problem → solution → impact.',
    searchPlaceholder: 'Search by industry, feature, keyword…',
    filterLabel: 'Filter:',
    counter: ({ n, tag, q }) =>
      `${n} result${n !== 1 ? 's' : ''}${tag ? ` • Tag: ${tag}` : ''}${q ? ` • Search: “${q}”` : ''}`,
    emptyFiltered: 'We couldn’t find matching projects.',
    emptyAll: 'No projects published yet.',
    askPortfolio: 'Request the full portfolio',
    writeUs: 'Write to us',
    cta: 'Request full portfolio',
  },
};
