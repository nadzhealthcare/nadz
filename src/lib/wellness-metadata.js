import { getGlobal, getWellnessPage } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';

/**
 * Shared generateMetadata output for `/wellness/[segment]` routes.
 *
 * @param {string} segment - URL segment (e.g. `chronic-pain`)
 * @param {object} fallbackData - Entry from `@/data/wellness-pages.json`
 * @param {string} [titleFallbackSuffix] - e.g. "Chronic Pain" for `${brand} - …` when CMS/fallback omit title
 */
export async function buildWellnessPageMetadata(segment, fallbackData = {}, titleFallbackSuffix = '') {
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
    pageData = await getWellnessPage(segment);
  } catch (error) {
    console.error(`Error fetching wellness page for metadata (${segment}):`, error);
  }

  const seoTitle =
    pageData?.metadata?.title ||
    fallbackData?.metadata?.title ||
    globalData?.defaultSeo?.title ||
    (titleFallbackSuffix ? `${brandName} - ${titleFallbackSuffix}` : `${brandName} - Wellness`);
  const seoDescription =
    pageData?.metadata?.description ||
    fallbackData?.metadata?.description ||
    globalData?.defaultSeo?.description ||
    '';
  const seoKeywords =
    pageData?.metadata?.keywords ||
    fallbackData?.metadata?.keywords ||
    globalData?.defaultSeo?.keywords ||
    [];

  const pathname = `/wellness/${segment}`;
  const canonical = resolveCanonical(
    siteUrl,
    pageData?.metadata?.canonicalUrl,
    pathname
  );

  return {
    title: seoTitle,
    description: seoDescription || undefined,
    keywords: Array.isArray(seoKeywords) && seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seoTitle,
      description: seoDescription || undefined,
      url: canonical,
    },
    twitter: {
      title: seoTitle,
      description: seoDescription || undefined,
    },
  };
}
