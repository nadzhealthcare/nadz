import { getHeader } from '@/lib/strapi';
import { HeaderClient } from './HeaderClient';

// Server component wrapper for Header
export async function Header({ headerData: providedHeaderData }) {
  // If headerData is provided, use it; otherwise fetch from Strapi
  let headerData = providedHeaderData;
  
  if (!headerData) {
    try {
      headerData = await getHeader();
    } catch (error) {
      // Silently fail, HeaderClient will use fallbacks
      headerData = null;
    }
  }

  return <HeaderClient headerData={headerData} />;
}

// Keep default export for backward compatibility
export default Header;
