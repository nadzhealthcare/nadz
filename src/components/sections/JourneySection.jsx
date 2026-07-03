"use client";

import { motion } from "framer-motion";
import { journeySteps } from "@/data/landing";

const MotionDiv = motion.div;

export const JourneySection = () => (
  <section className="py-16 md:py-24 bg-background-paper">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
          <div className="flex flex-col gap-4">
            <p className="text-primary-main font-medium">Predictable care loops</p>
            <h2 className="text-3xl md:text-4xl font-bold">From intake to outcomes with zero swivel-chair.</h2>
            <p className="text-text-secondary">
              Automations keep every cohort on track while clinicians jump in only when signal is high.
              Configure guardrails once and reuse them across service lines.
            </p>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6">
            {journeySteps.map((step, index) => (
              <MotionDiv
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-primary-main/60 rounded-r-lg bg-white shadow-sm"
              >
                <div className="p-6">
                  <div className="flex flex-row gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-[#4C6FFF]/12 text-[#4C6FFF] font-semibold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                      <p className="text-text-secondary">{step.detail}</p>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
