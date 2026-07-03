import termsData from '@/data/terms-and-conditions.json';

export const metadata = {
  title: termsData.metadata.title,
  description: termsData.metadata.description,
};

export default function TermsAndConditionsLayout({ children }) {
  return children;
}

