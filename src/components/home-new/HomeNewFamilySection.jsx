'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MdCheck } from 'react-icons/md';

const MotionDiv = motion.div;

export function HomeNewFamilySection({ data }) {
  const title = data?.title || '';
  const description = data?.description || '';
  const goals = data?.goals || [];
  const ctaText = data?.ctaText || 'Explore';
  const backgroundImage =
    data?.backgroundImage ||
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=900&fit=crop';

  return (
    <section className="relative min-h-[520px] overflow-hidden md:min-h-[600px] lg:min-h-[640px]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover object-center"
        sizes="1425px"
        priority={false}
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/45 to-black/15"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[520px] items-center md:min-h-[600px] lg:min-h-[640px]">
        <div className="ml-auto w-full px-4 py-14 sm:px-8 md:w-[58%] md:px-12 lg:px-16 lg:py-20">
          <MotionDiv
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <h2 className="mb-5 text-2xl font-bold leading-tight text-white md:text-[2rem] lg:text-[2.25rem]">
              {title}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-white/90 md:text-base">
              {description}
            </p>

            <ul className="mb-10 space-y-4">
              {goals.map((goal) => (
                <li key={goal} className="flex items-start justify-end gap-3 text-right">
                  <span className="max-w-[320px] text-sm text-white/95 md:text-base">{goal}</span>
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15">
                    <MdCheck className="text-base text-white" />
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/home-care/who-we-are"
              className="inline-flex rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white no-underline transition hover:bg-white/10"
            >
              {ctaText}
            </Link>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
