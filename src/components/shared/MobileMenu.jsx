'use client';

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { X } from "lucide-react";

function MobileMenu({ onClose }) {
  return (
    <motion.div 
      className="fixed inset-0 z-[9999] md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 40,
          duration: 0.3 
        }}
        className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4">
            {NAV_ITEMS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={onClose}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-sky-600 rounded-lg transition-colors font-medium"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="https://wa.me/50496321907?text=🚀%20Hola%20AJM%2C%20quiero%20una%20cotización%20desde%20el%20menú%20móvil"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block w-full text-center px-4 py-3 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-500 transition-colors"
          >
            💬 Cotizar por WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MobileMenu;