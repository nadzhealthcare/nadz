"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import {
  MdElderly,
  MdBabyChangingStation,
  MdChildCare,
  MdSupport,
} from "react-icons/md";

const MotionDiv = motion.div;

// Icon mapping for subcategories
const iconMap = {
  'elderly': MdElderly,
  'mother': MdBabyChangingStation,
  'baby': MdBabyChangingStation,
  'babysitting': MdChildCare,
  'palliative': MdSupport,
  default: MdSupport,
};

export const NursingSubcategoriesSection = ({
  subcategories = [],
  backgroundColor = "white",
}) => {
  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  // Generate slug from category name for URL
  const getSlug = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  };

  // Get icon for category
  const getIcon = (category) => {
    const lowerCategory = category.toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (lowerCategory.includes(key) && key !== 'default') {
        return Icon;
      }
    }
    return iconMap.default;
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFA] overflow-hidden">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {subcategories.map((category, index) => {
              const IconComponent = getIcon(category);
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/home-care/${getSlug(category)}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-[14px] sm:rounded-[14px] p-5 sm:p-6 md:p-8 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 h-full flex items-center gap-4 sm:gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[14px] sm:rounded-[14px] bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="text-white text-2xl sm:text-2xl md:text-3xl" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors">
                          <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                            {category}
                          </span>
                        </h3>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <MdArrowForward className="text-xl sm:text-2xl text-primary-mediumBlue group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

