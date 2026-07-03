"use client";

import { motion } from "framer-motion";
import { MdCheckCircle, MdHome, MdHotel, MdBusiness, MdLocalHospital, MdPsychology } from "react-icons/md";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

// Icon mapping for dynamic icon selection
const iconMap = {
  home: MdHome,
  hotel: MdHotel,
  business: MdBusiness,
  office: MdBusiness,
  hospital: MdLocalHospital,
  brain: MdPsychology,
};

export const LocationNursingServicesSection = ({
  locationServices = [],
  bulletsLabel = "We help with:",
}) => {
  const handleCtaClick = (ctaText) => {
    openWhatsAppUrl();
  };

  if (!locationServices || locationServices.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {locationServices.map((service, index) => {
            // Get icon component from iconMap, default to MdHome if not found
            const iconName = service.icon?.toLowerCase() || 'home';
            const IconComponent = iconMap[iconName] || MdHome;
            
            return (
              <MotionDiv
                key={service.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col h-full"
              >
                        <div className="bg-white rounded-[14px] sm:rounded-[14px] p-5 sm:p-6 md:p-8 shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-primary-mediumBlue/30 transition-all duration-300 h-full flex flex-col group">
                          {/* Title */}
                          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 leading-tight flex items-center justify-between gap-2">
                            <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                              {service.title}
                            </span>
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-[14px] bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center flex-shrink-0">
                              <IconComponent className="text-white text-xs sm:text-sm md:text-base" />
                            </div>
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-4 sm:mb-6 font-normal">
                            {service.description}
                          </p>

                  {/* Bullets/Highlights */}
                  <div className="flex-grow mb-6">
                    {service.bullets && service.bullets.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-primary-mediumBlue mb-3">
                          {bulletsLabel}
                        </p>
                        {service.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center">
                                <MdCheckCircle className="text-white text-sm" />
                              </div>
                            </div>
                            <p className="text-xs sm:text-xs md:text-sm text-text-gray leading-relaxed font-normal">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  {service.ctaText && (
                    <div className="px-2 sm:px-0">
                      <button
                        onClick={() => handleCtaClick(service.ctaText)}
                        className="w-full h-[48px] px-6 py-3.5 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs md:text-sm shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        <span className="text-center leading-tight whitespace-nowrap text-[#5C2533]">{service.ctaText}</span>
                      </button>
                    </div>
                  )}
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
};

