import privacyData from '@/data/privacy-policy.json';

export const metadata = {
  title: privacyData.metadata.title,
  description: privacyData.metadata.description,
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}

