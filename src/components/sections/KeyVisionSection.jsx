"use client";

import { motion } from "framer-motion";
import { getIconComponent } from "@/lib/icons";

const MotionDiv = motion.div;

export const KeyVisionSection = ({ keyVisionData }) => {
  const title = keyVisionData?.title || '';
  const description = keyVisionData?.description || '';
  const visionItems = keyVisionData?.items || [];
  return (
    <section className="relative py-16 md:py-24 bg-[rgb(250,250,250)] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-text-gray">
            {description}
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {visionItems.map((item) => {
            const IconComponent = typeof item.icon === 'string' ? getIconComponent(item.icon) : item.icon;
            return (
              <MotionDiv
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.id * 0.1 }}
                className="p-4 sm:p-5 rounded-[14px] sm:rounded-[14px] shadow-md hover:shadow-lg transition-shadow h-full"
                style={{ background: 'linear-gradient(90deg, #FAE6C9 0%, #FFF4E3 100%)' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold leading-tight flex-1 mb-2 text-[#4F052B]">
                    {item.title}
                  </h3>
                  <IconComponent className="text-lg sm:text-xl md:text-2xl ml-3 sm:ml-4 flex-shrink-0 text-[#4F052B]" />
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#4F052B]">
                  {item.description}
                </p>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
};
