"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookNowDialog } from "@/components/common/BookNowDialog";
import { 
  // Common icons
  MdSchedule,
  MdVerified,
  MdHome,
  MdPeople,
  MdWarning,
  MdSearch,
  MdScience,
  MdTrendingUp,
  MdRestaurant,
  MdEgg,
  MdCoffee,
  MdSick,
  MdHeadset,
  MdPsychology,
  MdAir,
  MdMonitorWeight,
  MdFavorite,
  MdWaterDrop,
  MdPanTool,
  MdHealthAndSafety,
  MdCleanHands,
  MdNature,
  MdLocalDrink,
  MdPark,
  MdCoronavirus,
  MdBiotech,
  MdFavoriteBorder,
  MdLock,
  MdShield,
  MdAccessTime,
  MdCheckCircle,
  MdPerson,
  MdEmojiEvents,
  MdLocalHospital,
  MdCalendarToday,
  MdMedication,
  MdHotel,
  MdSpeed,
  MdFlight,
  MdWhatshot,
  MdChildCare,
  MdEvent,
  MdGroup,
  MdDiamond,
  MdAccountTree,
  MdRocket,
  MdSettings,
  MdPublic
} from "react-icons/md";
import { FaGlassWhiskey, FaBreadSlice, FaSeedling, FaTree, FaFish, FaFlask, FaDna, FaVial, FaAppleAlt } from "react-icons/fa";

const MotionDiv = motion.div;

// Comprehensive icon mapping for all testing types
const iconMap = {
  // Allergy Testing
  'tint': MdWaterDrop,
  'hand-paper': MdPanTool,
  'band-aid': MdHealthAndSafety,
  'utensils': MdRestaurant,
  'lungs': MdAir,
  'hand-sparkles': MdCleanHands,
  'leaf': MdNature,
  'exclamation-triangle': MdWarning,
  
  // Food Intolerance
  'microscope': MdScience,
  'clock': MdSchedule,
  'chart-line': MdTrendingUp,
  'glass-whiskey': FaGlassWhiskey,
  'bread-slice': FaBreadSlice,
  'egg': MdEgg,
  'seedling': FaSeedling,
  'tree': FaTree,
  'fish': FaFish,
  'flask': FaFlask,
  'stomach': MdSick,
  'head-side-cough': MdHeadset,
  'brain': MdPsychology,
  'weight': MdMonitorWeight,
  'tired': MdWarning,
  
  // Common
  'certificate': MdVerified,
  'home': MdHome,
  'users': MdPeople,
  'heart': MdFavorite,
  'search': MdSearch,
  'dna': FaDna,
  'vial': FaVial,
  'shield': MdShield,
  'lock': MdLock,
  'time': MdAccessTime,
  'check': MdCheckCircle,
  'user-md': MdPerson,
  'award': MdEmojiEvents,
  'hospital': MdLocalHospital,
  'heart-broken': MdFavorite,
  'calendar-times': MdCalendarToday,
  'tint': MdWaterDrop,
  'pills': MdMedication,
  'bed': MdHotel,
  'stethoscope': MdScience,
  'tachometer': MdSpeed,
  'plane': MdFlight,
  'thermometer': MdWhatshot,
  'swatchbook': MdScience,
  'baby-carriage': MdChildCare,
  'calendar-week': MdEvent,
  'family': MdGroup,
  'gem': MdDiamond,
  'search-plus': MdSearch,
  'project-diagram': MdAccountTree,
  'rocket': MdRocket,
  'user-cog': MdSettings,
  'apple-alt': FaAppleAlt,
  'globe': MdPublic,
  'heartbeat': MdFavorite,
  'baby': MdChildCare,
  
  // Default fallback
  'default': MdScience
};

export const LabTestingDetailsSection = ({ data }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!data) return null;

  const {
    introSection,
    whatIsSection,
    benefitsSection,
    // Flexible sections - can be allergyTypes, commonFoods, commonStds, testPanels, symptomsSection, parametersSection, preparationSection, testTypesSection, additionalTestsSection, etc.
    allergyTypes,
    testPanels,
    commonFoods,
    commonStds,
    symptomsSection,
    parametersSection,
    preparationSection,
    testTypesSection,
    additionalTestsSection,
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
            {introSection.ctaText && (
              <button 
                onClick={() => setDialogOpen(true)}
                className="bg-[#E3C699] text-[#5C2533] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <MdSchedule className="inline-block mr-2" />
                {introSection.ctaText}
              </button>
            )}
          </MotionDiv>
        )}

        {/* What is Section */}
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
              {whatIsSection.description && (
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed max-w-4xl mx-auto">
                  {whatIsSection.description}
                </p>
              )}
            </div>
            
            {whatIsSection.testTypes && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whatIsSection.testTypes.map((test, index) => {
                  const IconComponent = iconMap[test.icon] || iconMap.default;
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
            )}

            {/* Uses Section (for PCR Testing) */}
            {whatIsSection.usesSubtitle && whatIsSection.uses && (
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-gray mb-6 text-center">
                  {whatIsSection.usesSubtitle}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {whatIsSection.uses.map((use, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer text-center text-xs sm:text-sm font-medium"
                    >
                      {use}
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}

            {/* Conditions Section (for NIPT Testing) */}
            {whatIsSection.conditionsSubtitle && whatIsSection.conditions && (
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-gray mb-6 text-center">
                  {whatIsSection.conditionsSubtitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {whatIsSection.conditions.map((condition, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer group"
                    >
                      <h4 className="text-xs sm:text-sm md:text-base font-semibold text-text-gray mb-2 group-hover:text-white">
                        {condition.title}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-text-gray group-hover:text-white/90">
                        {condition.description}
                      </p>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}

            {/* Insights Section (for Genetic & Genomics Testing) */}
            {whatIsSection.insightsSubtitle && whatIsSection.insights && (
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-gray mb-6 text-center">
                  {whatIsSection.insightsSubtitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {whatIsSection.insights.map((insight, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer group"
                    >
                      <h4 className="text-xs sm:text-sm md:text-base font-semibold text-text-gray mb-2 group-hover:text-white">
                        {insight.title}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-text-gray group-hover:text-white/90">
                        {insight.description}
                      </p>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}
          </MotionDiv>
        )}

        {/* Common STDs List (for STD Testing) */}
        {commonStds && (
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
                  {commonStds.title}
                </span>
              </h2>
              {commonStds.description && (
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed max-w-4xl mx-auto">
                  {commonStds.description}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {commonStds.stds?.map((std, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer text-center text-sm font-medium"
                >
                  {std}
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        )}

        {/* Common Foods Grid (for Food Intolerance) */}
        {commonFoods && (
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
                  {commonFoods.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {commonFoods.foods?.map((food, index) => {
                const IconComponent = iconMap[food.icon] || MdRestaurant;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer text-center text-xs sm:text-sm font-medium"
                  >
                    <IconComponent className="inline-block mr-2 mb-1" />
                    {food.name}
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Allergy Types Grid (for Allergy Testing) */}
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
                const IconComponent = iconMap[type.icon] || iconMap.default;
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
                    <p className="text-xs sm:text-sm md:text-base text-text-gray">
                      {type.description}
                    </p>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Test Panels Grid (for Allergy Testing) */}
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

        {/* Symptoms Section (for Food Intolerance) */}
        {symptomsSection && (
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
                  {symptomsSection.title}
                </span>
              </h2>
              {symptomsSection.description && (
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed max-w-4xl mx-auto">
                  {symptomsSection.description}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptomsSection.symptoms?.map((symptom, index) => {
                const IconComponent = iconMap[symptom.icon] || MdSick;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-[14px] border-l-4 border-accent-burgundy hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-primary-darkBlue mb-2 flex items-center gap-2">
                      <IconComponent className="text-accent-burgundy text-xl" />
                      {symptom.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed">
                      {symptom.description}
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
              {benefitsSection.leftColumn && (
                <div>
                  {benefitsSection.leftColumn.subtitle && (
                    <h3 className="text-xl font-semibold text-primary-darkBlue mb-4">
                      {benefitsSection.leftColumn.subtitle}
                    </h3>
                  )}
                  {benefitsSection.leftColumn.description && (
                    <p className="text-xs sm:text-sm md:text-base text-text-gray mb-6">
                      {benefitsSection.leftColumn.description}
                    </p>
                  )}
                  {benefitsSection.leftColumn.benefits && (
                    <ul className="space-y-3">
                      {benefitsSection.leftColumn.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3 py-3 border-b border-gray-200 hover:pl-3 hover:bg-gray-50 rounded transition-all duration-300">
                          <div className="w-5 h-5 rounded-full bg-accent-gold flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-primary-darkBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm md:text-base text-text-gray font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Right Column - Feature Box */}
              {benefitsSection.rightColumn && (
                <div className="bg-gradient-to-br from-primary-darkBlue to-primary-mediumBlue rounded-[14px] p-8 text-white flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {benefitsSection.rightColumn.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/90">
                    {benefitsSection.rightColumn.description}
                  </p>
                </div>
              )}
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
                    <div key={index} className="text-center bg-white/10 rounded-[14px] p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
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

        {/* Parameters Section (for Semen Analysis) */}
        {parametersSection && (
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
                  {parametersSection.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {parametersSection.parameters?.map((param, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer group"
                >
                  <h4 className="text-xs sm:text-sm md:text-base font-semibold text-text-gray mb-2 group-hover:text-white">
                    {param.title}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-text-gray group-hover:text-white/90">
                    {param.description}
                  </p>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        )}

        {/* Additional Tests Section (for HIV Testing) */}
        {additionalTestsSection && (
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
                  {additionalTestsSection.title}
                </span>
              </h2>
              {additionalTestsSection.description && (
                <p className="text-xs sm:text-sm md:text-base text-text-gray mb-6 leading-relaxed max-w-4xl mx-auto">
                  {additionalTestsSection.description}
                </p>
              )}
              {additionalTestsSection.subtitle && (
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-gray mb-6">
                  {additionalTestsSection.subtitle}
                </h3>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {additionalTestsSection.tests?.map((test, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-50 p-4 rounded-[14px] border-l-3 border-accent-gold hover:bg-primary-mediumBlue hover:text-white transition-all duration-300 cursor-pointer text-center text-sm font-medium"
                >
                  {test}
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        )}

        {/* Test Types Section (for Genetic & Genomics Testing) */}
        {testTypesSection && (
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
                  {testTypesSection.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testTypesSection.types?.map((type, index) => {
                const IconComponent = iconMap[type.icon] || MdScience;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-[14px] border-l-4 border-accent-burgundy hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-primary-darkBlue mb-2 flex items-center gap-2">
                      <IconComponent className="text-accent-burgundy text-xl" />
                      {type.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed">
                      {type.description}
                    </p>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        )}

        {/* Preparation Section (for Semen Analysis) */}
        {preparationSection && (
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
                  {preparationSection.title}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preparationSection.preparations?.map((prep, index) => {
                const IconComponent = iconMap[prep.icon] || MdWarning;
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
                    <p className="text-xs sm:text-sm md:text-base text-text-gray font-medium">{prep.text}</p>
                  </MotionDiv>
                );
              })}
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
                    <p className="text-xs sm:text-sm md:text-base text-text-gray font-medium">{situation.text}</p>
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
            {finalCta.ctaText && (
              <button 
                onClick={() => setDialogOpen(true)}
                className="bg-[#E3C699] text-[#5C2533] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <MdSchedule className="inline-block mr-2" />
                {finalCta.ctaText}
              </button>
            )}
          </MotionDiv>
        )}

      </div>

      {/* Book Now Dialog */}
      <BookNowDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </section>
  );
};

