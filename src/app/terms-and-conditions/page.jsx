import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getTermsAndConditions, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { PolicyContactSection } from '@/components/policy/PolicyContactSection';
import termsDataFallback from '@/data/terms-and-conditions.json';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || "https://nadzhealthcare.com";
  const brandName = globalData?.siteName || "NADZ Healthcare Dubai";

  let termsData = null;
  try {
    termsData = await getTermsAndConditions();
  } catch (error) {
    console.error('Error fetching terms and conditions page for metadata:', error);
  }

  const seoTitle = termsData?.metadata?.title || globalData?.defaultSeo?.title || `${brandName} - Terms and Conditions`;
  const seoDescription = termsData?.metadata?.description || globalData?.defaultSeo?.description || "Terms and Conditions for NADZ Healthcare.";
  const seoKeywords = termsData?.metadata?.keywords || globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, termsData?.metadata?.canonicalUrl, '/terms-and-conditions');

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function TermsAndConditionsPage() {
  let termsData = termsDataFallback;
  
  try {
    const strapiData = await getTermsAndConditions();
    if (strapiData) {
      termsData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching terms and conditions page from Strapi, using fallback:', error);
  }

  const { hero, sections, questionsSection } = termsData;

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-[#4e1c26] text-white py-12 md:py-16 lg:py-20">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 mt-8 md:mt-12 lg:mt-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
                {hero.title}
              </h1>
              <p className="text-center text-white/90 text-xs sm:text-sm md:text-base">
                {hero.subtitle}
              </p>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-left policy-content">
              <div className="max-w-none">
                {sections.map((section) => (
                  <div key={section.number} className="mb-10 md:mb-12">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 pb-2 border-b-2 border-primary-main text-left">
                      <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                        {section.number}. {section.title}
                      </span>
                    </h2>

                    {/* Section with intro and items */}
                    {section.intro && section.items && (
                      <>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-4 text-left">
                          {section.intro}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm md:text-base text-text-gray ml-4 text-left">
                          {section.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Section with items only */}
                    {!section.intro && section.items && (
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm md:text-base text-text-gray ml-4 text-left">
                        {section.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {/* Section with content only */}
                    {section.content && (
                      <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed text-left">
                        {section.content.includes('https://nadzhealthcare.com') ? (
                          <>
                            By accessing or using this website (
                            <a href="https://nadzhealthcare.com" className="text-primary-main hover:text-primary-dark underline">
                              https://nadzhealthcare.com
                            </a>
                            ) or contacting or booking services via the site, you agree to these Terms and Conditions. If you do not agree, please do not use the website or services.
                          </>
                        ) : (
                          section.content
                        )}
                      </p>
                    )}

                    {/* Medical Disclaimer Section */}
                    {section.disclaimer && (
                      <>
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 md:p-6 mb-4 rounded-r-[14px]">
                          <p className="font-semibold text-amber-900 mb-2 text-xs sm:text-sm md:text-base">
                            {section.disclaimer.title}
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-amber-900 text-xs sm:text-sm md:text-base ml-4">
                            {section.disclaimer.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        {section.emergency && (
                          <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-6 rounded-r-[14px]">
                            <p className="font-bold text-red-900 text-xs sm:text-sm md:text-base">
                              {section.emergency}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Contact Information Section */}
                    {section.contact && (
                      <>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-4 text-left">
                          {section.intro}
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-[14px] p-6 md:p-8">
                          <p className="font-semibold text-primary-dark mb-2 text-xs sm:text-sm md:text-base">
                            {section.contact.company}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">
                            <span className="font-medium">Address:</span> {section.contact.address}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">
                            <span className="font-medium">Email:</span>{' '}
                            <a href={`mailto:${section.contact.email}`} className="text-primary-main hover:text-primary-dark underline">
                              {section.contact.email}
                            </a>
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-text-gray">
                            <span className="font-medium">Contact No:</span>{' '}
                            <a href={`tel:${section.contact.phone}`} className="text-primary-main hover:text-primary-dark underline">
                              {section.contact.phone}
                            </a>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* Questions Section */}
                <PolicyContactSection questionsSection={questionsSection} />
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
