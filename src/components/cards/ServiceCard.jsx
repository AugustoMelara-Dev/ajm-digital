'use client';

// --- FILE: src/components/cards/ServiceCard.jsx ---
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useFadeUp } from "@/hooks/useFadeUp";

const ServiceCard = React.memo(function ServiceCard({ icon: Icon, title, desc, points, time, popular }) {
  const fadeUp = useFadeUp();
  return (
    <motion.div
      {...fadeUp}
      className={`rounded-3xl border bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition will-change-transform ${
        popular ? "ring-2 ring-sky-300/80 border-sky-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-b from-sky-400 to-cyan-500 text-white">
          <Icon size={22} aria-hidden="true" />
        </div>
        <div className="flex gap-2">
          {popular && (
            <span className="text-xs font-black px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              🔥 Más Popular
            </span>
          )}
          {time && (
            <span className="text-xs font-black px-2 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              ⏱ {time}
            </span>
          )}
        </div>
      </div>
      <h3 className="text-slate-900 font-bold mt-3 leading-snug">{title}</h3>
      <p className="text-slate-600 text-sm mt-1 leading-relaxed">{desc}</p>
      {points?.length && (
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          {points.map((p, i) => (
            <li key={i} className="flex gap-2 items-start">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={16} aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      <a href="#contacto" aria-label={`Cotizar servicio ${title} con AJM Digital Solutions`} className="mt-4 inline-flex items-center gap-2 text-sky-700 font-bold hover:underline underline-offset-4">
        Cotizar ahora <ArrowRight size={16} aria-hidden="true" />
      </a>
    </motion.div>
  );
});

// --- CORRECCIÓN: Se añade esta línea ---
export default ServiceCard;