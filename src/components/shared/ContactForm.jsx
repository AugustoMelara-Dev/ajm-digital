// --- FILE: src/components/shared/ContactForm.jsx ---
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, Info } from 'lucide-react';

const RAW_PHONE = (process.env.NEXT_PUBLIC_WA_NUMBER || '').replace(/\D/g, '');
const DEFAULT_MSG =
  process.env.NEXT_PUBLIC_WA_MESSAGE ||
  'Hola, vengo desde el sitio. Quiero una cotización.';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ajmds.contact@gmail.com';

// Catálogos (fácil de llevar a i18n real)
const serviceOptions = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'landing', label: 'Landing Page (72h)' },
  { value: 'corporativo', label: 'Sitio Web Corporativo' },
  { value: 'ecommerce', label: 'Tienda Online' },
  { value: 'app-web', label: 'Aplicación Web (PWA)' },
  { value: 'seo', label: 'SEO y Marketing Digital' },
  { value: 'mantenimiento', label: 'Mantenimiento Web' },
  { value: 'consultoria', label: 'Consultoría Digital' },
  { value: 'personalizado', label: 'Proyecto Personalizado' },
];

const budgetRanges = [
  { value: '', label: 'Presupuesto estimado' },
  { value: '3000-6000', label: 'L 3,000 - L 6,000' },
  { value: '6000-12000', label: 'L 6,000 - L 12,000' },
  { value: '12000-20000', label: 'L 12,000 - L 20,000' },
  { value: '20000+', label: 'Más de L 20,000' },
  { value: 'consultar', label: 'Necesito asesoría' },
];

// Utilidades
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MSG = 1500; // seguro para WA y UIs
const DRAFT_KEY = 'ajm_contact_draft_v1';
const OPTIN_KEY = 'ajm_marketing_optin';
const MIN_FILL_SECONDS = 4; // simple señal anti-bot

function clamp(str, max) {
  return (str || '').slice(0, max);
}
function sanitizeText(s) {
  return (s || '').replace(/\u0000/g, '').trim();
}
function track(evt, payload = {}) {
  // hooks opcionales de analítica (no rompe si no existen)
  try {
    if (typeof window !== 'undefined') {
      if (window.plausible) window.plausible(evt, { props: payload });
      if (window.gtag) window.gtag('event', evt, payload);
    }
  } catch {}
}

export default function ContactForm() {
  const startedAtRef = useRef(Date.now());
  const firstInvalidRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    presupuesto: '',
    mensaje: '',
    timeline: '',
    marketingOptIn: false,
    website: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hidratar borrador + opt-in
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // evita romper si cambia el schema
        setFormData((p) => ({ ...p, ...parsed }));
      }
      const opt = localStorage.getItem(OPTIN_KEY);
      if (opt !== null) {
        setFormData((p) => ({ ...p, marketingOptIn: opt === '1' }));
      }
    } catch {}
  }, []);

  // Guardar borrador en cambios relevantes
  useEffect(() => {
    try {
      const { website, ...toSave } = formData; // no guardes honeypot
      localStorage.setItem(DRAFT_KEY, JSON.stringify(toSave));
    } catch {}
  }, [formData.nombre, formData.empresa, formData.email, formData.telefono, formData.servicio, formData.presupuesto, formData.mensaje, formData.timeline]);

  // Derivados
  const servicioLabel = useMemo(
    () => serviceOptions.find((s) => s.value === formData.servicio)?.label || 'No especificado',
    [formData.servicio]
  );
  const presupuestoLabel = useMemo(
    () => budgetRanges.find((b) => b.value === formData.presupuesto)?.label || 'No especificado',
    [formData.presupuesto]
  );

  // Validación por campo
  function validateField(name, value) {
    switch (name) {
      case 'nombre':
        if (!sanitizeText(value)) return 'Por favor ingresa tu nombre completo.';
        if (value.trim().length < 3) return 'Escribe al menos 3 caracteres.';
        return '';
      case 'email':
        if (!EMAIL_RE.test(value)) return 'Ingresa un correo electrónico válido.';
        return '';
      case 'servicio':
        if (!value) return 'Selecciona un servicio.';
        return '';
      case 'mensaje':
        if (!sanitizeText(value)) return 'Describe brevemente tu proyecto.';
        if (value.trim().length < 20) return 'Añade un poco más de detalle (≥ 20 caracteres).';
        return '';
      default:
        return '';
    }
  }

  function validateAll() {
    const next = {};
    ['nombre', 'email', 'servicio', 'mensaje'].forEach((f) => {
      const msg = validateField(f, formData[f]);
      if (msg) next[f] = msg;
    });
    setErrors(next);
    return next;
  }

  const isValid = useMemo(() => Object.keys(validateAll()).length === 0, /* eslint-disable-line react-hooks/exhaustive-deps */ [
    formData.nombre,
    formData.email,
    formData.servicio,
    formData.mensaje,
  ]);

  // Handlers
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    if (name in errors) {
      // validación en vivo del campo editado
      const msg = validateField(name, fieldValue);
      setErrors((prev) => {
        const copy = { ...prev };
        if (msg) copy[name] = msg;
        else delete copy[name];
        return copy;
      });
    }

    if (name === 'marketingOptIn') {
      try {
        localStorage.setItem(OPTIN_KEY, fieldValue ? '1' : '0');
      } catch {}
    }
    if (status.message) setStatus({ type: '', message: '' });
  }

  function focusFirstInvalid(nextErrors) {
    try {
      const firstKey = Object.keys(nextErrors)[0];
      if (!firstKey) return;
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el && typeof el.focus === 'function') el.focus();
    } catch {}
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot y protección por tiempo de llenado
    if (formData.website) return;
    const elapsed = (Date.now() - startedAtRef.current) / 1000;
    if (elapsed < MIN_FILL_SECONDS) {
      setStatus({
        type: 'error',
        message: 'Parece un envío automatizado. Intenta nuevamente.',
      });
      return;
    }

    const nextErrors = validateAll();
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar mensaje WA (limitado y sanitizado)
      const waBody = clamp(
        `🚀 NUEVA CONSULTA — AJM Digital Solutions

👤 CLIENTE: ${sanitizeText(formData.nombre)}
🏢 EMPRESA: ${sanitizeText(formData.empresa) || 'No especificado'}
📧 EMAIL: ${sanitizeText(formData.email)}
📞 TELÉFONO: ${sanitizeText(formData.telefono) || 'No especificado'}

🎯 SERVICIO: ${servicioLabel}
💰 PRESUPUESTO: ${presupuestoLabel}
⏰ TIMELINE: ${sanitizeText(formData.timeline) || 'Flexible'}
📣 MARKETING/OFERTAS: ${formData.marketingOptIn ? 'Sí, deseo recibir' : 'No, gracias'}

💬 DETALLES DEL PROYECTO:
${sanitizeText(formData.mensaje)}

---
Enviado desde: ${typeof window !== 'undefined' ? window.location.href : 'sitio'}
Fecha: ${new Date().toLocaleString('es-HN')}`,
        MAX_MSG
      );

      const url = RAW_PHONE ? `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(waBody)}` : null;

      if (!RAW_PHONE || !url) {
        setStatus({
          type: 'error',
          message: 'No se pudo abrir WhatsApp. Usa el botón de llamada o correo en la derecha.',
        });
        track('contact_form_error', { reason: 'no_phone' });
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
        setStatus({
          type: 'success',
          message: '¡Consulta enviada por WhatsApp! Te contactaremos en las próximas 2 horas.',
        });
        track('contact_form_submit', { servicio: formData.servicio, presupuesto: formData.presupuesto });

        // Limpieza suave post-envío (conservamos opt-in)
        setTimeout(() => {
          const keepOpt = formData.marketingOptIn;
          setFormData({
            nombre: '',
            empresa: '',
            email: '',
            telefono: '',
            servicio: '',
            presupuesto: '',
            mensaje: '',
            timeline: '',
            marketingOptIn: keepOpt,
            website: '',
          });
          setErrors({});
          try {
            const { marketingOptIn, ...rest } = formData;
            localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...rest, nombre: '', empresa: '', email: '', telefono: '', servicio: '', presupuesto: '', mensaje: '', timeline: '' }));
          } catch {}
        }, 1200);
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Hubo un error al preparar el mensaje. Intenta llamarnos o escríbenos por correo.',
      });
      track('contact_form_error', { reason: 'exception' });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Contador de caracteres del mensaje
  const msgCount = formData.mensaje.length;
  const msgHelp =
    msgCount < 20
      ? `Añade al menos ${20 - msgCount} caracteres…`
      : `${msgCount}/${MAX_MSG}`;

  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
          Solicita tu consulta gratuita
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Cuéntanos sobre tu proyecto y te enviaremos una propuesta detallada
          con precios exactos en menos de 24 horas.
        </p>
      </div>

      {/* Estado global del formulario */}
      {status.message && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900/40'
              : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Datos personales */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Tu nombre y apellido"
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? 'err-nombre' : undefined}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
                errors.nombre ? 'border-red-300 dark:border-red-700' : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.nombre && (
              <p id="err-nombre" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label htmlFor="empresa" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Empresa u organización
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              autoComplete="organization"
              placeholder="Nombre de tu empresa"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Contacto */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="tu@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
                errors.email ? 'border-red-300 dark:border-red-700' : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.email && (
              <p id="err-email" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Teléfono WhatsApp
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
              placeholder="+504 0000-0000"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Proyecto */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="servicio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Servicio de interés *
            </label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              required
              aria-invalid={!!errors.servicio}
              aria-describedby={errors.servicio ? 'err-servicio' : undefined}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors ${
                errors.servicio ? 'border-red-300 dark:border-red-700' : 'border-slate-300 dark:border-slate-700'
              }`}
            >
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errors.servicio && (
              <p id="err-servicio" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.servicio}</p>
            )}
          </div>

          <div>
            <label htmlFor="presupuesto" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Presupuesto aproximado
            </label>
            <select
              id="presupuesto"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
            >
              {budgetRanges.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            ¿Cuándo necesitas el proyecto?
          </label>
          <input
            type="text"
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="Ej: Lo antes posible, en 2 semanas, no tengo prisa"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* Descripción */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Describe tu proyecto *
            </label>
            <span className={`text-xs ${msgCount < 20 ? 'text-slate-500' : 'text-slate-400'} dark:text-slate-400`}>
              {msgHelp}
            </span>
          </div>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={(e) =>
              handleChange({
                target: { name: 'mensaje', value: clamp(e.target.value, MAX_MSG), type: 'text' },
              })
            }
            required
            rows={5}
            placeholder="Cuéntanos sobre tu empresa, objetivos, funcionalidades, público objetivo, etc."
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? 'err-mensaje' : undefined}
            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-vertical ${
              errors.mensaje ? 'border-red-300 dark:border-red-700' : 'border-slate-300 dark:border-slate-700'
            }`}
          />
          {errors.mensaje && (
            <p id="err-mensaje" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.mensaje}</p>
          )}
        </div>

        {/* Opt-in marketing */}
        <div className="flex items-start gap-3">
          <input
            id="marketingOptIn"
            name="marketingOptIn"
            type="checkbox"
            checked={formData.marketingOptIn}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-brand focus:ring-brand"
          />
          <label htmlFor="marketingOptIn" className="text-sm text-slate-600 dark:text-slate-300">
            Quiero recibir correos con ofertas, recursos y novedades. Puedo cancelar cuando quiera.
          </label>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="btn-primary flex-1 justify-center text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            data-analytics-id="contact_submit_whatsapp"
            onClick={() => track('contact_cta_click', { via: 'whatsapp_form' })}
          >
            {isSubmitting ? (
              'Enviando...'
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Enviar consulta por WhatsApp
              </>
            )}
          </button>

          <div className="flex gap-3">
            <a
              href={RAW_PHONE ? `tel:+${RAW_PHONE}` : '#'}
              className="btn-outline flex items-center gap-2 px-4"
              aria-disabled={!RAW_PHONE}
              onClick={() => track('contact_cta_click', { via: 'phone' })}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Consulta desde sitio web')}`}
              className="btn-outline flex items-center gap-2 px-4"
              onClick={() => track('contact_cta_click', { via: 'email' })}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Privacidad */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 mt-[2px]" aria-hidden="true" />
          Al enviar este formulario, aceptas que podamos contactarte para brindarte información sobre nuestros
          servicios. Respetamos tu privacidad y no compartimos tu información con terceros.
        </p>
      </form>
    </div>
  );
}
