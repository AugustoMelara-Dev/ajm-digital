
// --- FILE: src/components/sections/ServicesSection.jsx ---
import { Section } from "@/components/ui/Section"; // En un proyecto real
import { ServiceCard } from "@/components/cards/ServiceCard"; // En un proyecto real
import { SERVICES } from "@/lib/constants"; // En un proyecto real

function ServicesSection() {
    return (
        <Section id="servicios" title="Servicios de Páginas Web en Honduras" subtitle="Soluciones web completas para hacer crecer tu negocio online. Desde landing pages hasta e-commerce.">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => ( <ServiceCard key={s.title} {...s} /> ))}
            </div>
        </Section>
    );
}
// --- END OF FILE: src/components/sections/ServicesSection.jsx ---