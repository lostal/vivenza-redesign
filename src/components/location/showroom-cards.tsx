'use client';

import type { CommunityExhibitions } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShowroomCardsProps {
  data: CommunityExhibitions[];
  selectedCommunity: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ShowroomCards({ data, selectedCommunity }: ShowroomCardsProps) {
  const filteredData = selectedCommunity ? data.filter((c) => c.id === selectedCommunity) : data;

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No hay información de exposiciones disponible.
      </p>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedCommunity || 'all'}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-12"
      >
        {filteredData.map((community) => (
          <motion.div key={community.id} variants={cardVariants}>
            {/* Community header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-accent" />
              <h3 className="text-xl font-headline font-semibold text-foreground">
                {community.communityName}
              </h3>
              <span className="text-sm text-muted-foreground">
                ({community.showrooms.length}{' '}
                {community.showrooms.length === 1 ? 'showroom' : 'showrooms'})
              </span>
            </div>

            {/* Showroom grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {community.showrooms.map((showroom, index) => (
                <motion.div
                  key={showroom.id}
                  variants={cardVariants}
                  custom={index}
                  className="group p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 card-hover"
                >
                  {/* Showroom name */}
                  <h4 className="font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {showroom.name}
                  </h4>

                  {/* Address */}
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      {showroom.addressLines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{showroom.phone}</span>
                  </div>

                  {/* Directions button */}
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full group/btn border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(showroom.addressLines.join(', '))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Cómo llegar</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
