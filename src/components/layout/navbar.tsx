
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

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/style-finder', label: 'Buscador IA' },
  { href: '/locations', label: 'Ubicaciones' },
  { href: '/contact', label: 'Contacto' },
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
    // A section is "active" if its top is above this point in the viewport
    const activationOffset = windowHeight * 0.4; 

    let bestMatchFound = false;

    // Check anchor links. Iterate from defined order, last one to meet criteria wins.
    // This helps if sections are close or if definition order matters.
    for (const link of navLinks) {
      if (link.href.startsWith('/#') && currentPath === '/') { // Only for homepage anchors
        const sectionId = link.href.substring(2); // From '/#id' to 'id'
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const sectionTop = sectionElement.getBoundingClientRect().top;
          // If section top is above activation offset, it's a candidate
          if (sectionTop < activationOffset) {
            newActiveHref = link.href;
            bestMatchFound = true; 
            // Continue checking as a lower section might also meet criteria and be the "current" one
          } else if (bestMatchFound) {
            // If we already found a section and this one is below the offset,
            // the previous one (higher on page) was the correct one.
            break;
          }
        }
      }
    }
    
    if (bestMatchFound) {
      // If an anchor section on the homepage is active, use it.
    } else if (currentPath === '/' && scrollY < 50) {
      // Homepage, scrolled to the very top
      newActiveHref = '/';
    } else {
      // For non-homepage paths or homepage without active section by scroll
      // Try to match the full path (including hash if present) or just the base path
      const fullPathWithHash = currentPath + currentHash;
      const directMatch = navLinks.find(link => link.href === fullPathWithHash || link.href === currentPath);
      if (directMatch) {
        newActiveHref = directMatch.href;
      } else if (currentPath === '/') {
        newActiveHref = '/'; // Fallback for home if no section active
      } else {
        // Fallback for other pages if no exact match (e.g. sub-pages not in nav)
        newActiveHref = currentPath; 
      }
    }

    if (newActiveHref && activeLink !== newActiveHref) {
      setActiveLink(newActiveHref);
    } else if (!newActiveHref && currentPath === '/' && activeLink !== '/') {
      // If somehow newActiveHref is empty on home, ensure 'Inicio' is active
      setActiveLink('/');
    }

  }, [activeLink, pathname]); // pathname ensures re-check if base path changes

  useEffect(() => {
    // Initial determination of active link
    updateActiveLink();

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('hashchange', updateActiveLink, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveLink);
      window.removeEventListener('hashchange', updateActiveLink);
    };
  }, [updateActiveLink]); // Run when updateActiveLink (and its dependencies) change

   // Ensure active link is correctly set on direct page loads or navigations
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        let initialLink = currentPath; // Default to current path

        if (currentHash) {
            const pathWithHash = currentPath + currentHash;
            if (navLinks.some(link => link.href === pathWithHash)) {
                initialLink = pathWithHash;
            }
        } else {
             if (navLinks.some(link => link.href === currentPath)) {
                initialLink = currentPath;
            }
        }
        // Special case for homepage root
        if (initialLink === '/' && currentHash === '') {
          setActiveLink('/');
        } else if (navLinks.some(link => link.href === initialLink)) {
          setActiveLink(initialLink);
        } else {
           // Fallback to just the path if no specific navLink matches (e.g. for sub-pages not in nav)
           // or if it's a hash link to a non-nav section on another page.
           const bestFallback = navLinks.find(link => currentPath.startsWith(link.href) && link.href !== '/') || navLinks.find(link => link.href === '/');
           setActiveLink(bestFallback ? bestFallback.href : currentPath);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Rerun only when pathname changes, not on every activeLink change from scroll


  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsSheetOpen(false); // Close mobile menu on link click

    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => handleLinkClick('/')}>
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
