
// --- FILE: src/components/shared/MobileMenu.jsx ---
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants"; // En un proyecto real
import { X } from "lucide-react"; // Ya importado

function MobileMenu({ onClose }) {
  return (
    <div className="fixed inset-0 z-[80]">
      <motion.div
        className="absolute inset-0 bg-slate-950/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className="absolute right-0 top-0 h-full w-[92vw] max-w-[20rem] bg-white shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <span id="mobile-menu-title" className="font-extrabold text-slate-900">Menú</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-700"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="px-2">
            {NAV_ITEMS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={onClose}
                  className="block px-3 py-3 text-lg font-semibold text-slate-800 rounded-xl hover:bg-slate-50"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </div>
  );
}
// --- END OF FILE: src/components/shared/MobileMenu.jsx ---