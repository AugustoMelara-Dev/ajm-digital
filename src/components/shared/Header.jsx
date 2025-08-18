'use client';

// --- FILE: src/components/shared/Header.jsx ---
import React, { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { MobileMenu } from "@/components/shared/MobileMenu";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion"; // Importación necesaria para el menú

function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const openBtnRef = useRef(null);

    // Efecto para gestionar el menú móvil (focus trap, cierre con ESC, etc.)
    useEffect(() => {
        if (typeof document === "undefined" || typeof window === "undefined") return;

        const body = document.body;
        const onEsc = (e) => e.key === "Escape" && setMenuOpen(false);

        if (isMenuOpen) {
            body.style.overflow = "hidden";
            window.addEventListener("keydown", onEsc);
        }

        return () => {
            body.style.overflow = "";
            window.removeEventListener("keydown", onEsc);
            if (!isMenuOpen) {
                openBtnRef.current?.focus();
            }
        };
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
            <div className="w-[92%] max-w-[1200px] mx-auto flex items-center justify-between py-3">
                <a href="#inicio" className="flex items-center gap-2 font-extrabold text-slate-900">
                    <span className="leading-tight">
                        AJM Digital Solutions
                        <small className="hidden sm:block text-slate-500 font-semibold -mt-1">
                            Páginas Web Honduras • Diseño Web
                        </small>
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
                    {NAV_ITEMS.slice(0, -1).map(([label, href]) => (
                        <a key={href} href={href} className="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition">
                            {label}
                        </a>
                    ))}
                    <a href="#contacto" className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition font-bold">
                        Cotizar
                    </a>
                </nav>

                <button
                    ref={openBtnRef}
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-700"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menú"
                    aria-haspopup="dialog"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                >
                    <Menu />
                </button>
            </div>
            <AnimatePresence>
                {isMenuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
            </AnimatePresence>
        </header>
    );
}

// --- CORRECCIÓN: Se añade esta línea ---
export default Header;