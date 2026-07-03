import { notFound } from 'next/navigation';
import { getHomeCarePage, getAllHomeCarePages, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { mergeCmsWithFallback } from '@/lib/merge-cms-fallback';
import pagesData from '@/data/home-care-pages.json'; // Fallback

// Always fetch from CMS at request time so Strapi content (e.g. glutathione-iv-therapy) is shown when available
export const dynamic = 'force-dynamic';
import { PageLayout } from '@/components/layouts';
import {
  GenericHeroSection,
  VideoHeroSection,
  CenteredTextSection,
  HighlightedItemSection,
  NursingVisitSection,
  NursingServicesIntroSection,
  LocationNursingServicesSection,
  NursingCareServicesSection,
  NursingSubcategoriesSection,
  PathwaySection,
  ArtOfHealingSection,
  VisitIncludesSection,
  LabServicesSection,
  POCTestingSection,
  HowIVDripsWorkSection,
  IVDripTypesSection,
  SignatureIVDripsSection,
  MultilingualSection,
  LabTestingDetailsSection,
  LabTestingPagesSection,
  BenefitsSection,
  WhenToConsiderSection,
  MotherBabyCareServicesSection,
  WhyChooseSection,
  PackagesSection,
  VitalBrainPackagesSection,
  SpecialtiesSection,
  MedicalTourismServicesSection,
  QuickLinksSection,
} from '@/components/sections/shared';
import Faq from '../components/Faq';
import Testimonials from '../components/Testimonials';

export async function generateStaticParams() {
  try {
    const pages = await getAllHomeCarePages();
    if (pages && pages.length > 0) {
      return pages.map((p) => ({ slug: p.slug }));
    }
  } catch (error) {
    console.error('Error fetching pages from Strapi, using fallback:', error);
  }
  // Fallback to JSON file
  return pagesData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch {
    /* ignore */
  }
  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';

  try {
    const page = await getHomeCarePage(slug);
    if (page && page.metadata) {
      const pathname = `/home-care/${slug}`;
      const canonical = resolveCanonical(siteUrl, page.metadata.canonicalUrl, pathname);
      const m = page.metadata;
      const baseOg =
        m.openGraph && typeof m.openGraph === 'object' && !Array.isArray(m.openGraph)
          ? m.openGraph
          : {};

      return {
        title: m.title,
        description: m.description,
        keywords: m.keywords?.join?.(', ') ?? m.keywords,
        alternates: { canonical },
        openGraph: {
          ...baseOg,
          url: canonical,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching page metadata from Strapi, using fallback:', error);
  }
  // Fallback to JSON file
  const page = pagesData.find((p) => p.slug === slug);
  if (!page) return {};

  const canonical = resolveCanonical(siteUrl, page.metadata?.canonicalUrl, `/home-care/${slug}`);
  const metadata = page.metadata || {};
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords?.join?.(', ') ?? metadata.keywords,
    alternates: { canonical },
    openGraph: {
      ...(metadata.openGraph || {}),
      url: canonical,
    },
  };
}

export default async function HomeCareDynamicPage({ params }) {
  const { slug } = await params;
  const fallbackPage = pagesData.find((p) => p.slug === slug) ?? null;
  let strapiPage = null;
  try {
    strapiPage = await getHomeCarePage(slug);
  } catch (error) {
    console.error('Error fetching page from Strapi, using fallback:', error);
  }

  let page;
  if (strapiPage && typeof strapiPage === 'object' && Object.keys(strapiPage).length > 0) {
    page = mergeCmsWithFallback(strapiPage, fallbackPage || {});
  } else {
    page = fallbackPage;
  }

  if (!page) {
    notFound();
  }

  const {
    hero,
    centeredText,
    highlightedItem,
    nursingCareServices,
    subcategories,
    servicesIntro,
    locationServices,
    pathway,
    artOfHealing,
    visitIncludes,
    bloodTestSection,
    labServices,
    pocTesting,
    howItWorks,
    ivDripTypes,
    signatureDrips,
    multilingualSection,
    allergyTestingDetails,
    foodIntoleranceTestingDetails,
    stdTestingDetails,
    semenAnalysisDetails,
    pcrTestingDetails,
    niptTestingDetails,
    geneticGenomicsTestingDetails,
    hivTestingDetails,
    labTestingDetails,
    benefits,
    skinBrightening,
    whenToConsider,
    maternalCare,
    newbornCare,
    firstTimeMothers,
    whyChoose,
    packages,
    centeredText2,
    vitalBrainPackages,
    medicalTourismServices,
    specialties,
    whyChooseNADZ,
    travelVaccination,
    whatAreTravelVaccinations,
    commonVaccines,
    whoShouldGetVaccines,
    faqs,
  } = page;

  // Extract page name from hero title for Quick Links label
  const getPageName = (heroTitle) => {
    if (!heroTitle) return "";
    
    // Remove common prefixes and suffixes, extract main service name
    let pageName = heroTitle
      .replace(/^Home\s+/i, "") // Remove "Home" prefix
      .replace(/\s+in\s+Dubai.*$/i, "") // Remove "in Dubai" and everything after
      .replace(/\s*–.*$/i, "") // Remove everything after em dash
      .replace(/\s*—.*$/i, "") // Remove everything after em dash (alternative)
      .replace(/\s*at\s+Home.*$/i, "") // Remove "at Home" and everything after
      .trim();
    
    // Special cases for better naming - check for specific patterns first
    if (pageName.includes("Nursing Care") || pageName.includes("Nurse")) {
      return "Nursing Care";
    }
    if (pageName.includes("IV Drips") || pageName.includes("IV Drip")) {
      return "IV Drips";
    }
    if (pageName.includes("Lab Tests") || pageName.includes("Lab Testing")) {
      return "Lab Tests";
    }
    if (pageName.includes("Physiotherapy")) {
      return "Physiotherapy";
    }
    if (pageName.includes("Elderly Care")) {
      return "Elderly Care";
    }
    if (pageName.includes("Babysitting")) {
      return "Babysitting";
    }
    if (pageName.includes("POC Testing")) {
      return "POC Testing";
    }
    if (pageName.includes("Vaccinations")) {
      return "Vaccinations";
    }
    if (pageName.includes("Doctor on Call") || pageName.includes("Doctor")) {
      return "Doctor on Call";
    }
    if (pageName.includes("NAD+") || pageName.includes("NAD IV")) {
      return "NAD+ IV Drip";
    }
    if (pageName.includes("Glutathione")) {
      return "Glutathione IV";
    }
    if (pageName.includes("Hangover") || pageName.includes("IV Hydration")) {
      return "IV Hydration";
    }
    
    // Fallback: return first 2-3 words
    const words = pageName.split(/\s+/);
    if (words.length >= 2) {
      return words.slice(0, 2).join(" ");
    }
    
    return pageName || "";
  };

  const pageName = hero?.title ? getPageName(hero.title) : "";

  // Define quick links for home-nursing-supportive-care page
  const quickLinks = slug === "home-nursing-supportive-care" ? [
    { id: "services", label: "Services" },
    { id: "locations", label: "Locations" },
    { id: "nursing-services", label: "Nursing Services" },
    { id: "visit-includes", label: "Visit Includes" },
    { id: "care-pathway", label: "Care Pathway" },
    { id: "faqs", label: "FAQs" },
  ] : [];

  // Define subcategories for different parent pages
  const getCategorySlug = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  };
  
  // Nursing Care subcategories
  const nursingCareSubcategories = ["Elderly care", "Mother & Baby care", "Babysitting", "Palliative care"];
  const nursingCareSubcategorySlugs = ["elderly-care", "mother-and-baby-care", "babysitting", "palliative-care"];
  const getNursingCategoryFromSlug = (slug) => {
    const categoryMap = {
      "elderly-care": "Elderly care",
      "mother-and-baby-care": "Mother & Baby care",
      "babysitting": "Babysitting",
      "palliative-care": "Palliative care"
    };
    return categoryMap[slug] || null;
  };
  
  // IV Drips subcategories (only pages with actual routes)
  const ivDripsSubcategories = [
    "IV Glutathione Radiance Drip",
    "NAD+ IV Drip",
    "IV Vitamin Therapy",
    "IV Hydration"
  ];
  const ivDripsSubcategorySlugs = ["glutathione-iv-therapy", "nad-iv", "iv-vitamin-therapy", "hangover"];
  const getIVDripsCategoryFromSlug = (slug) => {
    const categoryMap = {
      "glutathione-iv-therapy": "IV Glutathione Radiance Drip",
      "nad-iv": "NAD+ IV Drip",
      "iv-vitamin-therapy": "IV Vitamin Therapy",
      "hangover": "IV Hydration"
    };
    return categoryMap[slug] || null;
  };
  
  // Labs at Home subcategories (only pages with actual routes)
  const labsAtHomeSubcategories = [
    "Genetic & Epigenetic Testing",
    "Food Intolerance & Allergies",
    "NIPT / Women's Health Panels",
    "STD Testing & Sexual Health",
    "COVID PCR"
  ];
  const labsAtHomeSubcategorySlugs = [
    "genetic-genomics-testing-at-home",
    "food-intolerance-testing-at-home",
    "nipt-testing-at-home",
    "std-testing-at-home",
    "pcr-testing-at-home"
  ];
  const getLabsCategoryFromSlug = (slug) => {
    const categoryMap = {
      "genetic-genomics-testing-at-home": "Genetic & Epigenetic Testing",
      "food-intolerance-testing-at-home": "Food Intolerance & Allergies",
      "nipt-testing-at-home": "NIPT / Women's Health Panels",
      "std-testing-at-home": "STD Testing & Sexual Health",
      "pcr-testing-at-home": "COVID PCR"
    };
    return categoryMap[slug] || null;
  };
  
  // Get all pages for subcategory logic (fallback to JSON if Strapi fails)
  let allPages = pagesData;
  try {
    const strapiPages = await getAllHomeCarePages();
    if (strapiPages && strapiPages.length > 0) {
      allPages = strapiPages;
    }
  } catch (error) {
    // Use JSON fallback
  }
  
  // Get parent page and subcategories based on current page
  let parentSubcategories = [];
  let currentCategory = null;
  let otherSubcategories = [];
  
  // Check if current page is a Nursing Care subcategory
  if (nursingCareSubcategorySlugs.includes(slug)) {
    const parentPage = allPages.find((p) => p.slug === "home-nursing-supportive-care");
    parentSubcategories = parentPage?.subcategories || [];
    currentCategory = getNursingCategoryFromSlug(slug);
    otherSubcategories = currentCategory
      ? parentSubcategories.filter(cat => cat !== currentCategory)
      : [];
  }
  // Check if current page is an IV Drips subcategory
  else if (ivDripsSubcategorySlugs.includes(slug)) {
    parentSubcategories = ivDripsSubcategories;
    currentCategory = getIVDripsCategoryFromSlug(slug);
    otherSubcategories = currentCategory
      ? parentSubcategories.filter(cat => cat !== currentCategory)
      : [];
  }
  // Check if current page is a Labs at Home subcategory
  else if (labsAtHomeSubcategorySlugs.includes(slug)) {
    parentSubcategories = labsAtHomeSubcategories;
    currentCategory = getLabsCategoryFromSlug(slug);
    otherSubcategories = currentCategory
      ? parentSubcategories.filter(cat => cat !== currentCategory)
      : [];
  }
  
  const isSubcategoryPage = nursingCareSubcategorySlugs.includes(slug) || 
                           ivDripsSubcategorySlugs.includes(slug) || 
                           labsAtHomeSubcategorySlugs.includes(slug);

  // Determine which subcategories to show
  let quickLinksSubcategories = [];
  if (slug === "home-nursing-supportive-care") {
    quickLinksSubcategories = nursingCareSubcategories;
  } else if (slug === "iv-drips") {
    quickLinksSubcategories = ivDripsSubcategories;
  } else if (slug === "lab-testing-at-home") {
    quickLinksSubcategories = labsAtHomeSubcategories;
  } else if (isSubcategoryPage) {
    quickLinksSubcategories = otherSubcategories;
  }

  return (
    <PageLayout>
      {(slug === "home-nursing-supportive-care" || slug === "iv-drips" || slug === "lab-testing-at-home" || isSubcategoryPage) && (
        <QuickLinksSection 
          links={quickLinks} 
          subcategories={quickLinksSubcategories}
          pageName={pageName}
        />
      )}

      {hero && (hero.videoUrl || hero.videoId) ? (
        <VideoHeroSection
          videoUrl={hero.videoUrl}
          videoId={hero.videoId}
          title={hero.title}
          subtitle={hero.subheading}
          description={hero.introBlurb}
          primaryCtaText={hero.primaryCtaText}
          secondaryCtaText={hero.secondaryCtaText}
          showCta={hero.showCta}
          logoUrl={hero.logoUrl}
          logoAlt={hero.logoAlt}
          imageSrc={hero.imageSrc}
          imageAlt={hero.imageAlt}
        />
      ) : hero ? (
        <GenericHeroSection
          title={hero.title}
          highlightedWord={hero.highlightedWord}
          description={hero.subheading}
          introBlurb={hero.introBlurb}
          primaryCtaText={hero.primaryCtaText}
          secondaryCtaText={hero.secondaryCtaText}
          showCta={hero.showCta}
          imageSrc={hero.imageSrc}
          imageAlt={hero.imageAlt}
          buttonVariant={hero.buttonVariant}
          imageRoundedRight={hero.imageRoundedRight}
        />
      ) : null}

      {centeredText && (
        <CenteredTextSection
          title={centeredText.title}
          paragraphs={centeredText.paragraphs}
        />
      )}

      {centeredText2 && (
        <CenteredTextSection
          title={centeredText2.title}
          paragraphs={centeredText2.paragraphs}
          ctaText={centeredText2.ctaText}
        />
      )}

      {(allergyTestingDetails || foodIntoleranceTestingDetails || stdTestingDetails || semenAnalysisDetails || pcrTestingDetails || niptTestingDetails || geneticGenomicsTestingDetails || hivTestingDetails || labTestingDetails) && (
        <LabTestingDetailsSection 
          data={allergyTestingDetails || foodIntoleranceTestingDetails || stdTestingDetails || semenAnalysisDetails || pcrTestingDetails || niptTestingDetails || geneticGenomicsTestingDetails || hivTestingDetails || labTestingDetails} 
        />
      )}

      {multilingualSection && (
        <MultilingualSection
          paragraphs={multilingualSection.paragraphs}
        />
      )}

      {pocTesting && (
        <POCTestingSection
          title={pocTesting.title}
          description={pocTesting.description}
          ctaText={pocTesting.ctaText}
        />
      )}

      {howItWorks && (howItWorks.title || howItWorks.description || (howItWorks.items && howItWorks.items.length > 0)) && (
        <HowIVDripsWorkSection
          title={howItWorks.title}
          description={howItWorks.description}
          items={howItWorks.items || []}
          closingParagraph={howItWorks.closingParagraph}
        />
      )}

      {ivDripTypes && (
        <IVDripTypesSection
          title={ivDripTypes.title}
          drips={ivDripTypes.drips}
          ctaText={ivDripTypes.ctaText}
        />
      )}

      {highlightedItem && (
        <HighlightedItemSection
          carouselImages={highlightedItem.carouselImages}
        />
      )}
      {servicesIntro && (
        <div id={slug === "home-nursing-supportive-care" ? "services" : undefined}>
        <NursingServicesIntroSection
          title={servicesIntro.title}
          introParagraph={servicesIntro.introParagraph}
          highlights={servicesIntro.highlights}
          closingParagraph={servicesIntro.closingParagraph}
          ctaText={servicesIntro.ctaText}
        />
        </div>
      )}
      

      {locationServices && locationServices.length > 0 && (
        <div id={slug === "home-nursing-supportive-care" ? "locations" : undefined}>
          <LocationNursingServicesSection locationServices={locationServices} />
        </div>
      )}

      {subcategories && (
        <NursingSubcategoriesSection
          subcategories={subcategories}
        />
      )}

      {artOfHealing && (
        <ArtOfHealingSection
          title={artOfHealing.title}
          description={artOfHealing.description}
          highlights={artOfHealing.highlights}
          closingParagraphs={artOfHealing.closingParagraphs}
          videoUrl={artOfHealing.videoUrl}
          ctaText={artOfHealing.ctaText}
        />
      )}

      {signatureDrips && (
        <SignatureIVDripsSection
          title={signatureDrips.title}
          drips={signatureDrips.drips}
        />
      )}

      {skinBrightening && (
        <CenteredTextSection
          title={skinBrightening.title}
          paragraphs={skinBrightening.paragraphs}
        />
      )}

      {whenToConsider && (
        <WhenToConsiderSection
          title={whenToConsider.title}
          items={whenToConsider.items}
          note={whenToConsider.note}
        />
      )}

      {maternalCare && (
        <MotherBabyCareServicesSection
          title={maternalCare.title}
          services={maternalCare.services}
          ctaText={maternalCare.ctaText}
        />
      )}

      {newbornCare && (
        <MotherBabyCareServicesSection
          title={newbornCare.title}
          services={newbornCare.services}
          ctaText={newbornCare.ctaText}
        />
      )}

      {firstTimeMothers && (
        <MotherBabyCareServicesSection
          title={firstTimeMothers.title}
          services={firstTimeMothers.services}
          ctaText={firstTimeMothers.ctaText}
        />
      )}

      {whyChoose && (
        <WhyChooseSection
          title={whyChoose.title}
          items={whyChoose.items}
        />
      )}

      {packages && (
        <PackagesSection
          title={packages.title}
          description={packages.description}
          packages={packages.packages}
          note={packages.note}
        />
      )}

      {vitalBrainPackages && (
        <VitalBrainPackagesSection
          title={vitalBrainPackages.title}
          subtitle={vitalBrainPackages.subtitle}
          packages={vitalBrainPackages.packages}
          ctaText={vitalBrainPackages.ctaText}
        />
      )}

      {medicalTourismServices && (
        <MedicalTourismServicesSection
          title={medicalTourismServices.title}
          services={medicalTourismServices.services}
        />
      )}

      {specialties && (
        <SpecialtiesSection
          title={specialties.title}
          description={specialties.description}
          specialties={specialties.specialties}
        />
      )}

      {whyChooseNADZ && (
        <WhyChooseSection
          title={whyChooseNADZ.title}
          items={whyChooseNADZ.items}
        />
      )}

      {travelVaccination && slug !== "medical-tourism" && (
        <CenteredTextSection
          title={travelVaccination.title}
          paragraphs={[travelVaccination.subtitle, ...travelVaccination.paragraphs]}
        />
      )}

      {whatAreTravelVaccinations && (
        <CenteredTextSection
          title={whatAreTravelVaccinations.title}
          paragraphs={whatAreTravelVaccinations.paragraphs}
        />
      )}

      {commonVaccines && (
        <WhenToConsiderSection
          title={commonVaccines.title}
          items={commonVaccines.vaccines}
        />
      )}

      {whoShouldGetVaccines && (
        <WhenToConsiderSection
          title={whoShouldGetVaccines.title}
          items={whoShouldGetVaccines.items}
        />
      )}

      {benefits && benefits.benefits && (
        <BenefitsSection
          title={benefits.title}
          benefits={benefits.benefits}
          note={benefits.note}
          ctaText={benefits.ctaText}
        />
      )}

      {whenToConsider && whenToConsider.items && (
        <WhenToConsiderSection
          title={whenToConsider.title}
          items={whenToConsider.items}
          note={whenToConsider.note}
        />
      )}

      {bloodTestSection && (
        <CenteredTextSection
          title={bloodTestSection.title}
          paragraphs={bloodTestSection.paragraphs}
        />
      )}

      {labServices && (
        <LabServicesSection
          title={labServices.title}
          description={labServices.description}
          categories={labServices.categories}
          note={labServices.note}
        />
      )}

      {slug === "lab-testing-at-home" && (
        <LabTestingPagesSection />
      )}

      {visitIncludes && (
        <div id={slug === "home-nursing-supportive-care" ? "visit-includes" : undefined}>
          <VisitIncludesSection
            title={visitIncludes.title}
            description={visitIncludes.description}
            items={visitIncludes.items}
          />
        </div>
      )}

      {nursingCareServices && (
        <div id={slug === "home-nursing-supportive-care" ? "nursing-services" : undefined}>
          <NursingCareServicesSection
            title={nursingCareServices.title}
            services={nursingCareServices.services}
            note={nursingCareServices.note}
            ctaText={nursingCareServices.ctaText}
          />
        </div>
      )}

      

      {pathway && pathway.steps && pathway.steps.length > 0 && (
        <div id={slug === "home-nursing-supportive-care" || slug === "iv-drips" ? "care-pathway" : undefined}>
          <PathwaySection
            title={pathway.title}
            steps={pathway.steps}
            ctaBlock={pathway.ctaBlock}
          />
        </div>
      )}

     

      {faqs && faqs.items && faqs.items.length > 0 && (
        <div id="faqs">
          <Faq title={faqs.title} faqs={faqs.items} />
        </div>
      )}

      <Testimonials />
    </PageLayout>
  );
}
