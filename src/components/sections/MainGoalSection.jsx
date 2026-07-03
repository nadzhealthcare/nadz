"use client";

import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";

const MotionDiv = motion.div;

export const MainGoalSection = ({ mainGoalData }) => {
  const title = mainGoalData?.title || '';
  const description = mainGoalData?.description || '';
  const goalsLeft = mainGoalData?.goalsLeft || [];
  const goalsRight = mainGoalData?.goalsRight || [];
  const image = mainGoalData?.image || null;
  const imageAlt = mainGoalData?.imageAlt || 'Healthcare professional';
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="w-full max-w-[1300px] mx-auto bg-[rgb(250,250,250)] rounded-[14px] md:rounded-[14px] py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 shadow-sm">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center flex-wrap md:flex-nowrap">
            <div className="md:col-span-8 flex flex-col text-left">
              <div className="flex flex-col gap-4 sm:gap-5 w-full">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-4 sm:mb-6"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
                    <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                      {title}
                    </span>
                  </h2>
                </MotionDiv>

                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-4 sm:mb-6"
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 text-text-gray">
                    {description}
                  </p>
                </MotionDiv>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div className="flex flex-col gap-5">
                      {goalsLeft.map((goal) => (
                        <div key={goal} className="flex flex-row gap-4 items-center">
                          <div className="w-7 h-7 rounded-full bg-accent-gold flex items-center justify-center flex-shrink-0 mt-1">
                            <MdCheck className="text-white text-lg" />
                          </div>
                          <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-text-gray">
                            {goal}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-5">
                      {goalsRight.map((goal) => (
                        <div key={goal} className="flex flex-row gap-4 items-center">
                          <div className="w-7 h-7 rounded-full bg-accent-gold flex items-center justify-center flex-shrink-0 mt-1">
                            <MdCheck className="text-white text-lg" />
                          </div>
                          <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-text-gray">
                            {goal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex items-center justify-center md:justify-end h-auto md:h-full min-h-[250px] sm:min-h-[300px] md:min-h-auto">
              <MotionDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full h-full flex items-center justify-center md:justify-end"
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-auto h-auto max-w-[220px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[480px] block rounded-t-[14px] rounded-b-[24px] md:translate-x-4 lg:translate-x-8"
                  style={{ filter: 'drop-shadow(2px 2px 2px gray)', objectFit: 'contain' }}
                />
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
        </div>
      </div>
    </section>
  );
};
