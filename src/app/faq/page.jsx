import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getFAQ, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { FAQContactSection } from '@/components/faq/FAQContactSection';
import faqDataFallback from '@/data/faq.json';

// ISR: cache for 60s; FAQ content updates appear within a minute
export const revalidate = 60;

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || "https://nadzhealthcare.com";
  const brandName = globalData?.siteName || "NADZ Healthcare Dubai";

  let faqData = null;
  try {
    faqData = await getFAQ();
  } catch (error) {
    console.error('Error fetching FAQ page for metadata:', error);
  }

  const seoTitle = faqData?.metadata?.title || globalData?.defaultSeo?.title || `${brandName} - FAQ`;
  const seoDescription = faqData?.metadata?.description || globalData?.defaultSeo?.description || "Frequently asked questions about NADZ Healthcare services.";
  const seoKeywords = faqData?.metadata?.keywords || globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, faqData?.metadata?.canonicalUrl, '/faq');

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

export default async function FAQPage() {
  let faqData = faqDataFallback;

  try {
    const strapiData = await getFAQ();
    if (strapiData) {
      faqData = {
        ...strapiData,
        // Use Strapi categories only if they have questions; otherwise keep fallback
        categories:
          Array.isArray(strapiData.categories) &&
          strapiData.categories.length > 0 &&
          strapiData.categories.some(
            (cat) => Array.isArray(cat?.questions) && cat.questions.length > 0
          )
            ? strapiData.categories
            : faqDataFallback.categories,
      };
    }
  } catch (error) {
    console.error('Error fetching FAQ page from Strapi, using fallback:', error);
  }

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-[#4e1c26] text-white py-12 md:py-16 lg:py-20">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 mt-8 md:mt-12 lg:mt-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
                {faqData?.hero?.title}
              </h1>
              <p className="text-center text-white/90 text-xs sm:text-sm md:text-base">
                {faqData?.hero?.subtitle}
              </p>
            </div>
          </section>

          {/* FAQ Content Section */}
          <section className="py-8 md:py-10 lg:py-12">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              <FAQAccordion categories={faqData.categories} />
              <FAQContactSection contactSection={faqData.contactSection} />
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
