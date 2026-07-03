import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getContactUs, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import { ContactForm } from '@/components/contact/ContactForm';
import { LeadFormEmbed } from '@/components/contact/LeadFormEmbed';
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import contactDataFallback from '@/data/contact-us.json';

// ISR: cache for 60s; contact info/hero updates appear within a minute
export const revalidate = 60;

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const brandName = globalData?.siteName || 'NADZ Healthcare Dubai';

  let contactMeta = null;
  try {
    const strapiPage = await getContactUs();
    if (strapiPage?.metadata) {
      contactMeta = strapiPage.metadata;
    }
  } catch (error) {
    console.error('Error fetching Contact Us SEO from Strapi:', error);
  }

  const seoTitle = contactMeta?.title || `${brandName} - Contact`;
  const seoDescription =
    contactMeta?.description ||
    globalData?.defaultSeo?.description ||
    'Contact NADZ Healthcare.';
  const seoKeywords =
    (Array.isArray(contactMeta?.keywords) && contactMeta.keywords.length > 0
      ? contactMeta.keywords
      : globalData?.defaultSeo?.keywords) || [];

  const canonical = resolveCanonical(siteUrl, contactMeta?.canonicalUrl, '/contact-us');

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

export default async function ContactUsPage() {
  let contactData = contactDataFallback;
  try {
    const strapiData = await getContactUs();
    if (strapiData) {
      const merged = mergeCmsWithFallback(strapiData, contactDataFallback);
      contactData = {
        ...merged,
        hero: mergeCmsWithFallback(strapiData.hero, contactDataFallback.hero),
        contactInfo: mergeCmsWithFallback(strapiData.contactInfo, contactDataFallback.contactInfo),
        form: strapiData.form === undefined ? contactDataFallback.form : strapiData.form,
        showContactForm:
          strapiData.showContactForm === undefined
            ? contactDataFallback.showContactForm
            : strapiData.showContactForm,
        leadForm:
          strapiData.leadForm === undefined ? contactDataFallback.leadForm : strapiData.leadForm,
      };
    }
  } catch (error) {
    console.error('Error fetching contact us page from Strapi, using fallback:', error);
  }

  const { hero, contactInfo, form, leadForm, showContactForm } = contactData;
  const showNativeForm = showContactForm !== false;
  const showLeadForm = leadForm?.enabled !== false;

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-[#4e1c26] text-white py-12 md:py-16 lg:py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-8 md:mt-12 lg:mt-16">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {hero.title}
                </h1>
                <p className="text-center text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                  {hero.subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Main Content Section */}
          <section className="py-8 md:py-12 pb-16 md:pb-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column - Contact Information */}
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-dark mb-6">
                    Contact Information
                  </h2>

                  {/* Phone Card */}
                  <div className="bg-white rounded-[14px] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <MdPhone className="text-2xl text-primary-main" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">{contactInfo.phone.label}</p>
                        <a 
                          href={contactInfo.phone.href}
                          className="text-xs sm:text-sm md:text-base text-text-gray hover:text-primary-main transition-colors"
                        >
                          {contactInfo.phone.value}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="bg-white rounded-[14px] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <MdEmail className="text-2xl text-primary-main" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">{contactInfo.email.label}</p>
                        <a 
                          href={contactInfo.email.href}
                          className="text-xs sm:text-sm md:text-base text-text-gray hover:text-primary-main transition-colors break-all"
                        >
                          {contactInfo.email.value}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div className="bg-white rounded-[14px] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <MdLocationOn className="text-2xl text-primary-main" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">{contactInfo.address.label}</p>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray">
                          {contactInfo.address.value}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="bg-white rounded-[14px] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                        <MdAccessTime className="text-2xl text-primary-main" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray mb-1">{contactInfo.officeHours.label}</p>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray">
                          {contactInfo.officeHours.value}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="bg-white rounded-[14px] overflow-hidden shadow-sm border border-gray-100">
                    <div className="relative w-full h-64 md:h-80">
                      <iframe
                        src={contactInfo.map.embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      ></iframe>
                    </div>
                    <div className="p-4 bg-gray-800 flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">Nadz Healthcare</p>
                        <p className="text-gray-400 text-xs">Navigate to clinic</p>
                      </div>
                      <a
                        href={contactInfo.map.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-[#E3C699] text-[#5C2533] hover:bg-[#d4b588] flex items-center justify-center transition-colors"
                        aria-label="Navigate to clinic"
                      >
                        <MdLocationOn className="text-xl" style={{ color: '#5C2533' }} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact Form and/or Lead Form Embed */}
                <div>
                  {showNativeForm ? <ContactForm form={form} /> : null}
                  {showLeadForm ? (
                    <div className={showNativeForm ? 'mt-8 md:mt-10' : undefined}>
                      <LeadFormEmbed
                        title={leadForm?.title}
                        fallbackMessage={leadForm?.fallbackMessage}
                        embedScript={leadForm?.embedScript}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
