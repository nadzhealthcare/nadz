import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { PeptideTherapyClient } from '@/components/wellness/PeptideTherapyClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['peptide-therapy'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('peptide-therapy', fallbackData, 'Peptide Therapy');
}

export default async function PeptideTherapyPage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('peptide-therapy');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (peptide-therapy), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <PeptideTherapyClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
