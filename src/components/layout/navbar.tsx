'use client';

import { Link, usePathname } from '@/navigation';
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

// Type for active section - 'home' means top of page, anchorId for sections
type ActiveSection = 'home' | string;

// Animation variants for the overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }
  }
};

// Animation variants for the menu container
const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

// Animation variants for each menu item
const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(5px)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const t = useTranslations('Navbar');

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Scroll spy effect - detect which section is currently in view
  useEffect(() => {
    // Only run scroll spy on home page
    if (pathname !== '/') {
      setActiveSection('home');
      return;
    }

    const sectionIds = [DOM_IDS.LOCATIONS_TEASER, DOM_IDS.ABOUT_SECTION];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find which sections are currently intersecting
      const intersecting = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target.id);

      if (intersecting.length === 0) {
        // No sections in view - check if we're at top or bottom
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // If near top, set to home
        if (scrollY < 200) {
          setActiveSection('home');
        }
        // If near bottom, check if locations is the last section
        else if (scrollY + windowHeight >= docHeight - 100) {
          const locationsEl = document.getElementById(DOM_IDS.LOCATIONS_TEASER);
          if (locationsEl) {
            setActiveSection(DOM_IDS.LOCATIONS_TEASER);
          }
        }
        return;
      }

      // Priority: if multiple sections visible, pick the one closest to top of viewport
      let closestSection = intersecting[0];
      let closestDistance = Infinity;

      for (const id of intersecting) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = id;
          }
        }
      }

      setActiveSection(closestSection);
    };

    // Use a threshold that triggers when section is reasonably in view
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper portion of viewport
      threshold: [0, 0.1, 0.2],
    });

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Also handle initial state and scroll to top detection
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (anchorId: string) => {
    setIsMenuOpen(false);

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
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (item: NavItem) => {
    // For contact page - check pathname
    if (item.href === '/contact') {
      return pathname === '/contact';
    }

    // For anchor sections - use scroll spy when on home page
    if (item.isAnchor && item.anchorId) {
      return pathname === '/' && activeSection === item.anchorId;
    }

    // For home - active when on home page AND at top (activeSection is 'home')
    if (item.href === '/') {
      return pathname === '/' && activeSection === 'home';
    }

    return false;
  };

  return (
    <>
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
            className="flex items-center transition-all duration-300 hover:opacity-80 hover:scale-[0.98] relative z-[60]"
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

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 hover:bg-muted/50 z-[60]"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
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
          </div>
        </div>
      </motion.header>

      {/* Premium Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[55] md:hidden"
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            {/* Decorative glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Menu Content */}
            <motion.nav
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative h-full flex flex-col items-center justify-center gap-2 px-6"
            >
              {navItems.map((item) => {
                const active = isActive(item);

                if (item.isAnchor) {
                  return (
                    <motion.div key={item.labelKey} variants={menuItemVariants}>
                      <button
                        onClick={() => handleAnchorClick(item.anchorId!)}
                        className={cn(
                          'relative text-3xl font-headline tracking-tight py-4 px-8 block w-full',
                          'transition-all duration-300',
                          active
                            ? 'text-primary'
                            : 'text-foreground/70 hover:text-foreground'
                        )}
                      >
                        <span className="relative z-10">{t(item.labelKey)}</span>
                        {active && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-primary/10 rounded-2xl"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </button>
                    </motion.div>
                  );
                }

                if (item.href === '/') {
                  return (
                    <motion.div key={item.labelKey} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        onClick={handleHomeClick}
                        className={cn(
                          'relative text-3xl font-headline tracking-tight py-4 px-8 block',
                          'transition-all duration-300',
                          active
                            ? 'text-primary'
                            : 'text-foreground/70 hover:text-foreground'
                        )}
                      >
                        <span className="relative z-10">{t(item.labelKey)}</span>
                        {active && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-primary/10 rounded-2xl"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={item.labelKey} variants={menuItemVariants}>
                    <Link
                      href={item.href!}
                      onClick={handleLinkClick}
                      className={cn(
                        'relative text-3xl font-headline tracking-tight py-4 px-8 block',
                        'transition-all duration-300',
                        active
                          ? 'text-primary'
                          : 'text-foreground/70 hover:text-foreground'
                      )}
                    >
                      <span className="relative z-10">{t(item.labelKey)}</span>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-primary/10 rounded-2xl"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Bottom branding */}
              <motion.div
                variants={menuItemVariants}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">
                    © {new Date().getFullYear()} Vivenza
                  </p>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

