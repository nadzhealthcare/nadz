import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getGlobal, getBookDoctorServiceOptions } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { ElderlyConsultationForm } from '@/components/elderly/ElderlyConsultationForm';
import { MdPhone, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { WhatsAppExternalLink } from '@/components/common/WhatsAppExternalLink';

const DEFAULT_SERVICE_OPTIONS = [
  'Elderly Care at Home',
  'Doctor at Home',
  'Doctor at Hotel',
  'Doctor at Office',
  'Post-Hospitalization Support',
  'Memory & Mobility-Focused Care',
  'Nursing care at home',
];

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const title = 'Book a Free Doctor Consultation at Home for Elderly';
  const description =
    'Request a free doctor consultation at home for elderly care. NADZ Healthcare serves Dubai, Sharjah, Ajman & nearby areas.';

  const canonical = resolveCanonical(siteUrl, undefined, '/elderly');

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

export default async function ElderlyConsultationPage() {
  let serviceOptions = DEFAULT_SERVICE_OPTIONS;
  try {
    const cmsOptions = await getBookDoctorServiceOptions();
    if (cmsOptions?.length) {
      serviceOptions = cmsOptions;
    }
  } catch {
    // use defaults
  }

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white overflow-x-hidden">
          {/* pt-*: content must start below fixed header (z-[1100]); otherwise the title is hidden under it */}
          <section className="bg-[#4e1c26] text-white pt-[4.5rem] sm:pt-20 md:pt-24 pb-5 sm:pb-6 md:pb-8">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="text-center max-w-2xl mx-auto px-1 sm:px-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-balance text-white">
                  Book a Free Doctor Consultation at Home for Elderly
                </h1>
              </div>
            </div>
          </section>

          <section className="py-6 sm:py-8 md:py-12 pb-12 sm:pb-16 md:pb-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 min-w-0">
                {/* Mobile: form first; desktop: contact left, form right (matches Contact Us) */}
                <div className="space-y-4 sm:space-y-6 order-2 lg:order-1 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-dark mb-4 sm:mb-6">
                    Contact Information
                  </h2>

                  <div className="bg-white rounded-[14px] p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <MdPhone className="text-xl sm:text-2xl text-primary-main" />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm sm:text-base text-text-gray mb-1">Call</p>
                        <a
                          href="tel:+97180046239"
                          className="text-base sm:text-base text-text-gray hover:text-primary-main active:text-primary-main transition-colors inline-flex min-h-[44px] items-center py-1 -my-1 touch-manipulation"
                        >
                          80046239
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[14px] p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <FaWhatsapp className="text-xl sm:text-2xl text-primary-main" />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm sm:text-base text-text-gray mb-1">WhatsApp</p>
                        <WhatsAppExternalLink
                          className="text-base text-text-gray hover:text-primary-main active:text-primary-main transition-colors inline-flex min-h-[44px] items-center py-1 -my-1 break-all touch-manipulation"
                        >
                          +971521597336
                        </WhatsAppExternalLink>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[14px] p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <MdEmail className="text-xl sm:text-2xl text-primary-main" />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm sm:text-base text-text-gray mb-1">Email</p>
                        <a
                          href="mailto:info@nadzhealthcare.com"
                          className="text-base text-text-gray hover:text-primary-main active:text-primary-main transition-colors break-all inline-flex min-h-[44px] items-center py-1 -my-1 touch-manipulation"
                        >
                          info@nadzhealthcare.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 min-w-0">
                  <ElderlyConsultationForm serviceOptions={serviceOptions} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
