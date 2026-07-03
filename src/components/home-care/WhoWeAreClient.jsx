'use client';

import { motion } from 'framer-motion';
import { getIconComponent } from '@/lib/icons';
import { MdFavorite, MdPeople, MdHome, MdCheck, MdLocalHospital } from 'react-icons/md';

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

export function WhoWeAreClient({ pageData }) {
  const { hero, ourStory, ourCommitment, ourPromise, whoWeServe, whyDifferent, closing } = pageData || {};

  return (
    <>
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-mediumBlue/20 via-primary-main/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-primary-mediumBlue/15 via-primary-main/8 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-mediumBlue/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-md rounded-full border border-primary-mediumBlue/20 shadow-lg"
              >
                <span className="w-2 h-2 bg-primary-mediumBlue rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-primary-mediumBlue">{hero?.badgeLabel || 'About NADZ'}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 sm:mb-8 tracking-tight"
              >
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {hero?.title || 'Redefining Home Healthcare'}
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

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full max-w-[500px] mx-auto">
                {/* Image Container */}
                <div className="relative z-10 w-full h-auto">
                  <img
                    src={hero?.imageSrc || "/images/who%20we%20are%201.png"}
                    alt={hero?.imageAlt || "NADZ Healthcare Professional"}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      // Fallback to default image if CMS image fails to load
                      if (e.target.src !== "/images/who%20we%20are%201.png") {
                        e.target.src = "/images/who%20we%20are%201.png";
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
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
                    <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{ourStory?.badgeLabel || 'Our Story'}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-primary-mediumBlue">
                    {ourStory?.title || 'Our Story – Where Luxury Meets Healthcare'}
                  </h2>

                  <div className="space-y-6 sm:space-y-8">
                    {ourStory?.paragraphs?.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        variants={itemVariants}
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-text-gray"
                      >
                        {paragraph.includes('Dr. Nadia Choudhry') ? (
                          <>
                            Co-Founded by <strong className="text-primary-mediumBlue">Dr. Nadia Choudhry</strong>, {paragraph.replace(/^Co-Founded by Dr\. Nadia Choudhry, /, '')}
                          </>
                        ) : paragraph.includes('DHA certified') ? (
                          <>
                            Every NADZ doctor and nurse is <strong className="text-primary-mediumBlue">DHA certified</strong> and {paragraph.replace(/^Every NADZ doctor and nurse is DHA certified and /, '')}
                          </>
                        ) : (
                          paragraph
                        )}
                      </motion.p>
                    ))}
                  </div>

                  {/* Quote Card */}
                  {ourStory?.quote && (
                    <motion.div
                      variants={itemVariants}
                      className="mt-12 sm:mt-16 relative"
                    >
                      <div className="relative p-8 sm:p-12 md:p-16 bg-gradient-to-br from-primary-mediumBlue/10 via-primary-main/10 to-primary-mediumBlue/10 rounded-[14px] border-2 border-primary-mediumBlue/20 backdrop-blur-sm overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-mediumBlue/5 via-transparent to-primary-mediumBlue/5 animate-pulse"></div>
                        
                        <div className="relative z-10">
                          <div className="absolute top-4 left-4 text-6xl sm:text-7xl md:text-8xl text-primary-mediumBlue/10 font-serif leading-none">"</div>
                          <p className="text-xs sm:text-sm md:text-base italic text-left text-primary-mediumBlue font-normal leading-relaxed whitespace-pre-line relative z-10 pl-8">
                            {ourStory.quote}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Commitment Section with Image */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-mediumBlue/20 to-primary-main/10 rounded-[14px] blur-2xl"></div>
                <div className="relative z-10 w-full h-full rounded-[14px] overflow-hidden shadow-2xl">
                  <img
                    src={ourCommitment?.imageSrc || "/images/our%20commitment.png"}
                    alt={ourCommitment?.imageAlt || "NADZ Healthcare Commitment"}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // Fallback to default image if CMS image fails to load
                      if (e.target.src !== "/images/our%20commitment.png") {
                        e.target.src = "/images/our%20commitment.png";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-mediumBlue/30 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
                  <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
                  <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{ourCommitment?.badgeLabel || 'Our Commitment'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-primary-mediumBlue">
                  {ourCommitment?.title || 'Our Commitment'}
                </h2>

                <motion.p
                  variants={itemVariants}
                  className="text-xs sm:text-sm md:text-base leading-relaxed text-text-gray mb-6"
                >
                  {ourCommitment?.description}
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-xs sm:text-sm md:text-base leading-relaxed text-text-gray"
                >
                  {ourCommitment?.paragraph}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Promise Section - Grid Cards */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
              <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{ourPromise?.badgeLabel || 'Our Promise'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-heading">
              {ourPromise?.title || 'Our Promise to You'}
            </h2>
          </motion.div>

          {ourPromise?.items && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {ourPromise.items.map((item, index) => {
                const icons = [MdFavorite, MdPeople, MdHome, MdCheck];
                const Icon = icons[index] || MdCheck;
                
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
                          <Icon className="w-8 h-8 text-white" />
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

      {/* Who We Serve Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
              <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{whoWeServe?.badgeLabel || 'Who We Serve'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-primary-mediumBlue">
              {whoWeServe?.title || 'Who We Serve'}
            </h2>
            {whoWeServe?.description && (
              <p className="text-xs sm:text-sm md:text-base text-text-gray max-w-3xl mx-auto">
                {whoWeServe.description}
              </p>
            )}
          </motion.div>

          {whoWeServe?.services && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {whoWeServe.services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="relative h-full p-6 sm:p-8 bg-white rounded-[14px] border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] hover:border-primary-mediumBlue/30 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-mediumBlue/5 to-transparent rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-mediumBlue/20 to-primary-main/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <MdLocalHospital className="w-6 h-6 text-primary-mediumBlue" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-3 text-primary-mediumBlue group-hover:text-primary-main transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why NADZ is Different Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-mediumBlue/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-primary-mediumBlue rounded-full"></div>
              <span className="text-sm font-semibold text-primary-mediumBlue uppercase tracking-wider">{whyDifferent?.badgeLabel || 'Why Choose Us'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-heading">
              {whyDifferent?.title || 'Why NADZ Home Healthcare is Different'}
            </h2>
          </motion.div>

          {whyDifferent?.items && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {whyDifferent.items.map((item, index) => {
                // Map short icon names to full icon names, then get component
                const iconNameMap = {
                  check: 'MdCheck',
                  users: 'MdPeople',
                  heart: 'MdFavorite',
                  home: 'MdHome',
                  hospital: 'MdLocalHospital',
                  time: 'MdAccessTime',
                  verified: 'MdVerified',
                };
                const iconName = iconNameMap[item.icon] || item.icon || 'MdCheck';
                const Icon = getIconComponent(iconName);
                
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="relative h-full p-8 sm:p-10 bg-gradient-to-br from-white to-primary-mediumBlue/5 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-mediumBlue/0 to-primary-mediumBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-mediumBlue/10 to-transparent rounded-bl-full"></div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-mediumBlue to-primary-main rounded-[14px] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <Icon className="w-8 h-8 text-white" />
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

      {/* Closing Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary-mediumBlue/5 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

        <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 sm:p-12 md:p-16 bg-gradient-to-br from-white via-white to-primary-mediumBlue/5 rounded-[14px] border border-gray-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-mediumBlue/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-main/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-primary-mediumBlue">
                  {closing?.title || 'Welcome to NADZ'}
                </h2>
                {closing?.description && (
                  <p className="text-xs sm:text-sm md:text-base text-text-gray mb-6 font-normal italic">
                    {closing.description}
                  </p>
                )}
                {closing?.subtitle && (
                  <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed">
                    {closing.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}


