// app/sitemap.js
export default function sitemap() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ajm-digital.vercel.app').replace(/\/$/, '');

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${base}/og-image.jpg`],
    },
    // Ejemplo para nuevas páginas reales:
    // { url: `${base}/planes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
