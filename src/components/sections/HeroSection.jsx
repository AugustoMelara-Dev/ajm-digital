'use client';

// --- FILE: src/components/sections/HeroSection.jsx ---
import { motion } from "framer-motion";
// --- CORRECCIÓN: Se importan los componentes SIN llaves ---
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { useFadeUp } from "@/hooks/useFadeUp";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

function HeroSection() {
    const fadeUp = useFadeUp();
    return (
        <Section id="inicio" className="pt-10 pb-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge tone="emerald">Empresa Hondureña</Badge>
                <Badge tone="amber">Precios de lanzamiento</Badge>
                <Badge tone="rose">Garantía 7 Días</Badge>
              </div>

              <motion.h1 {...fadeUp}
                className="text-balance mx-auto max-w-[22ch] text-[clamp(2rem,4.8vw,3.2rem)] font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  Páginas Web Profesionales
                </span>
                <br />
                <span className="text-[0.72em] bg-amber-100 px-2 py-1 rounded-lg font-black">
                  Que Convierten Visitas en Clientes
                </span>
              </motion.h1>

              <motion.p {...fadeUp}
                className="mx-auto mt-3 max-w-[52ch] text-[clamp(.95rem,1.4vw,1.1rem)] text-slate-700 leading-relaxed">
                Creamos tu Landing Page en <strong>72 horas</strong> o tu sitio corporativo completo.
                <span className="text-sky-700 font-semibold">
                  {' '}Garantizamos velocidad, SEO técnico y un diseño que vende.{' '}
                </span>
                Solicita una cotización sin compromiso.
              </motion.p>

              <motion.div {...fadeUp} className="mt-8">
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    aria-label="Solicitar cotización por WhatsApp a AJM Digital Solutions"
                    className="px-6 py-3 rounded-2xl font-extrabold bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-[.98]"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/50496321907?text=🚀%20Hola%20Augusto%2C%20vi%20tu%20sitio%20web%20y%20me%20interesa%20una%20cotización%20para%20mi%20página%20web.%20¿Podrías%20enviarme%20información%3F"
                  >
                    <MessageCircle size={20} aria-hidden="true" />
                    Cotización GRATIS por WhatsApp
                    <span className="hidden sm:inline"><ArrowRight size={18} aria-hidden="true" /></span>
                  </a>
                </div>
                <ul className="mt-4 flex flex-wrap justify-center items-center gap-2">
                  {["Respuesta en 2 horas","Sin compromiso","Agencia local"].map((t) => (
                  <li
                    key={t}
                    className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs md:text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <CheckCircle2 className="text-emerald-600" size={14} aria-hidden="true" />
                    {t}
                  </li>
                  ))}
                </ul>
              </motion.div>
            </div>
        </Section>
    );
}

export default HeroSection;