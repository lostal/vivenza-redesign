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
  GOOGLE_FONTS:
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
} as const;

// Configuración del sitio
export const SITE_CONFIG = {
  NAME: 'Vivenza',
  DEFAULT_LOCALE: 'es',
  SUPPORTED_LOCALES: ['es', 'en', 'fr'] as const,
} as const;

// IDs de elementos del DOM para navegación
export const DOM_IDS = {
  ABOUT_SECTION: 'sobre-nosotros',
} as const;
