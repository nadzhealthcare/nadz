"use client";

import { motion } from "framer-motion";
import {
  MdMedicalServices,
  MdLocalHospital,
  MdElderly,
  MdHealing,
  MdScience,
  MdSpa,
} from "react-icons/md";

import { services } from "@/data/landing";

const MotionDiv = motion.div;

const iconMap = {
  medical_services: MdMedicalServices,
  local_hospital: MdLocalHospital,
  elderly: MdElderly,
  healing: MdHealing,
  science: MdScience,
  spa: MdSpa,
};

export const ServicesSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-4 text-center mb-12">
        <span className="self-center bg-[#4C6FFF]/8 text-[#4C6FFF] font-semibold text-xs px-3 py-1 rounded-full">
          Our Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          We provide a wide range of medical services
        </h2>
        <p className="text-text-secondary max-w-[600px] self-center">
          Comprehensive healthcare services delivered to your home, office, or hotel in Dubai.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon] || MdMedicalServices;
          return (
            <div key={service.title}>
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full transition-all hover:-translate-y-1 hover:shadow-xl rounded-[14px] border border-neutral-lightGray shadow-card p-8"
              >
                <div
                  className="w-15 h-15 rounded-[14px] bg-[#4C6FFF]/8 flex items-center justify-center mb-4"
                >
                  <IconComponent className="text-3xl text-primary-main" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 min-h-[60px]">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="text-primary-main font-semibold no-underline hover:underline inline-block"
                >
                  Learn More →
                </a>
              </MotionDiv>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
