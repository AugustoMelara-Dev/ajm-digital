

// --- FILE: src/components/sections/WhyUsSection.jsx ---
import { Section } from "@/components/ui/Section"; // En un proyecto real
import { ReasonCard } from "@/components/cards/ReasonCard"; // En un proyecto real
import { REASONS } from "@/lib/constants"; // En un proyecto real

function WhyUsSection() {
    return (
        <Section id="por-que" title="¿Por qué elegir AJM Digital Solutions?" subtitle="Somos una empresa hondureña que entiende tu mercado y habla tu idioma." className="bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REASONS.map((reason) => ( <ReasonCard key={reason.title} {...reason} /> ))}
            </div>
        </Section>
    );
}
// --- END OF FILE: src/components/sections/WhyUsSection.jsx ---