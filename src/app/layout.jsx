import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getGlobal } from "@/lib/strapi";

const GTM_ID = "GTM-54DGV4TM";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Use ISR (Incremental Static Regeneration) for better performance
// Layout is statically generated and revalidated every 600 seconds (10 minutes)
// Global settings don't change frequently, so longer revalidation improves performance
export const revalidate = 600;

// Default fallback values
const defaultSiteUrl = "https://nadzhealthcare.com";
const defaultBrandName = "NADZ Healthcare Dubai";
const defaultDescription = "Rooted in trust and discretion, our bespoke medical services are tailored to your lifestyle, focusing not only on treatment, but on the art of prevention. Home, Hotel & Office Care in Dubai.";

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings:', error);
  }

  const siteUrl = globalData?.siteUrl || defaultSiteUrl;
  const brandName = globalData?.siteName || defaultBrandName;
  const description = globalData?.defaultSeo?.description || globalData?.siteDescription || defaultDescription;
  const keywords = globalData?.defaultSeo?.keywords || [];
  const ogImage = globalData?.openGraph?.image?.url || '/images/hero-reference.png';
  const twitterHandle = globalData?.twitter?.handle || '@nadzhealthcare';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: brandName,
    },
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title: brandName,
      description,
      url: siteUrl,
      siteName: brandName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${brandName} - Home Healthcare Services`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandName,
      description,
      creator: twitterHandle,
    },
    robots: {
      index: globalData?.robots?.index !== false,
      follow: globalData?.robots?.follow !== false,
      googleBot: {
        index: globalData?.robots?.index !== false,
        follow: globalData?.robots?.follow !== false,
        "max-image-preview": "large",
      },
      noindex: globalData?.robots?.index === false,
      nofollow: globalData?.robots?.follow === false,
    },
    alternates: {
      canonical: siteUrl,
    },
    authors: [{ name: globalData?.organization?.name || "NADZ Healthcare" }],
    category: "Healthcare",
    icons: {
      icon: [
        { url: "/images/favicon.webp", type: "image/webp" },
        { url: "/images/favicon-150x150.webp", sizes: "150x150", type: "image/webp" },
      ],
      apple: [
        { url: "/images/favicon-150x150.webp", sizes: "150x150", type: "image/webp" },
      ],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4F052B", // This could also come from global settings
};

export default async function RootLayout({ children }) {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings:', error);
  }

  const siteUrl = globalData?.siteUrl || defaultSiteUrl;
  const brandName = globalData?.siteName || defaultBrandName;
  const organizationName = globalData?.organization?.name || "NADZ Healthcare";
  const organizationLogo = globalData?.organization?.logo || `${siteUrl}/logo.svg`;
  const organizationPhone = globalData?.organization?.phone || "+971-800-4-6239";
  const socialLinks = globalData?.organization?.socialLinks || { linkedin: "https://www.linkedin.com/company/nadzhealthcare" };

  // Build organization schema from global settings
  const schemaOrgConfig = globalData?.schemaOrg || {
    organization: {
      areaServed: 'AE',
      availableLanguage: ['en', 'ar'],
      contactType: 'customer support',
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organizationName,
    url: siteUrl,
    logo: organizationLogo,
    sameAs: Object.values(socialLinks),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: organizationPhone,
        contactType: schemaOrgConfig.organization?.contactType || "customer support",
        areaServed: schemaOrgConfig.organization?.areaServed || "AE",
        availableLanguage: schemaOrgConfig.organization?.availableLanguage || ["en", "ar"],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {/* Speed up CMS image loading (LCP) by opening the connection early */}
        <link rel="preconnect" href="https://admincms.nadzhealthcare.com" crossOrigin="anonymous" />
        {/* Google Tag Manager (noscript) — immediately after opening <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* GTM script: afterInteractive loads GTM after the page is interactive (doesn't block LCP/TBT) */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
