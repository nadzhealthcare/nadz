'use client';

import { motion } from 'framer-motion';
import {
  MdHealing,
  MdElderly,
  MdMonitorHeart,
  MdLocalHospital,
  MdChildCare,
  MdBabyChangingStation,
  MdSupport,
  MdAccessibility,
  MdMedicalServices,
} from 'react-icons/md';

import { openWhatsAppUrl } from '@/lib/whatsapp';

const MotionDiv = motion.div;

// Icon mapping for services
const iconMap = {
  'post-surgical': MdHealing,
  'elderly': MdElderly,
  'chronic': MdMonitorHeart,
  'critical': MdLocalHospital,
  'mother': MdBabyChangingStation,
  'paediatric': MdChildCare,
  'palliative': MdSupport,
  'rehabilitation': MdAccessibility,
  'specialised': MdMedicalServices,
  // Fallback
  default: MdMedicalServices,
};

export const NursingCareServicesSection = ({
  title = 'Our Nursing Care Services',
  services = [],
  note,
  ctaText,
}) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFA] overflow-hidden">
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
            className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </MotionDiv>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
            {services.map((service, index) => {
              // Get icon component based on service icon or title
              const iconKey = service.icon?.toLowerCase() || 
                service.title.toLowerCase().split(' ')[0] || 
                'default';
              const IconComponent = iconMap[iconKey] || iconMap.default;
              
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-[14px] p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Heading with Icon on the right */}
                  <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[14px] bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-white text-lg sm:text-xl md:text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight flex-1">
                      <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                        {service.title}
                      </span>
                    </h3>
                    
                  </div>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray flex-grow">
                    {service.description}
                  </p>
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
              className="max-w-4xl mx-auto mb-6 sm:mb-8"
            >
              <div className="bg-amber-50/80 border-l-4 border-amber-400 rounded-r-lg p-4 sm:p-6 md:p-8">
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal">
                  <span className="font-semibold">Note:</span> {note}
                </p>
              </div>
            </MotionDiv>
          )}

          {/* CTA */}
          {ctaText && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <button
                onClick={() => openWhatsAppUrl()}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn mx-auto"
              >
                <span className="text-center whitespace-nowrap">{ctaText}</span>
              </button>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </section>
  );
};
