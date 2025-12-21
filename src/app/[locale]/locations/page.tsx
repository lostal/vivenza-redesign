import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import LocationsPageClient from '@/components/location/locations-page-client';

interface LocationsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function LocationsPage({ params }: LocationsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LocationsPage' });

  return (
    <LocationsPageClient
      title={t('title')}
      description={t('description')}
      eyebrow={t('eyebrow')}
      selectRegion={t('selectRegion')}
      filteringBy={t('filteringBy')}
      showAll={t('showAll')}
    />
  );
}
