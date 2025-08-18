'use client';

// --- FILE: src/components/cards/ReasonCard.jsx ---
import React from "react";
import { motion } from "framer-motion";
import { useFadeUp } from "@/hooks/useFadeUp";

const ReasonCard = React.memo(function ReasonCard({ title, desc, icon: Icon }) {
  const fadeUp = useFadeUp();
  return (
    <motion.div
      {...fadeUp}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 grid place-items-center shrink-0">
          <Icon size={16} aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 leading-snug">{title}</h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
});

// --- CORRECCIÓN: Se añade esta línea ---
export default ReasonCard;