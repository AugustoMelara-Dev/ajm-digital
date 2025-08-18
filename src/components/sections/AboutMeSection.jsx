'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/ui/Section"; // Corregido
import { useFadeUp } from "@/hooks/useFadeUp";
import { LayersIcon, Award } from "lucide-react";

function AboutMeSection() {
  const fadeUp = useFadeUp();
  return (
    <Section
      id="sobre"
      title="No solo creo webs, construyo tu mejor vendedor"
      subtitle="Augusto José Melara Milla • Fundador y Desarrollador Principal"
    >
      <motion.div {...fadeUp} className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2">
            <div className="aspect-square rounded-3xl bg-slate-100 relative overflow-hidden shadow-lg">
                <Image
                    src="https://placehold.co/600x600/a3a3a3/ffffff?text=Augusto"
                    alt="Foto de Augusto José Melara Milla, desarrollador web en Honduras"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                />
            </div>
        </div>
        <div className="lg:col-span-3">
          <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>Hola, soy Augusto Melara.</strong> Mi misión es simple: transformar tu presencia online en un activo que trabaje para ti 24/7.
              </p>
              <p>
                Aquí no se trata solo de tener una página "bonita". Se trata de construir un sistema que <strong>atraiga prospectos, genere confianza y convierta visitas en clientes leales</strong>. Cada línea de código y cada palabra está pensada para una sola cosa: <strong>generar resultados medibles para tu negocio en Honduras</strong>.
              </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <LayersIcon className="text-sky-600" size={18} aria-hidden="true" /> Mi Filosofía
              </h4>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• Comunicación clara y directa</li>
                <li>• Entregas 100% puntuales</li>
                <li>• Precios fijos y transparentes</li>
                <li>• Soporte real por WhatsApp</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Award className="text-emerald-600" size={18} aria-hidden="true" /> Tus Garantías
              </h4>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• 7 días de satisfacción total</li>
                <li>• 30 días de soporte post-entrega</li>
                <li>• Eres dueño del 100% del código</li>
                <li>• Capacitación para que gestiones tu web</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

export default AboutMeSection;