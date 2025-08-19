'use client';

import React, { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import MobileMenu from "@/components/shared/MobileMenu";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";

function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Prevenir scroll cuando el menú está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup al desmontar el componente
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    // Cerrar menú con tecla Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isMenuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
                <div className="w-[92%] max-w-[1200px] mx-auto flex items-center justify-between py-3">
                    {/* Logo */}
                    <a href="#inicio" className="flex items-center gap-2 font-extrabold text-slate-900">
                        <span className="leading-tight">
                            AJM Digital Solutions
                            <small className="hidden sm:block text-slate-500 font-semibold -mt-1 text-xs">
                                Páginas Web Honduras • Diseño Web
                            </small>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
                        {NAV_ITEMS.slice(0, -1).map(([label, href]) => (
                            <a 
                                key={href} 
                                href={href} 
                                className="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                            >
                                {label}
                            </a>
                        ))}
                        <a 
                            href="#contacto" 
                            className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition-colors font-bold ml-2"
                        >
                            Cotizar
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Abrir menú de navegación"
                        aria-expanded={isMenuOpen}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <MobileMenu onClose={() => setMenuOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

export default Header;