import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getHomeCarePage, getGlobal } from '@/lib/strapi';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import { resolveCanonical } from '@/lib/canonical-url';
import pagesFallback from '@/data/home-care-pages.json';
import { VisionMissionClient } from '@/components/home-care/VisionMissionClient';
import Faq from '../components/Faq';

const visionMissionFallback = pagesFallback.find((p) => p.slug === 'vision-mission') || null;

// Always fetch from CMS at request time so Strapi content is shown when available
export const dynamic = 'force-dynamic';

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
    pageData = await getHomeCarePage('vision-mission');
  } catch (error) {
    console.error('Error fetching vision-mission page for metadata:', error);
  }

  const seoTitle = pageData?.metadata?.title || globalData?.defaultSeo?.title || `${brandName} - Vision & Mission`;
  const seoDescription = pageData?.metadata?.description || globalData?.defaultSeo?.description || "Our vision and mission at NADZ Healthcare.";
  const seoKeywords = pageData?.metadata?.keywords || globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, pageData?.metadata?.canonicalUrl, '/home-care/vision-mission');

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

export default async function VisionMissionPage() {
  // Like home page: prefer CMS, merge with fallback so we never show empty or placeholder content
  let strapiData = null;
  try {
    strapiData = await getHomeCarePage('vision-mission');
  } catch (error) {
    console.error('Error fetching vision-mission page from Strapi:', error);
  }

  const pageData = strapiData
    ? mergeCmsWithFallback(strapiData, visionMissionFallback)
    : { ...visionMissionFallback };

  if (!pageData?.hero && !visionMissionFallback) {
    pageData.hero = { title: 'Our Mission & Vision', subtitle: '', description: '' };
  }

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <VisionMissionClient pageData={pageData} />
        {pageData?.faqs?.items?.length > 0 && (
          <div id="faqs">
            <Faq title={pageData.faqs.title} faqs={pageData.faqs.items} />
          </div>
        )}
      </PageLayout>
    </>
  );
}
