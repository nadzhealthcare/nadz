'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function VisionMissionClient({ pageData }) {
  const { hero, vision, mission, whyMatters } = pageData || {};

  return (
    <>
      {/* Hero Section – same style as Who We Are: grid background, subtext, no CTAs */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-mediumBlue/20 via-primary-main/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-primary-mediumBlue/15 via-primary-main/8 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-mediumBlue/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay – same as Who We Are */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content – heading + subtext only, no CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 sm:mb-8 tracking-tight"
              >
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {hero?.title || 'Our Mission & Vision'}
                </span>
              </motion.h1>

              {hero?.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xs sm:text-sm md:text-base text-text-gray font-normal italic mb-6 sm:mb-8"
                >
                  {hero.subtitle}
                </motion.p>
              )}

              {hero?.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed"
                >
                  {hero.description.split(/(NADZ|home healthcare in Dubai)/).map((part, index) => {
                    if (part === 'NADZ') {
                      return <strong key={index} className="text-primary-mediumBlue font-semibold">NADZ</strong>;
                    }
                    if (part === 'home healthcare in Dubai') {
                      return <strong key={index} className="text-primary-mediumBlue">{part}</strong>;
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </motion.p>
              )}
            </motion.div>

            {/* Right – decorative image if provided */}
            {hero?.imageSrc && hero.imageSrc.trim() !== '' && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative w-full max-w-[500px] mx-auto aspect-square flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{
                      background: 'radial-gradient(circle, rgba(51, 138, 174, 0.25) 0%, rgba(51, 138, 174, 0.1) 50%, transparent 70%)',
                    }}
                  />
                  <Image
                    src={hero.imageSrc}
                    alt={hero.imageAlt || 'NADZ Mission & Vision'}
                    width={400}
                    height={400}
                    className="relative z-10 w-[75%] h-auto object-contain"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Vision Section with Modern Card Design */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              {/* Modern Card with Glass Effect */}
              <div className="relative p-8 sm:p-12 md:p-16 bg-gradient-to-br from-white via-white to-primary-mediumBlue/5 rounded-[14px] border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] transition-all duration-500 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-mediumBlue/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-main/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                  {/* Section Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
                    <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
                    <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{vision?.badgeLabel || 'Vision'}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-primary-mediumBlue">
                    {vision?.title || 'Our Vision'}
                  </h2>

                  <div className="space-y-6 sm:space-y-8">
                    {(Array.isArray(vision?.paragraphs) ? vision.paragraphs : []).map((paragraph, index) => {
                      const text = typeof paragraph === 'string' ? paragraph : (paragraph?.text ?? paragraph?.body ?? paragraph?.content ?? '');
                      if (!text || String(text).trim() === '') return null;
                      return (
                        <motion.p
                          key={index}
                          variants={itemVariants}
                          className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                            index === vision.paragraphs.length - 1
                              ? 'font-semibold text-primary-mediumBlue text-sm sm:text-base md:text-lg'
                              : 'text-text-gray'
                          }`}
                        >
                          {String(text).includes('NADZ Healthcare') ? (
                            <>
                              At <strong className="text-primary-mediumBlue">NADZ Healthcare</strong>, {String(text).replace(/^At NADZ Healthcare, /, '')}
                            </>
                          ) : (
                            text
                          )}
                        </motion.p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section with Modern Design */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* Modern Card */}
              <div className="relative p-8 sm:p-12 md:p-16 bg-white rounded-[14px] border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] transition-all duration-500 overflow-hidden">
                <div className="relative z-10">
                  {/* Section Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
                    <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
                    <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{mission?.badgeLabel || 'Mission'}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-primary-mediumBlue">
                    {mission?.title || 'Our Mission'}
                  </h2>

                  <div className="space-y-6 sm:space-y-8">
                    {mission?.intro && (
                      <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl font-bold text-primary-heading leading-tight"
                      >
                        {mission.intro}
                      </motion.p>
                    )}

                    {(Array.isArray(mission?.paragraphs) ? mission.paragraphs : []).map((paragraph, index) => {
                      const text = typeof paragraph === 'string' ? paragraph : (paragraph?.text ?? paragraph?.body ?? paragraph?.content ?? '');
                      if (!text || String(text).trim() === '') return null;
                      return (
                        <motion.p
                          key={index}
                          variants={itemVariants}
                          className="text-xs sm:text-sm md:text-base leading-relaxed text-text-gray"
                        >
                          {String(text).includes('Dr. Nadia Choudhry') ? (
                            <>
                              Led by <strong className="text-primary-mediumBlue">Dr. Nadia Choudhry</strong>, {String(text).replace(/^Led by Dr\. Nadia Choudhry, /, '')}
                            </>
                          ) : (
                            text
                          )}
                        </motion.p>
                      );
                    })}

                    {mission?.points && (
                      <motion.ul
                        variants={containerVariants}
                        className="list-none space-y-4 sm:space-y-6 pl-0 mt-8"
                      >
                        {(Array.isArray(mission.points) ? mission.points : []).map((point, index) => {
                          const pointText = typeof point === 'string' ? point : (point?.text ?? point?.body ?? point?.content ?? '');
                          if (!pointText || String(pointText).trim() === '') return null;
                          return (
                            <motion.li
                              key={index}
                              variants={itemVariants}
                              className="flex items-start gap-4 group"
                            >
                              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-mediumBlue to-primary-main flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed pt-1">{pointText}</span>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative Quote Card */}
              {mission?.quote && (
                <motion.div
                  variants={itemVariants}
                  className="mt-12 sm:mt-16 relative"
                >
                  <div className="relative p-4 sm:p-5 md:p-6 bg-gradient-to-br from-primary-mediumBlue/10 via-primary-main/10 to-primary-mediumBlue/10 rounded-[14px] border-2 border-primary-mediumBlue/20 backdrop-blur-sm overflow-hidden max-w-2xl mx-auto">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-mediumBlue/5 via-transparent to-primary-mediumBlue/5 animate-pulse"></div>
                    
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 py-2">
                      <div className="text-4xl sm:text-5xl text-primary-mediumBlue/10 font-serif leading-none mb-2">"</div>
                      <p className="text-sm sm:text-base md:text-lg italic text-primary-mediumBlue font-light leading-relaxed whitespace-pre-line">
                        {mission.quote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Our Mission & Vision Matter - Modern Grid Cards */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-left mb-12 sm:mb-16 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
                <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{whyMatters?.badgeLabel || 'Why It Matters'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-heading">
                {whyMatters?.title || 'Why Our Mission & Vision Matter'}
              </h2>
            </motion.div>

          {whyMatters?.items && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {whyMatters.items.map((item, index) => {
                const iconMap = {
                  check: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  users: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  heart: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                };

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="relative h-full p-8 sm:p-10 bg-gradient-to-br from-white to-primary-mediumBlue/5 rounded-[14px] border border-gray-100 shadow-[0_10px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500 overflow-hidden">
                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-mediumBlue/0 to-primary-mediumBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-mediumBlue/10 to-transparent rounded-bl-full"></div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-mediumBlue to-primary-main rounded-[14px] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          {iconMap[item.icon] || iconMap.check}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-4 text-primary-mediumBlue group-hover:text-primary-main transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
