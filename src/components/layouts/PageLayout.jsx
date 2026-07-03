import { getHeader, getFooter } from "@/lib/strapi";
import { Header } from "@/components/sections/Header";
import { NewFooter } from "@/components/sections/NewFooter";

/**
 * Generic Page Layout Component (Server Component)
 * Wraps all pages with shared Header and Footer
 * Fetches header and footer data server-side
 * 
 * @param {React.ReactNode} children - Page content to render between Header and Footer
 */
export async function PageLayout({ children }) {
  // Fetch header and footer data server-side
  let headerData = null;
  let footerData = null;
  
  try {
    [headerData, footerData] = await Promise.all([
      getHeader(),
      getFooter(),
    ]);
  } catch (error) {
    // Silently fail, components will use fallbacks
  }

  return (
    <>
      <Header headerData={headerData} />
      {children}
      <NewFooter footerData={footerData} />
    </>
  );
}
