'use client';

import { useState } from 'react';
import SectionTitle from '@/components/section-title';
import SpainMap from '@/components/location/spain-map';
import ShowroomCards from '@/components/location/showroom-cards';
import { exhibitionData } from '@/lib/exhibition-data';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationsPageClientProps {
  title: string;
  description: string;
}

export default function LocationsPageClient({ title, description }: LocationsPageClientProps) {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  const handleClearFilter = () => {
    setSelectedCommunity(null);
  };

  return (
    <div className="section-padding bg-background relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container relative">
        <SectionTitle
          icon={<MapPin className="h-6 w-6 md:h-7 md:w-7" />}
          eyebrow="Encuéntranos"
          title={title}
          description={description}
        />

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Map sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="xl:col-span-4"
          >
            <div className="sticky top-24">
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                  Selecciona una región
                </h3>

                <SpainMap
                  selectedCommunity={selectedCommunity}
                  onCommunitySelect={setSelectedCommunity}
                />

                {/* Filter status */}
                {selectedCommunity && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    <span className="text-sm text-foreground">
                      Filtrando:{' '}
                      <strong>
                        {exhibitionData.find((c) => c.id === selectedCommunity)?.communityName}
                      </strong>
                    </span>
                    <button
                      onClick={handleClearFilter}
                      className="text-xs text-primary hover:text-primary/80 underline transition-colors"
                    >
                      Mostrar todas
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.aside>

          {/* Showroom cards */}
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="xl:col-span-8"
          >
            <ShowroomCards data={exhibitionData} selectedCommunity={selectedCommunity} />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
