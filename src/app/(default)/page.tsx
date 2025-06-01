
import HeroShowcase from '@/components/hero-showcase';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Lightbulb } from 'lucide-react';
import SectionTitle from '@/components/section-title';

export default function HomePage() {
  return (
    <div>
      <HeroShowcase />

      {/* AI Style Finder Teaser */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container text-center">
           <SectionTitle
            icon={<Lightbulb className="h-8 w-8 text-primary" />}
            title="Descubre Tu Estilo Ideal"
            description="Sube una foto de tu espacio y deja que nuestra IA te ofrezca un análisis de diseño e inspiración."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/style-finder">Probar Buscador de Estilos IA <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
             <Image src="https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-1.jpg" alt="Ejemplo Buscador de Estilos IA" width={800} height={450} className="rounded-lg shadow-lg" data-ai-hint="stylish interior" />
          </div>
        </div>
      </section>

      {/* Location Teaser Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container text-center">
          <SectionTitle
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="Visita Nuestros Showrooms"
            description="Experimenta la calidad Vivenza de primera mano en nuestras ubicaciones de exposición."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/locations">Encuentra una Ubicación <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
           <div className="mt-12 max-w-4xl mx-auto relative aspect-video">
             <Image src="https://vivenzaexpo.es/wp-content/uploads/2025/03/VIVENZA-EXPOSICION-2.jpg" alt="Mapa con ubicaciones de showrooms" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" data-ai-hint="showroom design" />
          </div>
        </div>
      </section>
    </div>
  );
}
