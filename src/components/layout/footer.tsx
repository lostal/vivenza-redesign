'use client';

import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/logo';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { EXTERNAL_URLS, SITE_CONFIG } from '@/lib/constants';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut' as const,
    },
  },
};

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { href: '/#sobre-nosotros', label: t('aboutUs') },
      { href: '/locations', label: t('locations') },
    ],
    support: [{ href: '/contact', label: t('contactUs') }],
  };

  return (
    <footer className="relative border-t border-border/30 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/2 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="container relative py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              {t('description')}
            </p>
            <Link
              href={EXTERNAL_URLS.GRUPO_SIETE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src={EXTERNAL_URLS.GRUPO_SIETE_LOGO}
                alt="Una marca de GrupoSiete"
                width={180}
                height={15}
                className="h-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>
          </motion.div>

          {/* Explorar */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6">
              {t('explore')}
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Soporte & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6">
              {t('support')}
            </h3>
            <ul className="space-y-4 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-4">
              {t('connect')}
            </h3>
            <Link
              href={EXTERNAL_URLS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} {SITE_CONFIG.NAME}. {t('copyright')}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
