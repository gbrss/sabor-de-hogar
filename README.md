# Sabor de Hogar · Pan de Pascua Casero con Esencia Natural
### Santiago de Chile

Landing page profesional, moderna, cálida y de alto rendimiento diseñada para **Sabor de Hogar**, una marca artesanal de pan de Pascua casero en Santiago de Chile. Desarrollada con un enfoque editorial gastronómico, paleta navideña tradicional, integración completa de pedidos por WhatsApp y optimización SEO local.

---

## 📋 Resumen del Proyecto

- **Marca:** Sabor de Hogar
- **Producto:** Pan de Pascua casero artesanal
- **Diferenciador principal:** Esencia natural preparada artesanalmente mediante infusión propia de especias
- **Ubicación:** Santiago de Chile
- **Canal de ventas:** WhatsApp (+56 9 5007 5329 / Enlace internacional: `56950075329`)
- **Modelo:** Pedidos y consultas directas sin pasarela de pagos ni carritos innecesarios
- **Identidad visual:**
  - Rojo borgoña: `#7B2638`
  - Verde pino: `#214A35`
  - Crema cálido: `#FFF8EC`
  - Dorado suave: `#C9A45C`
  - Café cacao: `#4A3028`
- **Tipografía:** *Cormorant Garamond* (Serif clásica y elegante para titulares) + *Inter* (Sans-serif legible para cuerpo de texto)

---

## 📂 Estructura del Proyecto (Astro JS Nativo)

El proyecto está completamente migrado y estructurado con **Astro JS**:

```text
/
├── public/
│   ├── _headers                 # Caché y cabeceras de seguridad para Cloudflare Pages
│   ├── favicon.png              # Favicon (64x64, fondo transparente)
│   ├── apple-touch-icon.png     # Ícono para iOS (180x180, fondo crema)
│   ├── logo.webp                # Logo con URL fija (lo usa Google en los datos estructurados)
│   ├── og-image.jpg             # Vista previa al compartir en WhatsApp/Facebook (1200x630)
│   └── sitemap.xml              # Mapa del sitio para indexación
├── src/
│   ├── assets/
│   │   ├── images/              # Fotos originales: Astro genera AVIF/WebP en varios tamaños
│   │   └── brand/               # Logo (header) y sello (footer) en calidad original
│   ├── components/
│   │   ├── Header.astro         # Encabezado (Wordmark, enlaces, CTA, menú móvil)
│   │   ├── Hero.astro           # Portada editorial con fotografía protagonista
│   │   ├── BrandStory.astro     # Sección "Nuestra esencia" y proceso artesanal
│   │   ├── FeatureCards.astro   # 3 bloques sobrios de diferenciadores
│   │   ├── Gallery.astro        # Galería responsive con modal lightbox accesible
│   │   ├── CallToAction.astro   # Sección verde pino con botón destacado WhatsApp
│   │   ├── FAQ.astro            # Acordeón accesible con preguntas frecuentes reales
│   │   ├── Footer.astro         # Pie de página con créditos, enlaces y WhatsApp
│   │   ├── WhatsAppButton.astro # Botón reutilizable con codificación de mensajes
│   │   └── FloatingWhatsApp.astro # Botón flotante accesible en móvil y escritorio
│   ├── layouts/
│   │   └── BaseLayout.astro     # Layout base con metadatos SEO, OpenGraph y JSON-LD
│   ├── pages/
│   │   ├── index.astro          # Página principal estática
│   │   └── robots.txt.ts        # Endpoint dinámico para robots.txt
│   ├── styles/
│   │   └── global.css           # Estilos base con Tailwind CSS y variables de color
│   ├── config/
│   │   └── site.ts              # Configuración centralizada de datos y mensajes
│   └── data/
│       ├── gallery.ts           # Datos de fotografías, descripciones y mensajes
│       └── heroImage.ts         # Opciones de la foto principal (la usan el Hero y su precarga)
│
├── astro.config.mjs             # Astro + Tailwind + fuentes propias (Inter y Cormorant Garamond)
├── tsconfig.json                # Configuración TypeScript estricta de Astro
├── package.json                 # Scripts de desarrollo y dependencias
└── README.md                    # Esta guía completa en español
```

---

## 🚀 Requisitos Previos e Instalación Local

### Requisitos:
- Node.js versión 18 o superior
- Gestor de paquetes `npm`

### Ejecución Local:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera los archivos estáticos optimizados en la carpeta `dist/`.

---

## 🛠️ Cómo Modificar y Personalizar la Landing Page

### 1. Cambiar el número de WhatsApp y los mensajes
Todos los mensajes y el número de contacto están centralizados en un único archivo:
👉 `src/config/site.ts` (y en `astro-project/src/config/site.ts`):

```typescript
export const SITE_CONFIG = {
  name: "Sabor de Hogar",
  phoneDisplay: "+56 9 5007 5329",
  whatsappNumber: "56950075329", // Número internacional sin '+' ni espacios
  messages: {
    default: "¡Hola! Vi la página de Sabor de Hogar...",
    hero: "¡Hola Sabor de Hogar! Me encantaría encargar un pan de Pascua...",
    // ...
  }
};
```
Al modificar este archivo, todos los botones de la página se actualizan automáticamente con el formato correcto de WhatsApp (`https://wa.me/56950075329?text=...`).

### 2. Cambiar las fotografías
Las fotografías originales están en:
👉 `src/assets/images/`

Para reemplazar con las fotografías reales del dueño de Sabor de Hogar:
- Guarda las fotos originales (`.jpg`, sin comprimir) en `src/assets/images/`. No hace falta optimizarlas: en cada build Astro genera versiones AVIF y WebP en varios tamaños y recorta según cada sección.
- Actualiza los `import` en `src/data/gallery.ts`, `src/data/heroImage.ts` (foto principal) y `src/components/BrandStory.astro`.
- Resolución recomendada: 1600 px de ancho o más.

### 3. Cargar precios, plazo, entregas y pago
En `src/config/site.ts`, completa `offer`. Con datos aparecen solos: la sección **Precios y entregas**, el enlace "Precios" del menú, "Desde $X · Encargos hasta el…" bajo los botones del inicio, la presentación en el formulario de pedido, respuestas concretas en las preguntas frecuentes y los precios para Google. Lo que quede vacío no se muestra.
```typescript
offer: {
  products: [
    { name: "Pan de Pascua tradicional", size: "500 g", price: 9990 },
    { name: "Pan de Pascua tradicional", size: "1 kg", price: 17990, note: "Ideal para compartir" },
  ],
  orderDeadline: "2026-12-20",            // AAAA-MM-DD
  deliveryZones: ["Ñuñoa", "Providencia"],
  deliveryNote: "Despacho $3.000.",
  pickup: "Retiro en Ñuñoa, coordinando por WhatsApp.",
  paymentMethods: ["Transferencia", "Efectivo al retirar"],
},
```
(Los valores de arriba son solo un ejemplo de formato.)

Los formularios **Arma tu pedido** y **Pide tu cotización** (empresas) no envían datos a ningún servidor: abren WhatsApp con el pedido ya escrito.

### 4. Agregar las redes sociales
En `src/config/site.ts`, completa `social` con las URLs reales de los perfiles. Los íconos del footer y los datos para Google (`sameAs`) aparecen solo para las redes que tengan URL:
```typescript
social: {
  instagram: "https://www.instagram.com/usuario",
  facebook: "https://www.facebook.com/pagina",
  tiktok: "",
},
```

### 5. Medir visitas y clics a WhatsApp
- **Visitas (sin código ni cookies):** en Cloudflare, abre el proyecto de Pages → **Metrics** → **Web Analytics** → **Enable**.
- **Clics a WhatsApp:** cada clic ya queda registrado con la sección de origen (`inicio`, `galeria`, `menu`, `flotante`, `footer`...). Para verlos en Google Analytics 4, pega el ID de medición en `src/config/site.ts`:
  ```typescript
  analytics: { ga4Id: "G-XXXXXXXXXX" },
  ```
  Se registran como el evento `generate_lead`. Con el campo vacío no se carga ningún script externo.

### 6. Actualizar el dominio final
Si cambia el dominio, actualízalo en `src/config/site.ts` (`domain`), en `astro.config.mjs` (`site`), en `src/pages/robots.txt.ts` y en `public/sitemap.xml`.

---

## ☁️ Despliegue Gratuito en Cloudflare Pages o Vercel

### Opción A: Despliegue con Cloudflare Pages (Recomendado)
1. Sube el código a un repositorio en **GitHub** o **GitLab**.
2. Ingresa a [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Selecciona tu repositorio.
4. En **Build settings**:
   - **Framework preset:** `Vite` (o `Astro` si conectas la carpeta `astro-project`).
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Haz clic en **Save and Deploy**. En menos de 1 minuto tendrás una URL pública HTTPS gratuita (`https://sabor-de-hogar.pages.dev`).

### Opción B: Despliegue con Vercel
1. Conecta tu repositorio en [vercel.com](https://vercel.com).
2. Vercel detectará la configuración automáticamente.
3. Presiona **Deploy**.

---

## 📝 Lista de Datos y Fotografías que el Dueño Debe Entregar

Para pasar a la versión 100% definitiva de Sabor de Hogar, se recomienda que el dueño proporcione:

1. **Fotografías reales en alta calidad:**
   - Pan de Pascua completo horneado en su presentación de venta.
   - Detalle del corte transversal mostrando la miga real y frutos secos.
   - Foto del envoltorio o packaging real para regalo.
   - Foto del proceso casero o de los ingredientes (ollita de infusión, nueces).
2. **Formatos y pesos:**
   - Confirmar si se venden por formato (ej. 500g, 1kg) para incluirlo en las respuestas por WhatsApp.
3. **Sectores de despacho / retiro:**
   - Comunas específicas de Santiago con cobertura o si se cuenta con punto de retiro coordinado.
4. **Fechas de reserva:**
   - Si existen fechas límite de encargo para Navidad y Año Nuevo.
