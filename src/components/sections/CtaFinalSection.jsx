'use client';

import { motion } from "framer-motion";
// --- CORRECCIÓN: Se quitan las llaves para una importación por defecto ---
import Section from "@/components/ui/Section";
import { useFadeUp } from "@/hooks/useFadeUp";
import { MessageCircle, ArrowRight, Phone } from "lucide-react";

function CtaFinalSection() {
    const fadeUp = useFadeUp();
    return (
        <Section id="cta-final" title="¿Listo para hacer crecer tu negocio online?" subtitle="Únete a los empresarios hondureños que ya confían en AJM Digital Solutions">
            <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white backdrop-blur rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-sky-600">72h</div>
                  <div className="text-slate-600">Entrega Express</div>
                </div>
                <div className="bg-white backdrop-blur rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-sky-600">L 3,900</div>
                  <div className="text-slate-600">Desde solo</div>
                </div>
                <div className="bg-white backdrop-blur rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-sky-600">7 días</div>
                  <div className="text-slate-600">Garantía total</div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/50496321907?text=🚀%20Hola%20Augusto%2C%20quiero%20empezar%20mi%20proyecto%20web%20HOY.%20¿Cuál%20es%20el%20siguiente%20paso%3F" target="_blank" rel="nofollow noopener noreferrer" className="px-8 py-4 bg-sky-600 text-white rounded-2xl font-extrabold hover:bg-sky-500 transition shadow-xl inline-flex items-center gap-3">
                  <MessageCircle size={20} aria-hidden="true" />
                  🚀 EMPEZAR MI PROYECTO HOY
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
                <a href="tel:+50496321907" className="px-6 py-4 border-2 border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition inline-flex items-center gap-2">
                  <Phone size={18} aria-hidden="true" />
                  Llamar Ahora
                </a>
              </div>
            </motion.div>
        </Section>
    );
}

export default CtaFinalSection;