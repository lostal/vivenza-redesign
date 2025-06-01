import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';


export const metadata: Metadata = {
  title: 'Vivenza - Modern Home & Bathroom Solutions',
  description: 'Discover Vivenza: High-quality bathroom and home products with an Apple-inspired minimalist design. Explore our product galleries, find exhibition locations, and get inspired by our AI Style Finder.',
  keywords: ['Vivenza', 'bathroom fixtures', 'home design', 'interior design', 'modern style', 'minimalist design'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
