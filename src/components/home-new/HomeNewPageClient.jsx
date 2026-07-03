'use client';

import { HeroSection } from './HeroSection';
import { ComprehensiveCareSection } from './ComprehensiveCareSection';
import { HomeNewServicesSection } from './HomeNewServicesSection';
import { DoctorLedCareSection } from './DoctorLedCareSection';
import { HomeNewHowItWorksSection } from './HomeNewHowItWorksSection';
import { HomeNewFamilySection } from './HomeNewFamilySection';
import { ExpertDoctorsSection } from '@/components/sections/ExpertDoctorsSection';
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection';
import { PremiumCtaSection } from '@/components/sections/PremiumCtaSection';

export function HomeNewPageClient({ data }) {
  return (
    <>
      <HeroSection heroData={data.hero}/>
      <ComprehensiveCareSection data={data.comprehensiveCare} />
      <HomeNewServicesSection data={data.services} />
      <DoctorLedCareSection data={data.doctorLedCare} />
      <HomeNewHowItWorksSection data={data.howItWorks} />
      <HomeNewFamilySection data={data.familyExcellence} />
      <ExpertDoctorsSection expertDoctorsData={data.expertDoctors} />
      <GoogleReviewsSection googleReviewsData={data.googleReviews} />
      <PremiumCtaSection premiumCtaData={data.premiumCta} />
    </>
  );
}
