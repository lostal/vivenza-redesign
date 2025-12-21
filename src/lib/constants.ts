/**
 * Constantes centralizadas del proyecto
 * Todas las URLs externas, configuración y valores constantes
 */

// URLs externas
export const EXTERNAL_URLS = {
  INSTAGRAM: 'https://www.instagram.com/gruposiete_vivenza/',
  GRUPO_SIETE: 'https://gruposiete.es/',
  FAVICON: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
  GRUPO_SIETE_LOGO:
    'https://vivenzaexpo.es/wp-content/uploads/2025/03/UNA-MARCA-DE-GRUPOSIETE-VIVENZA.png',
  HERO_IMAGE: 'https://vivenzaexpo.es/wp-content/uploads/2025/03/Imagen-Principal-VIVENZA.jpg',
  YOUTUBE_VIDEO: 'https://www.youtube.com/embed/k95tU4XvWDs',
} as const;

// Configuración del sitio
export const SITE_CONFIG = {
  NAME: 'Vivenza',
  DEFAULT_LOCALE: 'es',
  SUPPORTED_LOCALES: ['es', 'en', 'fr'] as const,
  URL: 'https://vivenza-redesign.vercel.app',
} as const;

// IDs de elementos del DOM para navegación
export const DOM_IDS = {
  ABOUT_SECTION: 'sobre-nosotros',
  LOCATIONS_TEASER: 'locations-teaser',
} as const;
