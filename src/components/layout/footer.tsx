
"use client";

import Link from 'next/link';
import { Instagram } from 'lucide-react';
import Logo from '@/components/logo';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>('...');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground">
              Soluciones de alta calidad para baño y hogar con diseño minimalista.
            </p>
            <div className="mt-6">
              <Link href="https://gruposiete.es/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://vivenzaexpo.es/wp-content/uploads/2025/03/UNA-MARCA-DE-GRUPOSIETE-VIVENZA.png"
                  alt="Una marca de GrupoSiete"
                  width={241}
                  height={20}
                  className="h-auto max-w-full"
                  data-ai-hint="brand affiliation group"
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explora</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/#sobre-nosotros" className="text-sm text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
              <li><Link href="/style-finder" className="text-sm text-muted-foreground hover:text-primary">Buscador IA</Link></li>
              <li><Link href="/locations" className="text-sm text-muted-foreground hover:text-primary">Ubicaciones</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Soporte</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contáctanos</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">Preguntas Frecuentes</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Conecta</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="https://www.instagram.com/gruposiete_vivenza/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Vivenza. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
