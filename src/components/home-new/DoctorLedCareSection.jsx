'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getIconComponent } from '@/lib/icons';

const MotionDiv = motion.div;

export function DoctorLedCareSection({ data }) {
  const title = data?.title || '';
  const description = data?.description || '';
  const image = data?.image || '/images/dr nadia.png';
  const imageAlt = data?.imageAlt || 'Dr. Nadia Chaudhary';
  const badges = data?.badges || [];

  return (
    <section className="relative overflow-hidden bg-[#4F052B] py-14 md:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          backgroundImage: 'url(/home-new/gold-waves.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-[1.75rem] font-bold leading-tight text-[#E3C699] md:text-[2.125rem]">
              {title}
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/92 md:text-lg">
              {description}
            </p>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-6 md:gap-8">
                {badges.map((badge, i) => {
                  const Icon = getIconComponent(badge.icon);
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10">
                        {Icon && <Icon className="text-xl text-[#E3C699]" />}
                      </div>
                      <span className="max-w-[88px] text-xs font-medium leading-tight text-white/90">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative h-[420px] w-full max-w-[400px] md:h-[480px]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 90vw, 400px"
                priority
              />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
