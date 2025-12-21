'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SpainMap from '@/components/location/spain-map';
import { exhibitionData } from '@/lib/exhibition-data';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface LocationsTeaserMapTranslations {
  showroomSingular: string;
  showroomPlural: string;
  moreShowrooms: string;
  selectRegion: string;
}

interface LocationsTeaserMapProps {
  buttonText: string;
  translations: LocationsTeaserMapTranslations;
}

export default function LocationsTeaserMap({ buttonText, translations }: LocationsTeaserMapProps) {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const tSpainMap = useTranslations('SpainMap');

  const selectedData = selectedCommunity
    ? exhibitionData.find((c) => c.id === selectedCommunity)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      {/* Map */}
      <div className="relative">
        <SpainMap
          selectedCommunity={selectedCommunity}
          onCommunitySelect={setSelectedCommunity}
          className="max-w-md mx-auto lg:mx-0"
          translations={{
            mapLabel: tSpainMap('mapLabel'),
            showroomsCount: tSpainMap('showroomsCount'),
            legendWithShowrooms: tSpainMap('legendWithShowrooms'),
            legendWithoutShowrooms: tSpainMap('legendWithoutShowrooms'),
          }}
        />
      </div>

      {/* Info Panel */}
      <div className="space-y-6">
        {selectedData ? (
          <motion.div
            key={selectedData.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-4"
          >
            <h3 className="text-xl font-headline font-semibold text-foreground">
              {selectedData.communityName}
            </h3>
            <p className="text-muted-foreground">
              {selectedData.showrooms.length}{' '}
              {selectedData.showrooms.length === 1
                ? translations.showroomSingular
                : translations.showroomPlural}
            </p>

            <div className="space-y-3">
              {selectedData.showrooms.slice(0, 3).map((showroom) => (
                <div
                  key={showroom.id}
                  className="p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
                >
                  <h4 className="font-medium text-foreground mb-2">{showroom.name}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        {showroom.addressLines.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <span>{showroom.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedData.showrooms.length > 3 && (
              <p className="text-sm text-muted-foreground">
                {translations.moreShowrooms.replace(
                  '{count}',
                  String(selectedData.showrooms.length - 3)
                )}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center lg:text-left py-8"
          >
            <p className="text-muted-foreground mb-4">{translations.selectRegion}</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {exhibitionData.map((community) => (
                <button
                  key={community.id}
                  onClick={() => setSelectedCommunity(community.id)}
                  className="px-3 py-1.5 text-sm rounded-full bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border/50 transition-all duration-300"
                >
                  {community.communityName}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="group w-full sm:w-auto relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-500"
        >
          <Link href="/locations">
            <span className="relative z-10 flex items-center justify-center gap-2">
              {buttonText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
