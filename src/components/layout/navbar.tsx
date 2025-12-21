'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const t = useTranslations('Navbar');

  const navLinks = [
    { href: '/', label: t('home'), isScroll: false },
    { href: 'sobre-nosotros', label: t('aboutUs'), isScroll: true },
    { href: '/locations', label: t('locations'), isScroll: false },
    { href: '/contact', label: t('contact'), isScroll: false },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string, isScroll: boolean) => {
    if (isScroll) {
      e.preventDefault();
      setIsSheetOpen(false);
      const aboutSection = document.getElementById('sobre-nosotros');
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      setIsSheetOpen(false);
    }
  };

  const isActiveLink = (href: string, isScroll: boolean) => {
    const pathWithoutLocale = pathname.replace(/^\/(es|en|fr)/, '') || '/';

    if (isScroll) {
      return false; // Never show scroll links as active
    }

    if (href === '/') {
      return pathWithoutLocale === '/';
    }

    const hrefPath = href.replace(/^\/(es|en|fr)/, '');
    return pathWithoutLocale.startsWith(hrefPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) =>
            link.isScroll ? (
              <button
                key={link.label}
                onClick={(e) => handleNavClick(e, link.href, link.isScroll)}
                className={cn(
                  'text-sm font-medium transition-all hover:text-primary relative py-1',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300',
                  'hover:after:w-full',
                  'text-foreground/80'
                )}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-all hover:text-primary relative py-1',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300',
                  'hover:after:w-full',
                  isActiveLink(link.href, link.isScroll)
                    ? 'text-primary after:w-full'
                    : 'text-foreground/80'
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[340px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) =>
                  link.isScroll ? (
                    <button
                      key={link.label}
                      onClick={(e) => handleNavClick(e, link.href, link.isScroll)}
                      className={cn(
                        'text-lg font-medium transition-all hover:text-primary p-3 rounded-md hover:bg-muted/50 text-left',
                        'text-foreground/80'
                      )}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.isScroll)}
                      className={cn(
                        'text-lg font-medium transition-all hover:text-primary p-3 rounded-md hover:bg-muted/50',
                        isActiveLink(link.href, link.isScroll)
                          ? 'text-primary bg-muted'
                          : 'text-foreground/80'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
