"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowUpward, MdChevronLeft } from "react-icons/md";
import Link from "next/link";

export const QuickLinksSection = ({ links = [], subcategories = [], pageName = "" }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide based on scroll position
      setIsVisible(window.scrollY > 300);

      // Find active section based on scroll position (only for non-link items)
      if (subcategories && subcategories.length > 0) {
        // Don't track active section for subcategories since they're links
        return;
      }
      
      const sections = links.map((link) => link.id).filter(Boolean);
      const scrollPosition = window.scrollY + 250; // Offset for better UX (accounts for fixed header)

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPosition >= elementTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [links, subcategories]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // Optionally collapse after clicking
      // setIsExpanded(false);
    }
  };

  // Generate slug from category name for URL
  const getCategorySlug = (category) => {
    // Special mappings for specific categories
    const specialMappings = {
      "IV Glutathione Radiance Drip": "glutathione-iv-therapy",
      "NAD+ IV Drip": "nad-iv",
      "IV Hydration": "hangover",
      "Hydration Drip": "hangover",
      "Immunity & Hydration Drip": "hangover",
      "Genetic & Epigenetic Testing": "genetic-genomics-testing-at-home",
      "Food Intolerance & Allergies": "food-intolerance-testing-at-home",
      "NIPT / Women's Health Panels": "nipt-testing-at-home",
      "STD Testing & Sexual Health": "std-testing-at-home",
      "COVID PCR": "pcr-testing-at-home"
    };
    
    if (specialMappings[category]) {
      return specialMappings[category];
    }
    
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Use subcategories if available, otherwise use links
  const displayItems = subcategories && subcategories.length > 0 
    ? subcategories.map(cat => ({
        label: cat,
        href: `/home-care/${getCategorySlug(cat)}`,
        isLink: true
      }))
    : links;

  if (!displayItems || displayItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex items-center ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Collapsed Label - Always Visible */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#E3C699] text-[#5C2533] px-0 py-5 rounded-l-lg shadow-lg hover:bg-[#d4b588] transition-colors duration-200 flex items-center justify-center min-h-[180px] cursor-pointer w-8 overflow-visible"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="transform -rotate-90 whitespace-nowrap text-xs font-semibold tracking-tight leading-tight">
          {pageName ? `More from ${pageName}` : "Quick Links"}
        </div>
      </motion.button>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-l-lg shadow-lg border-l border-t border-b border-gray-200 overflow-hidden"
          >
            <div className="p-4 w-[240px]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-primary-mediumBlue">
                  {pageName ? `More from ${pageName}` : "Quick Links"}
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-primary-mediumBlue transition-colors"
                  aria-label="Close"
                >
                  <MdChevronLeft className="text-xl" />
                </button>
              </div>
              <nav className="space-y-2">
                {displayItems.map((item, index) => {
                  const isActive = !item.isLink && activeSection === item.id;
                  const key = item.id || item.label || index;
                  
                  if (item.isLink && item.href) {
                    return (
                      <Link
                        key={key}
                        href={item.href}
                        className="block w-full text-left px-3 py-2 text-xs rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-primary-mediumBlue"
                        onClick={() => setIsExpanded(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  
                  return (
                    <button
                      key={key}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-md transition-all duration-200 ${
                        isActive
                          ? "bg-[#E3C699] text-[#5C2533] font-medium"
                          : "text-gray-700 hover:bg-gray-100 hover:text-primary-mediumBlue"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <button
                onClick={scrollToTop}
                className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-gray-600 hover:text-primary-mediumBlue hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                <MdArrowUpward className="text-sm" />
                Back to Top
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

