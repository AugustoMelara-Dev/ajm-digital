'use client';

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Crown, Zap, Target, Shield, Rocket } from "lucide-react";

const INSANE_PLANS = [
    {
        name: "DESTRUCTOR",
        subtitle: "Para empezar la aniquilación",
        price: "L 3,900",
        originalPrice: "L 8,900",
        savings: "L 5,000",
        period: "Pago único",
        description: "Tu primera arma digital. Diseñada para convertir visitantes en clientes obsesionados en 72H.",
        features: [
            "Landing Page HIPNÓTICA en 72H",
            "Psicología de conversión aplicada",
            "Copy que vende mientras duermes",
            "Formularios que OBLIGAN a contactar",
            "WhatsApp integration automática",
            "Mobile-first (80% de tu tráfico)",
            "SSL + Hosting GRATIS primer año",
            "Garantía 7 días o dinero devuelto"
        ],
        gradient: "from-orange-500 via-red-500 to-pink-500",
        popular: false,
        results: "Conversión promedio: 8.3%",
        icon: Zap
    },
    {
        name: "CONQUISTADOR",
        subtitle: "Para dominar tu sector",
        price: "L 7,900", 
        originalPrice: "L 15,900",
        savings: "L 8,000",
        period: "Pago único",
        description: "El arma definitiva. Tu competencia va a llorar cuando vean lo que acabas de lanzar.",
        features: [
            "Sitio corporativo de DOMINACIÓN total",
            "6-8 páginas estratégicamente diseñadas",
            "SEO que DESTROZA a la competencia",
            "Blog con 3 artículos devastadores", 
            "Google Analytics + Search Console",
            "Integraciones redes sociales",
            "Email marketing setup",
            "Capacitación completa incluida",
            "30 días soporte premium GRATIS"
        ],
        gradient: "from-blue-500 via-purple-500 to-pink-500",
        popular: true,
        results: "ROI promedio: +420%",
        icon: Crown
    },
    {
        name: "EMPERADOR", 
        subtitle: "Para crear imperios digitales",
        price: "L 13,900",
        originalPrice: "L 25,900", 
        savings: "L 12,000",
        period: "Pago único",
        description: "No es una tienda online. Es una MÁQUINA DE DINERO que factura L 100K+ mensual automáticamente.",
        features: [
            "E-commerce IMPARABLE completo",
            "Hasta 100 productos optimizados",
            "Psicología de compra BRUTAL",
            "Upsells y cross-sells automáticos",
            "Pasarela de pagos multiples",
            "Gestión inventario inteligente",
            "Email marketing automation",
            "Remarketing pixels configurados",
            "Dashboard de control total",
            "Capacitación e-commerce COMPLETA"
        ],
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        popular: false,
        results: "Facturación promedio: L 84,300/mes",
        icon: Rocket
    }
];

function PlansSection() {
    const [hoveredPlan, setHoveredPlan] = useState(null);
    
    return (
        <section className="relative py-32 bg-gradient-to-br from-black via-slate-900 to-gray-900 overflow-hidden">
            {/* FONDO BRUTAL */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"></div>
                
                {/* Partículas de dinero flotantes */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-400/20 font-bold text-2xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20],
                            rotate: [0, 360],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    >
                        💰
                    </motion.div>
                ))}
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
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-400/30 rounded-full mb-8"
                        animate={{ 
                            boxShadow: [
                                '0 0 20px rgba(34, 197, 94, 0.3)',
                                '0 0 40px rgba(34, 197, 94, 0.6)', 
                                '0 0 20px rgba(34, 197, 94, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Target className="text-green-400" size={24} />
                        <span className="text-green-100 font-black text-lg">ELIGE TU ARMA DIGITAL</span>
                        <Target className="text-green-400" size={24} />
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8">
                        <motion.span 
                            className="block bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent"
                            animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            INVERSIÓN
                        </motion.span>
                        <motion.span 
                            className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                            animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            = IMPERIO
                        </motion.span>
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
                        No vendemos páginas web. Vendemos{" "}
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                            MÁQUINAS DE HACER DINERO
                        </span>{" "}
                        que pagan su inversión en 30 días o menos.
                    </p>

                    {/* Urgencia BRUTAL */}
                    <motion.div 
                        className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-400/40 rounded-2xl"
                        animate={{ 
                            scale: [1, 1.02, 1],
                            boxShadow: [
                                '0 0 20px rgba(239, 68, 68, 0.3)',
                                '0 0 40px rgba(239, 68, 68, 0.6)',
                                '0 0 20px rgba(239, 68, 68, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div 
                            className="w-4 h-4 bg-red-500 rounded-full"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-red-300 font-black text-lg">
                            🔥 ENERO 2025: Solo quedan 3 espacios para nuevos clientes
                        </span>
                        <motion.div 
                            className="w-4 h-4 bg-red-500 rounded-full"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        />
                    </motion.div>
                </motion.div>

                {/* PLANES INSANOS */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {INSANE_PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className={`group relative ${plan.popular ? 'lg:scale-105 lg:-translate-y-4' : ''}`}
                            onMouseEnter={() => setHoveredPlan(index)}
                            onMouseLeave={() => setHoveredPlan(null)}
                        >
                            {/* Efecto de brillo al hover */}
                            <motion.div 
                                className={`absolute -inset-2 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                            />

                            <div className={`relative bg-gradient-to-br ${
                                plan.popular ? 'from-slate-800/95 to-gray-800/95' : 'from-slate-900/90 to-gray-900/90'
                            } backdrop-blur-xl border ${
                                plan.popular ? 'border-purple-400/50' : 'border-slate-700/50'
                            } rounded-3xl p-8 h-full group-hover:border-white/30 transition-all duration-300`}>

                                {/* Badge popular */}
                                {plan.popular && (
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <motion.div 
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-black text-sm flex items-center gap-2"
                                            animate={{ 
                                                scale: [1, 1.05, 1],
                                                boxShadow: [
                                                    '0 0 20px rgba(168, 85, 247, 0.4)',
                                                    '0 0 40px rgba(168, 85, 247, 0.8)',
                                                    '0 0 20px rgba(168, 85, 247, 0.4)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Crown size={16} />
                                            🔥 MÁS ELEGIDO
                                        </motion.div>
                                    </div>
                                )}

                                {/* Icono y nombre del plan */}
                                <div className="flex items-center gap-4 mb-6 mt-4">
                                    <motion.div 
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${plan.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <plan.icon className="w-full h-full text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                                        <div className={`text-sm font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                                            {plan.subtitle}
                                        </div>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                                    {plan.description}
                                </p>

                                {/* Precio INSANO */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="text-4xl font-black text-white">{plan.price}</div>
                                        <div className="text-slate-500 line-through text-lg">{plan.originalPrice}</div>
                                    </div>
                                    <div className="text-green-400 font-bold text-sm mb-1">
                                        AHORRAS {plan.savings} 💰
                                    </div>
                                    <div className="text-slate-400 text-xs">{plan.period}</div>
                                </div>

                                {/* Resultado destacado */}
                                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-xl p-4 mb-6">
                                    <div className="text-green-400 text-xs font-bold mb-1">RESULTADO COMPROBADO:</div>
                                    <div className="text-white font-bold text-sm">{plan.results}</div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <motion.li 
                                            key={i}
                                            className="flex items-start gap-3 text-sm text-slate-300"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={16} />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <motion.a
                                    href={`https://wa.me/50496321907?text=🚀%20¡QUIERO%20EL%20PLAN%20${plan.name}!%20Estoy%20listo%20para%20DOMINAR%20mi%20mercado%20digital%20¿Cuál%20es%20el%20siguiente%20paso%3F`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full text-center px-6 py-4 bg-gradient-to-r ${plan.gradient} text-white font-black text-lg rounded-2xl hover:shadow-2xl transition-all duration-300 group`}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="flex items-center justify-center gap-3">
                                        🚀 ELEGIR {plan.name}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.a>

                                <div className="text-center text-slate-500 text-xs mt-3">
                                    💳 50% anticipo • 50% al entregar
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* GARANTÍA INSANA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-800/90 to-gray-800/90 backdrop-blur-xl border border-white/20 rounded-3xl p-12 relative overflow-hidden">
                        {/* Efecto de escudo */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <motion.div 
                                className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 mx-auto mb-6"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <Shield className="w-full h-full text-white" />
                            </motion.div>

                            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                                GARANTÍA{" "}
                                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                    BLINDADA
                                </span>
                            </h3>
                            
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                Si tu nueva web no genera <span className="text-green-400 font-bold">al menos 3X más leads</span> en los primeros 30 días,
                                <br />
                                <span className="text-white font-black">te devolvemos el 100% de tu dinero + L 5,000 por las molestias.</span>
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-black text-green-400 mb-2">7 DÍAS</div>
                                    <div className="text-slate-400 text-sm">Garantía total</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-green-400 mb-2">30 DÍAS</div>
                                    <div className="text-slate-400 text-sm">Soporte premium</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-green-400 mb-2">100%</div>
                                    <div className="text-slate-400 text-sm">Tu propiedad</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default PlansSection;