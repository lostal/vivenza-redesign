import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Validate the locale and fall back to default if invalid
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  let messages;
  try {
    // Using a dynamic import for messages
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}. Details:`, error);
    // Fallback to an empty object if messages fail to load
    messages = {};
  }

  return {
    locale,
    messages,
    // You can add other properties like timeZone if needed
    // timeZone: 'Europe/Madrid',
  };
});
