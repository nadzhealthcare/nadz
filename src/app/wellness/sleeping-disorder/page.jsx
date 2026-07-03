import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { SleepingDisorderClient } from '@/components/wellness/SleepingDisorderClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['sleeping-disorder'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('sleeping-disorder', fallbackData, 'Sleeping Disorder');
}

export default async function SleepingDisorderPage() {
  let pageData = { ...fallbackData };

  try {
    const strapiData = await getWellnessPage('sleeping-disorder');
    if (strapiData) {
      pageData = { ...fallbackData, ...strapiData };
      // If CMS returned whoCanBenefit but with empty items, use fallback items so section still shows content
      if (pageData.whoCanBenefit && (!pageData.whoCanBenefit.items?.length) && fallbackData?.whoCanBenefit?.items?.length) {
        pageData.whoCanBenefit = { ...pageData.whoCanBenefit, items: fallbackData.whoCanBenefit.items };
      }
      // If CMS returned faqs but with empty items, use fallback faqs so FAQ section still shows content
      const fallbackFaqItems = Array.isArray(fallbackData?.faqs) ? fallbackData.faqs : fallbackData?.faqs?.items;
      if (pageData.faqs && (!pageData.faqs.items?.length) && fallbackFaqItems?.length) {
        pageData.faqs = { ...pageData.faqs, items: fallbackFaqItems };
      }
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (sleeping-disorder), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <SleepingDisorderClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
