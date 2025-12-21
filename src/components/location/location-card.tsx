import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Location } from '@/lib/types';
import { MapPin, Phone, Clock } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
      <CardHeader className="p-0 relative aspect-[16/9]">
        <Image
          src={location.imageUrl}
          alt={location.name}
          width={600}
          height={338}
          className="object-cover w-full h-full"
          data-ai-hint={location.dataAiHint || 'store exterior'}
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 font-headline">{location.name}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
            <span>{location.address}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 shrink-0 text-primary" />
            <span>{location.phone}</span>
          </div>
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
            <span>{location.openingHours}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" asChild className="w-full">
          <a
            href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
