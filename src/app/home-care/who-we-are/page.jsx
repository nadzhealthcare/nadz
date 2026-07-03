import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getHomeCarePage, getGlobal } from '@/lib/strapi';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import { resolveCanonical } from '@/lib/canonical-url';
import pagesFallback from '@/data/home-care-pages.json';
import { WhoWeAreClient } from '@/components/home-care/WhoWeAreClient';
import Faq from '../components/Faq';

const pageDataFallback = pagesFallback.find((p) => p.slug === 'who-we-are');

if (!pageDataFallback) {
  throw new Error('Who We Are page data not found in fallback');
}

// Use ISR (Incremental Static Regeneration) for better performance
// Reduced to 30 seconds to allow CMS image updates to reflect faster
export const revalidate = 30;

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || "https://nadzhealthcare.com";
  const brandName = globalData?.siteName || "NADZ Healthcare Dubai";

  let pageData = null;
  try {
    pageData = await getHomeCarePage('who-we-are');
  } catch (error) {
    console.error('Error fetching who-we-are page for metadata:', error);
  }

  const seoTitle = pageData?.metadata?.title || globalData?.defaultSeo?.title || `${brandName} - Who We Are`;
  const seoDescription = pageData?.metadata?.description || globalData?.defaultSeo?.description || "Learn about NADZ Healthcare and our commitment to excellence.";
  const seoKeywords = pageData?.metadata?.keywords || globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, pageData?.metadata?.canonicalUrl, '/home-care/who-we-are');

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function WhoWeArePage() {
  let pageData = pageDataFallback;
  
  try {
    const strapiData = await getHomeCarePage('who-we-are');
    // Check if Strapi data has the essential fields for who-we-are page
    if (strapiData && 
        Object.keys(strapiData).length > 0 && 
        (strapiData.hero || strapiData.ourStory || strapiData.ourCommitment)) {
      // Merge Strapi data with fallback to ensure all fields are present
      pageData = mergeCmsWithFallback(strapiData, pageDataFallback);
      if (strapiData.hero !== undefined) {
        pageData.hero = mergeCmsWithFallback(strapiData.hero, pageDataFallback.hero);
      }
    } else {
      console.warn('Strapi returned incomplete data for who-we-are, using fallback');
    }
  } catch (error) {
    console.error('Error fetching who-we-are page from Strapi, using fallback:', error);
  }

  // Ensure pageData is valid and has required fields
  if (!pageData || !pageData.hero) {
    console.error('No valid page data available for who-we-are page, using fallback');
    pageData = pageDataFallback;
  }

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <WhoWeAreClient pageData={pageData} />
        {pageData?.faqs?.items?.length > 0 && (
          <div id="faqs">
            <Faq title={pageData.faqs.title} faqs={pageData.faqs.items} />
          </div>
        )}
      </PageLayout>
    </>
  );
}
