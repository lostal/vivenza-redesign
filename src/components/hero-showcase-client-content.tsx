'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { EXTERNAL_URLS, DOM_IDS } from '@/lib/constants';
import { motion } from 'framer-motion';

interface HeroShowcaseClientContentProps {
  titleLine1: string;
  titleLine2: string;
  description: string;
  aboutUsButtonText: string;
  contactUsButtonText: string;
  badge: string;
  scrollText: string;
}

export default function HeroShowcaseClientContent({
  titleLine1,
  titleLine2,
  description,
  aboutUsButtonText,
  contactUsButtonText,
  badge,
  scrollText,
}: HeroShowcaseClientContentProps) {
  const scrollToAbout = () => {
    const element = document.getElementById(DOM_IDS.ABOUT_SECTION);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src={EXTERNAL_URLS.HERO_IMAGE}
          alt="Diseño de baño moderno Vivenza"
          fill
          style={{ objectFit: 'cover' }}
          quality={90}
          priority
          sizes="100vw"
          className="scale-105"
        />
        {/* Premium gradient overlay - multi-layered */}
        <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-background/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-4xl mx-auto md:mx-0 md:ml-[5%]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase bg-white/10 text-white border border-white/20 rounded-full backdrop-blur-sm">
              {badge}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: 'easeOut' }}
            className="font-headline text-display-xl font-bold leading-none mb-6"
          >
            <span className="block text-foreground">{titleLine1}</span>
            <span className="block text-gradient">{titleLine2}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                {aboutUsButtonText}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group px-8 py-6 text-base font-medium rounded-xl border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300"
            >
              <Link href="/contact">{contactUsButtonText}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors cursor-pointer pointer-events-auto"
        >
          <span className="text-xs font-medium tracking-widest uppercase pl-[0.1em]">{scrollText}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
