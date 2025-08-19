// app/sitemap.js
import { getAllPostsMeta } from '@/lib/blog'; // Importa la función para obtener metadatos de los posts

export default function sitemap() {
  // Asegúrate de que NEXT_PUBLIC_SITE_URL esté configurado en tus variables de entorno
  // para que el sitemap genere URLs absolutas correctas en producción.
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ajmdigitalsolutions.com').replace(/\/$/, '');

  // Obtiene los metadatos de todos los posts del blog
  const posts = getAllPostsMeta().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date, // Usa la fecha del post como lastModified
    changeFrequency: 'weekly', // Los blogs suelen actualizarse semanalmente o mensualmente
    priority: 0.7, // Prioridad ligeramente menor que la página principal
  }));

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${base}/og-image.jpg`], // Asegúrate de que esta imagen exista en /public
    },
    {
      url: `${base}/blog`, // Añade la URL principal del blog
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Una prioridad alta para la página índice del blog
    },
    // Aquí puedes añadir más páginas estáticas si las tienes (ej. /servicios, /contacto)
    // { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Añade todas las URLs de los posts del blog
    ...posts,
  ];
}