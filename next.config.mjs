import path from 'path';
import { fileURLToPath } from 'url';

/** Absolute app root (/srv/nadz). Fixes Next inferring /srv when /srv/package-lock.json exists alongside nadz's lockfile. */
const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDir,

  // Render page metadata (title, description, canonical, robots) blocking inside <head>
  // for ALL requests instead of streaming it into the <body>. Without this, Next 16
  // streams metadata for user-agents not in its default bot list (Sitebulb, Screaming
  // Frog, Ahrefs, even Googlebot), so JS-less SEO crawlers report tags "outside <head>".
  htmlLimitedBots: '.*',
  turbopack: {
    root: rootDir,
  },

  // output: 'export', // Commented out for server deployment (API routes need server)

  // Redirect /admin on main site to CMS subdomain (Strapi admin)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'nadzhomehealthcare.ae' }],
        destination: 'https://nadzhealthcare.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nadzhomehealthcare.ae' }],
        destination: 'https://nadzhealthcare.com/:path*',
        permanent: true,
      },
      { source: '/admin', destination: 'https://admincms.nadzhealthcare.com/admin/', permanent: false },
      { source: '/admin/:path*', destination: 'https://admincms.nadzhealthcare.com/admin/:path*', permanent: false },
      { source: '/awards-and-achievements', destination: '/awards-achievement', permanent: true },
      { source: '/elderly', destination: '/home-care/elderly-care', permanent: true },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*.(svg|ico|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization enabled for better performance
  images: {
    // Optimize images automatically
    // Only allow localhost in development
    ...(process.env.NODE_ENV === 'development' && {
      domains: ['localhost', '127.0.0.1'],
      dangerouslyAllowLocalIP: true,
    }),
    qualities: [75, 85], 
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Allow Strapi media in development (127.0.0.1 and localhost)
      ...(process.env.NODE_ENV === 'development' ? [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '1337',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '1337',
          pathname: '/**',
        },
      ] : []),
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admincms.nadzhealthcare.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'admincms.nadzhealthcare.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nadzhealthcare.com',
        pathname: '/**',
      },
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;