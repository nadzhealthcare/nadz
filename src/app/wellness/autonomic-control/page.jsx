import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getWellnessPage } from '@/lib/strapi';
import {
  VideoHeroSection,
  BenefitsSection,
} from '@/components/sections/shared';
import Faq from '@/app/home-care/components/Faq';
import { AutonomicControlClient } from '@/components/wellness/AutonomicControlClient';
import wellnessData from '@/data/wellness-pages.json';

import { buildWellnessPageMetadata } from '@/lib/wellness-metadata';

const fallbackData = wellnessData['autonomic-control'];

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return buildWellnessPageMetadata('autonomic-control', fallbackData, 'Autonomic Control');
}

export default async function AutonomicControlPage() {
  let pageData = fallbackData;

  try {
    const strapiData = await getWellnessPage('autonomic-control');
    if (strapiData) {
      pageData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching wellness page from Strapi (autonomic-control), using fallback:', error);
  }

  return (
    <>
      <PrimarySeo 
        title={pageData?.metadata?.title || fallbackData?.metadata?.title || ''}
        description={pageData?.metadata?.description || fallbackData?.metadata?.description || ''}
      />
      <PageLayout>
        <AutonomicControlClient data={pageData || fallbackData} />
      </PageLayout>
    </>
  );
}
