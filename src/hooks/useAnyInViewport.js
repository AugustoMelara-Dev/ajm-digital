
// --- FILE: src/hooks/useAnyInViewport.js ---
import { useState, useEffect } from 'react';

/**
 * Hook que detecta si alguno de los selectores CSS proporcionados está visible en el viewport.
 * @param {string|string[]} selectors - Un selector CSS o un array de selectores.
 * @param {object} [options] - Opciones para el IntersectionObserver.
 * @returns {boolean} `true` si al menos un elemento está en el viewport.
 */
export function useAnyInViewport(selectors, options = { rootMargin: "0px 0px -20% 0px" }) {
  const [isIn, setIsIn] = useState(false);
  const selectorString = Array.isArray(selectors) ? selectors.join(",") : selectors;

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver || !selectorString) return;

    const elements = Array.from(document.querySelectorAll(selectorString));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some(entry => entry.isIntersecting);
        setIsIn(anyIntersecting);
      },
      options
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selectorString, options.rootMargin]);

  return isIn;
}
// --- END OF FILE: src/hooks/useAnyInViewport.js ---