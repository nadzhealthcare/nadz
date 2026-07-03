import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { NadPlusIvTherapyClient } from '@/components/wellness/NadPlusIvTherapyClient';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['nad-plus-iv-therapy'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('nad-plus-iv-therapy', fallbackData, 'Nad Plus Iv Therapy');
}

export default async function NadPlusIvTherapyPage() {
  let pageData = { ...fallbackData };

  try {
    const strapiData = await getWellnessPage('nad-plus-iv-therapy');
    if (strapiData) {
      pageData = mergeCmsWithFallback(strapiData, fallbackData);
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (nad-plus-iv-therapy), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <NadPlusIvTherapyClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
