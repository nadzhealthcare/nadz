import pages from '@/data/home-care-pages.json';

const pageData = pages.find((p) => p.slug === 'who-we-are');

export const metadata = pageData?.metadata || {
  title: 'Who We Are – NADZ Home Healthcare Dubai',
  description: 'Co-Founded by Dr. Nadia Choudhry, NADZ embodies a mission where luxury blends seamlessly with clinical care. DHA certified doctors and nurses delivering gold standard healthcare at home.',
};

export default function WhoWeAreLayout({ children }) {
  return children;
}


