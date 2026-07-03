"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const CenteredTextSection = ({
  title,
  paragraphs = [],
  backgroundColor = "white",
  borderColor = "#E5E7EB",
  ctaText,
}) => {
  const paragraphArray = Array.isArray(paragraphs) ? paragraphs : paragraphs ? [paragraphs] : [];

  const handleCtaClick = () => {
    openWhatsAppUrl();
  };

  return (
    <section className="relative py-8 sm:py-10 md:py-12 lg:py-16 bg-[#FAFAFA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10">
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
              className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            </MotionDiv>
          )}

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {paragraphArray.map((paragraph, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray">
                  {paragraph}
                </p>
              </MotionDiv>
            ))}
          </div>

          {/* CTA */}
          {ctaText && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 sm:mt-10 text-center"
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


