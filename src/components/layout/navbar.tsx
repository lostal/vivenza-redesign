'use client';

import { Link, usePathname } from '@/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DOM_IDS } from '@/lib/constants';

type ValidHref = '/' | '/locations' | '/contact';

const navItems = [
  { href: '/' as ValidHref, labelKey: 'home' as const },
  { href: null, labelKey: 'aboutUs' as const, isAnchor: true },
  { href: '/locations' as ValidHref, labelKey: 'locations' as const },
  { href: '/contact' as ValidHref, labelKey: 'contact' as const },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const t = useTranslations('Navbar');

  const handleAnchorClick = () => {
    setIsSheetOpen(false);
    setTimeout(() => {
      const element = document.getElementById(DOM_IDS.ABOUT_SECTION);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isActive = (href: ValidHref | null) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname === href;
  };

  const linkClasses = (active: boolean) =>
    cn(
      'text-sm font-medium py-2 transition-colors',
      active ? 'text-primary' : 'text-foreground/80 hover:text-primary'
    );

  const mobileLinkClasses = (active: boolean) =>
    cn(
      'text-base font-medium p-3 rounded-md transition-colors',
      active ? 'text-primary bg-muted' : 'text-foreground/80 hover:text-primary hover:bg-muted/50'
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) =>
            item.isAnchor ? (
              <button
                key={item.labelKey}
                onClick={handleAnchorClick}
                className={linkClasses(false)}
              >
                {t(item.labelKey)}
              </button>
            ) : (
              <Link
                key={item.labelKey}
                href={item.href!}
                className={linkClasses(isActive(item.href))}
              >
                {t(item.labelKey)}
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
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) =>
                  item.isAnchor ? (
                    <button
                      key={item.labelKey}
                      onClick={handleAnchorClick}
                      className={cn(mobileLinkClasses(false), 'text-left')}
                    >
                      {t(item.labelKey)}
                    </button>
                  ) : (
                    <Link
                      key={item.labelKey}
                      href={item.href!}
                      onClick={() => setIsSheetOpen(false)}
                      className={mobileLinkClasses(isActive(item.href))}
                    >
                      {t(item.labelKey)}
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
