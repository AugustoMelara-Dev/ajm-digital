'use client';

import React, { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactForm() {
  const [ts] = useState(() => Date.now());
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  function sendWhatsApp(e) {
    e.preventDefault();
    if (e.target.website?.value) return; // honeypot
    if (Date.now() - ts < 2000) return; // bloquea envíos en <2s
    if (sending) return;

    const name = e.target.nombre.value.trim();
    const email = e.target.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }
    setError('');
    setSending(true);

    const service = e.target.servicio.value;
    const msg = e.target.mensaje.value.trim();
    const text = encodeURIComponent(`🚀 NUEVO LEAD - AJM Digital Solutions

👤 CLIENTE: ${name}
📧 EMAIL: ${email}
🎯 SERVICIO: ${service}
💬 MENSAJE: ${msg}

---
Enviado desde: ${typeof location !== 'undefined' ? location.href : 'ajmdigitalsolutions.com'}`);

    const win = window.open(`https://wa.me/50496321907?text=${text}`, "_blank", "noopener,noreferrer");
    const onFocus = () => { setSending(false); window.removeEventListener('focus', onFocus); };
    window.addEventListener('focus', onFocus);
    if (!win) setTimeout(() => setSending(false), 1500);
  }

  return (
    <form onSubmit={sendWhatsApp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="nombre" className="text-slate-700 text-sm font-medium">Nombre *</label>
        <input
          id="nombre"
          name="nombre"
          required
          autoComplete="name"
          placeholder="Tu nombre completo"
          className="w-full mt-1 px-3 py-2 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-slate-700 text-sm font-medium">Correo *</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'email-error' : undefined}
          placeholder="tunombre@correo.com"
          className="w-full mt-1 px-3 py-2 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        />
        {error && <p id="email-error" role="alert" aria-live="polite" className="mt-1 text-sm text-rose-600">{error}</p>}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="servicio" className="text-slate-700 text-sm font-medium">Servicio de Interés</label>
        <select
          id="servicio"
          name="servicio"
          required
          defaultValue=""
          className="w-full mt-1 px-3 py-2 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          <option value="" disabled>Selecciona una opción</option>
          <option value="Landing Page">Landing Page (72h)</option>
          <option value="Sitio Corporativo">Sitio Corporativo</option>
          <option value="E-commerce">Tienda Online</option>
          <option value="SEO">SEO y Marketing</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="No estoy seguro">No estoy seguro</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="mensaje" className="text-slate-700 text-sm font-medium">Mensaje *</label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          placeholder="Cuéntanos sobre tu proyecto... ¿Qué tipo de negocio tienes? ¿Cuáles son tus objetivos?"
          className="w-full mt-1 px-3 py-2 min-h-[120px] rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        />
      </div>
      <div className="sm:col-span-2 flex gap-3">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-sky-600 hover:bg-sky-500 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          🚀 Enviar por WhatsApp <ArrowRight size={18} aria-hidden="true" />
        </button>
        <a
          className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-bold border border-slate-200 text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          href="mailto:ajmds.contact@gmail.com?subject=Cotización%20Página%20Web%20Honduras"
        >
          <Mail size={18} aria-hidden="true" />
        </a>
      </div>
    </form>
  );
}