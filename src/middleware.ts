
import createMiddleware from 'next-intl/middleware';
import { i18nConfig, pathnames } from './navigation'; // Use pathnames from navigation

export default createMiddleware({
  // A list of all locales that are supported
  locales: i18nConfig.locales,

  // Used when no locale matches
  defaultLocale: i18nConfig.defaultLocale,

  // Configure an explicit locale prefix for all locales including the default
  localePrefix: i18nConfig.localePrefix,

  // Use the pathnames from navigation.ts
  // This ensures consistency between link generation and request routing.
  pathnames,
});

export const config = {
  // Match only internationalized pathnames
  // This simplified matcher is generally recommended for next-intl with App Router
  // when all user-facing pages are intended to be localized.
  // It excludes common non-page assets and API routes.
  matcher: ['/((?!api|_next/static|_next/image|_next/data|_vercel|.*\\..*).*)']
};
