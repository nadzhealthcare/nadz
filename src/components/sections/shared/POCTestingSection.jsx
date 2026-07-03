"use client";

import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";

const MotionDiv = motion.div;

export const POCTestingSection = ({
  title = "POC Testing under 5 Minutes",
  description,
  ctaText,
}) => {
  const handleCtaClick = () => {
    // Navigate to POC testing page
    window.location.href = '/home-care/poc-testing';
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-[14px] sm:rounded-[14px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg border border-gray-200/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {title}
                  </span>
                </h2>
              </MotionDiv>
              
              {description && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 text-text-gray">
                    {description}
                  </p>
                </MotionDiv>
              )}

              {ctaText && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="px-2 sm:px-0"
                >
                  <button
                    onClick={handleCtaClick}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#E3C699] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span className="text-center whitespace-nowrap">{ctaText}</span>
                    <MdArrowForward className="text-lg sm:text-xl group-hover/btn:translate-x-1 transition-transform flex-shrink-0" />
                  </button>
                </MotionDiv>
              )}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

