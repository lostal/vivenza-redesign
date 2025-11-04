import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { locales, type Locale } from '@/i18n'; // Ensure Locale is imported

// Opt into static rendering
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale); // Set locale for metadata
  let t;
  try {
    t = await getTranslations({ locale, namespace: 'RootLayout' });
  } catch (error) {
    console.error(`Failed to load translations for RootLayout metadata in locale ${locale}:`, error);
    // Fallback metadata if translations fail
    return {
      title: 'Vivenza',
      description: 'Modern Solutions for Home and Bath',
      keywords: ['Vivenza', 'bath fixtures', 'home design', 'interior design', 'modern style', 'minimalist design'],
      icons: {
        icon: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
      },
    };
  }

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','), // Assuming keywords are comma-separated in JSON
    icons: {
      icon: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
    },
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);

  let messages;
  try {
    // getMessages will use getRequestConfig from i18n.ts which receives the locale
    messages = await getMessages(); 
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // Fallback to an empty object or handle error appropriately
    messages = {};
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}