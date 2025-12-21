import { defineRouting } from 'next-intl/routing';

/**
 * Configuración centralizada de routing i18n.
 * Define los locales soportados y las rutas de la aplicación.
 */
export const routing = defineRouting({
  // Locales soportados
  locales: ['es', 'en', 'fr'],

  // Locale por defecto
  defaultLocale: 'es',

  // Comportamiento del prefijo de locale
  localePrefix: 'as-needed',

  // Rutas de la aplicación
  pathnames: {
    '/': '/',
    '/contact': '/contact',
    '/locations': '/locations',
  },
});

// Tipo de locale exportado para uso en toda la aplicación
export type Locale = (typeof routing.locales)[number];
