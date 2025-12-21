'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const imageUrls = [
  'https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-1.jpg',
  'https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-2.jpg',
  'https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-3.jpg',
  'https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-4-1.jpg',
  'https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-5.jpg',
];

export default function AboutUsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full max-w-5xl mx-auto"
        opts={{
          loop: true,
          align: 'center',
        }}
      >
        <CarouselContent className="-ml-4">
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-4/5">
              <motion.div
                className={cn(
                  'relative aspect-[16/9] overflow-hidden rounded-2xl transition-all duration-500',
                  current === index
                    ? 'scale-100 opacity-100 shadow-2xl shadow-black/20'
                    : 'scale-95 opacity-60'
                )}
              >
                <Image
                  src={url}
                  alt={`Exposición Vivenza ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={85}
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
                  className="transition-transform duration-700 ease-out hover:scale-105"
                />

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom navigation buttons */}
        <CarouselPrevious className="left-4 md:-left-12 w-10 h-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-border transition-all shadow-lg" />
        <CarouselNext className="right-4 md:-right-12 w-10 h-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-border transition-all shadow-lg" />

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                current === index
                  ? 'w-8 bg-primary'
                  : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </motion.div>
  );
}
