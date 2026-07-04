'use client';

import Link from 'next/link';
import { 
  MdPhone
} from 'react-icons/md';
import { 
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp
} from 'react-icons/fa';

import { PhoneCtaLink, WhatsAppCtaLink } from '@/components/ui/CtaLinks';

// Default footer links (fallback)
const defaultFooterLinks = {
  quickLinks: [
    { label: 'About Us', href: '#about' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Home Healthcare', href: '#' },
    { label: 'Careers', href: '#careers' },
  ],
  services: [
    { label: 'Doctor on call', href: '#' },
    { label: 'Nursing care', href: '/home-care/home-nursing-supportive-care' },
    { label: 'Elderly care', href: '/home-care/elderly-care' },
    { label: 'IV Drips', href: '/home-care/iv-drips' },
    { label: 'NADZ Vital Brain', href: '/home-care/medical-tourism' },
    { label: 'Lab testing at home', href: '/home-care/lab-testing-at-home' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookies Policy', href: '/cookie-policy' },
  ],
};

// Map social platform names to icons
const socialIconMap = {
  facebook: null, // Not used in NewFooter
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: null, // Not used in NewFooter
  whatsapp: FaWhatsapp,
};

export const FooterClient = ({ footerData }) => {
  // Use Strapi data if provided, otherwise use defaults
  const logo = footerData?.logo || '/logofooter.png';
  const logoAlt = footerData?.logoAlt || 'NADZ Healthcare';
  const description = footerData?.description || '';
  const socialLinks = footerData?.socialLinks || [];
  const linkSections = footerData?.linkSections || [];
  const copyrightText = footerData?.copyrightText || 'All Rights Reserved © Copyright 2025';
  const licenseText = footerData?.licenseText || '';
  const licenseNumber = footerData?.licenseNumber || '';
  const floatingPhoneButton = footerData?.floatingPhoneButton !== false;
  const floatingWhatsAppButton = footerData?.floatingWhatsAppButton !== false;
  const phoneNumber = footerData?.phoneNumber || '+97180046239';
  const whatsappNumber = footerData?.whatsappNumber || '971521597336';
  const whatsappUrl = footerData?.whatsappUrl || 'https://wa.me/971521597336';
  
  // Transform linkSections to match component structure if needed
  const footerLinks = linkSections.length > 0 
    ? linkSections.reduce((acc, section) => {
        const key = section.title.toLowerCase().replace(/\s+/g, '');
        if (key.includes('quick')) acc.quickLinks = section.links || [];
        else if (key.includes('service')) acc.services = section.links || [];
        else if (key.includes('legal')) acc.legal = section.links || [];
        return acc;
      }, { quickLinks: [], services: [], legal: [] })
    : defaultFooterLinks;

  return (
    <>
      <footer className="bg-background-footer text-white pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Left Section - Logo and Social Media */}
            <div className="col-span-2 md:col-span-1">
              <img
                src={logo}
                alt={logoAlt}
                className="h-20 w-auto object-contain mb-6"
              />
              {description && (
                <p className="text-white text-sm mb-6 opacity-90">{description}</p>
              )}
              <div className="flex flex-row gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.platform];
                  if (!IconComponent) return null;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-white text-white rounded-full hover:bg-white hover:text-primary-dark transition-all flex items-center justify-center"
                      aria-label={social.ariaLabel || social.platform}
                    >
                      <IconComponent className="text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">
                Quick Links
              </h4>
              <div className="flex flex-col gap-3">
                {footerLinks.quickLinks.map((link) => (
                  link.href.startsWith('#') ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-white no-underline text-sm hover:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-white no-underline text-sm hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">
                Services
              </h4>
              <div className="flex flex-col gap-3">
                {footerLinks.services.map((link) => (
                  link.href.startsWith('#') ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-white no-underline text-sm hover:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-white no-underline text-sm hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="col-start-2 md:col-start-auto">
              <h4 className="font-semibold text-white mb-4 text-sm">
                Legal
              </h4>
              <div className="flex flex-col gap-3">
                {footerLinks.legal.map((link) => (
                  link.href.startsWith('#') ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-white no-underline text-sm hover:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-white no-underline text-sm hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            {(licenseText || licenseNumber) && (
              <div>
                {licenseText && <p className="text-white text-sm">{licenseText}</p>}
                {licenseNumber && <p className="text-white text-sm">License No : {licenseNumber}</p>}
              </div>
            )}
            <div>
              <p className="text-white text-sm">
                {copyrightText}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {floatingPhoneButton && (
        <PhoneCtaLink
          href={phoneNumber}
          className="fixed bottom-24 right-6 bg-[#5C2533] border-2 border-[#5C2533] text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#6c2a37] hover:border-[#6c2a37] hover:scale-110 hover:shadow-xl transition-all z-[1000] flex items-center justify-center"
          aria-label="Call NADZ Healthcare"
        >
          <MdPhone className="text-2xl text-white" />
        </PhoneCtaLink>
      )}
      {floatingWhatsAppButton && (
        <WhatsAppCtaLink
          href={whatsappUrl}
          className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#1ebe5d] hover:scale-110 hover:shadow-xl transition-all z-[1000] flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-white text-2xl" />
        </WhatsAppCtaLink>
      )}
    </>
  );
};

