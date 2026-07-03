import contactData from '@/data/contact-us.json';

export const metadata = {
  title: contactData.metadata.title,
  description: contactData.metadata.description,
};

export default function ContactUsLayout({ children }) {
  return children;
}

