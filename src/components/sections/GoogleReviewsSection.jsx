"use client";

import { motion } from "framer-motion";
import { MdStar } from "react-icons/md";

const MotionDiv = motion.div;

export const GoogleReviewsSection = ({ googleReviewsData }) => {
  const title = googleReviewsData?.title || "What Our Patients Say";
  const subtitle = googleReviewsData?.subtitle || "Google Reviews";
  const reviews = googleReviewsData?.reviews || [];

  if (!reviews.length) return null;

  return (
    <section className="relative py-16 md:py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-mediumBlue/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-mediumBlue/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-primary-mediumBlue font-semibold text-sm md:text-base mb-2">
            {subtitle}
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, index) => (
            <MotionDiv
              key={review.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < (review.rating ?? 5)
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm md:text-base text-text-gray leading-relaxed mb-4 line-clamp-5">
                {review.text}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary-mediumBlue text-sm md:text-base">
                  {review.author}
                </span>
                {review.date && (
                  <span className="text-xs text-gray-400">{review.date}</span>
                )}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};
