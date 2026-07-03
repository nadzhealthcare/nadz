'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const MotionDiv = motion.div;

function ServiceCard({ service }) {
  return (
    <article className="flex w-[272px] flex-shrink-0 flex-col overflow-hidden rounded-[20px] shadow-[0_8px_28px_rgba(79,5,43,0.12)] sm:w-[282px]">
      <div className="relative h-[248px] w-full">
        {service.image && (
          <Image
            src={service.image}
            alt={service.title || ''}
            fill
            className="object-cover"
            sizes="282px"
          />
        )}
      </div>
      <div className="flex min-h-[148px] flex-col bg-[#4F052B] px-5 pb-5 pt-5">
        <h3 className="mb-5 flex-1 text-lg font-bold leading-snug text-white">
          {service.title}
        </h3>
        {service.href && service.ctaText && (
          <Link
            href={service.href}
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-white/90 px-4 py-2.5 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
          >
            {service.ctaText}
          </Link>
        )}
      </div>
    </article>
  );
}

export function HomeNewServicesSection({ data }) {
  const title = data?.title || 'Our Services';
  const items = data?.items || [];
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const dotCount = 4;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;

    const onScroll = () => {
      const cardWidth = 282 + 20;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveDot(Math.min(index, dotCount - 1));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [items.length]);

  return (
    <section className="bg-[#FAFAFA] py-14 md:py-20 lg:py-[88px]">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center md:mb-12"
        >
          <h2 className="text-[1.75rem] font-bold text-[#5C2533] md:text-[2rem]">{title}</h2>
        </MotionDiv>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:px-0"
        >
          {items.map((service) => (
            <div key={service.id} className="snap-start">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, i) => (
            <span
              key={i}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeDot === i ? 28 : 8,
                backgroundColor: activeDot === i ? '#4F052B' : 'rgba(79, 5, 43, 0.28)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
