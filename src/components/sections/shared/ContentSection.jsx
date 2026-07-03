"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MdCheck } from "react-icons/md";

const MotionDiv = motion.div;

export const ContentSection = ({
  title,
  description,
  imageSrc,
  imageAlt,
  backgroundColor = "white",
  contentBackgroundColor = "#F8F9FA",
  imageOnRight = true,
  features = [],
}) => {
  return (
    <section
      className="py-6 md:py-16 px-4 md:px-9"
      style={{ backgroundColor }}
    >
      <div className="w-full max-w-[1300px] mx-auto rounded-[14px] md:rounded-[14px] p-8 md:p-14 lg:p-20" style={{ backgroundColor: contentBackgroundColor }}>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center flex-wrap md:flex-nowrap">
            <div className={`md:col-span-${imageSrc ? '7' : '12'} flex flex-col text-left ${imageSrc ? (imageOnRight ? 'order-1 md:order-1' : 'order-1 md:order-2') : ''}`}>
              <div className="flex flex-col gap-5 w-full">
                {title && (
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-heading leading-tight tracking-tight">
                    {title}
                  </h2>
                )}

                {description && (
                  <div className={features.length > 0 ? 'mb-8 md:mb-10' : ''}>
                    <p className="text-base md:text-lg text-text-gray leading-relaxed mb-8 md:mb-10">
                      {description}
                    </p>
                  </div>
                )}

                {features.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {features.map((feature, index) => (
                        <div key={index}>
                          <div className="flex flex-row gap-4 items-start">
                            <div className="w-7 h-7 rounded-full bg-accent-gold flex items-center justify-center flex-shrink-0 mt-1">
                              <MdCheck className="text-white text-lg" />
                            </div>
                            <p className="text-sm md:text-base text-text-gray font-medium leading-relaxed">
                              {feature}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {imageSrc && imageSrc.trim() !== '' && (
              <div className={`md:col-span-5 flex items-center ${imageOnRight ? 'justify-end' : 'justify-start'} h-auto md:h-full min-h-[350px] md:min-h-auto ${imageOnRight ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
                <MotionDiv
                  initial={{ opacity: 0, x: imageOnRight ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-[120%] h-full flex items-center justify-end"
                  style={{ justifyContent: imageOnRight ? 'flex-end' : 'flex-start' }}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt || ''}
                    width={900}
                    height={900}
                    className="w-full max-w-full h-auto max-h-[500px] md:max-h-[900px] object-contain rounded-[14px]"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </MotionDiv>
              </div>
            )}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
