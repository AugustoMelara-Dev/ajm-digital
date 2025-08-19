'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, ArrowRight, Zap, Crown, Target, Rocket } from "lucide-react";

function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -150]);
    const y2 = useTransform(scrollY, [0, 300], [0, 100]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-black">
            {/* FONDO INSANO CON GRADIENTES ANIMADOS */}
            <div className="absolute inset-0">
                {/* Gradiente base */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-900"></div>
                
                {/* Efectos de luz móviles */}
                <motion.div 
                    style={{ x: mousePosition.x, y: mousePosition.y }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full blur-3xl"
                />
                <motion.div 
                    style={{ x: -mousePosition.x, y: -mousePosition.y }}
                    className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
                />
                <motion.div 
                    style={{ x: mousePosition.y, y: mousePosition.x }}
                    className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
                />

                {/* Grid futurista */}
                <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full" style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        animation: 'grid-move 20s linear infinite'
                    }}></div>
                </div>

                {/* Partículas flotantes */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
                <div className="max-w-7xl mx-auto text-center">
                    
                    {/* BADGE PREMIUM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-amber-400/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full"
                    >
                        <Crown className="text-amber-400" size={20} />
                        <span className="text-amber-100 font-bold">AGENCIA PREMIUM HONDURAS</span>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    </motion.div>

                    {/* TÍTULO PRINCIPAL - INSANO */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-12"
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-6">
                            <motion.span 
                                className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
                                animate={{ 
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                WEBS QUE
                            </motion.span>
                            <motion.span 
                                className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
                                animate={{ 
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                DOMINAN
                            </motion.span>
                            
                            {/* Elemento impactante */}
                            <motion.div 
                                className="flex items-center justify-center gap-6 mt-8"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                                    <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-3xl font-black text-2xl md:text-3xl transform -rotate-3">
                                        72H
                                    </div>
                                </div>
                                <Zap className="text-yellow-400 animate-bounce" size={60} />
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                                    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-3xl font-black text-2xl md:text-3xl transform rotate-3">
                                        24/7
                                    </div>
                                </div>
                            </motion.div>
                        </h1>
                    </motion.div>

                    {/* SUBTÍTULO PREMIUM */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mb-16 max-w-4xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 leading-relaxed font-medium">
                            No vendemos páginas web. 
                            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                                Creamos IMPERIOS DIGITALES que facturan mientras duermes
                            </span>
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 mt-8 text-slate-300">
                            <div className="flex items-center gap-2">
                                <Target className="text-green-400" size={20} />
                                <span>Conversión 300% superior</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Rocket className="text-purple-400" size={20} />
                                <span>SEO que DOMINA Google</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Crown className="text-amber-400" size={20} />
                                <span>Diseño que HIPNOTIZA</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* STATS INSANOS */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
                    >
                        {[
                            { number: "72H", label: "Entrega Garantizada", color: "from-red-500 to-pink-500" },
                            { number: "300%", label: "Más Conversiones", color: "from-green-500 to-emerald-500" },
                            { number: "24/7", label: "Máquina de Ventas", color: "from-blue-500 to-cyan-500" },
                            { number: "∞", label: "Potencial de ROI", color: "from-purple-500 to-violet-500" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="relative group"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"
                                     style={{ background: `linear-gradient(45deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}>
                                </div>
                                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center group-hover:bg-white/20 transition-all">
                                    <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-slate-300 font-semibold">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA LEVEL INSANO */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "backOut" }}
                        className="space-y-8"
                    >
                        {/* Botón principal INSANO */}
                        <motion.a
                            href="https://wa.me/50496321907?text=🚀%20¡QUIERO%20DOMINAR%20MI%20MERCADO%20DIGITAL!%20Necesito%20una%20web%20que%20CONVIERTA%20como%20loco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-4 px-12 py-6 text-xl font-black text-black overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                background: 'linear-gradient(45deg, #f59e0b, #f97316, #ef4444, #ec4899, #8b5cf6, #3b82f6, #06b6d4, #10b981)',
                                backgroundSize: '400% 400%',
                                animation: 'gradient-shift 3s ease infinite'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                            <MessageCircle size={28} />
                            <span className="relative z-10">🚀 QUIERO DOMINAR MI MERCADO</span>
                            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </motion.a>

                        {/* Urgencia INSANA */}
                        <motion.div 
                            className="relative max-w-3xl mx-auto"
                            animate={{ 
                                boxShadow: [
                                    '0 0 20px rgba(239, 68, 68, 0.3)',
                                    '0 0 40px rgba(239, 68, 68, 0.6)',
                                    '0 0 20px rgba(239, 68, 68, 0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-400/50 rounded-2xl p-8">
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <motion.div 
                                        className="w-4 h-4 bg-red-500 rounded-full"
                                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    ></motion.div>
                                    <span className="text-red-300 font-black text-lg">⚠️ ALERTA DE OPORTUNIDAD</span>
                                    <motion.div 
                                        className="w-4 h-4 bg-red-500 rounded-full"
                                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                                    ></motion.div>
                                </div>
                                <div className="text-white text-center">
                                    <div className="text-2xl font-black mb-2">
                                        🔥 ENERO 2025: Solo para los primeros 5 clientes
                                    </div>
                                    <div className="text-lg text-orange-200">
                                        HOSTING + SSL + DOMINIO <span className="text-amber-400 font-black">GRATIS POR 2 AÑOS</span>
                                        <br />
                                        + Setup de Google Ads <span className="text-emerald-400 font-black">TOTALMENTE GRATIS</span>
                                        <br />
                                        Valor total: <span className="line-through text-red-300">L 15,000</span> → <span className="text-green-400 font-black text-xl">L 0</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social proof INSANO */}
                        <motion.div 
                            className="flex flex-wrap justify-center items-center gap-8 text-slate-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">47</div>
                                <div className="text-sm">Empresas Dominadas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">∞</div>
                                <div className="text-sm">Leads Generados</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">24H</div>
                                <div className="text-sm">Respuesta Máx.</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">🇭🇳</div>
                                <div className="text-sm">Hecho en Honduras</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* INDICADOR DE SCROLL FUTURISTA */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center text-white/60">
                    <span className="text-sm font-semibold mb-2">Descubre el poder</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <motion.div 
                            className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full mt-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        ></motion.div>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
            `}</style>
        </section>
    );
}

export default HeroSection;