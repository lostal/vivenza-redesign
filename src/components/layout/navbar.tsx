'use client';

import { Link, usePathname } from '@/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { DOM_IDS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';

interface NavItem {
  href: '/' | '/contact' | null;
  labelKey: 'home' | 'aboutUs' | 'locations' | 'contact';
  isAnchor?: boolean;
  anchorId?: string;
}

const navItems: NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: null, labelKey: 'aboutUs', isAnchor: true, anchorId: DOM_IDS.ABOUT_SECTION },
  { href: null, labelKey: 'locations', isAnchor: true, anchorId: DOM_IDS.LOCATIONS_TEASER },
  { href: '/contact', labelKey: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const t = useTranslations('Navbar');

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (anchorId: string) => {
    setIsSheetOpen(false);

    // If not on home page, navigate to home first then scroll
    if (pathname !== '/') {
      router.push('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    // If already on home, scroll to top smoothly
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (item: NavItem) => {
    if (item.isAnchor) return false;
    if (item.href === '/') return pathname === '/';
    return pathname === item.href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        hasScrolled
          ? 'glass border-b border-border/30 shadow-lg shadow-black/5'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container flex h-18 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center transition-all duration-300 hover:opacity-80 hover:scale-[0.98]"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center">
          {navItems.map((item) => {
            const active = isActive(item);

            if (item.isAnchor) {
              return (
                <button
                  key={item.labelKey}
                  onClick={() => handleAnchorClick(item.anchorId!)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                    'text-foreground/70 hover:text-foreground',
                    'link-underline'
                  )}
                >
                  {t(item.labelKey)}
                </button>
              );
            }

            if (item.href === '/') {
              return (
                <Link
                  key={item.labelKey}
                  href={item.href}
                  onClick={handleHomeClick}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                    active
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground link-underline'
                  )}
                >
                  {t(item.labelKey)}
                  {active && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={item.labelKey}
                href={item.href!}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                  active
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground link-underline'
                )}
              >
                {t(item.labelKey)}
                {active && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="ml-4 pl-4 border-l border-border/30">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative w-10 h-10 hover:bg-muted/50">
                <AnimatePresence mode="wait">
                  {isSheetOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">{t('openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm glass border-l border-border/30 p-0"
            >
              <nav className="flex flex-col h-full pt-20 pb-8 px-6">
                <div className="flex-1 space-y-2">
                  {navItems.map((item, index) => {
                    const active = isActive(item);

                    if (item.isAnchor) {
                      return (
                        <motion.button
                          key={item.labelKey}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          onClick={() => handleAnchorClick(item.anchorId!)}
                          className={cn(
                            'w-full text-left text-lg font-medium p-4 rounded-xl',
                            'transition-all duration-300',
                            'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                          )}
                        >
                          {t(item.labelKey)}
                        </motion.button>
                      );
                    }

                    if (item.href === '/') {
                      return (
                        <motion.div
                          key={item.labelKey}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              handleHomeClick(e);
                              setIsSheetOpen(false);
                            }}
                            className={cn(
                              'block text-lg font-medium p-4 rounded-xl',
                              'transition-all duration-300',
                              active
                                ? 'text-primary bg-primary/10'
                                : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                            )}
                          >
                            {t(item.labelKey)}
                          </Link>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={item.labelKey}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <Link
                          href={item.href!}
                          onClick={() => setIsSheetOpen(false)}
                          className={cn(
                            'block text-lg font-medium p-4 rounded-xl',
                            'transition-all duration-300',
                            active
                              ? 'text-primary bg-primary/10'
                              : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                          )}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom branding */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="pt-8 border-t border-border/30"
                >
                  <p className="text-xs text-muted-foreground text-center">
                    © {new Date().getFullYear()} Vivenza
                  </p>
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
