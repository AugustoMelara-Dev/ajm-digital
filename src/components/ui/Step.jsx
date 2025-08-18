
// --- FILE: src/components/ui/Step.jsx ---
import React from "react"; // Ya importado
import { motion } from "framer-motion"; // Ya importado
import { useFadeUp } from "@/hooks/useFadeUp"; // En un proyecto real

const Step = React.memo(function Step({ n, title, desc }) {
  const fadeUp = useFadeUp();
  return (
    <motion.div
      {...fadeUp}
      className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full grid place-items-center bg-sky-100 text-sky-700 font-extrabold">
          {n}
        </div>
        <h3 className="font-semibold text-slate-900 leading-snug">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm mt-2 leading-relaxed">{desc}</p>
    </motion.div>
  );
});
// --- END OF FILE: src/components/ui/Step.jsx ---
