import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';


export const metadata: Metadata = {
  title: 'Vivenza - Soluciones Modernas para el Hogar y Baño',
  description: 'Descubre Vivenza: Productos de alta calidad para baño y hogar con un diseño minimalista inspirado en Apple. Explora nuestras galerías de productos, encuentra ubicaciones de exposición e inspírate con nuestro Buscador de Estilos IA.',
  keywords: ['Vivenza', 'grifería de baño', 'diseño de hogar', 'diseño de interiores', 'estilo moderno', 'diseño minimalista'],
  icons: {
    icon: 'https://vivenzaexpo.es/wp-content/uploads/2025/02/cropped-Icono-Vivenza-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
