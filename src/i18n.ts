
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Define locales and default locale
export const locales = ['es', 'en', 'fr'] as const;
export const defaultLocale = 'es' as const;
export const localePrefix = 'as-needed'; // Or 'always', 'never'

// Define the Locale type based on the locales array
export type Locale = (typeof locales)[number];

// Export i18nConfig for middleware, navigation, etc.
export const i18nConfig = {
  locales,
  defaultLocale,
  localePrefix,
} as const;

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    console.error(`Invalid locale detected: ${locale}. Falling back to notFound().`);
    notFound();
  }

  let messages;
  try {
    // Using a dynamic import for messages
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}. Details: ${error}`);
    // Fallback to an empty object or re-throw if critical
    // For a build, it might be better to ensure messages always exist
    // or handle this more gracefully depending on requirements.
    // If messages are critical for the build, this could call notFound() or throw.
    messages = {};
  }

  return {
    locale,
    messages
    // You can add other properties like timeZone if needed
    // timeZone: 'Europe/Vienna',
  };
});
