"use client";

import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { PhoneCtaLink, WhatsAppCtaLink } from "@/components/ui/CtaLinks";

const MotionDiv = motion.div;

/**
 * Hero content section shown below the video banner (e.g. NADZ Vital Brain page only).
 * Matches GenericHeroSection left-column styling: title, subheading, intro blurb, CTAs.
 */
export const HeroContentBelowVideo = ({
  title = "",
  subheading = "",
  introBlurb = "",
  primaryCtaText = "Book a Home Visit",
  secondaryCtaText = "Call Now (24/7)",
  primaryCtaHref,
  secondaryCtaHref,
}) => {
  const whatsappBtnClass =
    "px-6 md:px-7 lg:px-8 py-3 md:py-3.5 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs md:text-sm shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 no-underline";
  const phoneBtnClass =
    "px-6 md:px-7 lg:px-8 py-3 md:py-3.5 bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-xs md:text-sm hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 no-underline";

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-primary-mediumBlue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] bg-primary-mediumBlue/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          {title && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 sm:mb-6 md:mb-8"
            >
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] sm:leading-tight font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            </MotionDiv>
          )}

          {subheading && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-normal text-text-gray">
                {subheading}
              </p>
            </MotionDiv>
          )}

          {introBlurb && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <p className="text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-normal text-text-gray">
                {introBlurb}
              </p>
            </MotionDiv>
          )}

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            {primaryCtaText && (
              <WhatsAppCtaLink href={primaryCtaHref} className={whatsappBtnClass}>
                <FaWhatsapp className="text-base md:text-lg flex-shrink-0 text-[#5C2533]" />
                <span className="whitespace-nowrap text-[#5C2533]">{primaryCtaText}</span>
              </WhatsAppCtaLink>
            )}
            {secondaryCtaText && (
              <PhoneCtaLink href={secondaryCtaHref} className={phoneBtnClass}>
                <MdPhone className="text-base md:text-lg flex-shrink-0 text-white" />
                <span className="whitespace-nowrap text-white">{secondaryCtaText}</span>
              </PhoneCtaLink>
            )}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};
