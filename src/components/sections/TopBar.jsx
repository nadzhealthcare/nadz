"use client";

import { 
  MdLocationOn, 
  MdPhone, 
  MdEmail, 
  MdAccessTime,
} from "react-icons/md";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export const TopBar = () => (
  <section className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary-dark to-primary-main py-2 md:py-3 z-[1200]">
    <div className="container mx-auto px-3 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 flex-wrap">
        <div className="flex flex-row gap-2 md:gap-6 items-center flex-wrap flex-1 md:flex-initial">
          <div className="hidden sm:flex items-center gap-1">
            <MdLocationOn className="text-white text-sm md:text-base" />
            <span className="text-white text-xs md:text-sm whitespace-nowrap">Dubai, UAE</span>
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => window.location.href = 'tel:+97180046239'}
          >
            <MdPhone className="text-white text-sm md:text-base" />
            <span className="text-white text-xs md:text-sm whitespace-nowrap">8004NADZ</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <MdEmail className="text-white text-sm md:text-base" />
            <span className="text-white text-xs md:text-sm whitespace-nowrap">info@nadzhealthcare.com</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <MdAccessTime className="text-white text-sm md:text-base" />
            <span className="text-white text-xs md:text-sm whitespace-nowrap">24 / 7</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-0">
          <button className="p-1 md:p-2 text-white hover:opacity-80 transition-opacity">
            <FaFacebookF className="text-lg md:text-xl" />
          </button>
          <button className="p-1 md:p-2 text-white hover:opacity-80 transition-opacity">
            <FaTwitterIcon className="text-lg md:text-xl" />
          </button>
          <button className="p-1 md:p-2 text-white hover:opacity-80 transition-opacity">
            <FaYoutube className="text-lg md:text-xl" />
          </button>
          <button className="p-1 md:p-2 text-white hover:opacity-80 transition-opacity">
            <FaLinkedin className="text-lg md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
