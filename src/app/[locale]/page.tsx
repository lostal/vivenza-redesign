
import HeroShowcase from '@/components/hero-showcase';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Link } from 'next-intl/navigation';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import SectionTitle from '@/components/section-title';
import AboutUsCarousel from '@/components/about-us-carousel';
import { getTranslator } from 'next-intl/server';
import type { Locale } from '@/i18n';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslator(locale, 'HomePage');

  return (
    <div>
      <HeroShowcase />

      {/* Sobre Nosotros Section */}
      <section id="sobre-nosotros" className="py-16 lg:py-24 bg-background">
        <div className="container">
          <SectionTitle
            icon={<Users className="h-8 w-8 text-primary" />}
            title={t('aboutUs.title')}
          />
          <div className="max-w-4xl mx-auto text-lg text-foreground/80 text-center"> {/* Cambiado de text-left a text-center */}
            <p className="mb-8">
              {t('aboutUs.intro')}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-4">
                <p>
                  {t('aboutUs.paragraph1')}
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  {t('aboutUs.paragraph2')}
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  {t('aboutUs.paragraph3')}
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
            title={t('locationsTeaser.title')}
            description={t('locationsTeaser.description')}
          />
          <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/locations">{t('locationsTeaser.button')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
