import { createNavigation } from 'next-intl/navigation';
import { routing } from './i18n/routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

// Re-export for backward compatibility with existing code
export { routing };
export const pathnames = routing.pathnames;
export const i18nConfig = {
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
} as const;
