// --- FILE: src/lib/constants.js ---
// Hoisting de datos estáticos para evitar recrearlos en cada render.
// Organizar constantes en un solo lugar facilita su mantenimiento.

import {
  Globe, Building2, ShoppingCart, Cpu, Rocket, Wrench, CheckCircle2,
  ArrowRight, Phone, Mail, Menu, X, Sparkles as SparklesIcon,
  ShieldCheck as ShieldCheckIcon, CreditCard as CreditCardIcon, Layers as LayersIcon,
  Instagram, Star as StarIcon, MessageCircle, MapPin, TrendingUp, Award,
} from "lucide-react";

export const SERVICES = [
    {
      icon: Globe,
      title: "Landing Pages Honduras",
      desc: "Páginas de alto impacto para captar clientes y aumentar ventas.",
      points: ["Entrega en 72h", "Optimizada para Google Ads", "Analítica incluida"],
      time: "72h",
      popular: true
    },
    {
      icon: Building2,
      title: "Sitios Web Corporativos",
      desc: "4-6 secciones, blog, SEO técnico y diseño profesional.",
      points: ["Copy optimizado", "SEO on-page completo", "Integración WhatsApp"],
      time: "1-2 semanas"
    },
    {
      icon: ShoppingCart,
      title: "Tiendas Online Honduras",
      desc: "E-commerce completo con pasarela de pago y gestión de inventario.",
      points: ["Pasarela de pago", "Panel administrativo", "Capacitación incluida"],
      time: "2-4 semanas"
    },
    {
      icon: Rocket,
      title: "SEO Honduras",
      desc: "Posicionamiento en Google para aparecer primero en búsquedas.",
      points: ["Keywords locales", "Google My Business", "Reportes mensuales"]
    },
    {
      icon: Cpu,
      title: "Aplicaciones Web",
      desc: "Dashboards, sistemas internos y herramientas personalizadas.",
      points: ["Autenticación segura", "Panel admin", "API REST"]
    },
    {
      icon: Wrench,
      title: "Mantenimiento Web",
      desc: "Soporte técnico, actualizaciones y backups automáticos.",
      points: ["Soporte 24/7", "Backups diarios", "Actualizaciones"]
    },
];

export const REASONS = [
    {
      title: "Empresa 100% Hondureña",
      desc: "Conocemos el mercado local y hablamos tu idioma. Soporte en español y presencial.",
      icon: MapPin
    },
    {
      title: "Garantía Real de 7 Días",
      desc: "Si no estás satisfecho, te devolvemos tu dinero. Sin letras pequeñas.",
      icon: ShieldCheckIcon
    },
    {
      title: "Entrega Comprobada en Tiempo",
      desc: "Proyectos entregados a tiempo. Cronograma claro desde el día 1.",
      icon: CheckCircle2
    },
    {
      title: "Precios Transparentes",
      desc: "Sin costos ocultos. 50% anticipo, 50% al terminar. Facturas incluidas.",
      icon: CreditCardIcon
    },
    {
      title: "Soporte Directo por WhatsApp",
      desc: "Comunicación directa conmigo. Respuesta en menos de 24 horas.",
      icon: MessageCircle
    },
    {
      title: "SEO Técnico Incluido",
      desc: "Tu sitio aparecerá en Google. Configuración completa sin costo extra.",
      icon: TrendingUp
    },
];

export const PLANS = [
    {
      title: "Landing Express",
      price: "L 3,900",
      savings: "L 1,000",
      features: [
        "1 página optimizada para conversión",
        "Formulario de contacto",
        "Integración WhatsApp",
        "Dominio .com incluido",
        "Certificado SSL gratis",
        "Hosting 1 año gratis"
      ]
    },
    {
      title: "Sitio Corporativo",
      price: "L 7,900",
      ribbon: "Más Elegido",
      popular: true,
      savings: "L 3,000",
      features: [
        "4-6 páginas profesionales",
        "Blog con 3 artículos",
        "SEO técnico completo",
        "Google Analytics configurado",
        "Formularios múltiples",
        "Integración redes sociales",
        "Capacitación de uso"
      ]
    },
    {
      title: "E-commerce Pro",
      price: "L 13,900",
      savings: "L 2,000",
      features: [
        "Tienda online completa",
        "Hasta 50 productos",
        "Pasarela de pago segura",
        "Panel administrativo",
        "Gestión de inventario",
        "Reportes de ventas",
        "Capacitación completa"
      ]
    },
];

export const FAQS = [
    {
      q: "¿Cuánto cuesta una página web profesional en Honduras?",
      a: "Nuestros precios van desde L 3,900 para una landing page hasta L 13,900 para e-commerce completo. Incluimos dominio, hosting por 1 año y garantía. Sin costos ocultos."
    },
    {
      q: "¿Realmente entregan en 72 horas?",
      a: "Sí, para landing pages. Trabajamos con plantillas optimizadas y proceso ágil. Sitios corporativos toman 1-2 semanas y e-commerce 2-4 semanas."
    },
    {
      q: "¿Mi sitio aparecerá en Google?",
      a: "Todos nuestros sitios incluyen SEO técnico: títulos optimizados, meta descripciones, sitemap, SSL y velocidad de carga. Para keywords específicas ofrecemos SEO avanzado."
    },
    {
      q: "¿Qué necesito para empezar mi proyecto web?",
      a: "Solo tu logo (si tienes), textos básicos de tu negocio y fotos. Si no tienes contenido, lo creamos nosotros con enfoque de ventas."
    },
    {
      q: "¿Puedo hacer cambios después de terminado?",
      a: "Sí. Incluimos revisiones durante desarrollo y 30 días de ajustes menores gratis. Para cambios grandes ofrecemos tarifas preferenciales."
    },
    {
      q: "¿Hay pagos mensuales obligatorios?",
      a: "No. Solo pagas una vez por el proyecto. Hosting y dominio incluidos el primer año. Después puedes renovar con nosotros o llevarte a otro proveedor."
    },
    {
      q: "¿Ofrecen capacitación para manejar el sitio?",
      a: "Sí, incluimos 1 hora de capacitación virtual donde te enseñamos a actualizar contenido, agregar productos (e-commerce) y usar todas las funciones."
    },
    {
      q: "¿Trabajan con empresas fuera de Tocoa?",
      a: "¡Por supuesto! Atendemos todo Honduras y Centroamérica. Proceso 100% remoto con comunicación constante por WhatsApp y videollamadas."
    },
];

export const NAV_ITEMS = [
  ["Inicio", "#inicio"],
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["¿Por qué nosotros?", "#por-que"],
  ["Planes", "#planes"],
  ["Sobre Mí", "#sobre"],
  ["Contacto", "#contacto"],
];

export const PROJECTS = [
  {
    title: "Clínica Santa Paz",
    desc: "Landing 72h enfocada en agendar citas. SEO local + WhatsApp.",
    tags: ["Salud", "Landing 72h", "SEO local"],
    img: "https://placehold.co/600x400/0ea5e9/ffffff?text=Clínica+Demo",
    demo: "#"
  },
  {
    title: "La Palma Café",
    desc: "Sitio corporativo con menú digital y reservas.",
    tags: ["Restaurante", "Sitio corporativo", "Optimizado móvil"],
    img: "https://placehold.co/600x400/f97316/ffffff?text=Café+Demo",
    demo: "#"
  },
  {
    title: "Ferretería Colón",
    desc: "E-commerce con 120 SKUs, pagos y gestión inventario.",
    tags: ["E-commerce", "Pasarela de pago", "Inventario"],
    img: "https://placehold.co/600x400/f59e0b/ffffff?text=Ferretería+Demo",
    demo: "#"
  }
];