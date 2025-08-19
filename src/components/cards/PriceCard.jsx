'use client';

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheckIcon, ArrowRight } from "lucide-react";
import { useFadeUp } from "@/hooks/useFadeUp";

const PriceCard = React.memo(function PriceCard({ ribbon, title, price, features, popular, savings }) {
  const fadeUp = useFadeUp();
  return (
    <motion.div
      {...fadeUp}
      className={`relative rounded-3xl border bg-white p-6 shadow-xl ${
        popular ? "md:-translate-y-1 lg:-translate-y-2 ring-2 ring-sky-300/80 shadow-sky-100 border-sky-200" : "border-slate-200"
      }`}
    >
      {ribbon && (
        <span className="absolute -right-2 top-3 text-xs font-black rounded-full bg-sky-600 text-white px-3 py-1 z-10">
          {ribbon}
        </span>
      )}
      {savings && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">
            Ahorra {savings}
          </span>
        </div>
      )}
      {/* --- CORRECCIÓN SEO: Se cambia h4 por h3 --- */}
      <h3 className="text-slate-900 font-bold text-lg leading-snug">{title}</h3>
      <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500 mt-1">
        {price}
      </div>
      <ul className="mt-4 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
        <li className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
          <ShieldCheckIcon className="text-sky-600 shrink-0" size={18} aria-hidden="true" />
          <span>Garantía de 7 días · Hosting+SSL 1 año</span>
        </li>
      </ul>
      <a
        href="#contacto"
        aria-label={`Cotizar el plan ${title} con AJM Digital Solutions`}
        className={`inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl font-bold border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 w-full justify-center ${
          popular ? "bg-sky-600 text-white border-sky-500 hover:bg-sky-500" : "text-slate-900 border-slate-200 hover:bg-slate-50"
        }`}
      >
        Empezar Ahora <ArrowRight size={18} aria-hidden="true" />
      </a>
    </motion.div>
  );
});

export { PriceCard };
export default PriceCard;