"use client";

import { MdClose, MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppUrl } from "@/lib/whatsapp";

export const BookNowDialog = ({ open, onClose }) => {
  if (!open) return null;

  const handleCallNow = () => {
    window.location.href = "tel:+97180046239";
  };

  const handleWhatsApp = () => {
    openWhatsAppUrl();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative text-center px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-primary-mediumBlue">
            Book Now
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-text-gray hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <MdClose className="text-lg" />
          </button>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="px-6 pt-6 pb-6">
          <div className="flex flex-col gap-3">
            <p className="text-text-gray text-center text-sm mb-1">
              Choose your preferred way to reach us
            </p>

            <button
              onClick={handleCallNow}
              className="w-full py-3 bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-medium text-[0.9375rem] shadow-none hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MdPhone className="text-lg text-white" />
              <span className="whitespace-nowrap text-white">Call now</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-[#DFB680] text-[#5C2533] rounded-full font-medium text-[0.9375rem] hover:bg-[#d4a86a] transition-all flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-lg text-[#5C2533]" />
              <span className="whitespace-nowrap text-[#5C2533]">Message us on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
