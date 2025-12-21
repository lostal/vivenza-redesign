import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // output: 'export' removed - incompatible with i18n middleware
  typescript: {
    ignoreBuildErrors: false, // Enable type checking
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vivenzaexpo.es',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default withNextIntl(nextConfig);