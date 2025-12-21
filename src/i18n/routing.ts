import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['es', 'en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'es',

  // Configure locale prefix behavior
  localePrefix: 'as-needed',

  // Define pathnames for route translations
  pathnames: {
    '/': '/',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': '/contact',
    '/locations': '/locations',
    '/products': '/products',
  },
});

// Export the Locale type based on the routing configuration
export type Locale = (typeof routing.locales)[number];
