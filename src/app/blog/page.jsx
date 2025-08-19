// src/app/blog/page.jsx
// Este es un Server Component, NO debe tener 'use client' ni importar hooks de cliente directamente aquí.
import { getAllPostsMeta } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import Section from '@/components/ui/Section';
import BlogHeroSection from '@/components/blog/BlogHeroSection'; // Importa el NUEVO componente cliente

// Metadatos para SEO de la página principal del blog (Server Component)
export const metadata = {
  title: 'Blog | AJM Digital Solutions',
  description:
    'Guías prácticas sobre páginas web, tiendas en línea, SEO y casos reales en Honduras.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog | AJM Digital Solutions',
    description:
      'Consejos y estrategias para que tu web venda más en Honduras.',
  },
};

// Componente de la página principal del blog (Server Component)
export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <>
      {/* Renderiza el componente cliente de la sección de bienvenida */}
      <BlogHeroSection />

      {/* Sección con la lista de artículos */}
      <Section id="articulos" title="Últimos Artículos" subtitle="Explora nuestras guías y consejos para el éxito digital de tu negocio.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.length === 0 ? (
            <div className="text-slate-600 text-center col-span-full">Pronto publicaremos nuestro primer artículo. ¡Vuelve pronto!</div>
          ) : (
            posts.map((p) => <PostCard key={p.slug} post={p} />)
          )}
        </div>
      </Section>
    </>
  );
}
