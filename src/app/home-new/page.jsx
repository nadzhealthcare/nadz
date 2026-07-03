import { Header } from '@/components/sections';
import { NewFooter } from '@/components/sections/NewFooter';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { HomeNewPageClient } from '@/components/home-new/HomeNewPageClient';
import { getHeader, getFooter, getHomePage } from '@/lib/strapi';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import homeNewFallback from '@/data/home-new.json';
import homeDataFallback from '@/data/home.json';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const meta = homeNewFallback.metadata || {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: '/home-new' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: '/home-new',
    },
  };
}

export default async function HomeNewPage() {
  let pageData = homeNewFallback;
  let headerData = null;
  let footerData = null;

  try {
    const strapiHome = await getHomePage();
    if (strapiHome) {
      const mergedHome = mergeCmsWithFallback(strapiHome, homeDataFallback);
      pageData = {
        ...homeNewFallback,
        hero: {
          ...homeNewFallback.hero,
          titlePrefix: homeNewFallback.hero.titlePrefix,
          titleHighlight: homeNewFallback.hero.titleHighlight,
          description: mergedHome.hero?.description || homeNewFallback.hero.description,
          reassuranceText: mergedHome.hero?.reassuranceText || homeNewFallback.hero.reassuranceText,
          image: mergedHome.hero?.image || homeNewFallback.hero.image,
          carouselImages: mergedHome.hero?.carouselImages,
          serviceChips: homeNewFallback.hero.serviceChips,
          whatsappButton: homeNewFallback.hero.whatsappButton,
          callButton: homeNewFallback.hero.callButton,
        },
        expertDoctors: mergedHome.expertDoctors || homeNewFallback.expertDoctors,
        googleReviews: mergedHome.googleReviews || homeNewFallback.googleReviews,
        premiumCta: mergedHome.premiumCta || homeNewFallback.premiumCta,
      };
    }
  } catch (error) {
    console.error('Error fetching home page for home-new, using fallback:', error);
  }

  const [headerResult, footerResult] = await Promise.allSettled([
    getHeader(),
    getFooter(),
  ]);
  headerData = headerResult.status === 'fulfilled' ? headerResult.value : null;
  footerData = footerResult.status === 'fulfilled' ? footerResult.value : null;

  const meta = pageData.metadata || homeNewFallback.metadata;

  return (
    <>
      <PrimarySeo title={meta.title} description={meta.description} />
      <Header headerData={headerData} />
      <HomeNewPageClient data={pageData} />
      <NewFooter footerData={footerData} />
    </>
  );
}
