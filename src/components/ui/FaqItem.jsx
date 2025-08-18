'use client';

import React from "react";
import { motion } from "framer-motion";
import { useFadeUp } from "@/hooks/useFadeUp";

const FaqItem = React.memo(function FaqItem({ q, a }) {
    const fadeUp = useFadeUp();
    return (
        <motion.div {...fadeUp}>
            <details className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="text-slate-900 font-bold cursor-pointer leading-snug">{q}</summary>
                <p className="text-slate-700 mt-2 text-sm leading-relaxed">{a}</p>
            </details>
        </motion.div>
    );
});

export function FaqJsonLd({ faqs }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

// --- CORRECCIÓN: Se añade el export nombrado para consistencia ---
export { FaqItem };
export default FaqItem;