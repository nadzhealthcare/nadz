"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
} from "react-icons/md";
import { getIconComponent } from "@/lib/icons";

const MotionDiv = motion.div;

const fallbackServices = [
  {
    id: 1,
    title: "Doctor on Call (Urgent & Primary Care)",
    description: "Fever, infections, migraines, food poisoning or a sick child at 2am, a NADZ doctor comes with a clear plan and fast access to labs and IV support if needed.",
    icon: "MdPhone",
  },
  {
    id: 2,
    title: "Nursing & Long-Term Care",
    description: "Medication administration, wound dressings, post-surgery recovery, elderly support, palliative care, and mother–baby care, delivered with professional, family-like attention.",
    icon: "MdFavorite",
  },
  {
    id: 3,
    title: "IV Drips & NAD+ Therapies",
    description: "Clinic-grade IV therapies at home or in your hotel suite, for hydration, immunity, radiance, jet lag recovery, energy and longevity support.",
    icon: "MdWaterDrop",
  },
  {
    id: 4,
    title: "Labs & Diagnostics at Home",
    description: "Blood tests, genetic and hormone panels, allergy testing and coordinated radiology, samples collected at home and reviewed through a medical lens.",
    icon: "MdScience",
  },
  {
    id: 5,
    title: "NADZ Exclusive",
    description: "Beyond standard home healthcare, NADZ offers cutting-edge, doctor-designed programs that blend neuromodulation, biohacking and advanced diagnostics.",
    icon: "MdAutoAwesome",
  },
].map(service => ({
  ...service,
  icon: getIconComponent(service.icon),
}));

const ServiceCard = ({ service }) => {
  const IconComponent = service.icon;
  
  return (
    <div className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] flex-shrink-0 mx-2 sm:mx-3">
      <div className="w-full h-full min-h-[200px] sm:min-h-[220px] md:min-h-[240px] bg-white rounded-[14px] sm:rounded-[14px] p-4 sm:p-5 md:p-6 flex flex-col items-center text-center transition-all cursor-pointer shadow-md hover:-translate-y-2 hover:shadow-xl">
        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#4F052B] flex items-center justify-center mb-2 sm:mb-3 transition-transform hover:scale-105">
          <IconComponent className="text-lg sm:text-xl md:text-2xl text-white" />
        </div>

        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#4F052B] mb-2 leading-tight">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#4F052B] leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export const ServicesGridSection = ({ servicesSectionData }) => {
  const sectionTitle = servicesSectionData?.title || 'Services We Provide';
  const controls = useAnimation();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const autoPlayTimeoutRef = useRef(null);
  
  // Use services from servicesSectionData if available, otherwise use fallback
  const servicesFromSection = servicesSectionData?.services || [];
  const hasServicesFromSection = servicesFromSection.length > 0;

  const transformServices = (servicesArray) => {
    return servicesArray.map((service, index) => {
      // Icon names from Strapi might be full names (MdPhone) or short names (Phone)
      // Try full name first, then try with Md prefix
      const iconName = service.icon || 'MdLocalHospital';
      const IconComponent = iconName.startsWith('Md') || iconName.startsWith('Fa') 
        ? getIconComponent(iconName)
        : getIconComponent(`Md${iconName}`);

      return {
        id: service.id || index + 1,
        title: service.title || 'Service',
        description: service.description || '',
        icon: IconComponent,
      };
    });
  };

  // Use services from section if available, otherwise use fallback
  const services = hasServicesFromSection 
    ? transformServices(servicesFromSection)
    : fallbackServices;
  const extendedServices = [...services, ...services, ...services];
  
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 600) return 200 + 16;
      if (window.innerWidth < 900) return 240 + 24;
      return 260 + 24;
    }
    return 284;
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const cardWidth = getCardWidth();
      const totalWidth = cardWidth * services.length;
      
      const animate = async () => {
        await controls.start({
          x: scrollPosition - totalWidth,
          transition: {
            duration: 40,
            ease: "linear",
          },
        });
        
        setScrollPosition(0);
        controls.set({ x: 0 });
      };
      
      animate();
    }
    
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [controls, isAutoPlaying, scrollPosition]);

  const handlePrevious = async () => {
    setIsAutoPlaying(false);
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    const cardWidth = getCardWidth();
    const newPosition = scrollPosition + cardWidth;
    
    await controls.start({
      x: newPosition,
      transition: { duration: 0.6, ease: "easeOut" },
    });
    
    setScrollPosition(newPosition);
    
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const handleNext = async () => {
    setIsAutoPlaying(false);
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    const cardWidth = getCardWidth();
    const newPosition = scrollPosition - cardWidth;
    
    await controls.start({
      x: newPosition,
      transition: { duration: 0.6, ease: "easeOut" },
    });
    
    setScrollPosition(newPosition);
    
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
              {sectionTitle}
            </span>
          </h2>
        </MotionDiv>
      </div>

      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MotionDiv
          className="slider-track flex w-max py-4"
          animate={controls}
        >
          {extendedServices.map((service, index) => (
            <ServiceCard key={`${service.id}-${index}`} service={service} />
          ))}
        </MotionDiv>
        
        <div className="absolute top-0 left-0 w-[150px] h-full bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-[150px] h-full bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none z-10"></div>

        <button
          onClick={handlePrevious}
          className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-xl w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-primary-mediumBlue hover:text-white hover:shadow-2xl transition-all"
        >
          <MdArrowBackIos className="text-lg md:text-xl ml-1" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-xl w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-primary-mediumBlue hover:text-white hover:shadow-2xl transition-all"
        >
          <MdArrowForwardIos className="text-lg md:text-xl" />
        </button>
      </div>
    </section>
  );
};
