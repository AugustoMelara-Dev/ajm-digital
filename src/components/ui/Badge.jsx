// --- FILE: src/components/ui/Badge.jsx ---
// Debe ser Client Component (se usa en interacciones/animaciones)
'use client';

import React, { forwardRef, memo } from 'react';
import { Sparkles as SparklesIcon } from 'lucide-react';

/**
 * Badge sobrio y reutilizable.
 * - Dark mode con contraste AA.
 * - Tamaños: sm | md.
 * - Tonos: neutral | brand | sky | cyan | amber | rose | emerald.
 * - Icono opcional (por defecto Sparkles), ocultable con hideIcon, y posición izquierda/derecha.
 * - Variante "dot" (punto de estado) y estado "selected" para chips/filters.
 * - Polimórfico: as="span" | "a" | "button". Si es interactivo: focus ring + hover sutil.
 */

const TONES = {
  neutral:
    'border-slate-200 text-slate-700 bg-slate-50 ' +
    'dark:border-slate-700 dark:text-slate-200 dark:bg-slate-800/60',
  brand:
    'border-brand/30 text-brand bg-brand/5 ' +
    'dark:border-brand/30 dark:text-brand dark:bg-brand/10',
  sky:
    'border-sky-300/60 text-sky-800 bg-sky-50 ' +
    'dark:border-sky-700/60 dark:text-sky-300 dark:bg-sky-900/20',
  cyan:
    'border-cyan-300/60 text-cyan-800 bg-cyan-50 ' +
    'dark:border-cyan-700/60 dark:text-cyan-300 dark:bg-cyan-900/20',
  amber:
    'border-amber-300/60 text-amber-800 bg-amber-50 ' +
    'dark:border-amber-700/60 dark:text-amber-300 dark:bg-amber-900/20',
  rose:
    'border-rose-300/60 text-rose-800 bg-rose-50 ' +
    'dark:border-rose-700/60 dark:text-rose-300 dark:bg-rose-900/20',
  emerald:
    'border-emerald-300/60 text-emerald-800 bg-emerald-50 ' +
    'dark:border-emerald-700/60 dark:text-emerald-300 dark:bg-emerald-900/20',
};

const SIZES = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
};

const base =
  'inline-flex items-center gap-2 rounded-full border font-medium leading-none ' +
  'whitespace-nowrap align-middle select-none transition-colors';

const interactive =
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ' +
  'hover:shadow-sm motion-safe:hover:translate-y-0.5 motion-safe:active:translate-y-0 ' +
  'motion-reduce:transition-none motion-reduce:transform-none';

const selectedCls = 'ring-1 ring-current/20';

// Polimórfico sencillo
function getTag(asProp, href) {
  if (href) return 'a';
  if (asProp) return asProp;
  return 'span';
}

const Badge = memo(
  forwardRef(function Badge(
    {
      children,
      tone = 'neutral',
      size = 'sm',
      icon: Icon = SparklesIcon,
      iconPosition = 'left', // 'left' | 'right'
      hideIcon = false,
      as, // 'span' | 'a' | 'button'
      href,
      selected = false, // chips/filters
      dot = false, // punto de estado en vez de icono
      disabled = false, // solo para button
      className = '',
      ...rest
    },
    ref
  ) {
    const Tag = getTag(as, href);
    const palette = TONES[tone] ?? TONES.neutral;
    const sizing = SIZES[size] ?? SIZES.sm;
    const isInteractive =
      Tag === 'a' || Tag === 'button' || typeof rest.onClick === 'function';

    // Ícono / Dot
    const showLeft = !hideIcon && iconPosition === 'left' && !dot;
    const showRight = !hideIcon && iconPosition === 'right' && !dot;

    const dotEl = dot ? (
      <span
        aria-hidden="true"
        className="inline-block w-2 h-2 rounded-full bg-current/70"
      />
    ) : null;

    const iconSize = size === 'sm' ? 14 : 16;

    const classes = [
      base,
      palette,
      sizing,
      isInteractive ? interactive : '',
      selected ? selectedCls : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Props ARIA para casos interactivos
    const ariaProps =
      Tag === 'button'
        ? { type: 'button', 'aria-pressed': selected, disabled }
        : {};

    return (
      <Tag
        ref={ref}
        data-tone={tone}
        data-size={size}
        data-selected={selected ? '' : undefined}
        href={Tag === 'a' ? href : undefined}
        className={classes}
        {...ariaProps}
        {...rest}
      >
        {iconPosition === 'left' && (dotEl || (showLeft && <Icon size={iconSize} aria-hidden="true" className="opacity-70" />))}
        <span className="truncate">{children}</span>
        {iconPosition === 'right' && (dotEl || (showRight && <Icon size={iconSize} aria-hidden="true" className="opacity-70" />))}
      </Tag>
    );
  })
);

export { Badge };
export default Badge;
