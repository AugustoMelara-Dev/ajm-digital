'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Globe, Building2, ShoppingCart, Rocket, Cpu, Wrench, ArrowRight, Zap, Crown, Target } from "lucide-react";

const INSANE_SERVICES = [
    {
        icon: Globe,
        title: "LANDING PAGES",
        subtitle: "QUE HIPNOTIZAN",
        desc: "No creamos páginas. Creamos MÁQUINAS PSICOLÓGICAS que convierten el 80% de tus visitantes en clientes obsesionados.",
        features: ["72H Garantizadas", "Psicología aplicada", "Conversión 300% superior", "Copy que vende solo"],
        price: "Desde L 3,900",
        gradient: "from-pink-500 via-red-500 to-yellow-500",
        popular: true,
        results: "+890% conversiones promedio"
    },
    {
        icon: Building2,
        title: "WEBS CORPORATIVAS",
        subtitle: "DOMINANCIA TOTAL",
        desc: "Tu competencia va a llorar. Creamos sitios que posicionan tu marca como el ÚNICO líder indiscutible de tu sector.",
        features: ["SEO que destroza", "Design que intimida", "Autoridad absoluta", "Competencia aniquilada"],
        price: "Desde L 7,900",
        gradient: "from-blue-500 via-purple-500 to-pink-500",
        results: "Primera posición en Google garantizada"
    },
    {
        icon: ShoppingCart,
        title: "E-COMMERCE",
        subtitle: "IMPERIOS DE VENTAS",
        desc: "No vendemos productos online. Construimos MÁQUINAS DE DINERO que facturan L 100K+ mensual automáticamente.",
        features: ["Psicología de compra", "Upsells automáticos", "Remarketing brutal", "ROI infinito"],
        price: "Desde L 13,900",
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        results: "L 847,000 facturados para clientes"
    },
    {
        icon: Rocket,
        title: "SEO DOMINANTE",
        subtitle: "ANIQUILAR COMPETENCIA",
        desc: "No hacemos SEO. Declaramos GUERRA DIGITAL y posicionamos tu web como el DICTADOR de Google.",
        features: ["Keywords devastadoras", "Backlinks nucleares", "Contenido viral", "Dominancia total"],
        price: "Desde L 5,900/mes",
        gradient: "from-orange-500 via-red-500 to-pink-500",
        results: "+2,847% tráfico orgánico"
    },
    {
        icon: Cpu,
        title: "APPS WEB",
        subtitle: "TECNOLOGÍA ALIEN",
        desc: "Sistemas tan avanzados que tu competencia pensará que viniste del futuro. Automatización BRUTAL.",
        features: ["IA integrada", "Automatización total", "Dashboards insanos", "Eficiencia 1000%"],
        price: "Desde L 18,900",
        gradient: "from-purple-500 via-violet-500 to-indigo-500",
        results: "99.9% automatización lograda"
    },
    {
        icon: Wrench,
        title: "MANTENIMIENTO",
        subtitle: "PROTECCIÓN INFINITA",
        desc: "Tu web será INDESTRUCTIBLE. Protección militar, velocidad supersónica, disponibilidad del 999.9%.",
        features: ["Monitoring 24/7", "Hacking inmune", "Velocidad luz", "Disponibilidad infinita"],
        price: "Desde L 1,500/mes",
        gradient: "from-slate-500 via-gray-600 to-zinc-700",
        results: "0 caídas en 2 años"
    }
];

function ServicesSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
            {/* FONDO INSANO */}
            <div className="absolute inset-0">
                {/* Efectos de luz móviles */}
                <motion.div 
                    style={{ y }}
                    className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                />
                <motion.div 
                    style={{ y: y.get() * -1 }}
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
                />

                {/* Grid futurista animado */}
                <div className="absolute inset-0 opacity-10">
                    <motion.div 
                        className="h-full w-full"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}
                        animate={{ 
                            backgroundPosition: ['0px 0px', '60px 60px'],
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity, 
                            ease: 'linear' 
                        }}
                    />
                </div>
            </div>

            <div className="relative z-10 w-[92%] max-w-7xl mx-auto">
                {/* HEADER INSANO */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    <motion.div 
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full mb-8"
                        animate={{ 
                            boxShadow: [
                                '0 0 20px rgba(245, 158, 11, 0.3)',
                                '0 0 40px rgba(245, 158, 11, 0.6)',
                                '0 0 20px rgba(245, 158, 11, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Crown className="text-amber-400" size={24} />
                        <span className="text-amber-100 font-black text-lg">SERVICIOS QUE DESTRUYEN</span>
                        <Zap className="text-amber-400" size={20} />
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8">
                        <motion.span 
                            className="block bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
                            animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            NO CREAMOS
                        </motion.span>
                        <motion.span 
                            className="block bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent"
                            animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            DEMOLEMOS
                        </motion.span>
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Mientras otros hacen páginas web "bonitas", nosotros construimos{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                            ARMAS DE DESTRUCCIÓN MASIVA DIGITAL
                        </span>{" "}
                        que obliteran a tu competencia.
                    </p>
                </motion.div>

                {/* GRID DE SERVICIOS INSANOS */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {INSANE_SERVICES.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Efecto de hover insano */}
                            <motion.div 
                                className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />

                            <div className={`relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border ${
                                hoveredIndex === index ? 'border-white/30' : 'border-slate-700/50'
                            } rounded-3xl p-8 h-full group-hover:bg-slate-800/95 transition-all duration-300`}>
                                
                                {/* Badge si es popular */}
                                {service.popular && (
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-black text-sm animate-pulse">
                                        🔥 MÁS BRUTAL
                                    </div>
                                )}

                                {/* Icono animado */}
                                <motion.div 
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <service.icon className="w-full h-full text-white" />
                                </motion.div>

                                {/* Título y subtítulo */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white mb-2">{service.title}</h3>
                                    <div className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                        {service.subtitle}
                                    </div>
                                </div>

                                {/* Descripción */}
                                <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                                    {service.desc}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, i) => (
                                        <motion.li 
                                            key={i}
                                            className="flex items-center gap-2 text-sm text-slate-400"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Target className="text-emerald-400" size={12} />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Resultado destacado */}
                                <div className="bg-black/30 rounded-xl p-4 mb-6 border border-emerald-500/20">
                                    <div className="text-emerald-400 text-xs font-bold mb-1">RESULTADO REAL:</div>
                                    <div className="text-white font-bold text-sm">{service.results}</div>
                                </div>

                                {/* Precio y CTA */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-black text-white">{service.price}</div>
                                        {service.price.includes('/mes') && (
                                            <div className="text-slate-400 text-xs">Sin permanencia</div>
                                        )}
                                    </div>
                                    <motion.button
                                        className={`px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200 flex items-center gap-2`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        DOMINAR
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA FINAL INSANO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <div className="relative max-w-4xl mx-auto">
                        {/* Efecto de brillo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                        
                        <div className="relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                                ¿Listo para{" "}
                                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                    ANIQUILAR
                                </span>{" "}
                                a tu competencia?
                            </h3>
                            
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                No necesitas todos los servicios. Necesitas el que va a{" "}
                                <span className="text-cyan-400 font-bold">DOMINAR tu mercado</span>.
                                <br />
                                Cuéntanos tu objetivo y te diremos qué arma usar.
                            </p>

                            <motion.a
                                href="https://wa.me/50496321907?text=🔥%20QUIERO%20ANIQUILAR%20MI%20COMPETENCIA%20%E2%9A%A1%20¿Cuál%20servicio%20recomiendan%20para%20DOMINAR%20mi%20mercado%3F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(236, 72, 153, 0.3)',
                                        '0 0 40px rgba(236, 72, 153, 0.6)',
                                        '0 0 20px rgba(236, 72, 153, 0.3)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Rocket size={28} />
                                <span>🔥 INICIAR DOMINACIÓN DIGITAL</span>
                                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </motion.a>

                            <div className="mt-6 text-slate-400 text-sm">
                                ⚡ Respuesta en menos de 2 horas • 🇭🇳 Empresa 100% Hondureña • 🛡️ Garantía total
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ServicesSection;