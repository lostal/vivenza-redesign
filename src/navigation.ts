import { createNavigation } from 'next-intl/navigation';
import { routing } from './i18n/routing';

/**
 * Navigation utilities that respect the i18n routing configuration.
 * Use these instead of Next.js navigation primitives.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

// Re-export routing for convenience
export { routing };
