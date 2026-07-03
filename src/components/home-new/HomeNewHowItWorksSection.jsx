'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const MotionDiv = motion.div;

export function HomeNewHowItWorksSection({ data }) {
  const title = data?.title || '';
  const steps = data?.steps || [];
  const ctaText = data?.ctaText || 'Explore NADZ Home Healthcare';

  return (
    <section className="bg-white py-14 md:py-20 lg:py-[88px]">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        {title && (
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-12"
          >
            <h2 className="text-[1.75rem] font-bold text-[#5C2533] md:text-[2rem]">{title}</h2>
          </MotionDiv>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <MotionDiv
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[#F0E8DF] bg-gradient-to-br from-[#FFF9F3] to-[#FAF4EC] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <p className="mb-3 text-sm font-semibold text-[#C9A66B]">{step.number}</p>
              <h3 className="mb-3 text-xl font-bold text-[#5C2533]">{step.title}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-[#7a7a7a]">
                {step.description}
              </p>
              {step.image ? (
                <div className="relative mt-auto h-[140px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="mt-auto h-[140px] rounded-xl bg-gradient-to-br from-[#F5EDE3] to-[#EDE4D8]" />
              )}
            </MotionDiv>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact-us"
            className="rounded-full bg-[#E3C699] px-8 py-3.5 text-sm font-semibold text-[#5C2533] no-underline shadow-md transition hover:bg-[#d9bc8f]"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
