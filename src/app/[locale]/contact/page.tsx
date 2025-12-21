import SectionTitle from '@/components/section-title';
import ContactForm from '@/components/contact/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

interface ContactPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return (
    <div className="container py-10 sm:py-12 md:py-16 lg:py-20 px-4 mx-auto max-w-7xl">
      <SectionTitle title={t('title')} description={t('description')} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mt-10 sm:mt-12">
        <div>
          <h3 className="text-xl sm:text-2xl font-headline mb-4 sm:mb-6 text-foreground">
            {t('contactInfo')}
          </h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-3 sm:mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-base sm:text-lg text-foreground">
                  {t('ourHeadquarters')}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground">{t('headquarters')}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-3 sm:mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-base sm:text-lg text-foreground">{t('phone')}</h4>
                <p className="text-sm sm:text-base text-muted-foreground">{t('phoneNumber')}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-3 sm:mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-base sm:text-lg text-foreground">{t('email')}</h4>
                <p className="text-sm sm:text-base text-muted-foreground">{t('supportEmail')}</p>
                <p className="text-sm sm:text-base text-muted-foreground">{t('salesEmail')}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-card rounded-lg shadow">
            <h4 className="font-semibold text-base sm:text-lg text-foreground mb-2">
              {t('businessHours')}
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground">{t('mondayFriday')}</p>
            <p className="text-sm sm:text-base text-muted-foreground">{t('saturday')}</p>
            <p className="text-sm sm:text-base text-muted-foreground">{t('sunday')}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-headline mb-4 sm:mb-6 text-foreground">
            {t('sendMessage')}
          </h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
