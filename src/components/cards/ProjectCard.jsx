

// --- FILE: src/components/cards/ProjectCard.jsx ---
import Image from "next/image";
import React from "react"; // Ya importado
import { motion } from "framer-motion"; // Ya importado
import { useFadeUp } from "@/hooks/useFadeUp"; // En un proyecto real

const ProjectCard = React.memo(function ProjectCard({ title, desc, tags, img, demo }) {
  const fadeUp = useFadeUp();
  return (
    <motion.div {...fadeUp} className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition overflow-hidden">
      <div className="aspect-[16/10] bg-slate-100 relative">
        <Image
          src={img}
          alt={`Proyecto de página web para: ${title}`}
          fill // 'fill' hace que la imagen cubra el contenedor padre
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Ayuda a Next.js a servir la imagen del tamaño correcto
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-slate-900 leading-snug">{title}</h3>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">{desc}</p>
        <ul className="flex flex-wrap gap-2 mt-3">
          {tags?.map((t) => (
            <li key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-3">
          {demo && demo !== '#' ? (
            <a
              href={demo}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-sky-600 text-white hover:bg-sky-500"
            >
              Mostrar demo <ArrowRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-slate-200 text-slate-500 cursor-not-allowed opacity-60"
              aria-disabled="true"
              title="Demo no disponible"
            >
              Mostrar demo
            </button>
          )}
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold border border-slate-200 text-slate-900 hover:bg-slate-50"
          >
            Cotizar similar
          </a>
        </div>
      </div>
    </motion.div>
  );
});
// --- END OF FILE: src/components/cards/ProjectCard.jsx ---