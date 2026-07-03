import { getFooter } from '@/lib/strapi';
import { FooterClient } from './FooterClient';

// Server component wrapper for Footer
export async function NewFooter({ footerData: providedFooterData }) {
  // If footerData is provided, use it; otherwise fetch from Strapi
  let footerData = providedFooterData;
  
  if (!footerData) {
    try {
      footerData = await getFooter();
    } catch (error) {
      // Silently fail, FooterClient will use fallbacks
      footerData = null;
    }
  }

  return <FooterClient footerData={footerData} />;
}

// Keep default export for backward compatibility
export default NewFooter;
