'use client';

import { motion } from "framer-motion";
import ServiceCard from "@/components/cards/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Sparkles, ArrowRight } from "lucide-react";

function ServicesSection() {
    const fadeUp = useFadeUp();

    return (
        <section className="relative py-32 bg-slate-50">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-[92%] max-w-7xl mx-auto">
                <motion.div {...fadeUp} className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-full font-bold text-sm mb-6">
                        <Sparkles size={16} />
                        Servicios que Transforman Negocios
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                        No Solo Diseñamos,
                        <br />
                        <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                            Creamos Experiencias
                        </span>
                    </h2>
                    
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
                                href="#contacto"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-2xl font-black text-lg hover:bg-sky-50 transition-all transform hover:-translate-y-1 shadow-xl"
                            >
                                💡 Solicitar Proyecto Personalizado
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ServicesSection;