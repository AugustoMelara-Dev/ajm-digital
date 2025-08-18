
// --- FILE: src/hooks/useSmoothAnchorScroll.js ---
import React from 'react';

/**
 * Hook que implementa un desplazamiento suave a los anclajes (#) en la página.
 * Respeta la configuración de movimiento reducido.
 */
export function useSmoothAnchorScroll() {
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onClick = (ev) => {
      const anchor = ev.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      try {
        const target = document.querySelector(href);
        if (!target) return;
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      } catch (e) {
        console.warn('Smooth scroll failed', e);
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
// --- END OF FILE: src/hooks/useSmoothAnchorScroll.js ---
