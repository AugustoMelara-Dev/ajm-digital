

// --- FILE: src/components/sections/PlansSection.jsx ---
import { motion } from "framer-motion"; // Ya importado
import { Section } from "@/components/ui/Section"; // En un proyecto real
import { PriceCard } from "@/components/cards/PriceCard"; // En un proyecto real
import { PLANS } from "@/lib/constants"; // En un proyecto real
import { useFadeUp } from "@/hooks/useFadeUp"; // En un proyecto real
import { ShieldCheckIcon } from "lucide-react"; // Ya importado

function PlansSection() {
    const fadeUp = useFadeUp();
    return (
        <Section id="planes" title="Planes de Páginas Web con Precios Claros" subtitle="Promociones de lanzamiento - Ahorra hasta L 3,000 en tu proyecto web." className="bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PLANS.map((plan) => ( <PriceCard key={plan.title} {...plan} /> ))}
            </div>
            <motion.div {...fadeUp} className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <ShieldCheckIcon className="text-sky-600" size={20} />
                <span className="font-semibold text-slate-900">
                  Todos los planes incluyen: Hosting + SSL + Dominio por 1 año + Garantía 7 días
                </span>
              </div>
            </motion.div>
        </Section>
    );
}
// --- END OF FILE: src/components/sections/PlansSection.jsx ---