// --- FILE: src/app/page.jsx ---
// Client page para enganchar el smooth scroll y cargar secciones pesadas en diferido.
'use client';

import dynamic from 'next/dynamic';
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll';

import WhatsAppFab from '@/components/shared/WhatsAppFab';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';

// Carga diferida: reduce JS inicial y mejora LCP
const PlansSection = dynamic(() => import('@/components/sections/PlansSection'), {
  loading: () => <SectionSkeleton />,
});
const FaqSection = dynamic(() => import('@/components/sections/FaqSection'), {
  loading: () => <SectionSkeleton />,
});
const AboutMeSection = dynamic(() => import('@/components/sections/AboutMeSection'), {
  loading: () => <SectionSkeleton />,
});
const CtaFinalSection = dynamic(() => import('@/components/sections/CtaFinalSection'), {
  loading: () => <SectionSkeleton noHeading />,
});
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton({ noHeading = false }) {
  return (
    <section className="py-16">
      <div className="w-[92%] max-w-[1200px] mx-auto animate-pulse">
        {!noHeading && <div className="h-7 w-64 bg-slate-200 rounded mb-3" />}
        {!noHeading && <div className="h-4 w-3/4 bg-slate-200 rounded mb-8" />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-slate-100 rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  // Usa el offset global de CSS (scroll-pt-24 en <html>)
  useSmoothAnchorScroll();

  return (
    <>
      <WhatsAppFab />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <PlansSection />
      <FaqSection />
      <AboutMeSection />
      <CtaFinalSection />
      <ContactSection />
    </>
  );
}
