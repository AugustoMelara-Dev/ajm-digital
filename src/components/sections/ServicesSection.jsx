'use client';

import { motion } from "framer-motion";
import ServiceCard from "@/components/cards/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Sparkles, ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section"; // Asegúrate de que Section esté importado

function ServicesSection() {
    const fadeUp = useFadeUp();

    return (
        // El título y subtítulo de la sección ahora se manejan directamente aquí en el componente Section.
        // Esto elimina la redundancia y centraliza la información principal de la sección.
        <Section
            id="servicios"
            title="Servicios que Transforman Negocios" // Título principal de la sección
            subtitle="No Solo Diseñamos, Creamos Experiencias" // Subtítulo principal de la sección
        >
            <div className="relative z-10 w-[92%] max-w-7xl mx-auto">
                <motion.div {...fadeUp} className="text-center mb-20">
                    {/* Se elimina el div con el badge "Servicios que Transforman Negocios" para evitar redundancia */}
                    {/* Se elimina el h2 "No Solo Diseñamos, Creamos Experiencias" ya que es el subtítulo de la sección */}
                    
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Cada línea de código, cada pixel, cada palabra está estratégicamente 
                        diseñada para <strong>convertir visitantes en clientes</strong> y 
                        clientes en <strong>embajadores de tu marca</strong>.
                    </p>
                </motion.div>

                {/* Grid de servicios mejorado */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.6, 
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                        >
                            <ServiceCard {...service} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA de servicios */}
                <motion.div {...fadeUp} className="text-center">
                    <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                ¿No encuentras lo que necesitas?
                            </h3>
                            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
                                Cada negocio es único. Cuéntanos tu visión y crearemos 
                                una solución completamente personalizada para ti.
                            </p>
                            <a
                                href="/#contacto"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-2xl font-black text-lg hover:bg-sky-50 transition-all transform hover:-translate-y-1 shadow-xl"
                            >
                                💡 Solicitar Proyecto Personalizado
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

export default ServicesSection;