"use client";

import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const CtaSection = () => (
  <section className="py-20 md:py-24 bg-white">
    <div className="container mx-auto px-4">
      <MotionDiv
        className="glass-panel px-8 md:px-16 py-10 md:py-16 text-center bg-gradient-to-br from-[rgba(76,111,255,0.95)] to-[rgba(168,85,247,0.95)] text-white border-none"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            24/7 Healthcare Service
          </h2>
          <p className="max-w-[540px] text-lg">
            At NADZ Home Healthcare, your needs guide our care. We deliver personalized health support precisely where you need it: your home, office, or hotel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = 'tel:+97180046239'}
              className="px-8 py-3 bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-medium hover:bg-[#6c2a37] hover:border-[#6c2a37] transition-colors flex items-center justify-center gap-2"
            >
              <MdPhone className="text-lg text-white" />
              <span className="text-white">Call Now: 800 4 NADZ</span>
            </button>
            <button
              onClick={() => openWhatsAppUrl()}
              className="px-8 py-3 bg-[#DFB680] text-[#5C2533] rounded-full font-medium hover:bg-[#d4a86a] transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-lg text-[#5C2533]" />
              <span className="text-[#5C2533]">Message us on WhatsApp</span>
            </button>
          </div>
        </div>
      </MotionDiv>
    </div>
  </section>
);
