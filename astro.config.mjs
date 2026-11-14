import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Fuentes servidas desde el propio dominio (sin Google Fonts). Se usan los archivos variables
// del subset latino (cubre todo el español) de los paquetes @fontsource-variable: un archivo por
// estilo cubre todos los pesos. Astro las precarga y genera fuentes de respaldo con métricas
// ajustadas para que el texto no "salte" al terminar de cargar.
const font = (pkg, file) => `./node_modules/@fontsource-variable/${pkg}/files/${file}`;

// https://astro.build/config
export default defineConfig({
  site: 'https://sabordehogar.cl',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Sitio de una sola página: el CSS va dentro del HTML y no bloquea con una petición extra
    inlineStylesheets: 'always',
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: [font('inter', 'inter-latin-wght-normal.woff2')], weight: '100 900', style: 'normal' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-cormorant',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: [font('cormorant-garamond', 'cormorant-garamond-latin-wght-normal.woff2')], weight: '300 700', style: 'normal' },
          { src: [font('cormorant-garamond', 'cormorant-garamond-latin-wght-italic.woff2')], weight: '300 700', style: 'italic' },
        ],
      },
    },
  ],
});
