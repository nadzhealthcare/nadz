/**
 * Generate SEO metadata from Strapi content
 * @param {object} seoData - SEO data from Strapi
 * @param {object} defaults - Default metadata values
 * @returns {object} Next.js metadata object
 */
export const generateSeoMetadata = (seoData, defaults = {}) => {
  if (!seoData) {
    return defaults;
  }

  const metadata = {
    title: seoData.metaTitle || defaults.title || '',
    description: seoData.metaDescription || defaults.description || '',
    keywords: seoData.keywords || defaults.keywords || [],
  };

  // Open Graph metadata
  if (seoData.shareImage || defaults.openGraph?.images) {
    metadata.openGraph = {
      title: seoData.shareTitle || metadata.title,
      description: seoData.shareDescription || metadata.description,
      images: seoData.shareImage
        ? [
            {
              url: seoData.shareImage.url || seoData.shareImage,
              width: seoData.shareImage.width || 1200,
              height: seoData.shareImage.height || 630,
              alt: seoData.shareImage.alt || metadata.title,
            },
          ]
        : defaults.openGraph?.images || [],
      ...defaults.openGraph,
    };
  }

  // Twitter Card metadata
  if (seoData.shareImage || defaults.twitter) {
    metadata.twitter = {
      card: 'summary_large_image',
      title: seoData.shareTitle || metadata.title,
      description: seoData.shareDescription || metadata.description,
      images: seoData.shareImage
        ? [seoData.shareImage.url || seoData.shareImage]
        : defaults.twitter?.images || [],
      ...defaults.twitter,
    };
  }

  // Canonical URL (Strapi field is camelCase canonicalUrl; support legacy typo)
  const canon =
    seoData.canonicalUrl ||
    seoData.canonicalURL ||
    defaults.alternates?.canonical;
  if (canon) {
    metadata.alternates = {
      ...(defaults.alternates && typeof defaults.alternates === 'object' ? defaults.alternates : {}),
      canonical: canon,
    };
  }

  // Robots
  if (seoData.preventIndexing !== undefined) {
    metadata.robots = {
      index: !seoData.preventIndexing,
      follow: !seoData.preventIndexing,
    };
  }

  return metadata;
};

/**
 * Generate structured data (JSON-LD) from Strapi content
 * @param {object} structuredData - Structured data from Strapi
 * @param {string} type - Schema.org type (e.g., 'Article', 'WebPage', 'Organization')
 * @returns {object} JSON-LD object
 */
export const generateStructuredData = (structuredData, type = 'WebPage') => {
  if (!structuredData) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  if (structuredData.name) jsonLd.name = structuredData.name;
  if (structuredData.headline) jsonLd.headline = structuredData.headline;
  if (structuredData.description) jsonLd.description = structuredData.description;
  if (structuredData.image) jsonLd.image = structuredData.image;
  if (structuredData.datePublished) jsonLd.datePublished = structuredData.datePublished;
  if (structuredData.dateModified) jsonLd.dateModified = structuredData.dateModified;
  if (structuredData.author) jsonLd.author = structuredData.author;
  if (structuredData.publisher) jsonLd.publisher = structuredData.publisher;

  return jsonLd;
};
























