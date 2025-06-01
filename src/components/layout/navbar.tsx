
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

// Definición de NavLink con sectionId opcional para mapeo en la homepage
interface NavLinkItem {
  href: string;
  label: string;
  sectionId?: string; // ID del elemento en la página de inicio para activar este enlace por scroll
}

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Inicio' }, // sectionId podría ser el hero si se quisiera
  { href: '/#sobre-nosotros', label: 'Sobre Nosotros', sectionId: 'sobre-nosotros' },
  { href: '/style-finder', label: 'Buscador IA', sectionId: 'ai-style-finder-teaser' },
  { href: '/locations', label: 'Ubicaciones', sectionId: 'locations-teaser' },
  { href: '/contact', label: 'Contacto' }, // No tiene sección teaser en la home, es página directa
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
    // Un umbral más pequeño (ej. 25-30%) puede ser mejor para que la sección se active antes.
    // O un offset desde la parte superior de la ventana (ej. 100px).
    // Por ahora, mantenemos 40% como estaba, pero se puede ajustar.
    const activationOffset = windowHeight * 0.4;

    if (currentPath === '/') { // Lógica de scroll para la página de inicio
      let highestVisibleSectionTop = Infinity;
      let foundSectionByScroll = false;

      // Comprobar primero si estamos muy arriba para "Inicio"
      if (scrollY < activationOffset * 0.5) { // Ajustar este umbral si es necesario
        newActiveHref = '/';
        foundSectionByScroll = true;
      } else {
        // Iterar sobre los navLinks para encontrar la sección visible más alta
        // Se asume que los navLinks están en el orden en que aparecen en la página (o su secciónId correspondiente)
        for (const link of navLinks) {
          if (link.sectionId) {
            const sectionElement = document.getElementById(link.sectionId);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              // La sección es candidata si su parte superior está por encima del offset de activación
              // y su parte inferior aún no ha pasado completamente el offset (o alguna parte es visible)
              // y la parte superior de la sección está dentro de la ventana.
              if (rect.top < activationOffset && rect.bottom > activationOffset * 0.1 && rect.top < windowHeight) {
                 // Si esta sección está más arriba que la anterior encontrada, o es la primera.
                if (rect.top < highestVisibleSectionTop) {
                    highestVisibleSectionTop = rect.top;
                    newActiveHref = link.href; // Usar el href del navLink (puede ser ancla o página)
                    foundSectionByScroll = true;
                }
              }
            }
          }
        }
      }
      
      // Si después de scrollear no se encontró ninguna sección específica y no estamos en el "Inicio" por scrollY bajo
      if (currentPath === '/' && !foundSectionByScroll && scrollY >= activationOffset * 0.5) {
        // Si no se encontró una sección activa por scroll y hemos bajado,
        // podríamos hacer default a Inicio o dejar que el último activeLink persista si es relevante.
        // Por ahora, si no hay match específico por scroll en la home, y no es el top, se queda en el último activo o default a Inicio.
        // La lógica de abajo (setActiveLink) se encarga de esto.
        // Si newActiveHref no se seteó aquí, se usará el que venga del pathname o el anterior.
        // Para evitar que se quede "colgado" en una sección pasada, si no hay nada claro, Inicio es un buen fallback.
        if (!newActiveHref) newActiveHref = '/';
      }


    } else { // Para páginas que no son la de inicio
      const fullPathWithHash = currentPath + currentHash;
      const directMatch = navLinks.find(link => link.href === fullPathWithHash || link.href === currentPath);
      if (directMatch) {
        newActiveHref = directMatch.href;
      } else {
        // Fallback para sub-páginas o rutas no listadas (ej. /blog/un-post)
        // Intenta encontrar el enlace "padre" más cercano.
        const bestFallback = navLinks.find(link => currentPath.startsWith(link.href) && link.href !== '/') || navLinks.find(link => link.href === '/');
        newActiveHref = bestFallback ? bestFallback.href : currentPath;
      }
    }

    if (newActiveHref && activeLink !== newActiveHref) {
      setActiveLink(newActiveHref);
    } else if (!newActiveHref && currentPath === '/' && activeLink !== '/') {
      // Fallback final si estamos en home y newActiveHref es vacío por alguna razón.
      setActiveLink('/');
    }
  }, [activeLink, pathname]); // pathname es importante para re-evaluar en cambio de ruta.

  useEffect(() => {
    updateActiveLink(); // Determinación inicial

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('hashchange', updateActiveLink, { passive: true }); // Para anclas directas

    return () => {
      window.removeEventListener('scroll', updateActiveLink);
      window.removeEventListener('hashchange', updateActiveLink);
    };
  }, [updateActiveLink]);

  // Efecto para manejar el estado activo cuando cambia el pathname (navegación directa)
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        let initialLink = currentPath;

        // Prioridad para match completo con hash
        const pathWithHash = currentPath + currentHash;
        const navLinkWithHashMatch = navLinks.find(link => link.href === pathWithHash);

        if (navLinkWithHashMatch) {
            initialLink = navLinkWithHashMatch.href;
        } else {
            // Match con path (sin hash)
            const navLinkMatch = navLinks.find(link => link.href === currentPath);
            if (navLinkMatch) {
                initialLink = navLinkMatch.href;
            } else if (currentPath === '/' && currentHash) { // Ancla en homepage
                 const anchorMatch = navLinks.find(link => link.href === `/${currentHash}`);
                 if (anchorMatch) initialLink = anchorMatch.href;
                 else initialLink = '/'; // Fallback a Inicio si el ancla no está en navLinks
            } else if (currentPath === '/') {
                initialLink = '/'; // Raíz de la homepage
            } else {
                // Fallback para otras páginas (ej. sub-páginas no en nav)
                const bestFallback = navLinks.find(link => currentPath.startsWith(link.href) && link.href !== '/') || navLinks.find(link => link.href === '/');
                initialLink = bestFallback ? bestFallback.href : currentPath;
            }
        }
        setActiveLink(initialLink);
    }
  }, [pathname]);


  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsSheetOpen(false); // Close mobile menu

    // Para anclas en la misma página, Next.js <Link> y 'scroll-smooth' en <html> deben manejarlo.
    // Si el href es un ancla (ej. '/#sobre-nosotros') y estamos en la página de inicio:
    if (href.startsWith('/#') && pathname === '/') {
        const targetId = href.substring(2); // Remueve '/#'
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // En lugar de history.pushState o scrollIntoView manual aquí,
            // simplemente dejamos que el <Link> de Next.js navegue al ancla.
            // El `scroll-smooth` en <html> se encargará de la animación.
            // Esto evita conflictos.
        }
    }
    // Para enlaces a otras páginas, Next.js <Link> se encarga.
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
              href={link.href} // El href del Link debe ser el destino final
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
