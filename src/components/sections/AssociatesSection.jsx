"use client";

import { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import styles from "./AssociatesSection.module.css";

const getImagePath = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
};

export function AssociatesSection({ associatesData }) {
  const title = associatesData?.title || "Our Associations";
  const associates = Array.isArray(associatesData?.associates)
    ? associatesData.associates
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const onSwiper = useCallback((swiper) => {
    if (swiper) setActiveIndex(swiper.activeIndex);
  }, []);
  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const current = associates[activeIndex];

  // Show section with placeholder if no data (e.g. before fallback applied)
  if (associates.length === 0) {
    return (
      <section className={`relative py-16 md:py-20 ${styles.sectionBg}`} aria-labelledby="associates-heading">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <h2 id="associates-heading" className={styles.title}>{title}</h2>
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12 mt-10">
            <div className={`${styles.imageCard} flex-shrink-0 w-full lg:max-w-[380px] xl:max-w-[420px] flex flex-col`}>
              <div className="w-full h-full min-h-[200px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Image placeholder</div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className={styles.associateName}>NAME OF THE ASSOCIATE</h3>
              <p className={styles.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative py-16 md:py-20 ${styles.sectionBg}`}
      aria-labelledby="associates-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <h2 id="associates-heading" className={styles.title}>
          {title}
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12 mt-10">
          {/* Left: image slider - constrained height so it aligns with text block */}
          <div className="flex-shrink-0 w-full lg:max-w-[380px] xl:max-w-[420px] flex flex-col">
            <div className={`${styles.imageCard} relative overflow-hidden`}>
              <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={onSwiper}
                onSlideChange={onSlideChange}
                pagination={
                  associates.length > 1
                    ? {
                        el: ".associates-pagination",
                        clickable: true,
                        bulletClass: styles.bullet,
                        bulletActiveClass: styles.bulletActive,
                      }
                    : false
                }
                className={styles.slider}
                loop={associates.length > 1}
              >
                {associates.map((item, index) => (
                  <SwiperSlide key={item.id ?? index}>
                    <div className={styles.slideInner}>
                      {getImagePath(item.image) ? (
                        <Image
                          src={getImagePath(item.image)}
                          alt={item.imageAlt || item.name || "Association"}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
                          aria-hidden
                        >
                          Image placeholder
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {associates.length > 1 && (
              <div className={`${styles.dots} associates-pagination`} />
            )}
          </div>

          {/* Right: text for active associate */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {current && (
              <>
                <h3 className={styles.associateName}>{current.name}</h3>
                <p className={styles.description}>
                  {current.description ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
