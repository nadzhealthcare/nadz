import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getGlobal, getBookDoctorServiceOptions } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { BookDoctorPageClient } from '@/components/book-doctor/BookDoctorPageClient';

// Always fetch fresh service options from Strapi (no static build cache)
export const dynamic = 'force-dynamic';

const DEFAULT_SERVICE_OPTIONS = [
  'Doctor at Home',
  'Doctor at Hotel',
  'Doctor at Office',
  'Elderly Care at Home',
  'Post-Hospitalization Support',
  'Memory & Mobility-Focused Care',
  'Babysitting',
];

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const title = 'Book Doctor at Home';
  const description =
      'Request doctor care at home. We\'ll be in touch within 30 minutes. Serving Dubai, Sharjah, Ajman & nearby areas.';
  const canonical = resolveCanonical(siteUrl, undefined, '/book-doctor');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function BookDoctorPage() {
  let serviceOptions = DEFAULT_SERVICE_OPTIONS;
  try {
    const cmsOptions = await getBookDoctorServiceOptions();
    if (cmsOptions?.length) {
      serviceOptions = cmsOptions;
    }
  } catch (e) {
    // use default options
  }

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-gray-50">
          <BookDoctorPageClient serviceOptions={serviceOptions} />
        </div>
      </PageLayout>
    </>
  );
}
