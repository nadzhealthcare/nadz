"use client";

import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const PathwaySection = ({
  title = "Your Care Pathway in 3 Simple Steps",
  steps = [],
  ctaBlock,
}) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  const handleCall = () => {
    window.location.href = 'tel:+97180046239';
  };

  const handleWhatsApp = () => {
    openWhatsAppUrl();
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10">
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
            className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </MotionDiv>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {steps.map((step, index) => (
              <MotionDiv
                key={step.number || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Number Circle */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center shadow-lg mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl sm:text-2xl md:text-3xl">{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {step.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray">
                  {step.description}
                </p>
              </MotionDiv>
            ))}
          </div>

          {/* CTA Block */}
          {ctaBlock && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-br from-primary-mediumBlue/10 to-primary-main/10 rounded-[14px] sm:rounded-[14px] p-6 sm:p-8 md:p-10 border border-primary-mediumBlue/20 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {ctaBlock.title}
                  </span>
                </h3>
                {ctaBlock.description && (
                  <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 font-normal text-text-gray">
                    {ctaBlock.description}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0">
                  {ctaBlock.primaryCta && (
                    <button
                      onClick={handleCall}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <MdPhone className="text-lg sm:text-xl text-white group-hover/btn:scale-110 transition-transform flex-shrink-0" />
                      <span className="text-center whitespace-nowrap text-white">{ctaBlock.primaryCta}</span>
                    </button>
                  )}
                  {ctaBlock.secondaryCta && (
                    <button
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base hover:bg-[#d4a86a] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <FaWhatsapp className="text-lg sm:text-xl group-hover/btn:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
                      <span className="text-center whitespace-nowrap text-[#5C2533]">{ctaBlock.secondaryCta}</span>
                    </button>
                  )}
                </div>
              </div>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </section>
  );
};
