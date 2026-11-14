/**
 * Configuración central del negocio y enlaces de Sabor de Hogar.
 * Permite cambiar fácilmente números de contacto, mensajes de WhatsApp y dominios.
 */

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  location: string;
  city: string;
  phoneDisplay: string;
  whatsappNumber: string;
  domain: string;
  messages: {
    default: string;
    hero: string;
    essence: string;
    gallery: string;
    cta: string;
    faqIngredients: string;
    faqDelivery: string;
  };
  navLinks: Array<{ label: string; href: string }>;
  /** Perfiles reales del negocio. Los que queden vacíos no se muestran en el sitio. */
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  analytics: {
    /**
     * ID de medición de Google Analytics 4 (formato G-XXXXXXXXXX).
     * Vacío = no se carga ningún script de analítica. Con ID, se carga después de que la
     * página termina de cargar y cada clic a WhatsApp se registra como evento `generate_lead`.
     */
    ga4Id: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "Sabor de Hogar",
  tagline: "El sabor de la Navidad, hecho en casa",
  description:
    "Pan de Pascua casero con esencia natural preparada artesanalmente en Santiago de Chile. Pedidos y consultas directas por WhatsApp.",
  location: "Santiago, Chile",
  city: "Santiago",
  phoneDisplay: "+56 9 5007 5329",
  whatsappNumber: "56950075329",
  domain: "https://sabordehogar.cl",
  messages: {
    default:
      "¡Hola! Vi la página de Sabor de Hogar y me gustaría conocer las opciones disponibles para encargar pan de Pascua. ¿Me pueden entregar más información?",
    hero:
      "¡Hola Sabor de Hogar! Me encantaría encargar un pan de Pascua casero para esta Navidad en Santiago. ¿Cómo coordinamos mi pedido?",
    essence:
      "¡Hola! Me llamó mucho la atención la esencia natural que preparan para sus panes de Pascua. Quisiera hacer una consulta para encargar.",
    gallery:
      "¡Hola! Vi las fotografías del pan de Pascua en la web de Sabor de Hogar y quiero encargar. ¿Qué opciones tienen disponibles?",
    cta:
      "¡Hola! Deseo encargar pan de Pascua casero de Sabor de Hogar para compartir en familia. ¿Tienen disponibilidad para coordinar?",
    faqIngredients:
      "¡Hola Sabor de Hogar! Quisiera consultar sobre los ingredientes específicos de sus panes de Pascua y opciones para encargar.",
    faqDelivery:
      "¡Hola Sabor de Hogar! Quisiera consultar sobre los sectores de entrega en Santiago y fechas para coordinar mi pedido.",
  },
  navLinks: [
    { label: "Inicio", href: "#inicio" },
    { label: "Nuestra esencia", href: "#esencia" },
    { label: "Galería", href: "#galeria" },
    { label: "Preguntas", href: "#preguntas" },
    { label: "Contacto", href: "#contacto" },
  ],
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  analytics: {
    ga4Id: "",
  },
};

/**
 * Genera el enlace directo a WhatsApp con el mensaje codificado correctamente
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || SITE_CONFIG.messages.default;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
