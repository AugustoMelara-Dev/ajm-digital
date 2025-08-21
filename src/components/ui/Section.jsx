// --- FILE: src/components/ui/Section.jsx ---
'use client';

import React, { forwardRef, useEffect, useId, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFadeUp } from '@/hooks/useFadeUp';
import { Link as LinkIcon } from 'lucide-react';

/**
 * Section — contenedor de sección profesional y accesible.
 *
 * Props:
 * - id?: string                → anchor/fragmento (#id)
 * - as?: keyof JSX.IntrinsicElements | React.ComponentType  (default: 'section')
 * - title?: React.ReactNode
 * - subtitle?: React.ReactNode
 * - eyebrow?: React.ReactNode  → kicker pequeño
 * - align?: 'center' | 'left'  (default: 'center')
 * - pad?: 'sm' | 'md' | 'lg'   (default: 'lg')
 * - heading?: 'h1' | 'h2' | 'h3' (default: 'h2')
 * - container?: 'tight' | 'custom' | 'full' (default: 'tight')
 * - anchor?: boolean           → muestra link ancla junto al título (default: true)
 * - headerAction?: React.ReactNode → botón/CTA en cabecera
 * - onInView?: (entry: IntersectionObserverEntry) => void
 * - className?, containerClassName?, headerClassName?
 */
const Section = forwardRef(function Section(
  {
    id,
    as: As = 'section',
    title,
    subtitle,
    eyebrow,
    align = 'center',
    pad = 'lg',
    heading = 'h2',
    container = 'tight',
    anchor = true,
    headerAction,
    onInView,
    className = '',
    containerClassName = '',
    headerClassName = '',
    children,
    ...rest
  },
  ref
) {
  const reduceMotion = useReducedMotion();
  const fadeUp = useFadeUp();
  const headingId = useId();
  const subtitleId = useId();
  const rootRef = useRef(null);

  // Permite referenciar desde fuera y dentro
  const setRefs = (node) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  // Intersección para analítica
  useEffect(() => {
    if (!onInView || !rootRef.current || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && onInView(e)),
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, [onInView]);

  // Padding vertical consistente
  const padY =
    pad === 'sm' ? 'py-12 md:py-14' : pad === 'md' ? 'py-16 md:py-20' : 'py-20 md:py-24';

  // Alineación de texto
  const alignText = align === 'left' ? 'text-left' : 'text-center';

  // Contenedor unificado (tokens utilitarios del proyecto)
  const containerMap = {
    tight: 'container-tight',
    custom: 'container-custom',
    full: 'w-full max-w-none px-4 md:px-6',
  };
  const containerCls = containerMap[container] || containerMap.tight;

  const HeadingTag = heading;

  return (
    <As
      id={id}
      ref={setRefs}
      className={[
        padY,
        'scroll-mt-24',
        // Color de fondo/texto queda a decisión del padre, pero exponemos buenas bases
        className,
      ].join(' ')}
      aria-labelledby={title ? headingId : undefined}
      aria-describedby={subtitle ? subtitleId : undefined}
      data-section={id || undefined}
      {...rest}
    >
      <div className={[containerCls, containerClassName].join(' ')}>
        {(title || subtitle || eyebrow || headerAction) && (
          <div
            className={[
              'mx-auto max-w-2xl',
              alignText,
              // Si hay acción y align=left, usamos layout de dos columnas en desktop
              headerAction && align === 'left' ? 'md:max-w-none' : '',
              headerClassName,
            ].join(' ')}
          >
            <div
              className={[
                headerAction && align === 'left'
                  ? 'md:flex md:items-end md:justify-between md:gap-6'
                  : '',
              ].join(' ')}
            >
              <div className="min-w-0">
                {eyebrow && (
                  <motion.p
                    {...fadeUp}
                    transition={reduceMotion ? { duration: 0 } : undefined}
                    className={[
                      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide',
                      'border-slate-200 bg-slate-50 text-slate-600',
                      'dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
                      'mb-2',
                    ].join(' ')}
                  >
                    {eyebrow}
                  </motion.p>
                )}

                {title && (
                  <motion.div
                    {...fadeUp}
                    transition={reduceMotion ? { duration: 0 } : undefined}
                    className={align === 'left' ? '' : 'flex items-start justify-center'}
                  >
                    <HeadingTag
                      id={headingId}
                      className="relative text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.25]"
                    >
                      <span>{title}</span>
                      {/* Link de ancla discreto */}
                      {anchor && id && (
                        <a
                          href={`#${id}`}
                          aria-label="Copiar enlace a esta sección"
                          className={[
                            'ml-2 inline-flex align-top opacity-0 group-hover:opacity-100 focus:opacity-100',
                            'transition',
                            'text-slate-400 hover:text-slate-600 focus:text-slate-600',
                            'dark:text-slate-500 dark:hover:text-slate-300 dark:focus:text-slate-300',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded',
                          ].join(' ')}
                        >
                          <LinkIcon size={18} aria-hidden="true" />
                        </a>
                      )}
                    </HeadingTag>
                  </motion.div>
                )}

                {subtitle && (
                  <motion.p
                    id={subtitleId}
                    {...fadeUp}
                    transition={reduceMotion ? { duration: 0 } : undefined}
                    className={[
                      'mt-2 text-slate-600 dark:text-slate-300 leading-relaxed',
                      align === 'left' ? '' : 'mx-auto',
                    ].join(' ')}
                  >
                    {subtitle}
                  </motion.p>
                )}
              </div>

              {headerAction && (
                <div className={align === 'left' ? 'mt-4 md:mt-0 shrink-0' : 'mt-6'}>
                  {headerAction}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la sección */}
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </As>
  );
});

export { Section };
export default Section;
