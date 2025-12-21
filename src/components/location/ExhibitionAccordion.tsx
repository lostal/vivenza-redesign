'use client';

import type { CommunityExhibitions } from '@/lib/exhibition-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MapPin, Phone, Building } from 'lucide-react';

interface ExhibitionAccordionProps {
  data: CommunityExhibitions[];
}

export default function ExhibitionAccordion({ data }: ExhibitionAccordionProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No hay información de exposiciones disponible.
      </p>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-3xl mx-auto space-y-3 sm:space-y-4"
    >
      {data.map((community) => (
        <AccordionItem
          value={community.id}
          key={community.id}
          className="border bg-card rounded-lg shadow-md"
        >
          <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-headline hover:no-underline">
            <div className="flex items-center">
              <Building className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-primary shrink-0" />
              <span className="text-left">{community.communityName}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
            {community.showrooms.map((showroom) => (
              <div
                key={showroom.id}
                className="mb-5 sm:mb-6 p-3 sm:p-4 border border-border/70 rounded-md bg-background/50 last:mb-0"
              >
                <h4 className="font-semibold text-sm sm:text-md text-foreground mb-2">
                  {showroom.name}
                </h4>
                <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
                    <div>
                      {showroom.addressLines.map((line, index) => (
                        <span key={index} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 shrink-0 text-primary" />
                    <span>{showroom.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
