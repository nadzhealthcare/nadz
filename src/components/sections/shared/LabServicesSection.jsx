"use client";

import { motion } from "framer-motion";
import { MdCheckCircle, MdScience, MdLocalHospital, MdMonitorHeart, MdBiotech, MdCoronavirus, MdAir, MdFavorite, MdBusiness, MdAddCircle } from "react-icons/md";
import { FaDna } from "react-icons/fa";

const MotionDiv = motion.div;

// Icon mapping for categories
const iconMap = {
  'routine': MdScience,
  'genomics': FaDna,
  'tumour': MdLocalHospital,
  'hormones': MdMonitorHeart,
  'advanced': MdBiotech,
  'infectious': MdCoronavirus,
  'allergy': MdAir,
  'men': MdFavorite,
  'women': MdFavorite,
  'employment': MdBusiness,
  'corporate': MdBusiness,
  'additional': MdAddCircle,
  default: MdScience,
};

export const LabServicesSection = ({
  title = "Our Home Lab Services – Tests We Offer at Your Doorstep",
  description,
  categories = [],
  note,
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
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
            className="mb-8 sm:mb-10 md:mb-12 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </MotionDiv>

          {/* Description */}
          {description && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 sm:mb-10 md:mb-12 text-center"
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal text-text-gray">
                {description}
              </p>
            </MotionDiv>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
            {categories.map((category, index) => {
              // Get icon component based on category icon or title
              const iconKey = category.icon?.toLowerCase() || 
                category.title.toLowerCase().split(' ')[0] || 
                'default';
              const IconComponent = iconMap[iconKey] || iconMap.default;
              
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-[14px] sm:rounded-[14px] p-5 sm:p-6 md:p-8 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[14px] sm:rounded-[14px] bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white text-2xl sm:text-2xl md:text-3xl" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                      {category.title}
                    </span>
                  </h3>
                {category.description && (
                  <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 font-normal italic text-text-gray">
                    {category.description}
                  </p>
                )}
                <ul className="space-y-1.5 sm:space-y-2 flex-grow">
                  {category.tests && category.tests.map((test, testIndex) => (
                    <li key={testIndex} className="flex items-start gap-2 sm:gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center">
                          <MdCheckCircle className="text-white text-[10px] sm:text-xs" />
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray">
                        {test}
                      </span>
                    </li>
                  ))}
                </ul>
                </MotionDiv>
              );
            })}
          </div>

          {/* Note */}
          {note && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-amber-50/80 border-l-4 border-amber-400 rounded-r-lg p-4 sm:p-6 md:p-8">
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal">
                  <span className="font-semibold">Note:</span> {note}
                </p>
              </div>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </section>
  );
};

