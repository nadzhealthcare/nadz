"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div;

export const MedicalTourismServicesSection = ({
  title = "What NADZ Medical Tourism Services Include",
  services = [],
}) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
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

          {/* Services List */}
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {services.map((service, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-[14px] sm:rounded-[14px] shadow-sm border border-gray-200/50 hover:shadow-lg hover:border-primary-mediumBlue/30 transition-all duration-300 group"
                >
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-base sm:text-lg md:text-xl">{index + 1}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 leading-tight group-hover:text-primary-mediumBlue transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal">
                      {service.description}
                    </p>
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

