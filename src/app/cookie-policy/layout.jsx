import cookieData from '@/data/cookie-policy.json';

export const metadata = {
  title: cookieData.metadata.title,
  description: cookieData.metadata.description,
};

export default function CookiePolicyLayout({ children }) {
  return children;
}

