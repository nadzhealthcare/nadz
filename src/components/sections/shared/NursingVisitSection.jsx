'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdCheckCircle } from 'react-icons/md';

const MotionDiv = motion.div;

export const NursingVisitSection = ({
  title = 'What Your Nursing Visit Includes',
  subtitle = 'Flexible care options tailored to your environment.',
  tabs = [
    {
      label: 'AT HOME',
      content: {
        title: 'Comprehensive Care Anywhere',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
        services: [
          {
            title: 'Vital Signs Monitoring',
            description:
              'Regular checks for blood pressure, heart rate, and temperature.',
          },
          {
            title: 'Medication Management',
            description:
              'Professional administration and organization of prescriptions.',
          },
          {
            title: 'Wound Care',
            description:
              'Expert dressing changes and healing progress monitoring.',
          },
        ],
      },
    },
    {
      label: 'AT OFFICE',
      content: {
        title: 'Comprehensive Care Anywhere',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
        services: [
          {
            title: 'Vital Signs Monitoring',
            description:
              'Regular checks for blood pressure, heart rate, and temperature.',
          },
          {
            title: 'Medication Management',
            description:
              'Professional administration and organization of prescriptions.',
          },
          {
            title: 'Wound Care',
            description:
              'Expert dressing changes and healing progress monitoring.',
          },
        ],
      },
    },
    {
      label: 'AT HOTEL',
      content: {
        title: 'Comprehensive Care Anywhere',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
        services: [
          {
            title: 'Vital Signs Monitoring',
            description:
              'Regular checks for blood pressure, heart rate, and temperature.',
          },
          {
            title: 'Medication Management',
            description:
              'Professional administration and organization of prescriptions.',
          },
          {
            title: 'Wound Care',
            description:
              'Expert dressing changes and healing progress monitoring.',
          },
        ],
      },
    },
  ],
  imageSrc,
  imageAlt,
  backgroundColor = 'white',
  containerMaxWidth = 'lg',
  spacing = { py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } },
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentContent = tabs?.[activeTab]?.content || tabs?.[0]?.content || {};

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
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-4 text-center items-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-text-gray max-w-[600px] mx-auto text-center block w-full">
              {subtitle}
            </p>
          </div>

          <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-12 flex-wrap">
            {(tabs || []).map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 md:px-8 py-2 md:py-3 min-w-[100px] md:min-w-[120px] rounded-[14px] uppercase font-semibold text-xs md:text-sm tracking-wide border-2 transition-all ${
                  activeTab === index
                    ? 'bg-[#E3C699] text-[#5C2533] border-[#E3C699] hover:bg-[#d4b588] hover:border-[#d4b588]'
                    : 'bg-white text-text-gray border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-1 md:order-1 flex items-center w-full md:w-1/2">
              <MotionDiv
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                key={activeTab}
                className="w-full flex items-center justify-center"
              >
                {imageSrc && (
                  <div className="w-full max-w-full aspect-square md:aspect-[6/5] max-h-[400px] md:max-h-[650px] rounded-[14px] overflow-hidden relative bg-gray-50">
                    <img
                      src={imageSrc}
                      alt={imageAlt || ''}
                      className="w-full h-full object-cover object-top block"
                    />
                  </div>
                )}
              </MotionDiv>
            </div>

            <div className="order-2 md:order-2 flex items-center w-full md:w-1/2">
              <MotionDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                key={activeTab}
                className="w-full"
              >
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {currentContent.title}
                  </h3>

                  <p className="text-sm md:text-base text-text-gray leading-relaxed">
                    {currentContent.description}
                  </p>

                  {currentContent.services && currentContent.services.length > 0 && (
                    <div className="flex flex-col gap-4 mt-6">
                      {currentContent.services.map((service, index) => (
                        <div key={index} className="flex flex-row gap-3 items-start">
                          <div className="mt-1 flex-shrink-0">
                            <MdCheckCircle className="text-primary-mediumBlue text-xl md:text-2xl" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                              {service.title}
                            </p>
                            <p className="text-xs md:text-sm text-text-gray leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
