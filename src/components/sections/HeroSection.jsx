"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdPhone, MdCalendarToday } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { getIconComponent } from "@/lib/icons";
import { PhoneCtaLink, WhatsAppCtaLink } from "@/components/ui/CtaLinks";

const MotionDiv = motion.div;

const allPillPositions = [
  { top: "5%", left: "5%" }, { top: "30%", left: "8%" }, { top: "55%", left: "12%" }, { top: "80%", left: "6%" },
  { bottom: "20%", left: "10%" }, { bottom: "45%", left: "14%" }, { bottom: "70%", left: "8%" },
  { top: "15%", left: "15%" }, { top: "40%", left: "5%" }, { top: "65%", left: "10%" },
  { top: "5%", right: "5%" }, { top: "30%", right: "8%" }, { top: "55%", right: "12%" }, { top: "80%", right: "6%" },
  { bottom: "20%", right: "10%" }, { bottom: "45%", right: "14%" }, { bottom: "70%", right: "8%" },
  { top: "15%", right: "15%" }, { top: "40%", right: "5%" }, { top: "65%", right: "10%" },
];

// Home only: badge positions that orbit image and avoid face (no overlap). Use 0%+ so chips aren't clipped by overflow-hidden.
const HOME_BADGE_LAYOUTS = [
  [{ top: "2%", left: "0%" }, { top: "40%", left: "0%" }, { bottom: "10%", left: "12%" }, { top: "28%", right: "0%" }, { bottom: "28%", right: "0%" }],
  [{ top: "6%", right: "0%" }, { top: "52%", right: "0%" }, { bottom: "8%", right: "8%" }, { top: "38%", left: "0%" }, { bottom: "38%", left: "0%" }],
  [{ bottom: "14%", left: "6%" }, { top: "48%", left: "0%" }, { top: "10%", right: "6%" }, { bottom: "32%", right: "0%" }, { top: "72%", right: "0%" }],
];

const HOME_CAROUSEL_INTERVAL_MS = 5000;
const MAX_HOME_CAROUSEL_SLIDES = 10;

const PILL_DANCE_CLASSES = ['pill-dance-0', 'pill-dance-1', 'pill-dance-2', 'pill-dance-3', 'pill-dance-4'];

export const HeroSection = ({ heroData, variant = "default" }) => {
  if (!heroData) return null;
  const isHomeNew = variant === "home-new";
  const isHomePage = variant === "home" || isHomeNew;

  const title = heroData.title || '';
  const description = heroData.description || '';
  const reassuranceText = heroData.reassuranceText || '';
  const heroImage = heroData.image || null;
  const imageAlt = heroData?.imageAlt || '';

  // Carousel slides from CMS (hero.carouselImages) or fallback to single hero image, then default
  const DEFAULT_HERO_IMAGE = '/images/hero-reference.png';
  const carouselSlides = useMemo(() => {
    const fromCms = Array.isArray(heroData.carouselImages) ? heroData.carouselImages : [];
    if (fromCms.length > 0) {
      return fromCms.slice(0, MAX_HOME_CAROUSEL_SLIDES).filter((s) => s?.url);
    }
    if (heroImage) return [{ url: heroImage, alt: imageAlt || '' }];
    // Ensure at least one slide so the carousel always shows an image
    return [{ url: DEFAULT_HERO_IMAGE, alt: imageAlt || 'Premium home healthcare in Dubai' }];
  }, [heroData.carouselImages, heroImage, imageAlt]);
  const totalHomeSlides = Math.max(1, carouselSlides.length);

  const whatsappButtonText = heroData.whatsappButton?.text || heroData.whatsappButtonText || '';
  const whatsappButtonUrl = heroData.whatsappButton?.url || heroData.whatsappButtonUrl || '';
  const callButtonText = heroData.callButton?.text || heroData.callButtonText || '';
  const callButtonPhone = heroData.callButton?.phone || heroData.callButtonPhone || '';

  const serviceChipsFromStrapi = heroData?.serviceChips || [];
  const [displayedServices, setDisplayedServices] = useState([]);
  const [rotationKey, setRotationKey] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // CMS first: use heroData.serviceChips; fallback only when CMS has no chips
  const chipsWithIcons = useMemo(() => {
    const fromCms = Array.isArray(serviceChipsFromStrapi) ? serviceChipsFromStrapi : [];
    const list = fromCms.length > 0 ? fromCms : [
      { name: "Palliative Care", icon: "MdHealing", color: "#A78BFA" },
      { name: "Elderly Care", icon: "MdAccessibility", color: "#8B5CF6" },
      { name: "IV Drips", icon: "MdMedication", color: "#EC4899" },
      { name: "Physiotherapy", icon: "MdHealthAndSafety", color: "#10B981" },
      { name: "Babysitting", icon: "MdChildCare", color: "#F472B6" },
    ];
    return list.slice(0, 5).map((c) => ({
      ...c,
      icon: typeof c.icon === "string" ? getIconComponent(c.icon) : c.icon,
    }));
  }, [serviceChipsFromStrapi]);

  const homeServicesBySlide = useMemo(
    () =>
      HOME_BADGE_LAYOUTS.map((layout, slideIdx) =>
        chipsWithIcons.map((chip, i) => ({
          ...chip,
          position: layout[i] || {},
          id: `home-${slideIdx}-${i}-${chip.name}`,
        }))
      ),
    [chipsWithIcons]
  );

  useEffect(() => {
    if (isHomePage) return;
    const transformChips = (chips) => chips.map((c) => ({ ...c, icon: getIconComponent(c.icon) }));
    const list = serviceChipsFromStrapi.length >= 5 ? transformChips(serviceChipsFromStrapi) : chipsWithIcons;
    const getRandom = () => {
      const shuffled = [...list].sort(() => 0.5 - Math.random());
      const pos = [...allPillPositions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5).map((chip, i) => ({ ...chip, position: pos[i], id: `${chip.name}-${i}` }));
    };
    setDisplayedServices(getRandom());
    const t = setInterval(() => { setDisplayedServices(getRandom()); setRotationKey((k) => k + 1); }, 4000);
    return () => clearInterval(t);
  }, [serviceChipsFromStrapi, isHomePage, chipsWithIcons]);

  useEffect(() => {
    if (!isHomePage) return;
    const t = setInterval(() => setCarouselIndex((i) => (i + 1) % totalHomeSlides), HOME_CAROUSEL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [isHomePage, totalHomeSlides]);

  const titlePrefix =
    heroData.titlePrefix ||
    (isHomeNew && title.includes('–') ? `${title.split('–')[0].trim()} –` : title);
  const titleHighlight =
    heroData.titleHighlight ||
    (isHomeNew && title.includes('–') ? title.split('–').slice(1).join('–').trim() : '');

  const leftColumn = (
    <div className="flex flex-col justify-center">
      <h1 className="text-[1.75rem] sm:text-3xl md:text-[2.125rem] lg:text-[2.5rem] leading-[1.15] font-bold tracking-tight mb-4 sm:mb-5 md:mb-6">
        {isHomeNew && titleHighlight ? (
          <>
            <span className="text-[#5C2533]">{titlePrefix} </span>
            <span className="text-[#C9A66B]">{titleHighlight}</span>
          </>
        ) : (
          <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">{title}</span>
        )}
      </h1>
      <p className="text-sm sm:text-base leading-relaxed text-[#7a7a7a] mb-6 md:mb-8 max-w-[540px]">{description}</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
        {whatsappButtonText && (
          <WhatsAppCtaLink
            href={whatsappButtonUrl}
            className={
              isHomeNew
                ? "px-7 py-3.5 min-w-[180px] bg-[#3CB371] text-white rounded-full font-semibold text-sm shadow-[0_4px_14px_rgba(60,179,113,0.35)] hover:bg-[#36a366] transition-all duration-200 flex items-center justify-center gap-2 no-underline"
                : "px-6 sm:px-7 py-3 sm:py-3.5 min-w-[160px] sm:min-w-[180px] bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-sm shadow-md hover:bg-[#d4a86a] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 no-underline"
            }
          >
            {isHomeNew ? (
              <MdCalendarToday className="text-lg shrink-0" />
            ) : (
              <span className="inline-flex items-center justify-center bg-[#25D366] rounded-full w-6 h-6 shrink-0">
                <FaWhatsapp className="text-white text-sm" />
              </span>
            )}
            <span className="whitespace-nowrap">{whatsappButtonText}</span>
          </WhatsAppCtaLink>
        )}
        {callButtonText && (
          <PhoneCtaLink
            href={callButtonPhone}
            className="px-6 sm:px-7 py-3 sm:py-3.5 min-w-[140px] sm:min-w-[160px] bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-sm hover:bg-[#6c2a37] hover:border-[#6c2a37] transition-all duration-200 flex items-center justify-center gap-2 no-underline"
          >
            <MdPhone className="text-lg shrink-0 text-white" />
            <span className="whitespace-nowrap text-white">{callButtonText}</span>
          </PhoneCtaLink>
        )}
      </div>
      {reassuranceText && <p className="text-xs sm:text-sm italic text-[#7a7a7a] max-w-[480px]">{reassuranceText}</p>}
    </div>
  );

  const BURGUNDY = '#5C2533';

  const badgeEl = (service, idx, { float = false } = {}) => {
    const Icon = service.icon;
    const pos = service.position || {};
    const color = service.color || '#4F052B';
    const iconColor = isHomePage ? BURGUNDY : color;
    const iconBg = isHomePage ? 'rgba(92, 37, 51, 0.12)' : `${color}20`;
    const danceClass = float ? PILL_DANCE_CLASSES[idx % PILL_DANCE_CLASSES.length] : '';
    return (
      <div
        key={service.id}
        className={`flex absolute items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-white border border-gray-200 pointer-events-none will-change-transform ${danceClass}`}
        style={{
          top: pos.top ?? 'auto',
          bottom: pos.bottom ?? 'auto',
          left: pos.left ?? 'auto',
          right: pos.right ?? 'auto',
        }}
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: iconBg, color: iconColor }}>
          {Icon && <Icon className="text-xs sm:text-sm" style={{ color: iconColor }} />}
        </div>
        <span className="font-semibold text-[0.75rem] sm:text-[0.8125rem] text-gray-800 whitespace-nowrap">{service.name || ''}</span>
      </div>
    );
  };

  const safeCarouselIndex = Math.max(0, Math.min(carouselIndex, totalHomeSlides - 1));
  const layoutIndex = safeCarouselIndex % HOME_BADGE_LAYOUTS.length;

  const imageCarouselWrapper = (
    <div className="relative w-full min-w-0 overflow-hidden" style={{ aspectRatio: '4/5', minHeight: '320px', maxHeight: '520px' }}>
      {/* Sliding track: images from CMS carousel or single hero image. Translate to show current slide. */}
      <MotionDiv
        className="flex h-full"
        style={{ width: `${totalHomeSlides * 100}%` }}
        animate={{ x: `-${safeCarouselIndex * (100 / totalHomeSlides)}%` }}
        transition={{ type: 'tween', duration: 0.45, ease: 'easeInOut' }}
      >
        {carouselSlides.map((slide, slideIdx) => (
          <div
            key={slideIdx}
            className="relative flex-shrink-0 flex items-center justify-center h-full w-full min-h-0"
            style={{ width: `${100 / totalHomeSlides}%`, minHeight: '320px' }}
          >
            {slide?.url && (
              <div className="relative w-full h-full min-w-[280px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[420px] max-w-[520px] mx-auto z-0">
                <Image
                  src={slide.url}
                  alt={slide.alt || imageAlt || ''}
                  fill
                  className={isHomePage ? 'object-contain object-[center_20%]' : 'object-contain object-[center_20%] drop-shadow-xl'}
                  priority={slideIdx === 0}
                  quality={90}
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 520px"
                />
              </div>
            )}
          </div>
        ))}
      </MotionDiv>
      {/* Service chips overlay */}
      <div className={`absolute inset-0 z-30 overflow-visible pointer-events-none ${isHomePage ? 'hidden md:block' : ''}`} aria-hidden="true">
        {(homeServicesBySlide[layoutIndex] || []).map((s, i) =>
          badgeEl(s, i, { float: true })
        )}
      </div>
      {/* Slider dots: display only, not clickable */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-3 py-2 rounded-full bg-white/90 shadow-sm border border-gray-200/80 z-20"
        role="presentation"
        aria-label="Carousel slide indicator"
      >
        {Array.from({ length: totalHomeSlides }).map((_, dotIndex) => {
          const isActive = safeCarouselIndex === dotIndex;
          return (
            <span
              key={dotIndex}
              className="h-2.5 rounded-full transition-all duration-300 flex-shrink-0"
              style={{
                width: isActive ? 28 : 10,
                backgroundColor: isActive ? 'rgb(79, 5, 43)' : 'rgba(79, 5, 43, 0.5)',
              }}
            />
          );
        })}
      </div>
    </div>
  );

  const singleImageBlock = (
    <div className="relative w-full min-w-0" style={{ aspectRatio: '4/5', minHeight: '320px', maxHeight: '520px' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        {heroImage && (
          <div className="relative w-full h-full min-w-[280px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[420px] max-w-[520px] mx-auto">
            <Image src={heroImage} alt={imageAlt} fill className="object-contain object-[center_20%] drop-shadow-xl" priority quality={90} sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 520px" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {displayedServices.map((s, i) =>
          badgeEl(s, i, { float: true })
        )}
      </div>
    </div>
  );

  return (
    <section className={`relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 ${isHomeNew ? 'bg-[#FAFAFA]' : 'bg-gradient-to-b from-white via-[#FAFAFA] to-white'}`}>
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col justify-center lg:pr-4">{leftColumn}</div>
          <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end min-h-0">
            {isHomePage ? imageCarouselWrapper : singleImageBlock}
          </div>
        </div>
      </div>
    </section>
  );
};
