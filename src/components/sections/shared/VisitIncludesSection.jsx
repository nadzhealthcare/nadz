"use client";

import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

const MotionDiv = motion.div;

export const VisitIncludesSection = ({
  title = "What Your Nursing Visit Includes",
  description,
  items = [],
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title and Description */}
          <div className="mb-10 sm:mb-12 md:mb-16 text-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 sm:mb-6"
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
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed max-w-3xl mx-auto">
                  {description}
                </p>
              </MotionDiv>
            )}
          </div>

          {/* Modern Stepper/Timeline Layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical connecting line */}
            <div className="absolute left-6 sm:left-8 md:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-mediumBlue/20 via-primary-mediumBlue/40 to-primary-mediumBlue/20 hidden sm:block"></div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {items.map((item, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-4 sm:gap-6 md:gap-8 group"
                >
                  {/* Step indicator circle */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 ring-4 ring-white sm:ring-8">
                      <MdCheckCircle className="text-white text-xl sm:text-2xl md:text-3xl" />
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-full bg-primary-mediumBlue/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pt-1 sm:pt-2">
                    <div className="bg-white rounded-[14px] sm:rounded-[14px] p-5 sm:p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 group-hover:-translate-y-1">
                      {/* Step number badge */}
                      <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-mediumBlue/10 text-primary-mediumBlue font-bold text-xs sm:text-sm mb-3 sm:mb-4">
                        {index + 1}
                      </div>
                      
                      {/* Content */}
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed text-text-gray group-hover:text-gray-800 transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

