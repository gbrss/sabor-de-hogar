import heroImg from '../assets/images/hero_pan_de_pascua.jpg';

/**
 * Opciones únicas de la imagen principal. Las usan el <Picture> del Hero y el <link rel="preload">
 * de la página: al ser las mismas, el navegador precarga exactamente el archivo que luego muestra.
 */
export const HERO_IMAGE = {
  src: heroImg,
  width: 614,
  height: 768,
  fit: 'cover',
  position: 'center',
  widths: [360, 480, 614],
  sizes: '(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw',
} as const;
