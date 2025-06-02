
import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: i18nConfig.locales,

  // Used when no locale matches
  defaultLocale: i18nConfig.defaultLocale,

  // Configure an explicit locale prefix for all locales including the default
  localePrefix: i18nConfig.localePrefix,

  // আন্তর্জাতিক রুটের জন্য পাথনামের আন্তর্জাতিকীকরণ নিষ্ক্রিয় করুন
  pathnames: {
    // If all locales use the same pathnames, use the
    // default:
    '/': '/',
    '/blog': '/blog',
    '/contact': '/contact',
    '/locations': '/locations',
    '/products': '/products',

    // If locales use different pathnames, customize them:
    // '/about': {
    //   en: '/about',
    //   es: '/sobre-nosotros'
    // }
  }
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all pathnames within locales list (e.g. `/es`, `/en/about`)
    '/([\\w-]+)?/blog/:path*',
    '/([\\w-]+)?/contact/:path*',
    '/([\\w-]+)?/locations/:path*',
    '/([\\w-]+)?/products/:path*',
  ]
};
