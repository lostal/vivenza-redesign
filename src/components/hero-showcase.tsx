import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center justify-center text-center bg-background overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Modern bathroom design"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="opacity-30"
        data-ai-hint="modern bathroom"
        priority
      />
      <div className="relative z-10 p-8 max-w-3xl animate-fade-in">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground mb-6">
          Elegance. Innovation. Vivenza.
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl mx-auto">
          Discover exquisitely crafted bathroom and home solutions that blend timeless design with modern functionality.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="font-body">
            <Link href="/products">
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-body">
            <Link href="/style-finder">AI Style Finder</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
