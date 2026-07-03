"use client";

import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

import { whyChooseNadz } from "@/data/landing";

const MotionDiv = motion.div;

export const WhyChooseSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Choose NADZ Home Healthcare?
              </h2>
              <p className="text-text-secondary leading-relaxed">
                At NADZ Home Healthcare, we don't just treat symptoms — we build long-term relationships. We act as your dedicated family doctor, focusing on prevention, early detection, and overall wellness.
              </p>
            </div>
          </MotionDiv>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseNadz.map((item, index) => (
              <div key={item}>
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex flex-row gap-3 items-start">
                    <MdCheckCircle className="text-primary-main mt-1 text-xl flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{item}</p>
                  </div>
                </MotionDiv>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);





















