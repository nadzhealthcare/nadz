"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MdArrowBackIos, MdArrowForwardIos, MdStar, MdLanguage } from "react-icons/md";

// Card dimensions: fixed so section height never grows with more staff
const CARD_WIDTH = 280;
const CARD_GAP = 20;
const CARD_HEIGHT = 400;
const AUTO_SLIDE_INTERVAL_MS = 4000;
/** Horizontal padding on scroll track so first/last cards aren't cropped; matches pl-14 (56px) for infinite scroll math */
const SCROLL_PADDING_PX = 56;

// Helper function to encode image paths with spaces/special characters
const getImagePath = (filename) => {
  if (!filename) return "/images/doctor.png";
  if (filename.startsWith("http")) return filename;
  if (filename.startsWith("/images/")) {
    const name = filename.replace(/^\/images\//, "");
    return `/images/${encodeURIComponent(name)}`;
  }
  return `/images/${encodeURIComponent(filename)}`;
};

const MotionDiv = motion.div;

/**
 * Single staff/doctor card with fixed dimensions.
 * Icons can be overridden via expertDoctorsData.experienceIcon / languageIcon (React node or 'default').
 */
const StaffCard = ({
  doctor,
  index,
  ExperienceIcon = MdStar,
  LanguageIcon = MdLanguage,
  featuredLabel = "Featured",
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group cursor-default h-full flex-shrink-0"
    >
      <div
        className="h-full w-full flex flex-col rounded-[14px] border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary-mediumBlue/50 transition-all duration-300 relative overflow-hidden"
        style={{
          width: CARD_WIDTH,
          minHeight: CARD_HEIGHT,
          maxHeight: CARD_HEIGHT,
          background: "linear-gradient(135deg, #FFF3E1 0%, #F8F4EE 50%, #F3DDBB 100%)",
        }}
      >
        {/* Featured badge */}
        {doctor.featured && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary-mediumBlue to-primary-main text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            {featuredLabel}
          </div>
        )}

        {/* Image area - fixed height */}
        <div
          className="relative w-full overflow-hidden bg-gradient-to-br from-primary-mediumBlue/5 via-primary-main/5 to-primary-mediumBlue/10 flex-shrink-0"
          style={{ height: Math.round(CARD_WIDTH * 0.75) }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={getImagePath(doctor.image)}
              alt={doctor.imageAlt || doctor.name || "Healthcare professional"}
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "/images/doctor.png";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-mediumBlue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Experience badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-primary-mediumBlue/10">
            <ExperienceIcon className="text-primary-mediumBlue text-xs sm:text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-primary-mediumBlue">
              {doctor.yearsOfExperience}
            </span>
          </div>
        </div>

        {/* Content - compact spacing, truncate if needed */}
        <div className="px-3 pt-2.5 pb-3 sm:px-4 sm:pt-3 sm:pb-4 flex-grow flex flex-col min-h-0 text-left bg-white">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 group-hover:text-primary-mediumBlue transition-colors line-clamp-2">
            {doctor.name}
          </h3>
          <p className="text-xs sm:text-sm text-text-gray mb-1.5 font-medium line-clamp-1">
            {doctor.role}
          </p>
          <div className="flex items-start gap-2 mt-auto pt-1.5 border-t border-gray-100 min-h-0">
            <LanguageIcon className="text-primary-mediumBlue text-sm flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-text-gray leading-relaxed line-clamp-2">
              {doctor.languages || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

/**
 * Resolve optional icon from config (string name or React component).
 * Returns a component to render.
 */
function resolveIcon(iconConfig, defaultIcon) {
  if (!iconConfig) return defaultIcon;
  if (typeof iconConfig === "function") return iconConfig;
  if (typeof iconConfig === "string") {
    const map = {
      MdStar,
      MdLanguage,
      MdArrowBackIos,
      MdArrowForwardIos,
    };
    return map[iconConfig] || defaultIcon;
  }
  return defaultIcon;
}

export const ExpertDoctorsSection = ({ expertDoctorsData }) => {
  const title = expertDoctorsData?.title || "";
  const subtitle = expertDoctorsData?.subtitle || "";
  const doctors = expertDoctorsData?.doctors || [];
  const featuredLabel =
    typeof expertDoctorsData?.featuredLabel === "string"
      ? expertDoctorsData.featuredLabel
      : "Featured";

  const ExperienceIcon = resolveIcon(
    expertDoctorsData?.experienceIcon,
    MdStar
  );
  const LanguageIcon = resolveIcon(
    expertDoctorsData?.languageIcon,
    MdLanguage
  );

  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoSlideRef = useRef(null);
  const rafRef = useRef(null);

  const count = doctors.length;
  const setWidth = count * (CARD_WIDTH + CARD_GAP);

  const scrollBy = useCallback((delta) => {
    const el = scrollRef.current;
    if (!el) return;
    const next = el.scrollLeft + delta;
    el.scrollTo({ left: next, behavior: "smooth" });
  }, []);

  const goLeft = useCallback(() => {
    scrollBy(-(CARD_WIDTH + CARD_GAP));
  }, [scrollBy]);

  const goRight = useCallback(() => {
    scrollBy(CARD_WIDTH + CARD_GAP);
  }, [scrollBy]);

  const isResettingRef = useRef(false);

  // Infinite scroll: jump to middle set when at edges so loop is seamless
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || count === 0) return;

    const handleScroll = () => {
      if (isResettingRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const left = el.scrollLeft;
        const threshold = 50;
        if (left <= SCROLL_PADDING_PX + threshold) {
          isResettingRef.current = true;
          el.scrollLeft = setWidth + left;
          requestAnimationFrame(() => {
            isResettingRef.current = false;
          });
        } else if (left >= SCROLL_PADDING_PX + setWidth * 2 - threshold) {
          isResettingRef.current = true;
          el.scrollLeft = left - setWidth;
          requestAnimationFrame(() => {
            isResettingRef.current = false;
          });
        }
        rafRef.current = null;
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, setWidth]);

  // Start scrolled at the middle set for infinite loop (after layout)
  useEffect(() => {
    if (count === 0) return;
    const el = scrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollLeft = SCROLL_PADDING_PX + setWidth;
    });
    return () => cancelAnimationFrame(id);
  }, [count, setWidth]);

  // Auto-slide: advance one card periodically; pause on hover
  useEffect(() => {
    if (count <= 1 || isHovered) return;

    autoSlideRef.current = setInterval(() => {
      scrollBy(CARD_WIDTH + CARD_GAP);
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [count, isHovered, scrollBy]);

  if (count === 0) return null;

  const carouselDoctors = [...doctors, ...doctors, ...doctors];

  return (
    <section
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden"
      style={{ minHeight: CARD_HEIGHT + 180 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-96 md:h-96 bg-primary-mediumBlue/3 rounded-full blur-3xl translate-x-1/2" />
      </div>

      {/* Heading: contained like Services We Provide */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-center leading-relaxed text-text-gray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </MotionDiv>
      </div>

      {/* Carousel: full-width edge-to-edge like Services We Provide */}
      <div
        className="relative overflow-hidden w-full"
        style={{ minHeight: CARD_HEIGHT + 24 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide w-full gap-5 py-2 pl-14 pr-14"
          style={{
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {carouselDoctors.map((doctor, index) => (
            <div
              key={`${doctor.name}-${index}`}
              style={{
                scrollSnapAlign: "start",
                flexShrink: 0,
                width: CARD_WIDTH,
              }}
            >
              <StaffCard
                doctor={doctor}
                index={index % count}
                ExperienceIcon={ExperienceIcon}
                LanguageIcon={LanguageIcon}
                featuredLabel={featuredLabel}
              />
            </div>
          ))}
        </div>

        {/* Arrows: same placement as Services section (left-2 md:left-6, right-2 md:right-6) */}
        <button
          type="button"
          onClick={goLeft}
          className="group absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-gray-200 hover:border-primary-mediumBlue hover:bg-primary-mediumBlue transition-all duration-300 touch-manipulation"
          aria-label="Scroll left"
        >
          <MdArrowBackIos className="text-lg md:text-xl text-primary-mediumBlue group-hover:text-white transition-colors ml-0.5" />
        </button>
        <button
          type="button"
          onClick={goRight}
          className="group absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-gray-200 hover:border-primary-mediumBlue hover:bg-primary-mediumBlue transition-all duration-300 touch-manipulation"
          aria-label="Scroll right"
        >
          <MdArrowForwardIos className="text-lg md:text-xl text-primary-mediumBlue group-hover:text-white transition-colors" />
        </button>
      </div>
    </section>
  );
};
