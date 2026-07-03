'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const MotionDiv = motion.div;

export function ComprehensiveCareSection({ data }) {
  const title = data?.title || '';
  const stats = data?.stats || [];

  return (
    <section className="bg-white py-14 md:py-20 lg:py-[88px]">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#5C2533] md:text-[2rem]">
            {title}
          </h2>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {stats.map((stat, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="flex flex-1 flex-col px-5 pb-4 pt-5">
                <p className="mb-2 text-[2rem] font-bold leading-none text-[#5C2533] md:text-[2.25rem]">
                  {stat.value}
                  {stat.suffix && (
                    <span className="ml-1 text-[1.35rem] text-[#C9A66B]">{stat.suffix}</span>
                  )}
                </p>
                <p className="text-sm leading-relaxed text-[#7a7a7a]">{stat.label}</p>
              </div>
              {stat.image && (
                <div className="relative mx-4 mb-4 mt-auto h-[88px] overflow-hidden rounded-xl">
                  <Image
                    src={stat.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 20vw, 240px"
                  />
                </div>
              )}
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
