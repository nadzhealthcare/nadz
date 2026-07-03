"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div;

export const MultilingualSection = ({
  paragraphs = [],
}) => {
  const paragraphArray = Array.isArray(paragraphs) ? paragraphs : paragraphs ? [paragraphs] : [];

  if (paragraphArray.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {paragraphArray.map((paragraph, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray text-center">
                  {paragraph}
                </p>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

