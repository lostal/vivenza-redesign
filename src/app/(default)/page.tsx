
import HeroShowcase from '@/components/hero-showcase';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Lightbulb, Users } from 'lucide-react';
import SectionTitle from '@/components/section-title';

export default function HomePage() {
  return (
    <div>
      <HeroShowcase />

      {/* Sobre Nosotros Section */}
      <section id="sobre-nosotros" className="py-16 lg:py-24 bg-background">
        <div className="container">
          <SectionTitle
            icon={<Users className="h-8 w-8 text-primary" />}
            title="SOBRE NOSOTROS"
          />
          <div className="max-w-4xl mx-auto text-lg text-foreground/80 text-left">
            <p className="mb-8">
              VIVENZA es la nueva marca comercial de GRUPOSIETE de Exposición de Baño y Cerámica.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p>
                  GRUPOSIETE es una empresa que comercializa y distribuye materiales de Calefacción, Fontanería, Climatización, Sanitario, Obra Civil, Materiales de la Construcción y Energías Renovables a través de puntos de venta para el profesional y Exposiciones de Baño y Cerámica.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  GRUPOSIETE a través de VIVENZA ofrece soluciones integrales e innovadoras para crear espacios de diseño. En nuestras 12 exposiciones podrás explorar diferentes ambientes completos que te inspirarán.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Nuestro equipo de expertos te brindará una experiencia única con atención personalizada y soluciones a medida adaptadas a tu estilo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Style Finder Teaser */}
      <section id="ai-style-finder-teaser" className="py-16 lg:py-24 bg-card">
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
      <section id="locations-teaser" className="py-16 lg:py-24 bg-background">
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
           <div className="mt-12 max-w-4xl mx-auto aspect-video rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/k95tU4XvWDs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
