import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { EXTERNAL_URLS, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: SITE_CONFIG.NAME,
  description:
    'Descubre Vivenza: Productos de alta calidad para baño y hogar con un diseño minimalista inspirado en Apple. Explora nuestras galerías de productos, encuentra ubicaciones de exposición e inspírate con nuestro Buscador de Estilos IA.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.DEFAULT_LOCALE} className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={EXTERNAL_URLS.GOOGLE_FONTS} rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
