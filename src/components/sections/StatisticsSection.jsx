"use client";

import { motion } from "framer-motion";
import { MdVerified, MdPeople, MdStar } from "react-icons/md";

const MotionDiv = motion.div;

const statistics = [
  {
    icon: MdVerified,
    value: "100%",
    label: "Our Doctors Certified",
    number: "001",
  },
  {
    icon: MdPeople,
    value: "25M+",
    label: "Happy global users",
    number: "002",
  },
  {
    icon: MdStar,
    value: "99%",
    label: "Satisfying treatment",
    number: "003",
  },
];

export const StatisticsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-[#F7FAFC]">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.number}>
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center p-8 bg-white rounded-[14px] shadow-lg"
                >
                  {/* Background Number */}
                  <p className="absolute top-4 right-4 text-6xl font-bold text-gray-200 leading-none opacity-50">
                    {stat.number}
                  </p>
                  <div className="flex flex-col gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-primary-main flex items-center justify-center">
                      <IconComponent className="text-3xl text-white" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-primary-main">
                      {stat.value}
                    </p>
                    <p className="text-sm md:text-base text-text-gray font-medium">
                      {stat.label}
                    </p>
                  </div>
                </MotionDiv>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
