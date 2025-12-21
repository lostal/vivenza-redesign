'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { EXTERNAL_URLS } from '@/lib/constants';

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
  const currentLocale = pathname.split('/')[1] || 'es';
  const contactLink = `/${currentLocale}/contact`;
  const { scrollToAboutSection } = useSmoothScroll();

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAboutSection();
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] sm:min-h-[600px] flex items-center justify-center bg-background overflow-hidden">
      <Image
        src={EXTERNAL_URLS.HERO_IMAGE}
        alt="Diseño de baño moderno Vivenza"
        fill
        style={{ objectFit: 'cover' }}
        quality={90}
        className="opacity-30"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 px-4 sm:px-8 py-8 max-w-3xl mx-auto text-left sm:translate-x-8">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6">
          {titleLine1}
          <br />
          <span className="text-primary">{titleLine2}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-8 sm:mb-10 max-w-xl">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="font-body w-full sm:w-auto" onClick={handleAboutClick}>
            {aboutUsButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button asChild variant="outline" size="lg" className="font-body w-full sm:w-auto">
            <Link href={contactLink}>{contactUsButtonText}</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
