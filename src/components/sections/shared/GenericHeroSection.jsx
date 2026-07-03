"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { PhoneCtaLink, WhatsAppCtaLink } from "@/components/ui/CtaLinks";

const MotionDiv = motion.div;

export const GenericHeroSection = ({
  title = "Your Health",
  subtitle,
  highlightedWord,
  description = "We provide comprehensive healthcare services with a personal touch, ensuring you receive the best care possible.",
  introBlurb,
  primaryCtaText = "Book a Home Visit",
  secondaryCtaText = "Call Now (24/7)",
  onPrimaryClick,
  onSecondaryClick,
  primaryCtaHref,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  backgroundColor = "#FAFAFA",
  showCta = true,
  buttonVariant = "default",
  imageRoundedRight = false,
  showReassuranceLine = false,
}) => {
  const ctaButtonClass =
    "px-6 md:px-7 lg:px-8 py-3 md:py-3.5 lg:py-4 min-w-[160px] md:min-w-[180px] lg:min-w-[200px] bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs md:text-xs lg:text-sm shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn no-underline";
  const ctaPhoneClass =
    "px-6 md:px-7 lg:px-8 py-3 md:py-3.5 lg:py-4 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-xs md:text-xs lg:text-sm hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn no-underline";
  const ctaButtonClassMobile =
    "w-full sm:flex-1 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn no-underline";
  const ctaPhoneClassMobile =
    "w-full sm:flex-1 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-xs hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn no-underline";

  const renderPrimaryCta = (className) =>
    onPrimaryClick ? (
      <button type="button" onClick={onPrimaryClick} className={className}>
        <FaWhatsapp className="text-base md:text-lg group-hover/btn:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
        <span className="text-center whitespace-nowrap text-[#5C2533]">{primaryCtaText}</span>
      </button>
    ) : (
      <WhatsAppCtaLink href={primaryCtaHref} className={className}>
        <FaWhatsapp className="text-base md:text-lg group-hover/btn:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
        <span className="text-center whitespace-nowrap text-[#5C2533]">{primaryCtaText}</span>
      </WhatsAppCtaLink>
    );

  const renderSecondaryCta = (className) =>
    onSecondaryClick ? (
      <button type="button" onClick={onSecondaryClick} className={className}>
        <MdPhone className="text-base md:text-lg text-white group-hover/btn:scale-110 transition-transform flex-shrink-0" />
        <span className="text-center whitespace-nowrap text-white">{secondaryCtaText}</span>
      </button>
    ) : (
      <PhoneCtaLink href={secondaryCtaHref} className={className}>
        <MdPhone className="text-base md:text-lg text-white group-hover/btn:scale-110 transition-transform flex-shrink-0" />
        <span className="text-center whitespace-nowrap text-white">{secondaryCtaText}</span>
      </PhoneCtaLink>
    );

  return (
    <section className="relative overflow-hidden flex items-start pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-primary-mediumBlue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] bg-primary-mediumBlue/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 overflow-visible px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left Content - Heading and Description */}
          <div className="w-full md:w-[52%] flex flex-col justify-start order-2 md:order-1">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pr-0 md:pr-8 flex flex-col justify-start items-start text-left max-w-full"
            >
              <div className="ml-0 md:ml-4 w-full">
                {/* Large Bold Headline */}
                {highlightedWord ? (
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-4 sm:mb-6 md:mb-8"
                  >
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] sm:leading-tight font-bold tracking-tight">
                      {title.split(new RegExp(`(${highlightedWord})`, 'gi')).map((part, index) => 
                        part.toLowerCase() === highlightedWord.toLowerCase() ? (
                          <span key={index} className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                            {part}
                          </span>
                        ) : (
                          <span key={index} className="text-gray-900">{part}</span>
                        )
                      )}
                    </h1>
                  </MotionDiv>
                ) : (
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-4 sm:mb-6 md:mb-8"
                  >
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] sm:leading-tight font-bold tracking-tight">
                      <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                        {title}
                      </span>
                    </h1>
                  </MotionDiv>
                )}

                {/* Descriptive Paragraph */}
                {description && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-full md:max-w-[600px] font-normal text-text-gray">
                      {description}
                    </p>
                  </MotionDiv>
                )}

                {/* Intro Blurb */}
                {introBlurb && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                  >
                    <p className="text-xs sm:text-sm md:text-sm leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-full md:max-w-[600px] font-normal text-text-gray">
                      {introBlurb}
                    </p>
                  </MotionDiv>
                )}

                {/* CTA Buttons - Hidden on mobile, visible on desktop; controlled by showCta from CMS */}
                {showCta !== false && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="hidden md:flex flex-col lg:flex-row items-start justify-start gap-4 lg:gap-6"
                  >
                    {renderPrimaryCta(ctaButtonClass)}
                    {renderSecondaryCta(ctaPhoneClass)}
                  </MotionDiv>
                )}

                {/* Reassurance Line */}
                {showReassuranceLine && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-6"
                  >
                    <p className="text-sm md:text-base max-w-[520px] italic font-light">
                      <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                        No waiting rooms. No traffic. Just hospital-level care, where you feel safe and comfortable.
                      </span>
                    </p>
                  </MotionDiv>
                )}
              </div>
            </MotionDiv>
          </div>

          {/* Right Content - Doctor Image with Circular Background */}
          {imageSrc && imageSrc.trim() !== '' && (
            <div className="w-full md:w-[48%] flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative order-1 md:order-2 mb-6 sm:mb-4 md:mb-0">
              <MotionDiv
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-visible pt-4 sm:pt-6 md:pt-8 lg:pt-0"
              >
                {/* Enhanced Circular Background with multiple layers */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] rounded-full z-0"
                  style={{
                    background: "radial-gradient(circle, rgba(51, 138, 174, 0.15) 0%, rgba(51, 138, 174, 0.1) 40%, rgba(51, 138, 174, 0.05) 70%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] md:w-[350px] h-[200px] sm:h-[250px] md:h-[350px] rounded-full z-0 blur-xl"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)",
                  }}
                />

                {/* Doctor Image */}
                <div className={`relative w-[75%] sm:w-[80%] md:w-[85%] lg:w-[90%] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] z-10 ${imageRoundedRight ? 'rounded-r-[30px] sm:rounded-r-[40px] md:rounded-r-[60px]' : ''}`}>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={550}
                    height={600}
                    className="object-contain object-center drop-shadow-2xl"
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 75vw, (max-width: 768px) 80vw, (max-width: 1024px) 85vw, 90vw"
                  />
                </div>
              </MotionDiv>
            </div>
          )}

          {/* CTA Buttons - Visible on mobile only; controlled by showCta from CMS */}
          {showCta !== false && (
            <div className="w-full md:hidden order-3 mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 px-2 sm:px-4">
                {renderPrimaryCta(ctaButtonClassMobile)}
                {renderSecondaryCta(ctaPhoneClassMobile)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
