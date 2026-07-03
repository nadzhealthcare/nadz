"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MdAdd, MdRemove } from "react-icons/md";

const MotionDiv = motion.div;

function Faq({ title = "FAQs – Nursing at Home in Dubai", faqs = [], compact = false, alignLeft = false }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (index) => {
    setExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const hasTitle = title && title.trim() !== "";
  const sectionPadding = compact && !hasTitle ? "pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24" : "py-12 sm:py-16 md:py-20 lg:py-24";
  const containerAlign = alignLeft ? "max-w-4xl" : "container mx-auto max-w-4xl";

  return (
    <section className={`relative ${sectionPadding} bg-white overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className={`${containerAlign} px-4 sm:px-6 md:px-8 relative z-10`}>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title */}
          {hasTitle && (
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
          )}

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="rounded-[14px] border border-gray-200/50 shadow-sm hover:shadow-md hover:border-primary-mediumBlue/30 transition-all duration-300 overflow-hidden">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 text-left group"
                    aria-expanded={expanded[index]}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                      <span className="text-primary-mediumBlue font-bold text-base sm:text-lg md:text-xl flex-shrink-0">
                        {index + 1}.
                      </span>
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl pr-2 sm:pr-4">
                        <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                          {faq.q}
                        </span>
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {expanded[index] ? (
                        <MdRemove className="text-xl sm:text-2xl text-primary-mediumBlue" />
                      ) : (
                        <MdAdd className="text-xl sm:text-2xl text-primary-mediumBlue" />
                      )}
                    </div>
                  </button>
                  {expanded[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8"
                    >
                      <div className="pl-6 sm:pl-8 md:pl-10">
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-text-gray">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}

export default Faq;
