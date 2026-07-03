"use client";

import { motion } from "framer-motion";
import { 
  MdWaterDrop, 
  MdPanTool, 
  MdHealthAndSafety,
  MdRestaurant,
  MdAir,
  MdCleanHands,
  MdNature,
  MdSchedule,
  MdVerified,
  MdHome,
  MdPeople,
  MdWarning,
  MdSearch
} from "react-icons/md";

const MotionDiv = motion.div;

// Icon mapping
const iconMap = {
  'tint': MdWaterDrop,
  'hand-paper': MdPanTool,
  'band-aid': MdHealthAndSafety,
  'utensils': MdRestaurant,
  'lungs': MdAir,
  'hand-sparkles': MdCleanHands,
  'leaf': MdNature,
  'clock': MdSchedule,
  'certificate': MdVerified,
  'home': MdHome,
  'users': MdPeople,
  'exclamation-triangle': MdWarning,
  'search': MdSearch
};

export const AllergyTestingSection = ({ data }) => {
  if (!data) return null;

  const {
    introSection,
    whatIsSection,
    benefitsSection,
    allergyTypes,
    testPanels,
    whyNadz,
    whenToConsider,
    finalCta
  } = data;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-[1300px] px-4 sm:px-6 md:px-8">
        
        {/* Intro Section */}
        {introSection && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-8 md:py-12 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[14px] mb-12 md:mb-16"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {introSection.title}
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed max-w-4xl mx-auto mb-6">
              {introSection.description}
            </p>
            <button className="bg-[#E3C699] text-[#5C2533] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <MdSchedule className="inline-block mr-2" />
              {introSection.ctaText}
            </button>
          </MotionDiv>
        )}

        {/* What is Allergy Testing */}
        {whatIsSection && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {whatIsSection.title}
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed max-w-4xl mx-auto">
                {whatIsSection.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whatIsSection.testTypes?.map((test, index) => {
                const IconComponent = iconMap[test.icon] || MdHealthAndSafety;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-[14px] border border-gray-200 hover:shadow-xl hover:border-accent-gold transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-primary-mediumBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-darkBlue mb-2 text-center">
                      {test.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-text-gray text-center">
                      {test.description}
                    </p>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Benefits Section */}
        {benefitsSection && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {benefitsSection.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="text-xl font-semibold text-primary-darkBlue mb-4">
                  {benefitsSection.leftColumn.subtitle}
                </h3>
                <p className="text-text-gray mb-6">
                  {benefitsSection.leftColumn.description}
                </p>
                <ul className="space-y-3">
                  {benefitsSection.leftColumn.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-gold flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-primary-darkBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm md:text-base text-text-gray">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column - Feature Box */}
              <div className="bg-gradient-to-br from-primary-darkBlue to-primary-mediumBlue rounded-[14px] p-8 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">
                  {benefitsSection.rightColumn.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/90">
                  {benefitsSection.rightColumn.description}
                </p>
              </div>
            </div>
          </MotionDiv>
        )}

        {/* Types of Allergies */}
        {allergyTypes && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {allergyTypes.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allergyTypes.types?.map((type, index) => {
                const IconComponent = iconMap[type.icon] || MdHealthAndSafety;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-[14px] border border-gray-200 hover:shadow-xl hover:border-accent-gold transition-all duration-300 cursor-pointer text-center"
                  >
                    <div className="w-14 h-14 bg-primary-mediumBlue rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-darkBlue mb-2">
                      {type.title}
                    </h3>
                    <p className="text-text-gray text-sm">
                      {type.description}
                    </p>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Test Panels */}
        {testPanels && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {testPanels.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {testPanels.panels?.map((panel, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer text-sm font-medium"
                >
                  {panel}
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        )}

        {/* Why NADZ */}
        {whyNadz && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="bg-gradient-to-br from-primary-darkBlue to-primary-mediumBlue rounded-[14px] p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                {whyNadz.title}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyNadz.features?.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon] || MdHome;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-14 h-14 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="text-primary-darkBlue text-2xl" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-white/80">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </MotionDiv>
        )}

        {/* When to Consider */}
        {whenToConsider && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {whenToConsider.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whenToConsider.situations?.map((situation, index) => {
                const IconComponent = iconMap[situation.icon] || MdWarning;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-[14px] border-l-3 border-accent-burgundy hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <IconComponent className="text-accent-burgundy text-2xl mb-3" />
                    <p className="text-xs sm:text-sm md:text-base text-text-gray">{situation.text}</p>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Final CTA */}
        {finalCta && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background-cream rounded-[14px] p-8 md:p-12 text-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {finalCta.title}
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-text-gray mb-8 max-w-2xl mx-auto">
              {finalCta.description}
            </p>
            <button className="bg-[#E3C699] text-[#5C2533] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <MdSchedule className="inline-block mr-2" />
              {finalCta.ctaText}
            </button>
          </MotionDiv>
        )}

      </div>
    </section>
  );
};

