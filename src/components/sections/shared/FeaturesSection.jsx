"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div;

export const FeaturesSection = ({
  title = "Our Features",
  subtitle,
  features = [],
  backgroundColor = "#FAFAFA",
  columns = 3,
}) => {
  return (
    <section
      className="py-12 md:py-20 lg:py-24"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-heading leading-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-text-gray leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </MotionDiv>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6 md:gap-8`}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index}>
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-full bg-white rounded-[14px] p-6 md:p-8 flex flex-col items-center text-center transition-all shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                    {IconComponent && (
                      <div className="w-[70px] h-[70px] md:w-20 md:h-20 rounded-full bg-primary-mediumBlue flex items-center justify-center mb-6 mx-auto transition-transform hover:scale-105">
                        <IconComponent className="text-4xl md:text-5xl text-white" />
                      </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold text-primary-darkBlue mb-4 leading-tight">
                      {feature.title}
                    </h3>

                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </MotionDiv>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
