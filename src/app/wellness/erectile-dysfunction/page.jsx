import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';
import { ErectileDysfunctionClient } from '@/components/wellness/ErectileDysfunctionClient';
import wellnessData from '@/data/wellness-pages.json';

const fallbackData = wellnessData['erectile-dysfunction'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('erectile-dysfunction', fallbackData, 'Erectile Dysfunction');
}

export default async function ErectileDysfunctionPage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('erectile-dysfunction');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (erectile-dysfunction), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <ErectileDysfunctionClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
