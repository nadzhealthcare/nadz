"use client";

import { motion } from "framer-motion";
import { MdLocalHospital, MdSpa, MdFitnessCenter, MdHealing, MdScience, MdWaterDrop } from "react-icons/md";

const MotionDiv = motion.div;

// Icon mapping for signature IV drips
const iconMap = {
  'immunity': MdLocalHospital,
  'beauty': MdSpa,
  'glow': MdSpa,
  'energy': MdFitnessCenter,
  'recovery': MdFitnessCenter,
  'detox': MdHealing,
  'wellness': MdHealing,
  'nad': MdScience,
  'vitality': MdScience,
  'hangover': MdWaterDrop,
  'relief': MdWaterDrop,
  'hydration': MdWaterDrop,
  default: MdWaterDrop,
};

export const SignatureIVDripsSection = ({
  title = "Our Signature IV Drips at Home",
  drips = [],
}) => {
  if (!drips || drips.length === 0) {
    return null;
  }

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

          {/* Drips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {drips.map((drip, index) => {
              // Get icon component based on drip icon or title
              const titleLower = drip.title.toLowerCase();
              let iconKey = drip.icon?.toLowerCase();
              
              if (!iconKey) {
                // Try to match from title
                if (titleLower.includes('immunity')) iconKey = 'immunity';
                else if (titleLower.includes('beauty') || titleLower.includes('glow')) iconKey = 'beauty';
                else if (titleLower.includes('energy') || titleLower.includes('recovery')) iconKey = 'energy';
                else if (titleLower.includes('detox') || titleLower.includes('wellness')) iconKey = 'detox';
                else if (titleLower.includes('nad') || titleLower.includes('vitality')) iconKey = 'nad';
                else if (titleLower.includes('hangover') || titleLower.includes('relief')) iconKey = 'hangover';
                else if (titleLower.includes('hydration')) iconKey = 'hydration';
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
                  className="bg-white rounded-[14px] sm:rounded-[14px] p-5 sm:p-6 md:p-8 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[14px] sm:rounded-[14px] bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white text-2xl sm:text-2xl md:text-3xl" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                      {drip.title}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray flex-grow">
                    {drip.description}
                  </p>
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

