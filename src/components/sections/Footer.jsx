'use client';

import {
  MdPhone,
  MdEmail,
} from 'react-icons/md';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';

import { PhoneCtaLink, WhatsAppCtaLink } from '@/components/ui/CtaLinks';

export const Footer = () => {
  const services = [
    'Doctor on Call',
    'Nursing Care',
    'Elderly Care',
    'Physiotherapy at Home',
    'Lab Testing at Home',
    'POC Testing',
    'Wellness at Home',
    'NADZ Vital Brain',
    'IV Drips',
  ];

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Who we are', href: '#about' },
    { label: 'Vision & Mission', href: '#vision' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      <footer className="bg-background-footer text-white pt-16 md:pt-20 pb-12 md:pb-16 relative bg-gradient-to-b from-black/10 to-transparent">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Top Section - Get in touch, Social Icons, Our Services, and Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-16">
            {/* Left - Get in touch */}
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-accent-gold mb-6">
                Get in touch with us
              </h3>
              <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-row gap-4 items-center p-4 rounded-[14px] bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-white/15 flex items-center justify-center transition-all">
                    <MdPhone className="text-2xl text-white" />
                  </div>
                  <p className="text-white text-base md:text-lg font-bold tracking-wide">
                    800 4 NADZ / 800 4 6239
                  </p>
                </div>
                <div className="flex flex-row gap-4 items-center p-4 rounded-[14px] bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-white/15 flex items-center justify-center transition-all">
                    <MdEmail className="text-2xl text-white" />
                  </div>
                  <p className="text-white text-base md:text-lg font-bold tracking-wide">
                    info@staging.nadzhealthcare.com
                  </p>
                </div>

                {/* Logo and Description */}
                <div className="flex flex-row gap-4 items-center mt-8">
                  <img
                    src="/images/logoo.png"
                    alt="NADZ Healthcare Logo"
                    className="h-12 md:h-[60px] w-auto object-contain"
                  />
                </div>
                <p className="text-white text-sm md:text-[0.9375rem] leading-relaxed opacity-95 mt-4">
                  At NADZ Home Healthcare, your needs guide our care.
                  <br />
                  We deliver personalized health support precisely where you
                  need it:
                  <br />
                  your home, office, or hotel.
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="text-center">
              <h4 className="text-lg md:text-xl font-bold text-accent-gold mb-6 tracking-wide">
                Follow Us
              </h4>
              <div className="flex flex-row gap-3 justify-center flex-wrap">
                <button className="w-12 h-12 border-2 border-accent-gold/40 text-accent-gold bg-accent-gold/15 hover:bg-accent-gold hover:text-background-footer hover:-translate-y-1 hover:shadow-gold transition-all rounded-full flex items-center justify-center">
                  <FaFacebook className="text-xl" />
                </button>
                <button className="w-12 h-12 border-2 border-accent-gold/40 text-accent-gold bg-accent-gold/15 hover:bg-accent-gold hover:text-background-footer hover:-translate-y-1 hover:shadow-gold transition-all rounded-full flex items-center justify-center">
                  <FaInstagram className="text-xl" />
                </button>
                <button className="w-12 h-12 border-2 border-accent-gold/40 text-accent-gold bg-accent-gold/15 hover:bg-accent-gold hover:text-background-footer hover:-translate-y-1 hover:shadow-gold transition-all rounded-full flex items-center justify-center">
                  <FaLinkedin className="text-xl" />
                </button>
                <button className="w-12 h-12 border-2 border-accent-gold/40 text-accent-gold bg-accent-gold/15 hover:bg-accent-gold hover:text-background-footer hover:-translate-y-1 hover:shadow-gold transition-all rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-xl" />
                </button>
                <button className="w-12 h-12 border-2 border-accent-gold/40 text-accent-gold bg-accent-gold/15 hover:bg-accent-gold hover:text-background-footer hover:-translate-y-1 hover:shadow-gold transition-all rounded-full flex items-center justify-center">
                  <FaYoutube className="text-xl" />
                </button>
              </div>
            </div>

            {/* Our Services */}
            <div className="text-center">
              <h4 className="text-lg md:text-xl font-bold text-accent-gold mb-6 tracking-wide">
                Our Services
              </h4>
              <div className="flex flex-col gap-3 items-center">
                {services.map((service) => (
                  <a
                    key={service}
                    href="#"
                    className="text-accent-gold text-sm md:text-[0.9375rem] no-underline opacity-90 hover:text-white hover:opacity-100 hover:translate-x-1 transition-all"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:col-start-1 md:col-end-4">
              <h4 className="text-lg md:text-xl font-bold text-accent-gold mb-6 tracking-wide">
                Quick Links
              </h4>
              <div className="flex flex-col gap-3 items-center">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-accent-gold text-sm md:text-[0.9375rem] no-underline opacity-90 hover:text-white hover:opacity-100 hover:translate-x-1 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t-2 border-accent-gold/30">
            <p className="text-accent-gold text-sm opacity-80 tracking-wide">
              All Rights Reserved © Copyright 2025
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <PhoneCtaLink
        href="+97180046239"
        className="fixed bottom-24 right-6 bg-[#5C2533] border-2 border-[#5C2533] text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:scale-110 hover:shadow-xl transition-all z-[1000] flex items-center justify-center"
        aria-label="Call NADZ Healthcare"
      >
        <MdPhone className="text-2xl text-white" />
      </PhoneCtaLink>
      <WhatsAppCtaLink
        className="fixed bottom-6 right-6 bg-[#DFB680] text-[#5C2533] w-14 h-14 rounded-full shadow-lg hover:bg-[#d4a86a] hover:scale-110 hover:shadow-xl transition-all z-[1000] flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-[#5C2533] text-2xl" />
      </WhatsAppCtaLink>
    </>
  );
};
