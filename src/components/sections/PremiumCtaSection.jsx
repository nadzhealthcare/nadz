"use client";

import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { DEFAULT_WHATSAPP_CHAT_URL, openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export const PremiumCtaSection = ({ premiumCtaData }) => {
  const title = premiumCtaData?.title || '';
  const description = premiumCtaData?.description || '';
  const whatsappButton = premiumCtaData?.whatsappButton || { text: '', url: '' };
  const callButton = premiumCtaData?.callButton || { text: '', phone: '' };
  const backgroundImageUrl = premiumCtaData?.backgroundImage || null;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#FAFAFA] flex justify-center items-center">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[14px] md:rounded-[40px] overflow-hidden py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[300px] md:min-h-[350px] bg-[#4e1c26]"
        >
          {/* Background image */}
          {backgroundImageUrl && (
            <>
              <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                aria-hidden
              />
              {/* Dark overlay for text readability over image */}
              <div
                className="absolute inset-0 z-[1] bg-black/60"
                aria-hidden
              />
            </>
          )}
          <div className="relative z-10 text-center max-w-full md:max-w-4xl lg:max-w-5xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 md:mb-4 tracking-tight" style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)' }}>
              {title}
            </h2>

            <p className="text-sm md:text-base text-white leading-relaxed mb-8 md:mb-10 opacity-95 max-w-2xl mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full">
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <button
                  onClick={() => openWhatsAppUrl(whatsappButton.url || DEFAULT_WHATSAPP_CHAT_URL)}
                  className="bg-[#DFB680] text-[#5C2533] text-base md:text-lg font-semibold py-3.5 md:py-4 px-8 md:px-10 rounded-full min-w-full sm:min-w-[200px] shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl text-[#5C2533]" />
                  <span className="text-[#5C2533]">{whatsappButton.text}</span>
                </button>
              </MotionDiv>
              
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <button
                  onClick={() => window.location.href = `tel:${callButton.phone}`}
                  className="bg-[#5C2533] border-2 border-[#5C2533] text-white text-base md:text-lg font-semibold py-3.5 md:py-4 px-8 md:px-10 rounded-full min-w-full sm:min-w-[200px] shadow-lg hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <MdPhone className="text-xl text-white" />
                  <span className="text-white">{callButton.text}</span>
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
