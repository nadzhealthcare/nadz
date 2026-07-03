"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const VitalBrainPackagesSection = ({
  title = "Vital Brain Packages",
  subtitle = "Choose Your Path to Optimal Brain Health",
  packages = [],
  ctaText,
}) => {
  if (!packages || packages.length === 0) {
    return null;
  }

  const handleCtaClick = () => {
    openWhatsAppUrl();
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
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
            className="mb-6 sm:mb-8 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm md:text-base text-text-gray max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </MotionDiv>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {packages.map((pkg, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-[14px] sm:rounded-[14px] p-6 sm:p-8 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 h-full flex flex-col group"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 leading-tight group-hover:text-primary-mediumBlue transition-colors">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {pkg.name}
                  </span>
                </h3>
                {pkg.description && (
                  <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal mb-4 sm:mb-6">
                    {pkg.description}
                  </p>
                )}
                <ul className="space-y-2 sm:space-y-3 flex-grow">
                  {pkg.features && pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray flex-1">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>

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

