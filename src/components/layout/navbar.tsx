
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import { useState, useEffect, useCallback } from 'react';

interface NavLinkItem {
  href: string; 
  label: string;
  sectionId?: string; 
  pagePath?: string; 
}

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Inicio', pagePath: '/' },
  { href: '/#sobre-nosotros', label: 'Sobre Nosotros', sectionId: 'sobre-nosotros', pagePath: '/' },
  { href: '/#locations-teaser', label: 'Ubicaciones', sectionId: 'locations-teaser', pagePath: '/locations' },
  { href: '/contact', label: 'Contacto', pagePath: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const updateActiveLink = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    let newActiveHref = '';

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const activationOffset = windowHeight * 0.4; 

    if (currentPath === '/') {
      let highestVisibleSectionTop = Infinity;
      let foundSectionByScroll = false;

      if (scrollY < activationOffset * 0.5) { 
        newActiveHref = '/';
        foundSectionByScroll = true;
      } else {
        for (const link of navLinks) {
          if (link.sectionId) {
            const sectionElement = document.getElementById(link.sectionId);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              if (rect.top < activationOffset && rect.bottom > activationOffset * 0.1 && rect.top < windowHeight) {
                if (rect.top < highestVisibleSectionTop) {
                    highestVisibleSectionTop = rect.top;
                    newActiveHref = link.href; 
                    foundSectionByScroll = true;
                }
              }
            }
          }
        }
      }
      
      if (currentPath === '/' && !foundSectionByScroll && scrollY >= activationOffset * 0.5) {
        if (!newActiveHref) newActiveHref = '/'; 
      }

    } else { 
      const directMatch = navLinks.find(link => link.pagePath === currentPath);
      if (directMatch) {
        newActiveHref = directMatch.href; 
      } else {
        const bestFallback = navLinks.find(link => currentPath.startsWith(link.pagePath || '') && link.pagePath !== '/') || navLinks.find(link => link.href === '/');
        newActiveHref = bestFallback ? bestFallback.href : currentPath;
      }
    }

    if (newActiveHref && activeLink !== newActiveHref) {
      setActiveLink(newActiveHref);
    } else if (!newActiveHref && currentPath === '/' && activeLink !== '/') { 
      setActiveLink('/');
    }
  }, [activeLink]); 

  useEffect(() => {
    updateActiveLink(); 

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('hashchange', updateActiveLink, { passive: true }); 

    return () => {
      window.removeEventListener('scroll', updateActiveLink);
      window.removeEventListener('hashchange', updateActiveLink);
    };
  }, [updateActiveLink]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        let initialLink = '';

        if (currentPath === '/' && currentHash) {
            const anchorMatch = navLinks.find(link => link.href === `/${currentHash}`);
            if (anchorMatch) initialLink = anchorMatch.href;
            else initialLink = '/'; 
        } else {
            const navLinkMatch = navLinks.find(link => link.pagePath === currentPath);
            if (navLinkMatch) {
                initialLink = navLinkMatch.href; 
            } else if (currentPath === '/') {
                initialLink = '/'; 
            } else {
                const bestFallback = navLinks.find(link => link.pagePath && currentPath.startsWith(link.pagePath) && link.pagePath !== '/') || navLinks.find(link => link.pagePath === '/');
                initialLink = bestFallback ? bestFallback.href : currentPath;
            }
        }
        setActiveLink(initialLink);
        
        if (currentPath === '/' && !currentHash && window.scrollY !== 0) {
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        }
    }
  }, [pathname]);


  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsSheetOpen(false); 
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="ml-4 mr-6 flex items-center space-x-2" onClick={() => handleLinkClick('/')}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href} 
              onClick={() => handleLinkClick(link.href)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                activeLink === link.href ? 'text-primary' : 'text-foreground/80'
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary p-2 rounded-md',
                      activeLink === link.href ? 'text-primary bg-muted' : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
