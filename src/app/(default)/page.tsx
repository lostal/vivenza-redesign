
import HeroShowcase from '@/components/hero-showcase';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import SectionTitle from '@/components/section-title';
import AboutUsCarousel from '@/components/about-us-carousel';

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
          <div className="max-w-4xl mx-auto text-lg text-foreground/80 text-center">
            <p className="mb-8">
              VIVENZA es la nueva marca comercial de GRUPOSIETE de Exposición de Baño y Cerámica.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-4 text-center">
                <p>
                  GRUPOSIETE es una empresa que comercializa y distribuye materiales de Calefacción, Fontanería, Climatización, Sanitario, Obra Civil, Materiales de la Construcción y Energías Renovables a través de puntos de venta para el profesional y Exposiciones de Baño y Cerámica.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <p>
                  GRUPOSIETE a través de VIVENZA ofrece soluciones integrales e innovadoras para crear espacios de diseño. En nuestras 12 exposiciones podrás explorar diferentes ambientes completos que te inspirarán.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <p>
                  Nuestro equipo de expertos te brindará una experiencia única con atención personalizada y soluciones a medida adaptadas a tu estilo.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <AboutUsCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Location Teaser Section */}
      <section id="locations-teaser" className="py-16 lg:py-24 bg-card">
        <div className="container text-center">
          <SectionTitle
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="Visita Nuestros Showrooms"
            description="Experimenta la calidad Vivenza de primera mano en nuestras ubicaciones de exposición."
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/locations">Encuentra tu tienda <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
