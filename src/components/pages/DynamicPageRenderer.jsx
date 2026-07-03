import React from 'react';
import {
  GenericHeroSection,
  VideoHeroSection,
  CenteredTextSection,
  HighlightedItemSection,
  BenefitsSection,
  ContentSection,
  QuickLinksSection,
} from '@/components/sections/shared';
import { HowItWorksSection } from '@/components/sections';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

// Map normalized section type to component
const componentMap = {
  // common component names / aliases
  hero: GenericHeroSection,
  genericHero: GenericHeroSection,
  homeCareHero: GenericHeroSection,
  videoHero: VideoHeroSection,
  centeredText: CenteredTextSection,
  highlightedItem: HighlightedItemSection,
  benefits: BenefitsSection,
  benefitsSection: BenefitsSection,
  howItWorks: HowItWorksSection,
  howItWorksSection: HowItWorksSection,
  content: ContentSection,
  contentSection: ContentSection,
  quickLinks: QuickLinksSection,
  quickLinksSection: QuickLinksSection,
  testimonials: TestimonialsSection,
  testimonialsSection: TestimonialsSection,
};

function normalizeComponentKey(componentKey) {
  if (!componentKey) return '';
  // componentKey might be like 'shared.generic-hero' or 'generic-hero' or 'genericHero'
  const raw = componentKey.includes('.') ? componentKey.split('.').pop() : componentKey;
  // convert kebab-case to camelCase
  return raw.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export default function DynamicPageRenderer({ sections = [], slug = '' }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        const componentKey = normalizeComponentKey(section.__component || section.type || section.component || section.name);
        const Component = componentMap[componentKey];

        if (Component) {
          return <Component key={`${slug}-${index}`} {...section} />;
        }

        // Fallback: try to render 'content' HTML or show JSON for debugging
        if (section.content || section.html) {
          return <ContentSection key={`${slug}-${index}`} content={section.content || section.html} />;
        }

        return (
          <div key={`${slug}-${index}`} className="prose max-w-none">
            <pre>{JSON.stringify(section, null, 2)}</pre>
          </div>
        );
      })}
    </>
  );
}
