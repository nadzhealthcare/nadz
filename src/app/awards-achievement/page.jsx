import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getAwardsAchievement, getGlobal } from '@/lib/strapi';
import { AwardsAchievementRows } from '@/components/awards/AwardsAchievementRows';
import fallback from '@/data/awards-achievement.json';

/** Fresh CMS content on each request (Strapi is source of truth for this page). */
export const dynamic = 'force-dynamic';

/** Public URL path for this page (must match `src/app/awards-achievement`). */
const DEFAULT_PATH = 'awards-achievement';

function normalizePathSegment(slug) {
  if (!slug || typeof slug !== 'string') return DEFAULT_PATH;
  const s = slug.trim().replace(/^\/+|\/+$/g, '');
  return s || DEFAULT_PATH;
}

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const brandName = globalData?.siteName || 'NADZ Healthcare Dubai';

  let pageData = null;
  try {
    pageData = await getAwardsAchievement();
  } catch (error) {
    console.error('Error fetching Awards & Achievements for metadata:', error);
  }

  const pathSegment = normalizePathSegment(pageData?.slug ?? fallback.slug);
  const canonicalUrl = `${siteUrl}/${pathSegment}`;

  const seoTitle =
    pageData?.metadata?.title ||
    globalData?.defaultSeo?.title ||
    `${brandName} - Awards & Achievements`;
  const seoDescription =
    pageData?.metadata?.description ||
    globalData?.defaultSeo?.description ||
    'Awards and recognition at NADZ Healthcare.';
  const seoKeywords = pageData?.metadata?.keywords?.length
    ? pageData.metadata.keywords
    : globalData?.defaultSeo?.keywords || [];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function AwardsAndAchievementsPage() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for awards page:', error);
  }

  let page = { ...fallback };
  let strapi = null;

  try {
    strapi = await getAwardsAchievement();
    if (strapi) {
      page = {
        slug: strapi.slug ?? fallback.slug,
        pillText: strapi.pillText ?? fallback.pillText,
        pageTitle: strapi.pageTitle || fallback.pageTitle,
        pageSubtitle: strapi.pageSubtitle ?? fallback.pageSubtitle,
        items: Array.isArray(strapi.items) ? strapi.items : [],
        metadata:
          strapi.metadata?.title || strapi.metadata?.description
            ? strapi.metadata
            : fallback.metadata,
      };
    } else {
      // Strapi unreachable or misconfigured — do not show fake demo rows
      page = { ...fallback, items: [] };
    }
  } catch (error) {
    console.error('Error fetching Awards & Achievements from Strapi, using fallback:', error);
    page = { ...fallback, items: [] };
  }

  // Pill: Awards single type (Content Manager → Awards & Achievements → Pill text) → Global → default
  const pillText =
    (strapi && String(strapi.pillText || '').trim()) ||
    (globalData?.awardsPagePillText && String(globalData.awardsPagePillText).trim()) ||
    (fallback.pillText?.trim() || '') ||
    'Recognition';
  const pageTitle = page.pageTitle || 'Awards & Achievements';
  const pageSubtitle =
    page.pageSubtitle || 'Milestones and recognition from our journey.';

  const hasRealItems =
    Array.isArray(page.items) &&
    page.items.some((row) => row.title || row.body || row.image?.url);

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white">
          <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-mediumBlue/20 via-primary-main/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-primary-mediumBlue/15 via-primary-main/8 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
              <div className="text-left max-w-5xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-md rounded-full border border-primary-mediumBlue/20 shadow-lg">
                  <span className="w-2 h-2 bg-primary-mediumBlue rounded-full" />
                  <span className="text-sm font-medium text-primary-mediumBlue">{pillText}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {pageTitle}
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-text-gray font-normal italic">
                  {pageSubtitle}
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FAFAFA]">
            <div className="container mx-auto max-w-7xl">
              {!hasRealItems ? (
                <div className="text-center py-16 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
                  <p className="text-lg text-text-gray mb-2">No awards listed yet.</p>
                  <p className="text-sm text-text-gray">
                    Publish content in Strapi (Awards & Achievements) and add Award Item rows with
                    images and text.
                  </p>
                </div>
              ) : (
                <AwardsAchievementRows items={page.items} />
              )}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
