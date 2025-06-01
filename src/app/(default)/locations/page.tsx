
import SectionTitle from '@/components/section-title';
import LocationCard from '@/components/location/location-card';
import { placeholderLocations } from '@/lib/placeholder-data';
import Image from 'next/image';

export default function LocationsPage() {
  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        title="Nuestros Showrooms"
        description="Visítanos para experimentar la calidad Vivenza y obtener asesoramiento experto."
      />

      <div className="my-12 rounded-lg overflow-hidden shadow-xl">
        {/* Placeholder for interactive map. For now, a static image. */}
        <div className="relative aspect-[2/1] w-full bg-muted">
           <Image 
            src="https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-3.jpg" 
            alt="Mapa de ubicaciones Vivenza" 
            layout="fill"
            objectFit="cover"
            data-ai-hint="modern space"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="text-2xl text-white font-semibold p-4 bg-black/50 rounded-md">Mapa Interactivo Próximamente</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {placeholderLocations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
