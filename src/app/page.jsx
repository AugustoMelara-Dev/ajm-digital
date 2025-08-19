'use client';
// app/page.jsx
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll';

import WhatsAppFab from '@/components/shared/WhatsAppFab';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
// import ProjectsSection from '@/components/sections/ProjectsSection'; // Eliminado permanentemente
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PlansSection from '@/components/sections/PlansSection';
import FaqSection from '@/components/sections/FaqSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import CtaFinalSection from '@/components/sections/CtaFinalSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Page() {
  useSmoothAnchorScroll(); // Asegúrate de que este hook se siga llamando aquí

  return (
    <>
      <WhatsAppFab />
      <HeroSection />
      <ServicesSection />
      {/* <ProjectsSection /> */} {/* Eliminado permanentemente */}
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