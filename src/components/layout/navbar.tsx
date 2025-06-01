
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
  href: string; // Usado para el comportamiento del <Link> y el scroll en la home
  label: string;
  sectionId?: string; // ID del elemento en la página de inicio para activar este enlace por scroll
  pagePath?: string; // La ruta real de la página (ej. /style-finder) para el resaltado
}

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Inicio', pagePath: '/' },
  { href: '/#sobre-nosotros', label: 'Sobre Nosotros', sectionId: 'sobre-nosotros', pagePath: '/' },
  { href: '/#ai-style-finder-teaser', label: 'Buscador IA', sectionId: 'ai-style-finder-teaser', pagePath: '/style-finder' },
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
    const activationOffset = windowHeight * 0.4; // Activate when top of section reaches 40% of viewport height

    if (currentPath === '/') {
      let highestVisibleSectionTop = Infinity;
      let foundSectionByScroll = false;

      // Special case for "Inicio" when at the very top or near it
      if (scrollY < activationOffset * 0.5) { // Consider top 20% of viewport for "Inicio"
        newActiveHref = '/';
        foundSectionByScroll = true;
      } else {
        for (const link of navLinks) {
          if (link.sectionId) {
            const sectionElement = document.getElementById(link.sectionId);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              // Check if the section is within the activation zone (between 10% and 40% from top)
              // and its top is less than the current highest visible section
              if (rect.top < activationOffset && rect.bottom > activationOffset * 0.1 && rect.top < windowHeight) {
                if (rect.top < highestVisibleSectionTop) {
                    highestVisibleSectionTop = rect.top;
                    newActiveHref = link.href; // This href points to the anchor
                    foundSectionByScroll = true;
                }
              }
            }
          }
        }
      }
      
      // Fallback for homepage if no section is actively scrolled to but past the initial "Inicio" threshold
      if (currentPath === '/' && !foundSectionByScroll && scrollY >= activationOffset * 0.5) {
        // If no specific section is "active" but we've scrolled down, keep the last known or default to "Inicio"
        if (!newActiveHref) newActiveHref = '/'; // Default to "Inicio" if nothing else matches
      }

    } else { // For pages that are not the homepage
      // Find the link whose pagePath matches the current non-homepage path
      const directMatch = navLinks.find(link => link.pagePath === currentPath);
      if (directMatch) {
        newActiveHref = directMatch.href; // Activate the href (which could be an anchor or the pagePath itself)
      } else {
        // Fallback for sub-pages or unlinked pages: try to find a parent or default to "Inicio"
        const bestFallback = navLinks.find(link => currentPath.startsWith(link.pagePath || '') && link.pagePath !== '/') || navLinks.find(link => link.href === '/');
        newActiveHref = bestFallback ? bestFallback.href : currentPath;
      }
    }

    if (newActiveHref && activeLink !== newActiveHref) {
      setActiveLink(newActiveHref);
    } else if (!newActiveHref && currentPath === '/' && activeLink !== '/') { // Ensure "Inicio" is active if no other conditions met on homepage
      setActiveLink('/');
    }
  }, [activeLink, pathname]); // Removed navLinks from dependencies as it's constant

  useEffect(() => {
    updateActiveLink(); // Initial call to set active link based on URL

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('hashchange', updateActiveLink, { passive: true }); // For direct anchor navigation

    // Cleanup listeners
    return () => {
      window.removeEventListener('scroll', updateActiveLink);
      window.removeEventListener('hashchange', updateActiveLink);
    };
  }, [updateActiveLink]); // updateActiveLink is memoized and should only change if its dependencies change

  // Effect for initial load and pathname changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        let initialLink = '';

        // Check if we are on the homepage and there is an anchor
        if (currentPath === '/' && currentHash) {
            const anchorMatch = navLinks.find(link => link.href === `/${currentHash}`);
            if (anchorMatch) initialLink = anchorMatch.href;
            else initialLink = '/'; // Default to "Inicio" if anchor doesn't match a navLink
        } else {
            // Check if the current path (without anchor) matches pagePath of any link
            const navLinkMatch = navLinks.find(link => link.pagePath === currentPath);
            if (navLinkMatch) {
                initialLink = navLinkMatch.href; // Use the href of the navLink (could be an anchor for teaser sections)
            } else if (currentPath === '/') {
                initialLink = '/'; // Root of the homepage
            } else {
                // Fallback for other pages (e.g., sub-pages not in nav, like a blog post if it existed)
                // Try to find a link whose pagePath is a prefix of the currentPath, or default to "Inicio"
                const bestFallback = navLinks.find(link => link.pagePath && currentPath.startsWith(link.pagePath) && link.pagePath !== '/') || navLinks.find(link => link.pagePath === '/');
                initialLink = bestFallback ? bestFallback.href : currentPath;
            }
        }
        setActiveLink(initialLink);
        
        // Scroll to top smoothly if navigating to home page without a hash and not already at top
        if (currentPath === '/' && !currentHash && window.scrollY !== 0) {
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        }
    }
  }, [pathname]);


  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsSheetOpen(false); 
    // The Next.js <Link> component and html's scroll-smooth handle the scrolling.
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
              href={link.href} // This will now correctly point to /#section-id for teasers
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
