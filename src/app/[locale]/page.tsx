import HeroShowcaseClientContent from '@/components/hero-showcase-client-content';
import { MapPin, Users, Play } from 'lucide-react';
import SectionTitle from '@/components/section-title';
import AboutUsCarousel from '@/components/about-us-carousel';
import FeatureCards from '@/components/feature-cards';
import LocationsTeaserMap from '@/components/locations-teaser-map';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { EXTERNAL_URLS, DOM_IDS } from '@/lib/constants';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const tHero = await getTranslations({ locale, namespace: 'HeroShowcaseClientContent' });
  const tLocationsButton = await getTranslations({ locale, namespace: 'LocationsTeaserButton' });
  const tMap = await getTranslations({ locale, namespace: 'LocationsTeaserMap' });

  const features = [
    {
      title: t('features.title1'),
      description: t('aboutUs.paragraph1'),
    },
    {
      title: t('features.title2'),
      description: t('aboutUs.paragraph2'),
    },
    {
      title: t('features.title3'),
      description: t('aboutUs.paragraph3'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroShowcaseClientContent
        titleLine1={tHero('titleLine1')}
        titleLine2={tHero('titleLine2')}
        description={tHero('description')}
        aboutUsButtonText={tHero('aboutUsButtonText')}
        contactUsButtonText={tHero('contactUsButtonText')}
        badge={tHero('badge')}
        scrollText={tHero('scrollText')}
      />

      {/* About Us Section */}
      <section id={DOM_IDS.ABOUT_SECTION} className="section-padding bg-background relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
          <div className="absolute bottom-1/4 -left-64 w-[400px] h-[400px] rounded-full bg-accent/3 blur-3xl" />
        </div>

        <div className="container relative">
          <SectionTitle
            icon={<Users className="h-6 w-6 md:h-7 md:w-7" />}
            eyebrow={t('sections.aboutUsEyebrow')}
          />

          {/* Introduction */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {t('aboutUs.intro')}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mb-20">
            <FeatureCards features={features} />
          </div>

          {/* Carousel */}
          <AboutUsCarousel />
        </div>
      </section>

      {/* Locations Teaser Section - Interactive Map */}
      <section
        id={DOM_IDS.LOCATIONS_TEASER}
        className="section-padding bg-card/30 relative overflow-hidden"
      >
        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container relative">
          <SectionTitle
            icon={<MapPin className="h-6 w-6 md:h-7 md:w-7" />}
            eyebrow={t('sections.locationsEyebrow')}
            description={t('locationsTeaser.description')}
          />

          {/* Interactive Map */}
          <div className="mb-20">
            <LocationsTeaserMap
              buttonText={tLocationsButton('findStore')}
              translations={{
                showroomSingular: tMap('showroomSingular'),
                showroomPlural: tMap('showroomPlural'),
                moreShowrooms: tMap.raw('moreShowrooms'),
                selectRegion: tMap('selectRegion'),
              }}
            />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-background relative">
        <div className="container">
          <SectionTitle
            icon={<Play className="h-6 w-6 md:h-7 md:w-7" />}
            eyebrow={t('sections.videoEyebrow')}
            description={t('sections.videoDescription')}
          />

          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-border/20">
              <iframe
                className="w-full h-full"
                src={EXTERNAL_URLS.YOUTUBE_VIDEO}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />

              {/* Decorative frame */}
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for visual breathing room */}
      <div className="h-8 md:h-12 bg-background" />
    </>
  );
}
