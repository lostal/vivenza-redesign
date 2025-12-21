import HeroShowcaseClientContent from '@/components/hero-showcase-client-content';
import { MapPin, Users } from 'lucide-react';
import SectionTitle from '@/components/section-title';
import AboutUsCarousel from '@/components/about-us-carousel';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import LocationsTeaserButton from '@/components/locations-teaser-button';
import { EXTERNAL_URLS, DOM_IDS } from '@/lib/constants';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const tHero = await getTranslations({ locale, namespace: 'HeroShowcaseClientContent' });
  const tLocationsButton = await getTranslations({ locale, namespace: 'LocationsTeaserButton' });

  return (
    <div>
      <HeroShowcaseClientContent
        titleLine1={tHero('titleLine1')}
        titleLine2={tHero('titleLine2')}
        description={tHero('description')}
        aboutUsButtonText={tHero('aboutUsButtonText')}
        contactUsButtonText={tHero('contactUsButtonText')}
      />

      {/* About Us Section */}
      <section id={DOM_IDS.ABOUT_SECTION} className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container px-4">
          <SectionTitle
            icon={<Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />}
            title={t('aboutUs.title')}
          />
          <div className="max-w-4xl mx-auto text-base sm:text-lg text-foreground/80 text-center">
            <p className="mb-6 sm:mb-8">{t('aboutUs.intro')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
              <div className="space-y-3 sm:space-y-4 text-center">
                <p>{t('aboutUs.paragraph1')}</p>
              </div>
              <div className="space-y-3 sm:space-y-4 text-center">
                <p>{t('aboutUs.paragraph2')}</p>
              </div>
              <div className="space-y-3 sm:space-y-4 text-center">
                <p>{t('aboutUs.paragraph3')}</p>
              </div>
            </div>
            <div className="mt-10 sm:mt-12">
              <AboutUsCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Location Teaser Section */}
      <section id={DOM_IDS.LOCATIONS_TEASER} className="py-12 sm:py-16 lg:py-24 bg-card">
        <div className="container px-4 text-center">
          <SectionTitle
            icon={<MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />}
            title={t('locationsTeaser.title')}
            description={t('locationsTeaser.description')}
          />
          <div className="mt-8 sm:mt-10">
            <LocationsTeaserButton buttonText={tLocationsButton('findStore')} />
          </div>
          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto aspect-video rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={EXTERNAL_URLS.YOUTUBE_VIDEO}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
