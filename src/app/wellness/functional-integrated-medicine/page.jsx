import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { FunctionalIntegratedMedicineClient } from '@/components/wellness/FunctionalIntegratedMedicineClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['functional-integrated-medicine'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('functional-integrated-medicine', fallbackData, 'Functional Integrated Medicine');
}

export default async function FunctionalIntegratedMedicinePage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('functional-integrated-medicine');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (functional-integrated-medicine), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <FunctionalIntegratedMedicineClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
