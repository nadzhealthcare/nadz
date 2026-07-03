"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MdScience,
  MdRestaurant,
  MdShield,
  MdFavorite,
  MdCoronavirus,
  MdChildCare,
  MdLock
} from "react-icons/md";
import { FaDna } from "react-icons/fa";

const MotionDiv = motion.div;

const testingPages = [
  {
    slug: "allergy-testing-at-home",
    title: "Allergy Testing at Home",
    subtitle: "Accurate • Convenient • Hassle-Free",
    icon: MdScience,
    description: "Comprehensive allergy panels tested by DHA-licensed professionals"
  },
  {
    slug: "food-intolerance-testing-at-home",
    title: "Food Intolerance Testing at Home",
    subtitle: "Understand Your Body • Improve Your Health",
    icon: MdRestaurant,
    description: "Identify foods causing discomfort and improve your diet"
  },
  {
    slug: "std-testing-at-home",
    title: "STD Testing at Home",
    subtitle: "Confidential • Reliable • Hassle-Free",
    icon: MdShield,
    description: "Discreet sexual health screening with complete privacy"
  },
  {
    slug: "semen-analysis-at-home",
    title: "Semen Analysis at Home",
    subtitle: "Confidential • Accurate • Stress-Free",
    icon: MdFavorite,
    description: "Professional fertility testing in the comfort of your home"
  },
  {
    slug: "pcr-testing-at-home",
    title: "PCR Testing at Home",
    subtitle: "Fast • Accurate • Hassle-Free",
    icon: MdCoronavirus,
    description: "COVID-19 and infectious disease testing at your doorstep"
  },
  {
    slug: "nipt-testing-at-home",
    title: "NIPT Testing at Home",
    subtitle: "Safe • Accurate • Non-Invasive",
    icon: MdChildCare,
    description: "Prenatal testing for chromosomal conditions during pregnancy"
  },
  {
    slug: "genetic-genomics-testing-at-home",
    title: "Genetic & Genomics Testing at Home",
    subtitle: "Unlock Insights • Personalize Your Health",
    icon: FaDna,
    description: "Advanced DNA testing for personalized health insights"
  },
  {
    slug: "hiv-testing-at-home",
    title: "HIV Testing at Home",
    subtitle: "Confidential • Accurate • At Your Comfort",
    icon: MdLock,
    description: "Private HIV testing with complete discretion and support"
  }
];

export const LabTestingPagesSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-darkBlue mb-4">
            Available Lab Testing Services
          </h2>
          <p className="text-text-gray text-base md:text-lg max-w-3xl mx-auto">
            Explore our comprehensive range of lab testing services available at your doorstep in Dubai
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testingPages.map((page, index) => {
            const IconComponent = page.icon;
            return (
              <MotionDiv
                key={page.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/home-care/${page.slug}`}
                  className="block h-full group"
                >
                  <div className="bg-white rounded-[14px] p-6 border-2 border-gray-200 hover:border-accent-gold hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-primary-darkBlue mb-2 text-center">
                      {page.title}
                    </h3>

                    {/* Subtitle */}
                    {page.subtitle && (
                      <p className="text-sm text-primary-darkBlue mb-3 text-center font-medium">
                        {page.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    {page.description && (
                      <p className="text-sm text-primary-darkBlue text-center flex-grow">
                        {page.description}
                      </p>
                    )}

                    {/* Arrow indicator */}
                    <div className="mt-4 flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-accent-gold/20 group-hover:bg-accent-gold flex items-center justify-center transition-all duration-300">
                        <svg
                          className="w-4 h-4 text-primary-darkBlue group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
};

