'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, Palette } from 'lucide-react';

interface FeatureCardsProps {
  features: {
    title: string;
    description: string;
  }[];
}

const icons = [Sparkles, Award, Palette];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export default function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {features.map((feature, index) => {
        const Icon = icons[index % icons.length];

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 card-hover"
          >
            {/* Icon */}
            <div className="mb-6 relative inline-flex">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 w-12 h-12 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-headline font-semibold text-foreground mb-3 transition-colors group-hover:text-primary">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
