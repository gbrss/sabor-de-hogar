import type { ImageMetadata } from 'astro';
import panCompleto from '../assets/images/hero_pan_de_pascua.jpg';
import panInterior from '../assets/images/galeria_pan_corte_interior.jpg';
import empaqueRegalo from '../assets/images/galeria_empaque_regalo.jpg';
import ingredientes from '../assets/images/ingredientes_frutos_especias.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Imagen fuente: Astro genera las versiones AVIF/WebP en cada tamaño durante el build. */
  image: ImageMetadata;
  alt: string;
  category: string;
  whatsappMessage: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "pan-completo",
    title: "Pan de Pascua Tradicional Completo",
    subtitle: "Dorado artesanal y corona de frutos",
    description:
      "Horneado lentamente hasta lograr un dorado uniforme y una cubierta de almendras tostadas, nueces enteras y frutas confitadas seleccionadas.",
    image: panCompleto,
    alt: "Pan de Pascua casero artesanal completo sobre tabla de roble con almendras y nueces",
    category: "Presentación",
    whatsappMessage:
      "¡Hola! Me gustó mucho la presentación del Pan de Pascua completo. Quisiera saber cómo coordinar un pedido.",
  },
  {
    id: "miga-interior",
    title: "Interior Húmedo y Aromático",
    subtitle: "Miga esponjosa con distribución generosa de frutos",
    description:
      "Al cortar se aprecia la abundancia de nueces, pasas maceradas y el aroma inconfundible de nuestra esencia natural casera de especias.",
    image: panInterior,
    alt: "Corte transversal de pan de Pascua chileno mostrando textura suave y frutos secos",
    category: "Textura",
    whatsappMessage:
      "¡Hola! Vi el corte interior del pan de Pascua en la galería de fotos. ¿Qué tamaños o presentaciones tienen disponibles?",
  },
  {
    id: "empaque-navideno",
    title: "Presentación de Regalo Artesanal",
    subtitle: "Envoltorio rústico con cinta borgoña y tarjeta",
    description:
      "Pensado para compartir en la mesa navideña o como un detalle de cariño para familiares, amigos y colaboradores.",
    image: empaqueRegalo,
    alt: "Pan de Pascua envuelto en papel kraft con lazo de hilo burdeo y ramita aromática",
    category: "Presentación",
    whatsappMessage:
      "¡Hola Sabor de Hogar! Me interesa la presentación para regalo de pan de Pascua. ¿Cómo puedo encargar?",
  },
  {
    id: "ingredientes-nobles",
    title: "Frutos Secos y Especias Selectas",
    subtitle: "Ingredientes nobles tratados con dedicación",
    description:
      "Nueces chilenas de primera selección, pasas rubias y morenas, junto a una combinación equilibrada de especias aromáticas.",
    image: ingredientes,
    alt: "Cuencos rústicos con nueces frescas, pasas doradas y canela en rama sobre mantel de lino",
    category: "Ingredientes",
    whatsappMessage:
      "¡Hola! Vi los ingredientes en su sitio web. Quisiera consultar detalles y encargar para esta Navidad.",
  },
];
