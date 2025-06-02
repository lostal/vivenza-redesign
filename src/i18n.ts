
import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Define locales and default locale
export const locales = ['es', 'en', 'fr'] as const;
export const defaultLocale = 'es' as const;

// Define the Locale type based on the locales array
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  // and is one of the supported locales.
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    // The `../messages` path is relative to the `src/i18n.ts` file.
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    // Log an error if a specific locale's messages are missing.
    // For builds, it's often better to ensure all message files exist.
    console.error(`Could not load messages for locale: ${locale}. Falling back to empty messages.`, error);
    // Fallback to empty messages to prevent build failure if a file is temporarily missing.
    // Ideally, all message files should exist.
    messages = {};
  }

  return {
    messages
  };
});

// This is often used by the middleware
export const i18nConfig = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Other options: 'always', 'never'
} as const;
