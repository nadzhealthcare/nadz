"use client";

import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const ArtOfHealingSection = ({
  title = "The Art of Healing – Guided by Dr. Nadia",
  description,
  highlights = [],
  closingParagraphs = [],
  videoId,
  videoUrl,
  ctaText,
  backgroundColor = "white",
}) => {
  const handleCtaClick = () => {
    openWhatsAppUrl();
  };

  const getVideoId = () => {
    if (videoId) return videoId;
    if (videoUrl) {
      const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const finalVideoId = getVideoId();
  const embedUrl = finalVideoId 
    ? `https://www.youtube.com/embed/${finalVideoId}?rel=0&modestbranding=1&showinfo=0`
    : null;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </MotionDiv>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Video Section */}
            {embedUrl && (
              <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative w-full h-[270px] sm:h-[300px] md:h-[330px] lg:h-[360px] rounded-[14px] sm:rounded-[14px] overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full border-none rounded-[14px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="YouTube video player"
                    loading="lazy"
                  />
                </div>
              </MotionDiv>
            )}

            {/* Content Section */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center">
              {/* Description */}
              {description && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray">
                    {description}
                  </p>
                </MotionDiv>
              )}

              {/* Highlights */}
              {highlights && highlights.length > 0 && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <p className="text-xs sm:text-sm font-semibold text-primary-mediumBlue mb-2">
                    We focus on:
                  </p>
                  {highlights.map((highlight, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[14px] sm:rounded-[14px] bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:border-primary-mediumBlue/30 transition-all duration-300 group"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MdCheckCircle className="text-white text-xs sm:text-sm" />
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray flex-1">
                        {highlight}
                      </p>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              )}

              {/* Closing Paragraphs */}
              {closingParagraphs && closingParagraphs.length > 0 && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-1 sm:space-y-2"
                >
                  {closingParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-xs sm:text-sm md:text-base leading-relaxed font-normal text-text-gray"
                    >
                      {paragraph}
                    </p>
                  ))}
                </MotionDiv>
              )}

              {/* CTA Button */}
              {ctaText && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="pt-3 sm:pt-4 px-2 sm:px-0"
                >
                  <button
                    onClick={handleCtaClick}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    {!ctaText.toLowerCase().includes('care coordinator') && (
                      <FaWhatsapp className="text-lg sm:text-xl group-hover/btn:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
                    )}
                    <span className="text-center whitespace-nowrap text-white">{ctaText}</span>
                  </button>
                </MotionDiv>
              )}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};


