// app/robots.js
export default function robots() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ajm-digital.vercel.app').replace(/\/$/, '');
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';

  return {
    rules: isPreview ? [{ userAgent: '*', disallow: '/' }] : [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
