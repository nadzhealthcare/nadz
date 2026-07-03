import pages from '@/data/home-care-pages.json';

const pageData = pages.find((p) => p.slug === 'vision-mission');

export const metadata = pageData?.metadata || {
  title: 'Our Mission & Vision – NADZ Home Healthcare Dubai',
  description: 'At NADZ Home Healthcare, we don\'t just provide care — we redefine home healthcare in Dubai as a sanctuary of trust, healing, and grace.',
};

export default function VisionMissionLayout({ children }) {
  return children;
}


















