"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getIconComponent } from "@/lib/icons";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const HowItWorksSection = ({ howItWorksData }) => {
  const title = howItWorksData?.title || '';
  const steps = howItWorksData?.steps || [];
  const ctaText = howItWorksData?.ctaText || '';
  const ctaSubtext = howItWorksData?.ctaSubtext || '';
  
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[rgb(250,250,250)] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div className="relative w-full aspect-[4/3] rounded-[14px] sm:rounded-[14px] bg-white border border-primary-mediumBlue/15 shadow-lg overflow-hidden">
                {steps.map((step, index) => (
                  step?.image ? (
                    <MotionDiv
                      key={step.id ?? index}
                      initial={false}
                      animate={{
                        opacity: activeStep === index ? 1 : 0,
                        scale: activeStep === index ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={step.image}
                        alt={step.imageAlt || `${step.title} - Step ${step.number}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </MotionDiv>
                  ) : null
                ))}
              </div>
            </MotionDiv>

            <div className="order-1 md:order-2">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                {steps.map((step, index) => {
                  const Icon = typeof step.icon === 'string' ? getIconComponent(step.icon) : step.icon;
                  const isActive = activeStep === index;
                  
                  return (
                    <MotionDiv
                      key={step.id}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + index * 0.15,
                      }}
                      onClick={() => setActiveStep(index)}
                      className={`flex gap-3 sm:gap-4 md:gap-5 items-start cursor-pointer p-3 sm:p-4 md:p-5 rounded-[14px] sm:rounded-[14px] transition-all relative ${
                        isActive ? 'bg-gray-100 shadow-sm border border-primary-mediumBlue/20' : 'bg-transparent hover:bg-primary-mediumBlue/3'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[14px] sm:rounded-[14px] flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-[#E3C699] text-[#5C2533] shadow-sm' 
                          : 'bg-white text-primary-mediumBlue border border-primary-mediumBlue/20 shadow-sm'
                      }`}>
                        <Icon className="text-lg sm:text-xl md:text-2xl" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xs sm:text-sm md:text-base font-semibold mb-1.5 sm:mb-2 md:mb-3 flex items-center gap-2 sm:gap-3 transition-colors ${
                          isActive ? 'text-primary-mediumBlue' : 'text-text-gray'
                        }`}>
                          {step.number} – {step.title}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                          isActive ? 'text-text-gray' : 'text-text-gray'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>
              
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4 sm:mt-6 flex flex-col items-center gap-2 sm:gap-3"
              >
                <button
                  onClick={() => openWhatsAppUrl()}
                  className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 min-w-full sm:min-w-[220px] bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="inline-flex items-center justify-center bg-[#25D366] rounded-full w-6 h-6 flex-shrink-0">
                    <FaWhatsapp className="text-white text-sm" />
                  </span>
                  <span className="text-center whitespace-nowrap text-[#5C2533]">{ctaText}</span>
                </button>
                
                <p className="text-xs sm:text-sm md:text-base text-text-gray italic text-center">
                  {ctaSubtext}
                </p>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
