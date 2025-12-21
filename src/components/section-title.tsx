'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionTitleProps {
  icon?: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function SectionTitle({
  icon,
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn('mb-12 md:mb-16', align === 'center' && 'text-center', className)}
    >
      {/* Icon or Eyebrow */}
      {(icon || eyebrow) && (
        <motion.div
          variants={itemVariants}
          className={cn('flex items-center gap-3 mb-4', align === 'center' && 'justify-center')}
        >
          {icon && <span className="text-primary">{icon}</span>}
          {eyebrow && (
            <span className="text-xs font-medium tracking-widest uppercase text-primary">
              {eyebrow}
            </span>
          )}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className={cn(
          'text-display-md font-headline font-bold text-foreground',
          description && 'mb-4'
        )}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={itemVariants}
          className={cn('text-lg text-muted-foreground max-w-2xl', align === 'center' && 'mx-auto')}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
