import SectionTitle from '@/components/section-title';
import ExhibitionAccordion from '@/components/location/ExhibitionAccordion';
import { exhibitionData } from '@/lib/exhibition-data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';

interface LocationsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function LocationsPage({ params }: LocationsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LocationsPage' });
  
  return (
    <div className="container py-10 sm:py-12 md:py-16 lg:py-20 px-4 mx-auto max-w-7xl">
      <SectionTitle
        title={t('title')}
        description={t('description')}
      />

      <div className="my-10 sm:my-12">
        <ExhibitionAccordion data={exhibitionData} />
      </div>
    </div>
  );
}
