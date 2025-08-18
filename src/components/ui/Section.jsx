'use client';

import { motion } from "framer-motion";
import { useFadeUp } from "@/hooks/useFadeUp";

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

// --- CORRECCIÓN: Se añade el export nombrado para consistencia y flexibilidad ---
export { Section };
export default Section;