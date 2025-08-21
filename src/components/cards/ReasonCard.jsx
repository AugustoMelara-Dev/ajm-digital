// --- FILE: src/components/cards/ReasonCard.jsx ---
'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { useFadeUp } from '@/hooks/useFadeUp';

const ReasonCard = React.memo(function ReasonCard({ title, desc, icon: Icon }) {
  const fadeUp = useFadeUp();
  const headingId = useId();

  return (
    <motion.article
      {...fadeUp}
      role="group"
      aria-labelledby={headingId}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-lg hover:-translate-y-0.5 focus-within:shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand grid place-items-center shrink-0">
          <Icon size={18} aria-hidden="true" />
        </div>
        <div>
          <h3 id={headingId} className="font-semibold text-slate-900 leading-snug">
            {title}
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.article>
  );
});

export default ReasonCard;
