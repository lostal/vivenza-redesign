'use client';

import { DOM_IDS } from '@/lib/constants';

/**
 * Hook para manejar scroll suave a elementos del DOM
 */
export function useSmoothScroll() {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToAboutSection = () => {
    scrollToElement(DOM_IDS.ABOUT_SECTION);
  };

  return {
    scrollToElement,
    scrollToAboutSection,
  };
}
