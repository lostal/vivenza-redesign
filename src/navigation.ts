
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import {locales, defaultLocale, localePrefix} from './i18n';

export const pathnames = {
  '/': '/',
  '/blog': '/blog',
  '/blog/[slug]': '/blog/[slug]',
  '/contact': '/contact',
  '/locations': '/locations',
  '/products': '/products',
  // Add other pathnames here as needed
} as const;

// Export i18nConfig for middleware
export const i18nConfig = {
  locales,
  defaultLocale,
  localePrefix,
} as const;


export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});
