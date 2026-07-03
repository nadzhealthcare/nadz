"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { PhoneCtaLink, WhatsAppCtaLink } from "@/components/ui/CtaLinks";

const MotionDiv = motion.div;

/** Opacity for the content overlay container (0.2–0.3 keeps text readable over any video). */
const CONTENT_OVERLAY_OPACITY = 0.25;

export const VideoHeroSection = ({
  topLabel,
  title,
  subtitle,
  description,
  primaryCtaText,
  secondaryCtaText,
  onPrimaryClick,
  onSecondaryClick,
  primaryCtaHref,
  secondaryCtaHref,
  videoId,
  videoUrl,
  overlayOpacity = 0.3,
  /** Optional logo image URL – shown top-left above the heading, over the video */
  logoUrl,
  logoAlt = "",
  /** Content container background opacity (0.2–0.3). Default 0.25. */
  contentOverlayOpacity = CONTENT_OVERLAY_OPACITY,
  /** Toggle CTA buttons visible/hidden from CMS */
  showCta = true,
  /** Hero image for mobile view (video is hidden on small screens; this image is shown instead). */
  imageSrc,
  imageAlt = "",
}) => {
  const whatsappBtnClass =
    "px-6 py-3 bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-sm shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 no-underline";
  const phoneBtnClass =
    "px-6 py-3 bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-sm hover:bg-[#6c2a37] hover:border-[#6c2a37] transition-all flex items-center justify-center gap-2 no-underline";

  const [logoError, setLogoError] = useState(false);
  const showLogo = logoUrl && !logoError;

  // Extract video ID from URL if provided
  const getVideoId = () => {
    if (videoId) return videoId;
    if (videoUrl) {
      const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const finalVideoId = getVideoId();
  
  // YouTube embed URL with autoplay, mute, and loop parameters
  // Note: YouTube requires mute=1 for autoplay to work
  const embedUrl = finalVideoId 
    ? `https://www.youtube.com/embed/${finalVideoId}?autoplay=1&mute=1&loop=1&playlist=${finalVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&start=0`
    : null;

  return (
    <section className="relative w-full h-[50vh] md:h-screen min-h-[300px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-black">
      {/* Mobile: image background (normal hero with image, no video) */}
      {imageSrc && (
        <div className="absolute inset-0 w-full h-full overflow-hidden md:hidden" style={{ zIndex: 0 }}>
          <Image
            src={imageSrc}
            alt={imageAlt || "Hero"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized={imageSrc.startsWith("http") && !imageSrc.includes(process.env.NEXT_PUBLIC_STRAPI_URL || "")}
          />
        </div>
      )}
      {/* Desktop/tablet: YouTube Video (hidden on mobile only when image fallback is provided) */}
      {embedUrl && (
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden ${imageSrc ? "hidden md:block" : ""}`}
          style={{ zIndex: 0 }}
        >
          <div 
            className="absolute"
            style={{
              width: '177.78vh',
              height: '100vh',
              minWidth: '100%',
              minHeight: '56.25vw',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <iframe
              src={embedUrl}
              className="w-full h-full"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                pointerEvents: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Hero background video"
            />
          </div>
        </div>
      )}

      {/* Dark Overlay (applies to both image and video) */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, ${overlayOpacity * 0.6}), rgba(0, 0, 0, ${overlayOpacity * 0.8}), rgba(0, 0, 0, ${overlayOpacity}))`,
        }}
      />

      {/* Optional overlay content: logo, title, subtitle, CTAs – on top of video with semi-transparent container */}
      {(logoUrl || title || subtitle || description || primaryCtaText || secondaryCtaText) && (
        <div className="absolute inset-0 z-[2] flex flex-col justify-end items-start pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8">
          <div
            className="w-full max-w-3xl rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-start text-left"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${Math.min(0.35, Math.max(0.2, contentOverlayOpacity))})`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}
          >
            {showLogo && (
              <div className="mb-4 sm:mb-6 hidden md:block">
                <Image
                  src={logoUrl}
                  alt={logoAlt || "Logo"}
                  width={120}
                  height={60}
                  className="h-12 w-auto sm:h-14 md:h-16 object-contain object-left"
                  unoptimized={!logoUrl.startsWith("/")}
                  onError={() => setLogoError(true)}
                />
              </div>
            )}
            {title && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg max-w-3xl">
                {title}
              </h1>
            )}
            {(subtitle || description) && (
              <p className="text-sm sm:text-base md:text-lg text-white/95 mb-6 max-w-2xl drop-shadow-md">
                {subtitle || description}
              </p>
            )}
            {showCta !== false && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {primaryCtaText &&
                  (onPrimaryClick ? (
                    <button type="button" onClick={onPrimaryClick} className={whatsappBtnClass}>
                      <FaWhatsapp className="text-lg text-[#5C2533]" />
                      <span className="text-[#5C2533]">{primaryCtaText}</span>
                    </button>
                  ) : (
                    <WhatsAppCtaLink href={primaryCtaHref} className={whatsappBtnClass}>
                      <FaWhatsapp className="text-lg text-[#5C2533]" />
                      <span className="text-[#5C2533]">{primaryCtaText}</span>
                    </WhatsAppCtaLink>
                  ))}
                {secondaryCtaText &&
                  (onSecondaryClick ? (
                    <button type="button" onClick={onSecondaryClick} className={phoneBtnClass}>
                      <MdPhone className="text-lg text-white" />
                      <span className="text-white">{secondaryCtaText}</span>
                    </button>
                  ) : (
                    <PhoneCtaLink href={secondaryCtaHref} className={phoneBtnClass}>
                      <MdPhone className="text-lg text-white" />
                      <span className="text-white">{secondaryCtaText}</span>
                    </PhoneCtaLink>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

