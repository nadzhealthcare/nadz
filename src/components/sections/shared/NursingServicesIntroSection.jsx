"use client";

import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const NursingServicesIntroSection = ({
  title = "Nursing Services in Dubai – Wherever You Are",
  introParagraph = "",
  highlights = [],
  closingParagraph = "",
  ctaText = "Book a Home or Hotel Nursing Visit",
  backgroundColor = "white",
}) => {
  const handleCtaClick = () => {
    openWhatsAppUrl();
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/3 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {title && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            </MotionDiv>
          )}

          {introParagraph && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal text-text-gray">
                {introParagraph}
              </p>
            </MotionDiv>
          )}

          {highlights && highlights.length > 0 && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                {highlights.map((highlight, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex flex-row gap-3 sm:gap-4 items-start p-3 sm:p-4 md:p-5 rounded-[14px] sm:rounded-[14px] bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md hover:border-primary-mediumBlue/30 transition-all duration-300 group"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MdCheckCircle className="text-white text-base sm:text-lg" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed flex-1 font-normal text-text-gray transition-colors">
                      {highlight}
                    </p>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          )}

          {closingParagraph && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 sm:mb-10 md:mb-12"
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal text-text-gray">
                {closingParagraph}
              </p>
            </MotionDiv>
          )}

          {ctaText && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center px-2 sm:px-0"
            >
              <button
                onClick={handleCtaClick}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 min-w-full sm:min-w-[240px] bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {!ctaText.toLowerCase().includes('care coordinator') && (
                  <FaWhatsapp className="text-lg sm:text-xl group-hover:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
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

