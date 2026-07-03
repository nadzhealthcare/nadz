'use client';

import {
  VideoHeroSection,
  BenefitsSection,
} from '@/components/sections/shared';
import Faq from '@/app/home-care/components/Faq';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdCheckCircle, MdAssignment, MdSettings, MdPower, MdTask } from 'react-icons/md';
import { openWhatsAppUrl } from "@/lib/whatsapp";

const MotionDiv = motion.div;

export function FunctionalIntegratedMedicineClient({ data }) {
  return (
    <>
      
      <>
        {/* Hero Section with Video (content overlay + mobile image fallback) */}
        <VideoHeroSection
          videoUrl={data.hero?.videoUrl}
          videoId={data.hero?.videoId || "fUHZFY0WP4k"}
          title={data.hero?.title}
          subtitle={data.hero?.subtitle}
          description={data.hero?.description}
          primaryCtaText={data.hero?.primaryCta}
          secondaryCtaText={data.hero?.secondaryCta}
          logoUrl={data.hero?.logoUrl}
          logoAlt={data.hero?.logoAlt}
          imageSrc={data.hero?.imageSrc}
          imageAlt={data.hero?.imageAlt}
          overlayOpacity={0.3}
        />

        {/* What Is Functional & Integrated Medicine Section */}
        <section className="relative py-20 md:py-28 lg:py-32 bg-white overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6 md:space-y-8">
                {/* Heading */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 md:mb-5">
                    <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                      {data.whatIs?.title}
                    </span>
                  </h2>
                  {/* Thin horizontal divider */}
                  <div className="w-16 h-px bg-blue-200"></div>
                </div>

                {/* Paragraph */}
                <p className="text-base md:text-lg text-text-gray leading-relaxed max-w-xl">
                  {data.whatIs.paragraph}
                </p>

                {/* Two-column card list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {/* Left column cards */}
                  <div className="space-y-4">
                    {data.whatIs.bullets.slice(0, Math.ceil(data.whatIs.bullets.length / 2)).map((item, index) => (
                      <div key={index} className="bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-mediumBlue/30 p-4 transition-all duration-300">
                        <span className="text-base text-text-gray">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right column cards */}
                  <div className="space-y-4">
                    {data.whatIs.bullets.slice(Math.ceil(data.whatIs.bullets.length / 2)).map((item, index) => (
                      <div key={index} className="bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-mediumBlue/30 p-4 transition-all duration-300">
                        <span className="text-base text-text-gray">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                {data.whatIs?.footer && (
                  <p className="text-base md:text-lg text-text-gray leading-relaxed max-w-xl">
                    {data.whatIs?.footer}
                  </p>
                )}
              </div>

              {/* Right Column - Image */}
              <div className="flex items-center justify-center">
                <div className="relative w-full">
                  <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg aspect-[4/3]">
                    <img
                      src={data.whatIs?.imageSrc || '/images/doctor.png'}
                      alt={data.whatIs?.imageAlt || 'Functional & Integrated Medicine'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Functional & Integrated Medicine Section */}
        {data.whyChooseFunctionalMedicine && (
          <section className="relative py-20 md:py-28 lg:py-32 bg-gray-50 overflow-hidden">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-6 md:mb-8">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {data.whyChooseFunctionalMedicine.title}
                  </span>
                </h2>
                <p className="text-base md:text-lg text-text-gray leading-relaxed mb-6">
                  {data.whyChooseFunctionalMedicine.description}
                </p>
                {Array.isArray(data.whyChooseFunctionalMedicine?.points) && data.whyChooseFunctionalMedicine.points.length > 0 && (
                  <div className="text-left max-w-2xl mx-auto space-y-3 mb-6">
                    {data.whyChooseFunctionalMedicine.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary-mediumBlue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-base text-text-gray">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
                {data.whyChooseFunctionalMedicine.footer && (
                  <p className="text-base md:text-lg text-text-gray italic">
                    {data.whyChooseFunctionalMedicine.footer}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section - 6 Pillars */}
        <div className="relative bg-white overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-20 md:pt-28 lg:pt-32">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {data.benefits?.title}
                </span>
              </h2>
              {data.benefits.subtitle && (
                <p className="text-lg md:text-xl text-text-gray font-semibold mb-6">
                  {data.benefits.subtitle}
                </p>
              )}
              <div className="flex justify-center">
                <div className="w-24 h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
          <BenefitsSection
            title=""
            benefits={data.benefits?.items || []}
          />
          {data.benefits?.footer && (
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-20 md:pb-28 lg:pb-32">
              <div className="text-center">
                <p className="text-base md:text-lg text-text-gray max-w-3xl mx-auto">
                  {data.benefits.footer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Who Can Benefit Section */}
        <section className="relative py-20 md:py-28 lg:py-32 bg-gray-50 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              {/* Heading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-5 md:mb-6">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {data.whoCanBenefit?.title}
                </span>
              </h2>
              {/* Thin horizontal divider */}
              <div className="flex justify-center">
                <div className="w-24 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Card grid: 2×2 for ≤4 items (avoids empty 3rd column); 3 columns for larger lists */}
            <div className="w-full max-w-7xl mx-auto">
              {(() => {
                const items = data.whoCanBenefit?.items ?? [];
                const n = items.length;
                const gridClass =
                  n === 1
                    ? 'grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto justify-items-center'
                    : n > 0 && n <= 4
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6';
                return (
                  <div className={gridClass}>
                    {items.map((item, index) => (
                      <div key={index} className={`bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary-mediumBlue/40 p-4 md:p-5 transition-all duration-300 group${n === 1 ? ' w-full max-w-2xl' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-mediumBlue flex-shrink-0 mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-base md:text-lg text-text-gray leading-relaxed">{typeof item === 'string' ? item : (item?.text ?? '')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
              {data.whoCanBenefit?.footer && (
                <p className="text-center text-text-gray mt-8 md:mt-12 text-base md:text-lg">
                  {data.whoCanBenefit?.footer}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="relative py-20 md:py-28 lg:py-32 bg-white overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {/* Title with horizontal line */}
            <div className="flex items-center justify-center gap-4 mb-12 md:mb-16">
              <div className="flex-1 h-px bg-gray-300"></div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight whitespace-nowrap">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {data.journey?.title}
                </span>
              </h2>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Steps - Grid layout for 6 steps (2 columns on md, 3 on xl) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {data.journey.steps && data.journey.steps.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-xl px-4 py-4 md:px-6 md:py-5 lg:px-6 lg:py-6 w-full h-full flex flex-col">
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase">
                    <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                      {step.title}
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-text-gray flex-grow">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety/Expected Outcomes Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 relative z-10">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 sm:mb-10 md:mb-12"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-6 sm:mb-8">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    {data.safety?.title}
                  </span>
                </h2>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block"
              >
                <div className="bg-gray-100 rounded-[14px] px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 border border-gray-200">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-text-gray">
                    {data.safety?.description}
                  </p>
                </div>
              </MotionDiv>
            </MotionDiv>
          </div>
        </section>

        {/* Why Choose NADZ Section */}
        {data.whyChoose && data.whyChoose.title && Array.isArray(data.whyChoose?.items) && data.whyChoose.items.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8 sm:mb-10 text-center"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] sm:leading-tight tracking-tight mb-6 sm:mb-8">
                    <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                      {data.whyChoose.title}
                    </span>
                  </h2>
                </MotionDiv>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {data.whyChoose.items.map((item, index) => (
                      <MotionDiv
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-[14px] sm:rounded-[14px] shadow-sm border border-gray-200/50 hover:shadow-lg hover:border-primary-mediumBlue/30 transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MdCheckCircle className="text-white text-sm sm:text-base md:text-lg" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed font-normal flex-grow">
                          {item}
                        </p>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {data.faqs && (Array.isArray(data.faqs) ? data.faqs.length > 0 : (data.faqs?.items && data.faqs.items.length > 0)) && (
          <Faq
            title={data.faqs?.title || "FAQs – Functional & Integrated Medicine"}
            faqs={Array.isArray(data.faqs) ? data.faqs : (data.faqs?.items ?? [])}
          />
        )}

        {/* CTA and Footer Section */}
        <section className="relative py-16 md:py-20 lg:py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
            <div className="flex flex-col items-center space-y-8 md:space-y-10">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openWhatsAppUrl()}
                  className="w-full sm:w-auto px-6 md:px-7 lg:px-8 py-3 md:py-3.5 lg:py-4 min-w-[160px] md:min-w-[180px] lg:min-w-[200px] bg-[#DFB680] text-[#5C2533] rounded-full font-semibold text-xs md:text-xs lg:text-sm shadow-lg hover:bg-[#d4a86a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <FaWhatsapp className="text-base md:text-lg group-hover/btn:scale-110 transition-transform flex-shrink-0 text-[#5C2533]" />
                  <span className="whitespace-nowrap text-[#5C2533]">{data.cta?.primaryCta}</span>
                </button>
                <button
                  onClick={() => window.location.href = 'tel:+97180046239'}
                  className="w-full sm:w-auto px-6 md:px-7 lg:px-8 py-3 md:py-3.5 lg:py-4 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] bg-[#5C2533] border-2 border-[#5C2533] text-white rounded-full font-semibold text-xs md:text-xs lg:text-sm hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <MdPhone className="text-base md:text-lg text-white group-hover/btn:scale-110 transition-transform flex-shrink-0" />
                  <span className="whitespace-nowrap text-white">{data.cta?.secondaryCta}</span>
                </button>
              </div>

              {/* Tagline */}
              <p className="text-sm sm:text-base md:text-lg text-text-gray italic text-center">
                {data.cta?.tagline}
              </p>

              {/* Divider */}
              <div className="w-full max-w-3xl h-px bg-gray-300"></div>

            </div>
          </div>
        </section>
      </>
    </>
  );
}
