import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getPrivacyPolicy, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { PolicyContactSection } from '@/components/policy/PolicyContactSection';
import privacyDataFallback from '@/data/privacy-policy.json';

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

  let privacyData = null;
  try {
    privacyData = await getPrivacyPolicy();
  } catch (error) {
    console.error('Error fetching privacy policy page for metadata:', error);
  }

  const seoTitle = privacyData?.metadata?.title || globalData?.defaultSeo?.title || `${brandName} - Privacy Policy`;
  const seoDescription = privacyData?.metadata?.description || globalData?.defaultSeo?.description || "Privacy Policy for NADZ Healthcare.";
  const seoKeywords = privacyData?.metadata?.keywords || globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, privacyData?.metadata?.canonicalUrl, '/privacy-policy');

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

export default async function PrivacyPolicyPage() {
  let privacyData = privacyDataFallback;
  
  try {
    const strapiData = await getPrivacyPolicy();
    if (strapiData) {
      privacyData = strapiData;
    }
  } catch (error) {
    console.error('Error fetching privacy policy page from Strapi, using fallback:', error);
  }

  const { hero, effectiveDate, sections, questionsSection } = privacyData;

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
              <p className="text-center text-white/90 text-xs sm:text-sm md:text-base mb-4">
                {hero.subtitle}
              </p>
              <div className="text-center text-white/80 text-xs sm:text-sm">
                <p>
                  <span className="font-semibold">Effective Date:</span> {effectiveDate.effectiveDate} · <span className="font-semibold">Last Updated:</span> {effectiveDate.lastUpdated}
                </p>
              </div>
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
                        {section.content}
                      </p>
                    )}

                    {/* Contact Information Section */}
                    {section.contact && (
                      <>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-4 text-left">
                          {section.intro}
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-[14px] p-6 md:p-8">
                          <p className="font-semibold text-primary-dark mb-2 text-xs sm:text-sm md:text-base">
                            {section.contact.name}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">
                            <span className="font-medium">Email:</span>{' '}
                            <a href={`mailto:${section.contact.email}`} className="text-primary-main hover:text-primary-dark underline">
                              {section.contact.email}
                            </a>
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">
                            <span className="font-medium">Phone:</span>{' '}
                            <a href={`tel:${section.contact.phone}`} className="text-primary-main hover:text-primary-dark underline">
                              {section.contact.phone}
                            </a>
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-text-gray">
                            <span className="font-medium">Location:</span> {section.contact.location}
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
