import SectionTitle from '@/components/section-title';
import ContactForm from '@/components/contact/contact-form';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Link } from '@/navigation';

interface ContactPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return { title: 'Vivenza | Contact' };
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return {
    title: `Vivenza | ${t('title')}`,
    description: t('description'),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Hero Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary tracking-wide">
                {t('availableBadge')}
              </span>
            </div>
            <SectionTitle
              title={t('title')}
              description={t('description')}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left Column - Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Location Card */}
                <div className="group relative p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{t('ourHeadquarters')}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t('headquarters')}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group relative p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{t('phone')}</h3>
                      <p className="text-sm text-muted-foreground">{t('phoneNumber')}</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group relative p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{t('email')}</h3>
                      <p className="text-sm text-muted-foreground">{t('supportEmail')}</p>
                      <p className="text-sm text-muted-foreground">{t('salesEmail')}</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="group relative p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2">{t('businessHours')}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center justify-between">
                          <span>{t('weekdays')}</span>
                          <span className="text-foreground/80">{t('weekdaysHours')}</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span>{t('saturday')}</span>
                          <span className="text-foreground/80">{t('saturdayHours')}</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span>{t('sunday')}</span>
                          <span className="text-foreground/60">{t('sundayClosed')}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Banner */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border border-primary/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="relative">
                  <h3 className="font-headline text-lg text-foreground mb-2">
                    {t('ctaTitle')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('ctaDescription')}
                  </p>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                  >
                    {t('ctaLink')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-7">
              <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24">
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-accent/20 rounded-bl-2xl" />
                </div>

                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-headline text-foreground mb-2">
                    {t('sendMessage')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('formDescription')}
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </main>
  );
}
