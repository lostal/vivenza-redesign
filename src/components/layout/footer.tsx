"use client";

import Link from 'next/link';
import { Instagram } from 'lucide-react';
import Logo from '@/components/logo';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>('...');
  const t = useTranslations('Footer');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t('description')}
            </p>
            <div>
              <Link href="https://gruposiete.es/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://vivenzaexpo.es/wp-content/uploads/2025/03/UNA-MARCA-DE-GRUPOSIETE-VIVENZA.png"
                  alt="Una marca de GrupoSiete"
                  width={241}
                  height={20}
                  className="h-auto max-w-[200px]"
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">{t('explore')}</h3>
            <ul role="list" className="space-y-2">
              <li><Link href="/#sobre-nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('aboutUs')}</Link></li>
              <li><Link href="/locations" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('locations')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">{t('support')}</h3>
            <ul role="list" className="space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('contactUs')}</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('faq')}</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('privacy')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">{t('connect')}</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://www.instagram.com/gruposiete_vivenza/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Vivenza. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
