'use client';

// --- FILE: src/components/ui/Section.jsx ---
import { motion } from "framer-motion";
import { useFadeUp } from "@/hooks/useFadeUp";

/**
 * Componente contenedor de sección con título, subtítulo y animación de entrada.
 * @param {object} props
 * @param {string} props.id - El ID del elemento <section>.
 * @param {string} [props.title] - Título principal de la sección.
 * @param {string} [props.subtitle] - Subtítulo o párrafo introductorio.
 * @param {React.ReactNode} props.children - Contenido de la sección.
 * @param {string} [props.className] - Clases CSS adicionales.
 */
function Section({ id, title, subtitle, children, className = "" }) {
  const fadeUp = useFadeUp();
  return (
    <section id={id} className={`py-20 scroll-mt-24 ${className}`}>
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {title && (
          <motion.h2
            {...fadeUp}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.25] text-center"
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p {...fadeUp} className="text-slate-600 mt-2 leading-relaxed max-w-2xl mx-auto text-center">
            {subtitle}
          </motion.p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

// --- CORRECCIÓN: Se añade esta línea ---
export default Section;