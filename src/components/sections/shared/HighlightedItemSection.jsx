"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdFiberManualRecord, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const MotionDiv = motion.div;

export const HighlightedItemSection = ({
  title = "Highlighted Item Text",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  items = [
    "FOLLOWING ITEM 1",
    "FOLLOWING ITEM 2",
    "FOLLOWING ITEM 3",
  ],
  carouselImages = [
    "/images/doctor.png",
    "/images/doctor.png",
    "/images/doctor.png",
    "/images/doctor.png",
  ],
  backgroundColor = "#F5F5F5",
  containerMaxWidth = "lg",
  autoPlayInterval = 4000,
  enableAutoPlay = true,
  spacing = { py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } },
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enableAutoPlay || !carouselImages || carouselImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [carouselImages?.length, enableAutoPlay, autoPlayInterval]);

  const handleNext = () => {
    if (!carouselImages || carouselImages.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    if (!carouselImages || carouselImages.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section
      style={{
        backgroundColor,
        paddingTop: spacing.py.xs,
        paddingBottom: spacing.py.xs,
        paddingLeft: spacing.px.xs,
        paddingRight: spacing.px.xs,
      }}
      className="md:py-20 md:px-8"
    >
      <div className={`container mx-auto max-w-${containerMaxWidth === 'lg' ? '5xl' : '7xl'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center flex-wrap md:flex-nowrap">
          <div className="order-1 md:order-1 flex w-full md:w-1/2 md:flex-[0_0_50%]">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {title}
                </h2>

                <p className="text-sm md:text-base text-text-gray leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-col gap-0 mt-4">
                  {(items || []).map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-row gap-4 items-center py-3">
                        <MdFiberManualRecord className="text-primary-mediumBlue text-xs flex-shrink-0" />
                        <p className="text-sm md:text-base font-medium text-gray-900 uppercase tracking-wide">
                          {item}
                        </p>
                      </div>
                      {index < (items?.length || 0) - 1 && (
                        <div className="border-t border-gray-300 mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>

          <div className="order-2 md:order-2 flex items-center justify-center w-full md:w-1/2 md:flex-[0_0_50%]">
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center"
              style={{ perspective: '1000px', perspectiveOrigin: 'center center' }}
            >
              {(carouselImages || []).map((imageSrc, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex;
                const absOffset = Math.abs(offset);
                
                if (absOffset > 2) return null;
                
                const translateX = offset * 100;
                const translateZ = -absOffset * 40;
                const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
                const rotateY = offset * 10;
                const opacity = isActive ? 1 : 0.4 - absOffset * 0.1;
                const zIndex = 10 - absOffset;

                return (
                  <MotionDiv
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      x: translateX,
                      y: 0,
                      z: translateZ,
                      scale: scale,
                      rotateY: rotateY,
                      opacity: Math.max(opacity, 0.2),
                    }}
                    initial={{
                      x: translateX,
                      y: 0,
                      z: translateZ,
                      scale: scale,
                      rotateY: rotateY,
                      opacity: Math.max(opacity, 0.2),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.6,
                    }}
                    className="absolute left-1/2 top-1/2 w-[240px] md:w-[280px] h-[320px] md:h-[380px] -ml-[120px] md:-ml-[140px] -mt-[160px] md:-mt-[190px] cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      zIndex: zIndex,
                    }}
                  >
                    <div className={`w-full h-full rounded-[14px] overflow-hidden shadow-lg flex items-center justify-center ${
                      isActive ? 'bg-white' : 'bg-gray-200'
                    }`}>
                      <img
                        src={imageSrc}
                        alt={`Carousel image ${index + 1}`}
                        className={`w-full h-full object-cover transition-all ${
                          isActive ? 'opacity-100' : 'opacity-50'
                        }`}
                        style={{
                          filter: isActive 
                            ? 'none' 
                            : `grayscale(${60 + absOffset * 10}%) brightness(0.7)`,
                        }}
                      />
                      {!isActive && (
                        <div className="absolute inset-0 bg-gray-200/40 pointer-events-none"></div>
                      )}
                    </div>
                  </MotionDiv>
                );
              })}

              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 shadow-md hover:bg-white hover:shadow-lg rounded-full p-2 transition-all"
              >
                <MdArrowBackIos className="text-lg" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 shadow-md hover:bg-white hover:shadow-lg rounded-full p-2 transition-all"
              >
                <MdArrowForwardIos className="text-lg" />
              </button>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};
