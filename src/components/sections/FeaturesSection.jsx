"use client";

import { motion } from "framer-motion";
import { MdVerified, MdSchedule, MdLocalShipping } from "react-icons/md";
import { features } from "@/data/landing";

const iconMap = {
  verified: MdVerified,
  schedule: MdSchedule,
  local_shipping: MdLocalShipping,
};

export const FeaturesSection = () => (
  <section
    className="relative -mt-8 md:-mt-12 mb-8 md:mb-12 z-10"
  >
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[14px] shadow-xl overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-br from-primary-dark/15 via-primary-light/10 to-primary-main/10 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || MdVerified;
            return (
              <div
                key={feature.title}
                className={`flex flex-col md:flex-row gap-4 md:gap-6 flex-1 p-6 md:p-8 items-center md:items-start text-left ${
                  index < features.length - 1 ? 'border-b md:border-b-0 md:border-r border-primary-main/20' : ''
                }`}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="text-4xl md:text-5xl text-primary-main/70" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-[0.9375rem] text-text-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </section>
);
