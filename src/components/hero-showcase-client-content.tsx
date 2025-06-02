
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation'; // To get current locale if needed

interface HeroShowcaseClientContentProps {
  titleLine1: string;
  titleLine2: string;
  description: string;
  aboutUsButtonText: string;
  contactUsButtonText: string;
}

export default function HeroShowcaseClientContent({
  titleLine1,
  titleLine2,
  description,
  aboutUsButtonText,
  contactUsButtonText,
}: HeroShowcaseClientContentProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'es'; // Fallback to 'es' if locale is not in path

  const aboutUsLink = `/${currentLocale}/#sobre-nosotros`;
  const contactLink = `/${currentLocale}/contact`;
  
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center justify-center bg-background overflow-hidden">
      <Image
        src="https://vivenzaexpo.es/wp-content/uploads/2025/03/Imagen-Principal-VIVENZA.jpg"
        alt="Diseño de baño moderno Vivenza"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="opacity-30"
        data-ai-hint="modern bathroom hero"
        priority
      />
      <div className="relative z-10 p-8 max-w-3xl mx-auto text-left transform translate-x-8">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground mb-6">
          {titleLine1}<br />
          <span className="text-primary">{titleLine2}</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl">
          {description}
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="font-body">
            <Link href={aboutUsLink}>
              {aboutUsButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-body">
            <Link href={contactLink}>{contactUsButtonText}</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
