
// --- FILE: src/hooks/useFadeUp.js ---
import React, { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hook reutilizable para animaciones "fade-up".
 * Respeta la configuración de movimiento reducido del sistema operativo para accesibilidad.
 * @returns {object} Propiedades de animación para un componente de `framer-motion`.
 */
export function useFadeUp() {
  const shouldReduceMotion = useReducedMotion();
  return useMemo(() => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" },
  }), [shouldReduceMotion]);
}
// --- END OF FILE: src/hooks/useFadeUp.js ---