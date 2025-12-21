'use client';

import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface LocationsTeaserButtonProps {
  buttonText: string;
}

export default function LocationsTeaserButton({ buttonText }: LocationsTeaserButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Button
        asChild
        size="lg"
        className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-500"
      >
        <Link href="/locations">
          <span className="relative z-10 flex items-center gap-2">
            {buttonText}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </Button>
    </motion.div>
  );
}
