'use client';

import { motion } from "framer-motion";
// --- CORRECCIÓN: Se cambia a import por defecto ---
import Section from "@/components/ui/Section";
// --- CORRECCIÓN: Se importa FaqItem por defecto y FaqJsonLd como nombrado ---
import FaqItem, { FaqJsonLd } from "@/components/ui/FaqItem";
import { FAQS } from "@/lib/constants";
import { useFadeUp } from "@/hooks/useFadeUp";
import { ArrowRight } from "lucide-react";

function FaqSection() {
    const fadeUp = useFadeUp();
    return (
        <Section id="faq" title="Preguntas Frecuentes" subtitle="Resolvemos las dudas más comunes sobre nuestros servicios de diseño web.">
            <FaqJsonLd faqs={FAQS} />
            <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">
              {FAQS.map((faq) => ( <FaqItem key={faq.q} {...faq} /> ))}
            </div>
            <motion.div {...fadeUp} className="text-center mt-8">
              <a href="#contacto" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-sky-600 hover:bg-sky-500 text-white transition">
                ¿Más preguntas? Contáctanos <ArrowRight size={18} />
              </a>
            </motion.div>
        </Section>
    );
}

export default FaqSection;