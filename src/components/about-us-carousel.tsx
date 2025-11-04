
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const imageUrls = [
  "https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-1.jpg",
  "https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-2.jpg",
  "https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-3.jpg",
  "https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-4-1.jpg",
  "https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-5.jpg",
];

export default function AboutUsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {imageUrls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={url}
                  alt={`Exposición Vivenza ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={85}
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/75 text-foreground p-2 rounded-full md:left-4 lg:left-[-15px]" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/75 text-foreground p-2 rounded-full md:right-4 lg:right-[-15px]" />
    </Carousel>
  );
}
