
import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Define locales and default locale
export const locales = ['es', 'en', 'fr'] as const;
export const defaultLocale = 'es' as const;
export const localePrefix = 'as-needed'; // Or 'always', 'never'

// Define the Locale type based on the locales array
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}. Falling back to empty messages.`, error);
    messages = {};
  }

  return {
    messages
  };
});
