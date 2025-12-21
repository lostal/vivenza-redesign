import type { ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { routing } from '@/i18n/routing';
import { EXTERNAL_URLS, SITE_CONFIG } from '@/lib/constants';

// Opt into static rendering
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Metadata fallback para locales inválidos
const fallbackMetadata = {
  title: SITE_CONFIG.NAME,
  description: 'Modern Solutions for Home and Bath',
  icons: {
    icon: EXTERNAL_URLS.FAVICON,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return fallbackMetadata;
  }

  setRequestLocale(locale);

  try {
    const t = await getTranslations({ locale, namespace: 'RootLayout' });
    return {
      title: t('title'),
      description: t('description'),
      keywords: t('keywords').split(','),
      icons: {
        icon: EXTERNAL_URLS.FAVICON,
      },
    };
  } catch {
    return fallbackMetadata;
  }
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

  let messages = {};
  try {
    messages = await getMessages();
  } catch {
    console.error(`Failed to load messages for locale ${locale}`);
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
