import { getGlobal } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for robots.txt:', error);
  }

  const robots = globalData?.robots || {
    index: true,
    follow: true,
    userAgent: '*',
    allow: ['/'],
    disallow: ['/api/', '/admin/'],
    sitemap: 'https://nadzhealthcare.com/sitemap.xml',
  };

  // Build robots.txt content
  let robotsTxt = '';
  
  if (robots.userAgent) {
    robotsTxt += `User-agent: ${robots.userAgent}\n`;
  }
  
  if (robots.allow && Array.isArray(robots.allow)) {
    robots.allow.forEach(path => {
      robotsTxt += `Allow: ${path}\n`;
    });
  }
  
  if (robots.disallow && Array.isArray(robots.disallow)) {
    robots.disallow.forEach(path => {
      robotsTxt += `Disallow: ${path}\n`;
    });
  }
  
  if (robots.sitemap) {
    robotsTxt += `\nSitemap: ${robots.sitemap}\n`;
  }

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
