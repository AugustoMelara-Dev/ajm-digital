// --- FILE: src/app/blog/page.jsx ---
// Server Component (sin 'use client'): índice del blog con SEO pulido y grid de posts.

import { getAllPostsMeta } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import Section from '@/components/ui/Section';
import BlogHeroSection from '@/components/blog/BlogHeroSection';

// Revalidación ISR: refresca la lista de posts cada hora
export const revalidate = 3600;

export function generateMetadata() {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajmdigitalsolutions.com';
  let base = envBase;
  try {
    base = new URL(envBase).origin;
  } catch {
    base = 'https://ajmdigitalsolutions.com';
  }
  const canonical = `${base}/blog`;

  return {
    title: 'Blog | AJM Digital Solutions',
    description:
      'Guías prácticas sobre sitios web, e-commerce, SEO técnico y casos reales. Contenido directo, profesional y accionable.',
    alternates: {
      canonical,
      types: { 'application/rss+xml': `${base}/blog/feed.xml` },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Blog | AJM Digital Solutions',
      description:
        'Consejos y estrategias para que tu presencia digital rinda al máximo.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | AJM Digital Solutions',
      description:
        'Estrategia, tecnología y diseño con estándares de clase mundial.',
    },
  };
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta(); // por defecto omite drafts

  return (
    <>
      {/* Héroe del blog (Client Component controlado internamente) */}
      <BlogHeroSection />

      {/* Listado de artículos */}
      <Section
        id="articulos"
        title="Últimos artículos"
        subtitle="Guías y aprendizajes para construir productos y sitios que convierten."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.length === 0 ? (
            <div className="text-slate-600 text-center col-span-full">
              Pronto publicaremos nuestro primer artículo. Vuelve en breve.
            </div>
          ) : (
            posts.map((p) => <PostCard key={p.slug} post={p} />)
          )}
        </div>
      </Section>
    </>
  );
}
