/**
 * Configuración central del negocio y enlaces de Sabor de Hogar.
 * Permite cambiar fácilmente números de contacto, mensajes de WhatsApp, precios y dominios.
 */

export interface Product {
  /** Nombre visible, ej. "Pan de Pascua tradicional" */
  name: string;
  /** Tamaño o peso, ej. "1 kg" */
  size: string;
  /** Precio en pesos chilenos, sin puntos: 12000 */
  price: number;
  /** Detalle opcional, ej. "Rinde 10 porciones" */
  note?: string;
}

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
  /**
   * Datos de venta. Todo lo que quede vacío NO se muestra en el sitio: la sección de precios
   * y entregas, la fecha límite del inicio y las respuestas concretas de las preguntas
   * frecuentes aparecen solas al completar estos campos.
   */
  offer: {
    /** Presentaciones a la venta. Vacío = no se muestran precios. */
    products: Product[];
    /** Fecha límite para encargar, formato AAAA-MM-DD (ej. "2026-12-18"). Vacío = no se muestra. */
    orderDeadline: string;
    /** Comunas con despacho, ej. ["Ñuñoa", "Providencia"]. */
    deliveryZones: string[];
    /** Costo o condición del despacho, ej. "Despacho $3.000" o "Despacho gratis desde 2 panes". */
    deliveryNote: string;
    /** Retiro, ej. "Retiro en Ñuñoa, coordinando por WhatsApp". Vacío = no se ofrece retiro. */
    pickup: string;
    /** Formas de pago, ej. ["Transferencia", "Efectivo al retirar"]. */
    paymentMethods: string[];
  };
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
  offer: {
    products: [],
    orderDeadline: "",
    deliveryZones: [],
    deliveryNote: "",
    pickup: "",
    paymentMethods: [],
  },
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  analytics: {
    ga4Id: "",
  },
};

/** ¿Hay al menos un dato de venta cargado? Controla si se muestra la sección de precios y entregas. */
export function hasOfferInfo(): boolean {
  const o = SITE_CONFIG.offer;
  return Boolean(
    o.products.length || o.orderDeadline || o.deliveryZones.length || o.deliveryNote || o.pickup || o.paymentMethods.length,
  );
}

/** Enlaces del menú. "Precios" aparece solo cuando hay datos de venta. */
export function getNavLinks(): Array<{ label: string; href: string }> {
  return [
    { label: "Nuestra esencia", href: "#esencia" },
    { label: "Galería", href: "#galeria" },
    ...(hasOfferInfo() ? [{ label: "Precios", href: "#precios" }] : []),
    { label: "Empresas", href: "#empresas" },
    { label: "Preguntas", href: "#preguntas" },
    { label: "Hacer pedido", href: "#contacto" },
  ];
}

/** Precio en pesos chilenos: 12000 → "$12.000" */
export function formatCLP(value: number): string {
  return `$${Math.round(value).toLocaleString('es-CL')}`;
}

/** Fecha AAAA-MM-DD → "viernes 18 de diciembre" (sin desfase de zona horaria) */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .replace(',', '');
}

/** Precio más bajo de las presentaciones, o null si no hay precios. */
export function lowestPrice(): number | null {
  const prices = SITE_CONFIG.offer.products.map((p) => p.price).filter((p) => p > 0);
  return prices.length ? Math.min(...prices) : null;
}

/**
 * Genera el enlace directo a WhatsApp con el mensaje codificado correctamente
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || SITE_CONFIG.messages.default;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
