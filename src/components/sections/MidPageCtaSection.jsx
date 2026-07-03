"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div;

export const MidPageCtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-main relative overflow-hidden">
      <div className="absolute left-[-100px] md:left-[-50px] top-1/2 transform -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-[40px]"></div>
      <div className="container mx-auto max-w-5xl px-4 relative">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6 md:mb-0">
              Bring your customer services the next level of excellence.
            </h2>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="px-8 py-3 bg-[#DFB680] text-[#5C2533] rounded-[14px] font-semibold text-base shadow-lg hover:bg-[#d4a86a] hover:shadow-xl transition-all">
              Book an appointment
            </button>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};
