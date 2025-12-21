'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { spainCommunityPaths, communitiesWithShowrooms } from '@/lib/spain-map-paths';
import { exhibitionData } from '@/lib/exhibition-data';

interface SpainMapProps {
  selectedCommunity: string | null;
  onCommunitySelect: (communityId: string | null) => void;
  className?: string;
}

export default function SpainMap({
  selectedCommunity,
  onCommunitySelect,
  className = '',
}: SpainMapProps) {
  const [hoveredCommunity, setHoveredCommunity] = useState<string | null>(null);

  const getShowroomCount = (communityId: string): number => {
    const community = exhibitionData.find((c) => c.id === communityId);
    return community?.showrooms.length || 0;
  };

  const getCommunityName = (communityId: string): string => {
    const community = spainCommunityPaths.find((c) => c.id === communityId);
    return community?.name || '';
  };

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 1000 800" className="w-full h-auto" aria-label="Mapa interactivo de España">
        {/* Background */}
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Selected glow filter */}
          <filter id="selectedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Community paths */}
        {spainCommunityPaths

          .map((community) => {
            const hasShowrooms = communitiesWithShowrooms.includes(community.id);
            const isHovered = hoveredCommunity === community.id;
            const isSelected = selectedCommunity === community.id;

            return (
              <motion.path
                key={community.id}
                d={community.path}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: isHovered || isSelected ? 1.02 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`
                transition-colors duration-300
                ${hasShowrooms ? 'cursor-pointer' : 'cursor-default'}
                ${isSelected
                    ? 'fill-primary stroke-primary/80'
                    : isHovered && hasShowrooms
                      ? 'fill-primary/40 stroke-primary/60'
                      : hasShowrooms
                        ? 'fill-muted/80 stroke-border/80 hover:fill-primary/20'
                        : 'fill-muted/20 stroke-border/30'
                  }
              `}
                strokeWidth={isSelected || isHovered ? 2 : 1.5}
                filter={isSelected ? 'url(#selectedGlow)' : isHovered ? 'url(#glow)' : undefined}
                onMouseEnter={() => hasShowrooms && setHoveredCommunity(community.id)}
                onMouseLeave={() => setHoveredCommunity(null)}
                onClick={() => {
                  if (hasShowrooms) {
                    onCommunitySelect(isSelected ? null : community.id);
                  }
                }}
              />
            );
          })}
      </svg>

      {/* Tooltip */}
      {hoveredCommunity && (
        <motion.div
          initial={{ opacity: 0, y: 5, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          className="absolute bottom-12 left-1/2 px-3 py-1.5 glass rounded-lg text-sm shadow-lg pointer-events-none whitespace-nowrap"
        >
          <span className="font-medium text-foreground">{getCommunityName(hoveredCommunity)}</span>
          <span className="text-muted-foreground ml-2">
            ({getShowroomCount(hoveredCommunity)} showrooms)
          </span>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-muted/80 border border-border/80" />
          <span>Con exposiciones</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-muted/20 border border-border/30" />
          <span>Sin exposiciones</span>
        </div>
      </div>
    </div>
  );
}
