'use client';

import Section from "@/components/ui/Section"; // Corregido
import ContactForm from "@/components/shared/ContactForm"; // Corregido
import { Phone, Mail, MessageCircle } from "lucide-react";

function ContactSection() {
    return (
        <Section id="contacto" title="Solicita tu Cotización Gratuita" subtitle="Cuéntanos sobre tu proyecto. Te respondemos con un plan detallado y precio exacto en menos de 24 horas." className="pb-24 bg-slate-50">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <ContactForm />
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4">🚀 ¿Prefieres llamar?</h4>
                  <div className="space-y-3">
                    <a href="tel:+50496321907" className="w-full inline-flex items-center gap-2 justify-center px-4 py-3 rounded-2xl font-bold bg-sky-600 text-white hover:bg-sky-500 transition">
                      <Phone size={18} aria-hidden="true"/> Llamar +504 9632-1907
                    </a>
                    <a href="mailto:ajmds.contact@gmail.com?subject=Cotización%20Página%20Web%20Honduras" className="w-full inline-flex items-center gap-2 justify-center px-4 py-3 rounded-2xl font-bold border border-slate-200 text-slate-900 hover:bg-slate-50 transition">
                      <Mail size={18} aria-hidden="true"/> Enviar Email
                    </a>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-3">⏰ Horarios de Atención</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Lunes - Jueves:</span>
                      <span className="font-semibold">24 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Viernes:</span>
                      <span className="font-semibold">Hasta las 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábados:</span>
                      <span className="font-semibold text-rose-600">Cerrado</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingos:</span>
                      <span className="font-semibold">Todo el día</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
                      <MessageCircle size={16} aria-hidden="true" />
                      WhatsApp disponible 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Section>
    );
}

export default ContactSection;