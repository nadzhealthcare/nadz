import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { OveractiveBladderClient } from '@/components/wellness/OveractiveBladderClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['overactive-bladder'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('overactive-bladder', fallbackData, 'Overactive Bladder');
}

export default async function OveractiveBladderPage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('overactive-bladder');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (overactive-bladder), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <OveractiveBladderClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
