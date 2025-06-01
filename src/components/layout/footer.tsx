
"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Logo from '@/components/logo';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>('...'); // Initial placeholder

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              High-quality bathroom and home products with minimalist design.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary">Products</Link></li>
              <li><Link href="/locations" className="text-sm text-muted-foreground hover:text-primary">Locations</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">News Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Support</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Facebook</span><Facebook size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Instagram</span><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Vivenza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
