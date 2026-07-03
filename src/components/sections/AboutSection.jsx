"use client";

import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const MotionDiv = motion.div;

export const AboutSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[14px] overflow-hidden"
          >
            <div className="w-full h-[300px] md:h-[400px] bg-[#4C6FFF]/10 rounded-[14px] flex items-center justify-center mb-6">
              <p className="text-text-secondary opacity-30">Medical Team Image</p>
            </div>
            <div className="bg-[#4C6FFF]/5 rounded-[14px] p-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">TrustScore 4.8</p>
                <p className="text-xs text-text-secondary">2k+ Reviews</p>
              </div>
            </div>
          </MotionDiv>
        </div>
        <div>
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-6">
              <p className="text-text-secondary uppercase tracking-widest text-xs">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Providing Exceptional Healthcare with a focus on patient.
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Rooted in trust and discretion, our bespoke medical services are tailored to your lifestyle, focusing not only on treatment, but on the art of prevention. We act as your dedicated family doctor, focusing on prevention, early detection, and overall wellness.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our care blends modern medical science with holistic practices, and we treat every patient as part of our extended family.
              </p>
              <button className="self-start px-8 py-3 bg-[#E3C699] text-[#5C2533] rounded-full font-medium hover:bg-[#d4b588] transition-colors flex items-center gap-2">
                About Us
                <MdArrowForward />
              </button>
              <div className="flex flex-row gap-4 items-center mt-4">
                <div className="w-15 h-15 rounded-full bg-[#4C6FFF]/10 flex items-center justify-center">
                  <p className="text-lg text-primary-main font-semibold">Dr</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Founder | Managing Director | Medical Director</p>
                  <p className="text-xs text-text-secondary">NADZ Healthcare</p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  </section>
);



