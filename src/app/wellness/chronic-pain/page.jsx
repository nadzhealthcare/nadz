import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { ChronicPainClient } from '@/components/wellness/ChronicPainClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['chronic-pain'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('chronic-pain', fallbackData, 'Chronic Pain');
}

export default async function ChronicPainPage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('chronic-pain');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (chronic-pain), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <ChronicPainClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
