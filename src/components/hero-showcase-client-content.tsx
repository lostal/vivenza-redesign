'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';
import { EXTERNAL_URLS, DOM_IDS } from '@/lib/constants';

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
  const handleAboutClick = () => {
    const element = document.getElementById(DOM_IDS.ABOUT_SECTION);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center bg-background overflow-hidden">
      <Image
        src={EXTERNAL_URLS.HERO_IMAGE}
        alt="Diseño de baño moderno Vivenza"
        fill
        style={{ objectFit: 'cover' }}
        quality={85}
        className="opacity-30"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 px-4 md:px-8 py-8 max-w-3xl mx-auto text-left md:translate-x-8">
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-4 md:mb-6">
          {titleLine1}
          <br />
          <span className="text-primary">{titleLine2}</span>
        </h1>
        <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-xl">{description}</p>
        <div className="flex flex-col md:flex-row gap-4">
          <Button size="lg" className="w-full md:w-auto" onClick={handleAboutClick}>
            {aboutUsButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
            <Link href="/contact">{contactUsButtonText}</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
