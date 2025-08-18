'use client';

// --- FILE: src/components/sections/ProcessSection.jsx ---
import { Section } from "@/components/ui/Section";
import { Step } from "@/components/ui/Step";

function ProcessSection() {
    return (
        <Section id="proceso" title="Proceso Simple en 4 Pasos" subtitle="Así trabajamos para entregarte tu página web profesional.">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Step n="1" title="Consulta Gratis" desc="Hablamos de tu proyecto y objetivos por WhatsApp o llamada." />
              <Step n="2" title="Propuesta Clara" desc="Te enviamos cotización detallada con cronograma y precio fijo." />
              <Step n="3" title="Desarrollo" desc="Creamos tu sitio con comunicación constante y actualizaciones." />
              <Step n="4" title="Lanzamiento" desc="Entregamos tu web lista, con capacitación y soporte incluido." />
            </div>
        </Section>
    );
}

// --- CORRECCIÓN: Se añade esta línea ---
export default ProcessSection;