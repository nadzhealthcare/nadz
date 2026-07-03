"use client";

import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

const MotionDiv = motion.div;

export const MotherBabyCareServicesSection = ({
  title,
  services = [],
  ctaText,
  ctaHref = "#",
}) => {
  if (!services || services.length === 0) {
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
          {title && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6 text-center">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            </MotionDiv>
          )}

          {/* Services List */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
            <div className="space-y-3 sm:space-y-4">
              {services.map((service, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-br from-white to-gray-50/50 rounded-[14px] sm:rounded-[14px] shadow-sm border border-gray-200/50 hover:shadow-lg hover:border-primary-mediumBlue/30 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MdCheckCircle className="text-white text-xs sm:text-sm md:text-base" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal flex-grow">
                    {service}
                  </p>
                </MotionDiv>
              ))}
            </div>
          </div>

          {/* CTA */}
          {ctaText && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <a
                href={ctaHref}
                className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#E3C699] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {ctaText}
              </a>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </section>
  );
};

