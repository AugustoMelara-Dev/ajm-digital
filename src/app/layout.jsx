// --- FILE: src/app/layout.jsx ---
// Este archivo define la estructura HTML base de tu aplicación.
// Incluye SEO, fuentes, header, footer y el ErrorBoundary.

// --- CORRECCIÓN: Se añaden los imports que faltaban ---
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css'; // Importante para los estilos
import Script from 'next/script'; // Importa el componente Script

/**
 * Metadata para SEO. Next.js lo usará para generar las etiquetas <head>.
 */
export const metadata = {
  title: "Páginas Web en Honduras | AJM Digital Solutions (72h)",
  description: "Diseño web profesional en Honduras: landing en 72h, sitios corporativos, e-commerce y SEO. Hosting+SSL 1 año y garantía de 7 días.",
  canonical: "https://ajmdigitalsolutions.com",
  openGraph: {
    type: "website",
    title: "Páginas Web en Honduras | AJM Digital Solutions",
    description: "Landing en 72h, sitios corporativos, e-commerce y SEO. Precios claros y garantía.",
    url: "https://ajmdigitalsolutions.com",
    images: [{ url: "https://ajmdigitalsolutions.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * El Layout principal de la aplicación.
 * @param {object} props
 * @param {React.ReactNode} props.children - El contenido de la página actual (page.jsx).
 */
export default function RootLayout({ children }) {
  // NOTA: En un proyecto real, aquí importarías tus fuentes con next/font
  // y no necesitarías `useSmoothAnchorScroll` aquí si lo llamas en la página.
  return (
    <html lang="es-HN" className="scroll-pt-24">
      <body>
        <ErrorBoundary>
          <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded">
            Saltar al contenido
          </a>
          <div className="min-h-screen bg-white text-slate-900">
            <Header />
            <main id="contenido">
              {children}
            </main>
            <Footer />
          </div>
        </ErrorBoundary>

        {/* --- CORRECCIÓN SEO: Se añade el Schema de LocalBusiness --- */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "AJM Digital Solutions",
              "image": "https://www.ajmdigital.com/opengraph-image.png",
              "url": "https://www.ajmdigital.com",
              "telephone": "+50495393226",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Barrio La Lempira, 31101",
                "addressLocality": "Tocoa",
                "addressRegion": "Colón",
                "addressCountry": "HN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "15.6881267",
                "longitude": "-86.0020359"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              }
            }
          `}
        </Script>

      </body>
    </html>
  );
}
// --- END OF FILE: src/app/layout.jsx ---