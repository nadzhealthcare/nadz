"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { MdSpa, MdHealing, MdScience, MdLocalHospital, MdWaterDrop, MdFitnessCenter, MdPsychology, MdBedtime } from "react-icons/md";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

// Icon mapping for benefits
const iconMap = {
  'skin': MdSpa,
  'brightening': MdSpa,
  'glow': MdSpa,
  'anti-aging': MdHealing,
  'antioxidant': MdScience,
  'immune': MdLocalHospital,
  'liver': MdWaterDrop,
  'detox': MdHealing,
  'cleansing': MdWaterDrop,
  'energy': MdFitnessCenter,
  'vitality': MdFitnessCenter,
  'mental': MdPsychology,
  'clarity': MdPsychology,
  'mood': MdPsychology,
  'sleep': MdBedtime,
  'recovery': MdFitnessCenter,
  default: MdSpa,
};

export const BenefitsSection = ({
  title = "Benefits of Glutathione IV Drip at Home",
  benefits = [],
  note,
  ctaText,
}) => {
  if (!benefits || benefits.length === 0) {
    return null;
  }

  const handleCtaClick = () => {
    openWhatsAppUrl();
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-10 md:mb-12 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </MotionDiv>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
            {benefits.map((benefit, index) => {
              // Get icon component based on benefit icon or title
              const titleLower = benefit.title.toLowerCase();
              let iconKey = benefit.icon?.toLowerCase();
              
              if (!iconKey) {
                // Try to match from title
                if (titleLower.includes('skin') || titleLower.includes('brightening') || titleLower.includes('glow')) iconKey = 'skin';
                else if (titleLower.includes('anti-aging') || titleLower.includes('aging')) iconKey = 'anti-aging';
                else if (titleLower.includes('antioxidant')) iconKey = 'antioxidant';
                else if (titleLower.includes('immune')) iconKey = 'immune';
                else if (titleLower.includes('liver') || titleLower.includes('detox') || titleLower.includes('cleansing')) iconKey = 'detox';
                else if (titleLower.includes('energy') || titleLower.includes('vitality')) iconKey = 'energy';
                else if (titleLower.includes('mental') || titleLower.includes('clarity') || titleLower.includes('mood')) iconKey = 'mental';
                else if (titleLower.includes('sleep') || titleLower.includes('recovery')) iconKey = 'sleep';
                else iconKey = 'default';
              }
              
              const IconComponent = iconMap[iconKey] || iconMap.default;
              
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50/50 rounded-[14px] sm:rounded-[14px] p-5 sm:p-6 md:p-8 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[14px] sm:rounded-[14px] bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="text-white text-2xl sm:text-2xl md:text-3xl" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-3 sm:mb-4 leading-tight group-hover:text-primary-mediumBlue transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal flex-grow">
                    {benefit.description}
                  </p>
                </MotionDiv>
              );
            })}
          </div>

          {/* Note */}
          {note && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-4xl mx-auto mb-6 sm:mb-8"
            >
              <div className="bg-amber-50/80 border-l-4 border-amber-400 rounded-r-lg p-4 sm:p-6 md:p-8">
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal">
                  <span className="font-semibold">Note:</span> {note}
                </p>
              </div>
            </MotionDiv>
          )}

          {/* CTA */}
          {ctaText && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <button
                onClick={handleCtaClick}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn mx-auto"
              >
                {!ctaText.toLowerCase().includes('care coordinator') && (
                  <FaWhatsapp className="text-lg sm:text-xl group-hover/btn:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
                )}
                <span className="text-center whitespace-nowrap text-white">{ctaText}</span>
              </button>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </section>
  );
};

