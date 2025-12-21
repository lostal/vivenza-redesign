import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { EXTERNAL_URLS, SITE_CONFIG } from '@/lib/constants';

// Premium font configuration with optimized weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vivenza-redesign.vercel.app'),
  title: {
    default: SITE_CONFIG.NAME,
    template: `%s | ${SITE_CONFIG.NAME}`,
  },
  description:
    'Descubre Vivenza: Productos de alta calidad para baño y hogar con un diseño minimalista. Explora nuestras galerías de productos y encuentra ubicaciones de exposición.',
  keywords: [
    'Vivenza',
    'grifería de baño',
    'diseño de hogar',
    'diseño de interiores',
    'estilo moderno',
    'diseño minimalista',
  ],
  icons: {
    icon: EXTERNAL_URLS.FAVICON,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_CONFIG.NAME,
    title: SITE_CONFIG.NAME,
    description: 'Productos de alta calidad para baño y hogar con un diseño minimalista.',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.NAME,
    description: 'Productos de alta calidad para baño y hogar con un diseño minimalista.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE_CONFIG.DEFAULT_LOCALE}
      className={`${poppins.variable} ${montserrat.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
