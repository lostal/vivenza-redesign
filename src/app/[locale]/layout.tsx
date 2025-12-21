import type { ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { routing } from '@/i18n/routing';

// Opt into static rendering
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {
      title: 'Vivenza',
      description: 'Modern Solutions for Home and Bath',
      keywords: [
        'Vivenza',
        'bath fixtures',
        'home design',
        'interior design',
        'modern style',
        'minimalist design',
      ],
      icons: {
        icon: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
      },
    };
  }

  setRequestLocale(locale);

  let t;
  try {
    t = await getTranslations({ locale, namespace: 'RootLayout' });
  } catch (error) {
    console.error(
      `Failed to load translations for RootLayout metadata in locale ${locale}:`,
      error
    );
    return {
      title: 'Vivenza',
      description: 'Modern Solutions for Home and Bath',
      keywords: [
        'Vivenza',
        'bath fixtures',
        'home design',
        'interior design',
        'modern style',
        'minimalist design',
      ],
      icons: {
        icon: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
      },
    };
  }

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    icons: {
      icon: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
    },
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate the incoming locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
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
