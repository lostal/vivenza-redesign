
"use client";

import type { CommunityExhibitions, Showroom } from '@/lib/exhibition-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Phone, Building } from 'lucide-react';

interface ExhibitionAccordionProps {
  data: CommunityExhibitions[];
}

export default function ExhibitionAccordion({ data }: ExhibitionAccordionProps) {
  if (!data || data.length === 0) {
    return <p className="text-center text-muted-foreground">No hay información de exposiciones disponible.</p>;
  }

  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
      {data.map((community) => (
        <AccordionItem value={community.id} key={community.id} className="border bg-card rounded-lg shadow-md">
          <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline">
            <div className="flex items-center">
              <Building className="h-6 w-6 mr-3 text-primary" />
              {community.communityName}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2">
            {community.showrooms.map((showroom) => (
              <div key={showroom.id} className="mb-6 p-4 border border-border/70 rounded-md bg-background/50 last:mb-0">
                <h4 className="font-semibold text-md text-foreground mb-2">{showroom.name}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
                    <div>
                      {showroom.addressLines.map((line, index) => (
                        <span key={index} className="block">{line}</span>
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
