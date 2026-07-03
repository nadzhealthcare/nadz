'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MdMenu, 
  MdClose, 
  MdArrowDropDown,
  MdArrowRight,
  MdChevronRight
} from 'react-icons/md';
import { BookNowDialog } from '@/components/common/BookNowDialog';

// Default navigation links (fallback)
const defaultNavLinks = [
  { label: 'Home', href: '/', hasDropdown: false },
  {
    label: 'About Us',
    href: '#about',
    hasDropdown: true,
    submenu: [
      { label: 'Mission & Vision', href: '/home-care/vision-mission', hasNested: false },
      { label: 'Who We Are', href: '/home-care/who-we-are', hasNested: false },
      { label: 'Testimonials', href: '/testimonials', hasNested: false },
      { label: 'Careers', href: '#careers', hasNested: false },
      { label: 'FAQs', href: '/faq', hasNested: false },
      { label: 'Our Team', href: '#our-team', hasNested: false },
      { label: 'Blog', href: '/blog', hasNested: false },
      {
        label: 'Media & Press Release',
        href: '#media-press',
        hasNested: true,
        nested: [
          { label: 'Awards & Achievements', href: '/awards-achievement' },
          { label: 'Press Releases', href: '/press-releases' },
          { label: 'Interviews & Podcasts', href: '/interviews-and-podcast' },
          { label: 'Events & Highlights', href: '/events' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    href: '#services',
    hasDropdown: true,
    submenu: [
      { label: 'Doctor on Call', href: '/home-care/doctor-on-call-dubai', hasNested: false },
      {
        label: 'Nursing Care',
        href: '/home-care/home-nursing-supportive-care',
        hasNested: true,
        nested: [
          { label: 'Elderly care', href: '/home-care/elderly-care' },
          { label: 'Mother & Baby care', href: '/home-care/mother-and-baby-care' },
          { label: 'Babysitting', href: '/home-care/babysitting' },
          { label: 'Palliative care', href: '/home-care/palliative-care' },
        ],
      },
      { label: 'Physiotherapy at Home', href: '/home-care/physiotherapy-at-home', hasNested: false },
      {
        label: 'IV Drips',
        href: '/home-care/iv-drips',
        hasNested: true,
        nested: [
          { label: 'IV NAD⁺', href: '/home-care/nad-iv' },
          { label: 'IV Glutathione Radiance Drip', href: '/home-care/glutathione-iv-therapy' },
          { label: 'IV Vitamin Therapy', href: '/home-care/iv-vitamin-therapy' },
          { label: 'IV Hydration', href: '/home-care/hangover' },
        ],
      },
      {
        label: 'Labs at Home',
        href: '/home-care/lab-testing-at-home',
        hasNested: true,
        nested: [
          { label: 'Basic & Advanced Blood Panels', href: '#blood-panels' },
          { label: 'Genetic & Epigenetic Testing', href: '/home-care/genetic-genomics-testing-at-home' },
          { label: 'Food Intolerance & Allergies', href: '/home-care/food-intolerance-testing-at-home' },
          { label: 'Hormone Panels', href: '#hormone-panels' },
          { label: "NIPT / Women's Health Panels", href: '/home-care/nipt-testing-at-home' },
          { label: 'STD Testing & Sexual Health', href: '/home-care/std-testing-at-home' },
          { label: 'COVID PCR', href: '/home-care/pcr-testing-at-home' },
        ],
      },
      { label: 'Vaccinations at Home', href: '/home-care/vaccinations-at-home', hasNested: false },
      { label: 'Concierge Radiology & Advanced Diagnostics', href: '#radiology', hasNested: false },
      { label: 'Medical Tourism', href: '/home-care/medical-tourism', hasNested: false },
    ],
  },
  {
    label: 'NADZ Exclusive',
    href: '#exclusive',
    hasDropdown: true,
    submenu: [
      { label: 'NADZ Vital Brain™', href: '/home-care/nadz-vital-brain', hasNested: false },
      {
        label: 'NADZ Autonomic Control™',
        href: '/wellness/autonomic-control',
        hasNested: true,
        nested: [
          { label: 'Sleeping Disorder', href: '/wellness/sleeping-disorder' },
          { label: 'Anxiety & Stress', href: '/wellness/anxiety-stress' },
          { label: 'Chronic Pain', href: '/wellness/chronic-pain' },
          { label: 'Erectile Dysfunction', href: '/wellness/erectile-dysfunction' },
          { label: 'Overreacting Bladder', href: '/wellness/overactive-bladder' },
        ],
      },
      { label: 'NADZ Blueprint™ (Diagnostic + Therapeutic)', href: '#blueprint', hasNested: false },
      { label: 'POC Testing (Point-of-Care Instant Screens)', href: '/home-care/poc-testing', hasNested: false },
      { label: 'NADZ Reset™ (Concierge Wellness Reset)', href: '#reset', hasNested: false },
    ],
  },
  {
    label: 'Wellness & Longevity',
    href: '#wellness',
    hasDropdown: true,
    submenu: [
      { label: 'Longevity Diagnostic Panels', href: '#longevity-panels', hasNested: false },
      { label: 'NAD⁺ + IV Therapy', href: '/wellness/nad-plus-iv-therapy', hasNested: false },
      { label: 'Peptide Therapy', href: '/wellness/peptide-therapy', hasNested: false },
      { label: 'Functional & Integrative Medicine', href: '/wellness/functional-integrated-medicine', hasNested: false },
      { label: 'Biohacking & Human Performance', href: '#biohacking', hasNested: false },
      { label: 'Gut & Microbiome Health', href: '#gut-health', hasNested: false },
      { label: 'Sleep & Stress Optimization', href: '#sleep-stress', hasNested: false },
    ],
  },
  { label: 'Contact Us', href: '/contact-us', hasDropdown: false },
];

function HoverMenuItem({ item, level = 0, onSelect, router }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const hasChildren = Boolean(item.nested?.length);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={item.href}
        onClick={(e) => {
          const isRealPath = item.href && !item.href.startsWith('#');
          if (hasChildren && !isRealPath) {
            e.preventDefault();
          } else {
            e.stopPropagation();
            if (router && isRealPath) {
              router.push(item.href);
            }
            onSelect?.();
          }
        }}
        className={`flex items-center justify-between gap-2 px-4 py-2.5 whitespace-nowrap transition-all duration-200 ease-in-out text-primary-mediumBlue hover:text-primary-main hover:bg-primary-main/10 hover:pl-5 rounded-md mx-1 ${
          level > 0 ? 'text-sm' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          {item.icon && <span className="min-w-[32px]">{item.icon}</span>}
          <span>{item.label}</span>
        </span>
        {hasChildren && <MdChevronRight className="text-lg flex-shrink-0 transition-transform duration-200" />}
      </a>

      {hasChildren && (
        <div
          className={`absolute top-0 left-full ml-1 z-[1300] min-w-[240px] bg-white rounded-[14px] shadow-xl border border-gray-200 py-1 transition-all duration-200 ${
            open
              ? 'opacity-100 visible translate-x-0'
              : 'opacity-0 invisible -translate-x-2 pointer-events-none'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.nested.map((child) => (
            <HoverMenuItem
              key={child.label}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              router={router}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DesktopHoverMenu({ link }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSelect = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-primary-mediumBlue hover:text-primary-main no-underline font-medium text-sm bg-transparent border-none cursor-pointer flex items-center gap-1 whitespace-nowrap transition-colors duration-200"
      >
        {link.label}
        <MdArrowDropDown className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 bg-transparent z-[1200]">
          <div className="bg-white rounded-[14px] shadow-xl border border-gray-200 min-w-[260px] py-1">
            {link.submenu?.map((subItem) => {
              if (subItem.hasNested) {
                return (
                  <HoverMenuItem
                    key={subItem.label}
                    item={subItem}
                    onSelect={handleSelect}
                    router={router}
                  />
                );
              }

              return (
                <a
                  key={subItem.label}
                  href={subItem.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    router.push(subItem.href);
                  }}
                  className="block px-4 py-2.5 text-primary-mediumBlue hover:text-primary-main hover:bg-primary-main/10 hover:pl-5 transition-all duration-200 ease-in-out rounded-md mx-1"
                >
                  {subItem.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export const HeaderClient = ({ headerData }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState({});
  const router = useRouter();
  
  // Use Strapi data if provided, otherwise use defaults
  const navLinks = headerData?.navLinks || defaultNavLinks;
  const logo = headerData?.logo || '/images/logoo.png';
  const logoAlt = headerData?.logoAlt || 'NADZ Healthcare';
  const ctaButtonText = headerData?.ctaButtonText || 'Book an appointment';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setExpandedMobileItems({});
  };
  
  const toggleMobileSubmenu = (itemKey) => {
    setExpandedMobileItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-black/5 text-text-primary z-[1100]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-3 md:py-4 min-h-[56px] md:min-h-[64px] w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center h-10 sm:h-[50px] md:h-[60px] relative">
              <Image
                src={logo}
                alt={logoAlt}
                width={200}
                height={60}
                className="h-full w-auto object-contain"
                priority
              />
            </Link>

            {/* Navigation Links - Right aligned */}
            <nav className="hidden md:flex flex-1 justify-end mr-8 gap-6 items-center">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.hasDropdown ? (
                    <DesktopHoverMenu link={link} />
                  ) : (
                    <Link
                      href={link.href}
                      className="text-primary-mediumBlue hover:text-primary-main no-underline font-medium text-sm whitespace-nowrap transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 md:gap-6">
              <button
                onClick={() => setDialogOpen(true)}
                className="px-3 py-1.5 md:px-6 md:py-2.5 bg-[#DFB680] text-[#5C2533] rounded-full font-medium text-xs md:text-sm shadow-none hover:bg-[#d4a86a] hover:shadow-md transition-all whitespace-nowrap"
              >
                {ctaButtonText}
              </button>

              <button
                className="md:hidden flex"
                onClick={handleDrawerToggle}
                aria-label="open drawer"
              >
                <MdMenu className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={handleDrawerToggle}></div>
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white pt-4 overflow-y-auto">
            <div className="flex justify-between items-center px-4 pb-4">
              <h2 className="text-lg font-bold text-primary-main">Menu</h2>
              <button onClick={handleDrawerToggle}>
                <MdClose className="text-2xl" />
              </button>
            </div>
            <nav>
              {navLinks.map((link) => {
                const itemKey = link.label.toLowerCase().replace(/\s+/g, '-');
                const isExpanded = expandedMobileItems[itemKey];

                return (
                  <div key={link.label}>
                    {link.hasDropdown ? (
                      <button
                        onClick={() => {
                          toggleMobileSubmenu(itemKey);
                        }}
                        className="w-full py-3 px-6 hover:bg-primary-main/8 transition-colors text-left flex items-center justify-between"
                      >
                        <span className="font-medium text-sm text-primary-mediumBlue">
                          {link.label}
                        </span>
                        <MdArrowDropDown
                          className={`text-primary-mediumBlue transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={handleDrawerToggle}
                        className="w-full py-3 px-6 hover:bg-primary-main/8 transition-colors text-left flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-medium text-sm text-primary-mediumBlue">
                          {link.label}
                        </span>
                      </Link>
                    )}
                    {link.hasDropdown && isExpanded && (
                      <div className="pl-6 bg-primary-main/4">
                        {link.submenu?.map((subItem) => {
                          const subItemKey = `${itemKey}-${subItem.label
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`;
                          const isSubExpanded = expandedMobileItems[subItemKey];

                          if (subItem.hasNested) {
                            return (
                              <div key={subItem.label}>
                                <div className="flex items-center w-full">
                                  {subItem.href && !subItem.href.startsWith('#') ? (
                                    <a
                                      href={subItem.href}
                                      onClick={handleDrawerToggle}
                                      className="flex-1 py-2.5 px-6 no-underline hover:bg-primary-main/8 transition-colors cursor-pointer"
                                    >
                                      <span className="font-normal text-xs text-primary-mediumBlue">
                                        {subItem.label}
                                      </span>
                                    </a>
                                  ) : (
                                    <div
                                      onClick={() => {
                                        if (!isSubExpanded) {
                                          toggleMobileSubmenu(subItemKey);
                                        }
                                      }}
                                      className="flex-1 py-2.5 px-6 hover:bg-primary-main/8 transition-colors cursor-pointer"
                                    >
                                      <span className="font-normal text-xs text-primary-mediumBlue">
                                        {subItem.label}
                                      </span>
                                    </div>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleMobileSubmenu(subItemKey);
                                    }}
                                    className="pr-4 py-2.5"
                                    aria-label={`toggle ${subItem.label} submenu`}
                                  >
                                    <MdChevronRight
                                      className={`text-primary-mediumBlue transition-transform text-lg ${
                                        isSubExpanded ? 'rotate-90' : ''
                                      }`}
                                    />
                                  </button>
                                </div>
                                {isSubExpanded && (
                                  <div className="pl-8 bg-gray-50 border-l-2 border-primary-main/20">
                                    {subItem.nested?.map((nestedItem) => (
                                      <a
                                        key={nestedItem.label}
                                        href={nestedItem.href}
                                        onClick={handleDrawerToggle}
                                        className="block py-2.5 px-6 hover:bg-primary-main/8 transition-colors cursor-pointer"
                                      >
                                        <span className="font-normal text-xs text-primary-mediumBlue">
                                          {nestedItem.label}
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={handleDrawerToggle}
                              className="block py-2.5 px-6 hover:bg-primary-main/8 transition-colors"
                            >
                              <span className="font-normal text-sm text-primary-mediumBlue">
                                {subItem.label}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-4 px-4">
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => {
                      handleDrawerToggle();
                      setDialogOpen(true);
                    }}
                    className="w-full py-3 bg-[#DFB680] text-[#5C2533] rounded-full font-medium text-sm shadow-none hover:bg-[#d4a86a] hover:shadow-md transition-all"
                  >
                    {ctaButtonText}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      <BookNowDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

