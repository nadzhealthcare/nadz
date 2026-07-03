import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { MdCheckCircle } from 'react-icons/md';

export const revalidate = 60;

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const title = 'Thank you';
  const description =
    'Your message has been received. NADZ Healthcare will be in touch with you shortly.';

  const canonical = resolveCanonical(siteUrl, undefined, '/thank-you');

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

export default function ThankYouPage() {
  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-[70vh] bg-white flex flex-col">
          <section className="bg-[#4e1c26] text-white py-12 md:py-16 lg:py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 mb-6">
                <MdCheckCircle className="text-4xl text-[#E3C699]" aria-hidden />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4">
                Thank you
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                We have received your request. Our team will get back to you as soon as possible.
              </p>
            </div>
          </section>

          <section className="flex-1 flex items-center justify-center py-12 md:py-16 px-4">
            <div className="max-w-lg w-full text-center space-y-6">
              <p className="text-text-gray text-sm sm:text-base leading-relaxed">
                If you need urgent assistance, please call{' '}
                <a href="tel:80046239" className="text-primary-main font-semibold hover:underline">
                  80046239
                </a>{' '}
                or reach us via the contact details on our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
                <Link
                  href="/"
                  className="inline-flex justify-center items-center min-h-[48px] px-6 rounded-lg bg-gradient-to-r from-primary-mediumBlue to-primary-main text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-colors"
                >
                  Back to home
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex justify-center items-center min-h-[48px] px-6 rounded-lg border-2 border-primary-main text-primary-main font-semibold text-sm sm:text-base hover:bg-primary-main/5 transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
