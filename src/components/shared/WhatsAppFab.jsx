'use client';

// --- FILE: src/components/shared/WhatsAppFab.jsx ---
import { useAnyInViewport } from "@/hooks/useAnyInViewport";
import { MessageCircle } from "lucide-react";

function WhatsAppFab() {
  const hide = useAnyInViewport(["#site-footer", "#contacto"]);
  return (
    <a
      aria-label="Abrir chat de WhatsApp con AJM Digital Solutions"
      href="https://wa.me/50496321907?text=🚀%20Hola%20AJM%2C%20quiero%20una%20cotización%20para%20mi%20página%20web%20desde%20su%20sitio%20oficial"
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full font-bold shadow-2xl bg-emerald-500 hover:bg-emerald-400 text-white transition motion-safe:animate-pulse motion-reduce:animate-none hover:motion-safe:animate-none ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

// --- CORRECCIÓN: Se añade esta línea ---
export default WhatsAppFab;