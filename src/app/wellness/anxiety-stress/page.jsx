import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { AnxietyStressClient } from '@/components/wellness/AnxietyStressClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['anxiety-stress'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('anxiety-stress', fallbackData, 'Anxiety Stress');
}

export default async function AnxietyStressPage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('anxiety-stress');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (anxiety-stress), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <AnxietyStressClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
