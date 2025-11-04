"use client";

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';

const languageNames: Record<string, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'es';

  const handleLanguageChange = (newLocale: string) => {
    // Replace the locale in the current path
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      segments.unshift('', newLocale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Cambiar idioma">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem 
            key={locale} 
            onClick={() => handleLanguageChange(locale)}
            className={currentLocale === locale ? 'font-semibold bg-muted' : ''}
          >
            {languageNames[locale] || locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
