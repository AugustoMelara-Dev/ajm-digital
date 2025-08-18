
// --- FILE: src/components/ui/Badge.jsx ---
import React, { useMemo } from "react"; // Ya importado
import { SparklesIcon } from "lucide-react"; // Ya importado

/**
 * Componente de insignia (badge) estilizado.
 * @param {object} props
 * @param {React.ReactNode} props.children - Contenido del badge.
 * @param {'sky'|'cyan'|'amber'|'rose'|'emerald'} [props.tone='sky'] - Tonalidad de color.
 */
const Badge = React.memo(function Badge({ children, tone = "sky" }) {
  const tones = useMemo(
    () => ({
      sky: "border-sky-300/60 text-sky-800 bg-sky-50",
      cyan: "border-cyan-300/60 text-cyan-800 bg-cyan-50",
      amber: "border-amber-300/60 text-amber-800 bg-amber-50",
      rose: "border-rose-300/60 text-rose-800 bg-rose-50",
      emerald: "border-emerald-300/60 text-emerald-800 bg-emerald-50",
    }),
    []
  );
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${tones[tone]}`}>
      <SparklesIcon className="opacity-70" size={14} aria-hidden="true" /> {children}
    </span>
  );
});
// --- END OF FILE: src/components/ui/Badge.jsx ---