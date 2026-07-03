import { Header, HeroSection, Footer } from '@/components/sections';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { MainGoalSection } from '@/components/sections/MainGoalSection';
import { ExpertDoctorsSection } from '@/components/sections/ExpertDoctorsSection';
import { KeyVisionSection } from '@/components/sections/KeyVisionSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { AssociatesSection } from '@/components/sections/AssociatesSection';
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection';
import { PremiumCtaSection } from '@/components/sections/PremiumCtaSection';
import { NewFooter } from '@/components/sections/NewFooter';
import { TrustedProvidersSection } from '@/components/sections/TrustedProvidersSection';
import { ServicesGridSection } from '@/components/sections/ServicesGridSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { LatestBlogsSection } from '@/components/sections/LatestBlogsSection';
import { getHomePage, fetchStrapi, getGlobal, getHeader, getFooter, getArticles } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import homeDataFallback from '@/data/home.json';

export async function generateMetadata() {
  // Use cached data - metadata generation happens during build/ISR
  // This will be cached along with the page data
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings:', error);
  }

  const brandName = globalData?.siteName || "NADZ Healthcare Dubai";
  const siteUrl = globalData?.siteUrl || "https://nadzhealthcare.com";

  try {
    const data = await fetchStrapi('/api/home-page', { next: { revalidate: 60 } });
    const raw = data?.data;
    const doc = raw == null ? null : Array.isArray(raw) ? raw[0] : raw;
    const attributes = doc ? (doc.attributes || doc) : {};
    const seoTitle = attributes.seoTitle || '';
    const seoDescription = attributes.seoDescription || '';
    const seoKeywords = Array.isArray(attributes.seoKeywords) ? attributes.seoKeywords : [];
    const homeCanonical = attributes.seoCanonicalUrl || globalData?.canonicalUrl;
    const canonical = resolveCanonical(siteUrl, homeCanonical, '/');

    if (seoTitle || seoDescription) {
      return {
        title: seoTitle || brandName,
        description: seoDescription || undefined,
        keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
        alternates: { canonical },
        openGraph: {
          title: seoTitle || brandName,
          description: seoDescription || undefined,
          url: canonical,
        },
        twitter: {
          title: seoTitle || brandName,
          description: seoDescription || undefined,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata from Strapi:', error);
  }
  const canonical = resolveCanonical(siteUrl, globalData?.canonicalUrl, '/');
  return {
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: brandName,
      description: globalData?.defaultSeo?.description,
    },
  };
}

// Always fetch from Strapi on the server so home page data is never served from stale cache
export const dynamic = 'force-dynamic';

export default async function Home() {
  let homeData = homeDataFallback;
  let headerData = null;
  let footerData = null;

  try {
    const strapiData = await getHomePage();
    if (strapiData) {
      homeData = mergeCmsWithFallback(strapiData, homeDataFallback);
    }
  } catch (error) {
    console.error('Error fetching home page from Strapi, using fallback:', error);
  }
  
  // Fetch header, footer, and latest blogs independently so one failure doesn't zero the rest
  let latestPosts = [];
  const [headerResult, footerResult, articlesResult] = await Promise.allSettled([
    getHeader(),
    getFooter(),
    getArticles({ limit: 3, sort: 'updatedAt:desc' }),
  ]);
  headerData = headerResult.status === 'fulfilled' ? headerResult.value : null;
  footerData = footerResult.status === 'fulfilled' ? footerResult.value : null;
  latestPosts = articlesResult.status === 'fulfilled' && Array.isArray(articlesResult.value) ? articlesResult.value : [];
  
  return (
    <>
      <PrimarySeo />
      <Header headerData={headerData} />
      <HeroSection heroData={homeData.hero} variant="home" />
      <TrustedProvidersSection trustedProvidersData={homeData.trustedProviders} />
      <MainGoalSection mainGoalData={homeData.mainGoal} />
      <HowItWorksSection howItWorksData={homeData.howItWorks} />
      <ServicesGridSection servicesSectionData={homeData.servicesSection} />
      <ExpertDoctorsSection expertDoctorsData={homeData.expertDoctors} />
      <KeyVisionSection keyVisionData={homeData.keyVision} />
      <LatestBlogsSection posts={latestPosts} />
      <PartnersSection partnersData={homeData.partners} />
      {homeData.associates?.showSection !== false && (
        <AssociatesSection associatesData={homeData.associates} />
      )}
      <GoogleReviewsSection googleReviewsData={homeData.googleReviews} />
      <PremiumCtaSection premiumCtaData={homeData.premiumCta} />
      <NewFooter footerData={footerData} />
    </>
  );
}
