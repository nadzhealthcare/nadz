"use client";

import { motion } from "framer-motion";
import {
  MdSpa,
  MdFace,
  MdCleaningServices,
  MdRestaurant,
  MdFlightTakeoff,
  MdBatteryChargingFull,
  MdStar,
  MdNightlife,
  MdScience,
  MdHealthAndSafety,
} from "react-icons/md";

const MotionDiv = motion.div;

// Icon map for IV Vitamin Therapy packages (structured format)
const packageIconMap = {
  glow: MdSpa,
  beauty: MdFace,
  detox: MdCleaningServices,
  gut: MdRestaurant,
  travel: MdFlightTakeoff,
  wellness: MdBatteryChargingFull,
  glowPlus: MdStar,
  recovery: MdNightlife,
  vitaminC: MdScience,
  immune: MdHealthAndSafety,
  default: MdSpa,
};

const isStructuredPackage = (pkg) =>
  pkg && typeof pkg === "object" && (pkg.name != null || pkg.bestFor != null);

export const PackagesSection = ({
  title = "Mother & Baby Care Packages",
  description,
  packages = [],
  note,
}) => {
  if (!packages || packages.length === 0) {
    return null;
  }

  const useCardLayout = isStructuredPackage(packages[0]);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/5 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/5 rounded-full blur-3xl -translate-x-1/2"></div>
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
            {description && (
              <p className="text-sm sm:text-base md:text-lg text-text-gray max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </MotionDiv>

          {useCardLayout ? (
            /* Card grid with icons (IV Vitamin Therapy style) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
              {packages.map((pkg, index) => {
                const IconComponent =
                  packageIconMap[pkg.icon] || packageIconMap.default;
                return (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                    className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200/60 hover:shadow-lg hover:border-primary-mediumBlue/25 transition-all duration-300 h-full flex flex-col group"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="text-white text-xl sm:text-2xl" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold leading-tight text-gray-900">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm text-text-gray flex-grow">
                      <div>
                        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                          Best for
                        </span>
                        <p className="mt-0.5 leading-relaxed">{pkg.bestFor}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                          Supports
                        </span>
                        <p className="mt-0.5 leading-relaxed">{pkg.supports}</p>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          ) : (
            /* Legacy paragraph list */
            <div className="max-w-5xl mx-auto">
              <div className="space-y-3 sm:space-y-4">
                {packages.map((pkg, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50/50 rounded-[14px] sm:rounded-[14px] shadow-sm border border-gray-200/50 hover:shadow-lg hover:border-primary-mediumBlue/30 transition-all duration-300"
                  >
                    <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal">
                      {typeof pkg === "string" ? pkg : pkg.name}
                    </p>
                  </MotionDiv>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          {note && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-3xl mx-auto mt-6 sm:mt-8"
            >
              <p className="text-xs sm:text-sm md:text-base text-text-gray text-center italic">
                {note}
              </p>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </section>
  );
};

