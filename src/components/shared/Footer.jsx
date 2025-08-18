// --- FILE: src/components/shared/Footer.jsx ---
import { StarIcon, MessageCircle, Mail, MapPin } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="pt-16 pb-8 border-t border-slate-200 bg-slate-900 text-white">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-extrabold text-xl mb-4">AJM Digital Solutions</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Páginas web profesionales en Honduras. Diseño web, e-commerce y SEO
              desde Tocoa para todo Centroamérica.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-sm">
              <StarIcon size={16} aria-hidden="true" /> <StarIcon size={16} aria-hidden="true" /> <StarIcon size={16} aria-hidden="true" /> <StarIcon size={16} aria-hidden="true" /> <StarIcon size={16} aria-hidden="true" />
              <span className="ml-1 font-semibold">5.0 • Proyectos de Calidad</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-100">Servicios Web</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#servicios" className="hover:text-white transition">Landing Pages Honduras</a></li>
              <li><a href="#servicios" className="hover:text-white transition">Sitios Web Corporativos</a></li>
              <li><a href="#servicios" className="hover:text-white transition">Tiendas Online</a></li>
              <li><a href="#servicios" className="hover:text-white transition">SEO Honduras</a></li>
              <li><a href="#servicios" className="hover:text-white transition">Mantenimiento Web</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-100">Enlaces Útiles</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#planes" className="hover:text-white transition">Precios Páginas Web</a></li>
              <li><a href="#faq" className="hover:text-white transition">Preguntas Frecuentes</a></li>
              <li><a href="#sobre" className="hover:text-white transition">Sobre Augusto Melara</a></li>
              <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
              <li><a href="#proceso" className="hover:text-white transition">Cómo Trabajamos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-100">Contacto Directo</h4>
            <div className="space-y-3 text-sm">
              <a href="https://wa.me/50496321907" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition">
                <MessageCircle size={16} />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-xs text-slate-400">+504 9632-1907</div>
                </div>
              </a>
              <a href="mailto:ajmds.contact@gmail.com" className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition">
                <Mail size={16} />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-xs text-slate-400">ajmds.contact@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center gap-2 text-amber-400">
                <MapPin size={16} />
                <div>
                  <div className="font-semibold">Ubicación</div>
                  <div className="text-xs text-slate-400">Tocoa, Colón, Honduras</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm text-center sm:text-left">
            © {year} AJM Digital Solutions • Páginas Web Honduras
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            Diseño web profesional desde Tocoa, Colón
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span>Empresa hondureña</span>
            <span>•</span>
            <span>Respuesta rápida</span>
            <span>•</span>
            <span>Garantía 7 días</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- CORRECCIÓN: Se añade esta línea ---
export default Footer;