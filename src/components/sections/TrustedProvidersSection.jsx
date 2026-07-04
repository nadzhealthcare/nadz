"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookNowDialog } from "@/components/common/BookNowDialog";
import { getIconComponent } from "@/lib/icons";

const MotionDiv = motion.div;

// Only use localhost fallback in development
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '');

/**
 * Convert HTTP URLs to HTTPS to prevent mixed content warnings
 */
function ensureHttps(url) {
  if (!url) return url;
  if (typeof url === 'string' && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
}

/**
 * Get Strapi image URL helper
 */
function getStrapiImageUrl(image) {
  if (!image) return null;
  
  let url = null;
  
  if (typeof image === 'string') {
    // If already a full URL, return as-is
    if (image.startsWith('http')) {
      url = image;
    } else if (STRAPI_URL) {
      url = `${STRAPI_URL}${image}`;
    }
  } else if (image.url) {
    if (image.url.startsWith('http')) {
      url = image.url;
    } else if (STRAPI_URL) {
      url = `${STRAPI_URL}${image.url}`;
    }
  } else if (image.data?.attributes?.url) {
    const rawUrl = image.data.attributes.url;
    if (rawUrl.startsWith('http')) {
      url = rawUrl;
    } else if (STRAPI_URL) {
      url = `${STRAPI_URL}${rawUrl}`;
    }
  } else if (image.attributes?.url) {
    const rawUrl = image.attributes.url;
    if (rawUrl.startsWith('http')) {
      url = rawUrl;
    } else if (STRAPI_URL) {
      url = `${STRAPI_URL}${rawUrl}`;
    }
  }
  
  return url ? ensureHttps(url) : null;
}

export const TrustedProvidersSection = ({ trustedProvidersData }) => {
  const title = trustedProvidersData?.title || '';
  const description = trustedProvidersData?.description || '';
  const ctaText = trustedProvidersData?.ctaText || '';
  const card1 = trustedProvidersData?.card1 || { title: '', description: '' };
  const card2 = trustedProvidersData?.card2 || { title: '', description: '' };
  const statistics = trustedProvidersData?.statistics || [];
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
    <section className="py-16 md:py-20 lg:py-24 bg-[#FAFAFA]">
      <div>
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
              {statistics.map((stat, index) => {
                // The CMS ships a wrong icon for the "24/7" stat; force a clock icon there.
                const iconName = stat.value === '24/7' ? 'MdAccessTime' : stat.icon;
                const IconComponent = typeof iconName === 'string' ? getIconComponent(iconName) : iconName;
                return (
                  <div key={stat.number} className="flex md:flex-1">
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative bg-white rounded-[14px] px-5 md:px-6 py-6 md:py-7 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full min-h-[160px] md:min-h-[180px]"
                    >
                      <div className="text-center">
                        {IconComponent && (
                          <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-mediumBlue/10 flex items-center justify-center">
                              <IconComponent className="text-xl md:text-2xl text-primary-mediumBlue" />
                            </div>
                          </div>
                        )}
                        <p className="text-xl md:text-2xl font-bold text-primary-heading leading-none mb-2">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray font-medium">
                          {stat.label}
                        </p>
                      </div>
                    </MotionDiv>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </section>
    <section className="py-16 md:py-20 lg:py-24"> 
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-stretch flex-wrap md:flex-nowrap">
          <div className="md:flex-1 md:mr-0">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-heading leading-tight tracking-tight mb-4 md:mb-6">
                  {title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-6 md:mb-8">
                  {description}
                </p>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="self-start px-8 md:px-10 py-3.5 md:py-4 bg-[#E3C699] text-[#5C2533] rounded-full font-semibold text-xs md:text-sm shadow-lg hover:bg-[#d4b588] hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  {ctaText}
                </button>
              </div>
            </MotionDiv>
          </div>

          <div className="md:flex-1">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[14px] p-6 md:p-8 h-full flex justify-between flex-col relative overflow-hidden shadow-md hover:shadow-lg transition-shadow max-w-full md:max-w-[380px] mx-auto min-h-[450px] md:min-h-0"
            >
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-mediumBlue leading-tight mb-3">
                  {card1.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-6">
                  {card1.description}
                </p>
              </div>

              {getStrapiImageUrl(card1.image) && (
                <div className="relative w-full aspect-[4/3] mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(card1.image)}
                    alt={card1.imageAlt || card1.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>
              )}

            </MotionDiv>
          </div>

          <div className="md:flex-1 md:mr-0">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[14px] p-6 md:p-8 h-full flex justify-between flex-col shadow-md hover:shadow-lg transition-shadow max-w-full md:max-w-[380px] mr-auto md:ml-0 min-h-[450px] md:min-h-0"
            >
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-mediumBlue leading-tight mb-3">
                  {card2.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-6">
                  {card2.description}
                </p>
              </div>

              {getStrapiImageUrl(card2.image) && (
                <div className="relative w-full aspect-[4/3] mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(card2.image)}
                    alt={card2.imageAlt || card2.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>
              )}
            </MotionDiv>
          </div>
        </div>
      </div>
      <BookNowDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </section>
    </>
  );
};
