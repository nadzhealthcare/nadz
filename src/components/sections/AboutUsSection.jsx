"use client";

import { MdStar } from "react-icons/md";

export const AboutUsSection = () => {
  return (
    <section className="pt-20 sm:pt-[90px] md:pt-24 pb-8 md:pb-12 bg-white relative">
      <div className="relative w-full flex items-center justify-center h-10">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center px-4 md:px-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-purple-500 max-w-[150px] sm:max-w-[250px] md:max-w-[400px]"></div>

          <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>

          <div className="flex items-center gap-2 px-4 py-2 mx-4 rounded-full border border-purple-400/50 bg-white flex-shrink-0">
            <MdStar className="text-base text-indigo-500" />
            <p className="text-sm font-medium text-indigo-500 whitespace-nowrap">
              About Us
            </p>
          </div>

          <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>

          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400/30 to-purple-500 max-w-[150px] sm:max-w-[250px] md:max-w-[400px]"></div>
        </div>
      </div>
    </section>
  );
};
