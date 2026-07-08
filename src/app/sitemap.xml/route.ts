import { getGlobal, fetchStrapi } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Static pages that should always be in sitemap
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' }, // Homepage
  { path: '/contact-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/elderly', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/awards-achievement', priority: '0.7', changefreq: 'monthly' },
  { path: '/press-releases', priority: '0.7', changefreq: 'weekly' },
  { path: '/interviews-and-podcast', priority: '0.7', changefreq: 'monthly' },
  { path: '/events', priority: '0.7', changefreq: 'weekly' },
  { path: '/testimonials', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  // Home care pages
  { path: '/home-care/who-we-are', priority: '0.8', changefreq: 'monthly' },
  { path: '/home-care/vision-mission', priority: '0.8', changefreq: 'monthly' },
  // Wellness pages
  { path: '/wellness/autonomic-control', priority: '0.9', changefreq: 'weekly' },
  { path: '/wellness/peptide-therapy', priority: '0.9', changefreq: 'weekly' },
  { path: '/wellness/nad-plus-iv-therapy', priority: '0.9', changefreq: 'weekly' },
  { path: '/wellness/functional-integrated-medicine', priority: '0.9', changefreq: 'weekly' },
  { path: '/wellness/sleeping-disorder', priority: '0.8', changefreq: 'monthly' },
  { path: '/wellness/anxiety-stress', priority: '0.8', changefreq: 'monthly' },
  { path: '/wellness/chronic-pain', priority: '0.8', changefreq: 'monthly' },
  { path: '/wellness/erectile-dysfunction', priority: '0.8', changefreq: 'monthly' },
  { path: '/wellness/overactive-bladder', priority: '0.8', changefreq: 'monthly' },
];

export async function GET() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for sitemap:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const sitemapConfig = globalData?.sitemap || {
    defaultPriority: '0.8',
    defaultChangefreq: 'monthly',
  };

  // Get dynamic pages from Strapi
  let dynamicPages: Array<{ path: string; priority: string; changefreq: string; lastmod?: string }> = [];
  
  try {
    // Fetch home-care pages
    const hcData = await fetchStrapi('/api/home-care-pages?publicationState=live&fields[0]=slug&fields[1]=updatedAt&fields[2]=publishedAt&pagination[pageSize]=1000');
    if (hcData?.data && Array.isArray(hcData.data)) {
      dynamicPages = dynamicPages.concat(
        hcData.data
          .map((page: any) => {
            const attributes = page.attributes || page;
            const slug = attributes.slug;
            if (!slug) return null;
            return {
              path: `/home-care/${slug}`,
              priority: sitemapConfig.defaultPriority || '0.8',
              changefreq: sitemapConfig.defaultChangefreq || 'monthly',
              lastmod: attributes.updatedAt || attributes.publishedAt || new Date().toISOString(),
            };
          })
          .filter((page: any) => page !== null)
      );
    }
  } catch (error) {
    console.error('Error fetching home-care pages for sitemap:', error);
  }

  try {
    // Fetch generic pages
    const pagesData = await fetchStrapi('/api/pages?publicationState=live&fields[0]=slug&fields[1]=updatedAt&fields[2]=publishedAt&pagination[pageSize]=1000');
    if (pagesData?.data && Array.isArray(pagesData.data)) {
      dynamicPages = dynamicPages.concat(
        pagesData.data
          .map((page: any) => {
            const attributes = page.attributes || page;
            const slug = attributes.slug;
            if (!slug) return null;
            return {
              path: `/${slug.startsWith('pages/') ? slug : `/pages/${slug}`}`,
              priority: sitemapConfig.defaultPriority || '0.8',
              changefreq: sitemapConfig.defaultChangefreq || 'monthly',
              lastmod: attributes.updatedAt || attributes.publishedAt || new Date().toISOString(),
            };
          })
          .filter((page: any) => page !== null)
      );
    }
  } catch (error) {
    console.error('Error fetching generic pages for sitemap:', error);
  }

  try {
    const prData = await fetchStrapi('/api/press-releases?publicationState=live&fields[0]=slug&fields[1]=updatedAt&fields[2]=publishedAt&pagination[pageSize]=1000');
    if (prData?.data && Array.isArray(prData.data)) {
      dynamicPages = dynamicPages.concat(
        prData.data
          .map((page: any) => {
            const attributes = page.attributes || page;
            const slug = attributes.slug;
            if (!slug) return null;
            return {
              path: `/press-releases/${slug}`,
              priority: '0.7',
              changefreq: 'weekly',
              lastmod: attributes.updatedAt || attributes.publishedAt || new Date().toISOString(),
            };
          })
          .filter((page: any) => page !== null)
      );
    }
  } catch (error) {
    console.error('Error fetching press releases for sitemap:', error);
  }

  try {
    const evData = await fetchStrapi('/api/events?publicationState=live&fields[0]=slug&fields[1]=updatedAt&fields[2]=publishedAt&pagination[pageSize]=1000');
    if (evData?.data && Array.isArray(evData.data)) {
      dynamicPages = dynamicPages.concat(
        evData.data
          .map((page: any) => {
            const attributes = page.attributes || page;
            const slug = attributes.slug;
            if (!slug) return null;
            return {
              path: `/events/${slug}`,
              priority: '0.7',
              changefreq: 'weekly',
              lastmod: attributes.updatedAt || attributes.publishedAt || new Date().toISOString(),
            };
          })
          .filter((page: any) => page !== null)
      );
    }
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
  }

  try {
    // Fetch blog articles
    const articlesData = await fetchStrapi('/api/articles?publicationState=live&fields[0]=slug&fields[1]=updatedAt&fields[2]=publishedAt&pagination[pageSize]=1000');
    if (articlesData?.data && Array.isArray(articlesData.data)) {
      dynamicPages = dynamicPages.concat(
        articlesData.data
          .map((page: any) => {
            const attributes = page.attributes || page;
            const slug = attributes.slug;
            if (!slug) return null;
            return {
              path: `/blog/${slug}`,
              priority: '0.7',
              changefreq: 'weekly',
              lastmod: attributes.updatedAt || attributes.publishedAt || new Date().toISOString(),
            };
          })
          .filter((page: any) => page !== null)
      );
    }
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  // Combine static and dynamic pages
  const allPages = [
    ...staticPages.map(page => ({
      ...page,
      lastmod: new Date().toISOString(),
    })),
    ...dynamicPages,
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
