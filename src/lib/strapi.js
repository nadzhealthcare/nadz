/**
 * Strapi API client utilities
 * Base URL comes only from env: NEXT_PUBLIC_STRAPI_URL or STRAPI_URL (server-only).
 * Read at request time so env is always current.
 */
function getStrapiBaseUrl() {
  // In production, require explicit URL - don't fallback to localhost
  const url = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;
  if (!url) {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:1337';
    }
    // In production, throw error if URL is not set
    throw new Error('STRAPI_URL or NEXT_PUBLIC_STRAPI_URL must be set in production');
  }
  // Trailing slash + paths like `/api/...` yields `//api` and Strapi returns 400 "Malicious Path"
  return String(url).replace(/\/+$/, '');
}

/**
 * Fetch data from Strapi API with caching
 */
export async function fetchStrapi(url, options = {}) {
  try {
    const baseUrl = getStrapiBaseUrl();
    // When cache is 'no-store', do not add next.revalidate so CMS updates can show
    const nextOption = options.cache === 'no-store' ? undefined : (options.next || { revalidate: 60 });
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...(nextOption !== undefined && { next: nextOption }),
    });

    if (!response.ok) {
      // Don't throw for 403/404 - might be permissions or content not found
      if (response.status === 403 || response.status === 404) {
        const error = new Error(`Strapi API error: ${response.status} ${response.statusText}`);
        error.status = response.status;
        throw error;
      }
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Handle connection errors gracefully
    if (error.message?.includes('fetch failed') || error.message?.includes('ECONNREFUSED')) {
      const connectionError = new Error('Strapi connection error');
      connectionError.isConnectionError = true;
      throw connectionError;
    }
    throw error;
  }
}

/**
 * Generic function to fetch Strapi collection data
 * @param {string} endpoint - API endpoint (e.g., 'services', 'articles')
 * @param {object} options - Query options
 * @returns {Promise<object>} Response data
 */
export async function fetchStrapiData(endpoint, options = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add publication state
    if (options.publicationState !== false) {
      queryParams.append('publicationState', options.publicationState || 'live');
    }
    
    // Add populate
    if (options.populate) {
      queryParams.append('populate', options.populate);
    } else {
      queryParams.append('populate', '*');
    }
    
    // Add filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}]`, value);
      });
    }
    
    // Add pagination
    if (options.pagination) {
      Object.entries(options.pagination).forEach(([key, value]) => {
        queryParams.append(`pagination[${key}]`, value);
      });
    }
    
    // Add sort
    if (options.sort) {
      queryParams.append('sort', options.sort);
    }
    
    const queryString = queryParams.toString();
    const url = `/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const data = await fetchStrapi(url);
    return data;
  } catch (error) {
    console.error(`Error fetching Strapi data from ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Generic function to fetch a single Strapi entry
 * @param {string} endpoint - API endpoint (e.g., 'services', 'articles')
 * @param {string|number} identifier - ID or slug
 * @param {object} options - Query options
 * @returns {Promise<object>} Entry data
 */
export async function fetchStrapiEntry(endpoint, identifier, options = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add publication state
    if (options.publicationState !== false) {
      queryParams.append('publicationState', options.publicationState || 'live');
    }
    
    // Add populate
    if (options.populate) {
      queryParams.append('populate', options.populate);
    } else {
      queryParams.append('populate', '*');
    }
    
    // Determine if identifier is ID or slug
    const isNumeric = /^\d+$/.test(String(identifier));
    let url;
    
    if (isNumeric) {
      // Use ID
      url = `/api/${endpoint}/${identifier}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    } else {
      // Use slug filter
      queryParams.append(`filters[slug][$eq]`, identifier);
      url = `/api/${endpoint}?${queryParams.toString()}`;
    }
    
    const data = await fetchStrapi(url);
    
    // If using slug filter, extract first entry
    if (!isNumeric && data.data && data.data.length > 0) {
      return {
        data: data.data[0],
        meta: data.meta,
      };
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching Strapi entry from ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Generic function to fetch Strapi single type
 * @param {string} endpoint - Single type endpoint (e.g., 'home-page', 'global')
 * @param {object} options - Query options
 * @returns {Promise<object>} Single type data
 */
export async function fetchStrapiSingleType(endpoint, options = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add publication state
    if (options.publicationState !== false) {
      queryParams.append('publicationState', options.publicationState || 'live');
    }
    
    // Add populate
    if (options.populate) {
      queryParams.append('populate', options.populate);
    } else {
      queryParams.append('populate', '*');
    }
    
    const queryString = queryParams.toString();
    const url = `/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    // Pass next options for caching
    const fetchOptions = options.next ? { next: options.next } : {};
    const data = await fetchStrapi(url, fetchOptions);
    return data;
  } catch (error) {
    // Suppress connection errors (expected when Strapi isn't running)
    if (error.isConnectionError || error.status === 403 || error.status === 404) {
      // Silently return null for connection/permission errors
      return { data: null };
    }
    console.error(`Error fetching Strapi single type ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch a home care page by slug
 */
export async function getHomeCarePage(slug) {
  try {
    // Deep-populate every component using object-style syntax.
    // IMPORTANT: Cannot mix populate=* with populate[x][populate]=* (Strapi 5 qs
    // parser turns populate into an object, dropping components not explicitly listed).
    // Using populate[x][populate]=* for each component ensures all sections + nested
    // repeatable components (benefits.benefits, faqs.items, pathway.steps, etc.) load.
    const deepPopulate = [
      'populate[hero][populate]=*',
      'populate[centeredText][populate]=*',
      'populate[centeredText2][populate]=*',
      'populate[skinBrightening][populate]=*',
      'populate[servicesIntro][populate]=*',
      'populate[locationServices][populate]=*',
      'populate[artOfHealing][populate]=*',
      'populate[visitIncludes][populate]=*',
      'populate[nursingCareServices][populate]=*',
      'populate[pathway][populate]=*',
      'populate[faqs][populate]=*',
      'populate[pocTesting][populate]=*',
      'populate[bloodTestSection][populate]=*',
      'populate[labServices][populate]=*',
      'populate[packages][populate]=*',
      'populate[vitalBrainPackages][populate]=*',
      'populate[whenToConsider][populate]=*',
      'populate[benefits][populate]=*',
      'populate[howItWorks][populate]=*',
      'populate[signatureDrips][populate]=*',
      'populate[ivDripTypes][populate]=*',
      'populate[vision][populate]=*',
      'populate[mission][populate]=*',
      'populate[whyMatters][populate]=*',
      'populate[ourStory][populate]=*',
      'populate[ourCommitment][populate]=*',
      'populate[ourPromise][populate]=*',
      'populate[whoWeServe][populate]=*',
      'populate[whyDifferent][populate]=*',
      'populate[closing][populate]=*',
    ].join('&');

    const data = await fetchStrapi(
      `/api/home-care-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&publicationState=live&${deepPopulate}`,
      { cache: 'no-store' }
    );
    
    if (!data.data || data.data.length === 0) {
      return null;
    }

    const page = data.data[0];
    return transformHomeCarePage(page);
  } catch (error) {
    console.error('Error fetching home care page:', error);
    return null;
  }
}

/**
 * Fetch all home care pages
 */
export async function getAllHomeCarePages() {
  try {
    const data = await fetchStrapi(
      `/api/home-care-pages?publicationState=live&populate=*`
    );
    
    return data.data.map(transformHomeCarePage);
  } catch (error) {
    console.error('Error fetching home care pages:', error);
    return [];
  }
}

/**
 * Fetch a wellness page by slug
 * Uses no-store so CMS updates (publish) reflect immediately on the website.
 */
export async function getWellnessPage(slug) {
  try {
    const data = await fetchStrapi(
      `/api/wellness-pages?filters[slug][$eq]=${slug}&publicationState=live&populate=*`,
      { cache: 'no-store' }
    );
    
    if (!data.data || data.data.length === 0) {
      return null;
    }

    const page = data.data[0];
    return transformWellnessPage(page);
  } catch (error) {
    console.error('Error fetching wellness page:', error);
    return null;
  }
}

/**
 * Fetch all wellness pages
 */
export async function getAllWellnessPages() {
  try {
    const data = await fetchStrapi(
      `/api/wellness-pages?publicationState=live&populate=*`
    );
    
    if (!data.data) {
      return [];
    }

    return data.data.map(transformWellnessPage);
  } catch (error) {
    console.error('Error fetching wellness pages:', error);
    return [];
  }
}

/**
 * Fallback: get page from local pages.json when Strapi is unavailable or returns 404/empty.
 */
function getPageFallback(slug) {
  try {
    const pagesData = require('@/data/pages.json');
    const page = Array.isArray(pagesData) ? pagesData.find((p) => p.slug === slug) : null;
    return page || null;
  } catch (e) {
    return null;
  }
}

/**
 * Fetch a generic page by slug. Uses NEXT_PUBLIC_STRAPI_URL or STRAPI_URL.
 * Falls back to src/data/pages.json when Strapi is unavailable or returns 404/empty.
 */
export async function getPage(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : null);
  
  try {
    const data = await fetchStrapi(
      `/api/pages?filters[slug][$eq]=${slug}&publicationState=live&populate=*`,
      { cache: 'no-store' }
    );

    if (!data.data || data.data.length === 0) {
      // Strapi returned empty result, try fallback
      return getPageFallback(slug);
    }

    const page = data.data[0];
    return transformGenericPage(page);
  } catch (error) {
    // 404 or connection error - try fallback
    if (error.status === 404) {
      // Page not found in Strapi, try fallback JSON
      return getPageFallback(slug);
    }
    // Connection error or other - still try fallback
    console.error(`Error fetching page from Strapi (${baseUrl}):`, error.message);
    return getPageFallback(slug);
  }
}

/**
 * Fetch all generic pages
 */
export async function getAllPages() {
  try {
    const data = await fetchStrapi(
      `/api/pages?publicationState=live&populate=*`
    );

    if (!data.data) {
      // Fallback to JSON file
      const pagesData = require('@/data/pages.json');
      return pagesData;
    }

    return data.data.map(transformGenericPage);
  } catch (error) {
    console.error('Error fetching pages:', error);
    // Fallback to JSON file when Strapi is unavailable
    try {
      const pagesData = require('@/data/pages.json');
      return pagesData;
    } catch (e) {
      return [];
    }
  }
}

/**
 * Transform generic page structure back to expected format
 */
function transformGenericPage(page) {
  const attributes = page.attributes || page || {};
  const cmsMeta =
    attributes.metadata &&
    typeof attributes.metadata === 'object' &&
    !Array.isArray(attributes.metadata)
      ? attributes.metadata
      : {};
  const fromJsonCanon = cmsMeta.canonicalUrl ?? cmsMeta?.alternates?.canonical;
  const explicitCanon =
    attributes.seoCanonicalUrl || attributes.canonicalUrl || fromJsonCanon || undefined;

  // If pageData exists (old JSON structure), use it directly
  if (attributes.pageData) {
    return {
      ...attributes.pageData,
      metadata: {
        ...cmsMeta,
        ...attributes.pageData.metadata,
        title:
          attributes.seoTitle ||
          attributes.pageData.metadata?.title ||
          cmsMeta.title ||
          '',
        description:
          attributes.seoDescription ||
          attributes.pageData.metadata?.description ||
          cmsMeta.description ||
          '',
        keywords:
          attributes.seoKeywords ||
          attributes.pageData.metadata?.keywords ||
          cmsMeta.keywords ||
          [],
        canonicalUrl: explicitCanon || attributes.pageData.metadata?.canonicalUrl,
      },
    };
  }

  return {
    slug: attributes.slug || attributes.uid || '',
    title: attributes.title || attributes.seoTitle || '',
    metadata: {
      ...cmsMeta,
      title: attributes.seoTitle || cmsMeta.title || attributes.title || '',
      description: attributes.seoDescription || cmsMeta.description || attributes.description || '',
      keywords: attributes.seoKeywords || cmsMeta.keywords || [],
      canonicalUrl: explicitCanon,
    },
    sections: attributes.sections || attributes.pageSections || [],
  };
}

/**
 * Transform component structure back to expected format
 */
function transformComponents(attributes) {
  const hero = attributes.hero || {};
  const trustedProviders = attributes.trustedProviders || {};
  const mainGoal = attributes.mainGoal || {};
  const howItWorks = attributes.howItWorks || {};
  const keyVision = attributes.keyVision || {};
  const partners = attributes.partners || {};
  const associates = attributes.associates || {};
  const googleReviews = attributes.googleReviews || {};
  const expertDoctors = attributes.expertDoctors || {};
  const premiumCta = attributes.premiumCta || {};
  const servicesSection = attributes.servicesSection || {};

  // Extract hero image with alt text
  const heroImage = hero.image ? getStrapiImageWithAlt(hero.image) : { url: null, alt: '' };
  // Carousel images for home hero (multiple). Each item: { url, alt }
  const rawCarousel = hero.carouselImages;
  const carouselImages = Array.isArray(rawCarousel)
    ? rawCarousel
        .filter(Boolean)
        .map((img) => {
          const { url, alt } = getStrapiImageWithAlt(img);
          return url ? { url, alt: alt || '' } : null;
        })
        .filter(Boolean)
    : [];

  return {
    hero: {
      title: hero.title || '',
      description: hero.description || '',
      reassuranceText: hero.reassuranceText || '',
      image: heroImage.url,
      imageAlt: heroImage.alt || '',
      carouselImages: carouselImages.length > 0 ? carouselImages : undefined,
      whatsappButton: {
        text: hero.whatsappButtonText || '',
        url: hero.whatsappButtonUrl || '',
      },
      callButton: {
        text: hero.callButtonText || '',
        phone: hero.callButtonPhone || '',
      },
      serviceChips: (hero.serviceChips || []).map((chip, index) => ({
        id: index + 1,
        name: chip.name || '',
        icon: chip.icon || 'MdHome',
        color: chip.color || '#4F052B',
        position: {
          ...(chip.positionTop && { top: chip.positionTop }),
          ...(chip.positionBottom && { bottom: chip.positionBottom }),
          ...(chip.positionLeft && { left: chip.positionLeft }),
          ...(chip.positionRight && { right: chip.positionRight }),
        },
      })),
    },
    trustedProviders: {
      title: trustedProviders.title || '',
      description: trustedProviders.description || '',
      ctaText: trustedProviders.ctaText || '',
      statistics: trustedProviders.statistics || [],
      card1: {
        title: trustedProviders.card1Title || '',
        description: trustedProviders.card1Description || '',
        image: trustedProviders.card1Image ? getStrapiImageWithAlt(trustedProviders.card1Image).url : null,
        imageAlt: trustedProviders.card1Image ? getStrapiImageWithAlt(trustedProviders.card1Image).alt : '',
      },
      card2: {
        title: trustedProviders.card2Title || '',
        description: trustedProviders.card2Description || '',
        image: trustedProviders.card2Image ? getStrapiImageWithAlt(trustedProviders.card2Image).url : null,
        imageAlt: trustedProviders.card2Image ? getStrapiImageWithAlt(trustedProviders.card2Image).alt : '',
      },
      card2Doctors: (trustedProviders.card2Doctors || []).map(doctor => ({
        name: doctor.name || '',
        color: doctor.color || '#10B981',
        image: doctor.image?.url
          ? ensureHttps(doctor.image.url.startsWith('http') ? doctor.image.url : `${getStrapiBaseUrl()}${doctor.image.url}`)
          : doctor.image?.data?.attributes?.url
          ? getStrapiImageUrl(doctor.image)
          : doctor.image || null,
      })),
    },
    mainGoal: {
      title: mainGoal.title || '',
      description: mainGoal.description || '',
      goalsLeft: mainGoal.goalsLeft || [],
      goalsRight: mainGoal.goalsRight || [],
      image: mainGoal.image ? getStrapiImageWithAlt(mainGoal.image).url : null,
      imageAlt: mainGoal.image ? getStrapiImageWithAlt(mainGoal.image).alt : '',
    },
    howItWorks: {
      title: howItWorks.title || '',
      ctaText: howItWorks.ctaText || '',
      ctaSubtext: howItWorks.ctaSubtext || '',
      steps: (howItWorks.steps || []).map((step, index) => {
        const stepImage = step.image ? getStrapiImageWithAlt(step.image) : { url: null, alt: '' };
        return {
          id: index + 1,
          number: step.number || '',
          title: step.title || '',
          description: step.description || '',
          icon: step.icon || '',
          image: stepImage.url,
          imageAlt: stepImage.alt || `${step.title} - Step ${step.number}`,
          bgGradient: step.bgGradient || '',
        };
      }),
    },
    keyVision: {
      title: keyVision.title || '',
      description: keyVision.description || '',
      items: (keyVision.items || []).map((item, index) => ({
        id: index + 1,
        title: item.title || '',
        description: item.description || '',
        icon: item.icon || '',
      })),
    },
    partners: {
      title: partners.title || 'Our Partners',
      partners: (partners.partners || []).map((partner, index) => {
        const logoFromMedia = partner.logo ? getStrapiImageWithAlt(partner.logo).url : null;
        return {
          id: index + 1,
          name: partner.name || '',
          logo: logoFromMedia || partner.logoUrl || '',
          url: partner.url || '',
        };
      }),
    },
    associates: {
      showSection: associates.showSection !== false,
      title: associates.title || 'Our Associations',
      associates: (() => {
        // Strapi 4: { title, associates: [...] }; Strapi 5: repeatable can be array or under .associates / .data
        const rawList = Array.isArray(associates)
          ? associates
          : (associates?.associates ?? associates?.data ?? []);
        return (rawList || []).map((item, index) => {
          const attrs = item?.attributes ?? item;
          const img = (attrs?.image ?? item?.image) ? getStrapiImageWithAlt(attrs?.image ?? item?.image) : { url: null, alt: '' };
          return {
            id: index + 1,
            name: attrs?.name ?? item?.name ?? '',
            description: attrs?.description ?? item?.description ?? '',
            image: img.url || '',
            imageAlt: img.alt || attrs?.name || item?.name || '',
          };
        });
      })(),
    },
    googleReviews: {
      title: googleReviews.title || 'What Our Patients Say',
      subtitle: googleReviews.subtitle || 'Google Reviews',
      reviews: (googleReviews.reviews || []).map((review, index) => ({
        id: index + 1,
        author: review.author || '',
        rating: review.rating ?? 5,
        text: review.text || '',
        date: review.date || '',
      })),
    },
    expertDoctors: {
      title: expertDoctors.title || '',
      subtitle: expertDoctors.subtitle || '',
      doctors: (expertDoctors.doctors || []).map(doctor => {
        const doctorImage = doctor.image ? getStrapiImageWithAlt(doctor.image) : { url: null, alt: '' };
        return {
          name: doctor.name || '',
          role: doctor.role || '',
          languages: doctor.languages || '',
          yearsOfExperience: doctor.yearsOfExperience || '',
          image: doctorImage.url,
          imageAlt: doctorImage.alt || doctor.name || '',
          featured: doctor.featured || false,
        };
      }),
    },
    premiumCta: {
      backgroundImage: premiumCta.backgroundImage ? getStrapiImageWithAlt(premiumCta.backgroundImage).url : null,
      title: premiumCta.title || '',
      description: premiumCta.description || '',
      whatsappButton: {
        text: premiumCta.whatsappButtonText || '',
        url: premiumCta.whatsappButtonUrl || '',
      },
      callButton: {
        text: premiumCta.callButtonText || '',
        phone: premiumCta.callButtonPhone || '',
      },
    },
    servicesSection: {
      title: servicesSection.title || 'Services We Provide',
      ctaText: servicesSection.ctaText || 'View All Services',
      ctaUrl: servicesSection.ctaUrl || '/services',
      services: (servicesSection.services || []).map((service, index) => ({
        id: index + 1,
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || 'LocalHospital',
      })),
    },
  };
}

/**
 * Fetch home page from Strapi.
 * Supports both Strapi 4 (doc.attributes) and Strapi 5 (flat doc) response shapes.
 * Uses cache: 'no-store' so home page always gets fresh data when combined with dynamic route.
 */
export async function getHomePage() {
  try {
    const baseUrl = getStrapiBaseUrl();
    const url = `${baseUrl}/api/home-page`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      next: undefined,
    });
    if (!response.ok) {
      if (response.status === 404 || response.status === 403) return null;
      throw new Error(`Strapi home-page: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const raw = data?.data;
    if (raw == null) return null;
    const doc = Array.isArray(raw) ? raw[0] : raw;
    if (!doc || typeof doc !== 'object') return null;
    // Strapi 4: doc.attributes; Strapi 5: flat doc (hero, trustedProviders, ... at top level)
    const attributes = doc.attributes ?? doc;
    if (!attributes || typeof attributes !== 'object') return null;
    let sections;
    try {
      sections = transformComponents(attributes);
    } catch (transformErr) {
      console.error('Error transforming home page components:', transformErr);
      return null;
    }
    return {
      ...sections,
      metadata: {
        title: attributes.seoTitle || '',
        description: attributes.seoDescription || '',
        keywords: Array.isArray(attributes.seoKeywords) ? attributes.seoKeywords : [],
        canonicalUrl: attributes.seoCanonicalUrl || '',
      },
    };
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}

/**
 * Fetch Global Settings
 */
export async function getGlobal() {
  try {
    // Global settings don't change frequently, cache for 10 minutes
    const data = await fetchStrapiSingleType('global', { next: { revalidate: 600 } });
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    // Transform to expected format
    return {
      siteName: attributes.siteName || 'NADZ Healthcare Dubai',
      siteUrl: attributes.siteUrl || 'https://nadzhealthcare.com',
      /** Optional homepage canonical URL from CMS (full URL or path); defaults computed in layouts */
      canonicalUrl: attributes.canonicalUrl?.trim?.() ? attributes.canonicalUrl.trim() : attributes.canonicalUrl || null,
      siteDescription: attributes.siteDescription || '',
      defaultSeo: {
        title: attributes.defaultSeoTitle || attributes.siteName || 'NADZ Healthcare Dubai',
        description: attributes.defaultSeoDescription || attributes.siteDescription || '',
        keywords: Array.isArray(attributes.defaultSeoKeywords) ? attributes.defaultSeoKeywords : [],
      },
      openGraph: {
        image: attributes.openGraphImage 
          ? getStrapiImageWithAlt(attributes.openGraphImage)
          : {
              url: '/images/hero-reference.png',
              alt: `${attributes.siteName || 'NADZ Healthcare Dubai'} - Home Healthcare Services`
            },
      },
      twitter: {
        handle: attributes.twitterHandle || '@nadzhealthcare',
      },
      organization: {
        name: attributes.organizationName || 'NADZ Healthcare',
        logo: attributes.organizationLogo || `${attributes.siteUrl || 'https://nadzhealthcare.com'}/logo.svg`,
        phone: attributes.organizationPhone || '+971-800-4-6239',
        email: attributes.organizationEmail || 'info@nadzhealthcare.com',
        socialLinks: attributes.socialLinks || {
          linkedin: 'https://www.linkedin.com/company/nadzhealthcare',
        },
      },
      themeColor: attributes.themeColor || '#4F052B',
      robots: attributes.robotsConfig || {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/admin/'],
        sitemap: 'https://nadzhealthcare.com/sitemap.xml',
      },
      schemaOrg: attributes.schemaOrgConfig || {
        organization: {
          areaServed: 'AE',
          availableLanguage: ['en', 'ar'],
          contactType: 'customer support',
        },
      },
      sitemap: attributes.sitemapConfig || {
        defaultPriority: '0.8',
        defaultChangefreq: 'monthly',
      },
      blogPagePillText: attributes.blogPagePillText || '',
      allBlogsPagePillText: attributes.allBlogsPagePillText || '',
      awardsPagePillText: attributes.awardsPagePillText || '',
      bookDoctorServices: Array.isArray(attributes.bookDoctorServices) && attributes.bookDoctorServices.length > 0
        ? attributes.bookDoctorServices.filter((s) => typeof s === 'string' && s.trim())
        : null,
    };
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}

/**
 * Fetch Book Doctor form service options from Strapi Global.
 * Uses no-store so CMS changes show immediately when visiting the page.
 * Supports both Strapi v4 (data.attributes) and v5 (flattened data) response shape.
 * @returns {Promise<string[]|null>} Array of service labels or null to use defaults
 */
export async function getBookDoctorServiceOptions() {
  try {
    // Ask Strapi v5 for v4-style response (data.attributes) so parsing is consistent
    const data = await fetchStrapi('/api/global', {
      cache: 'no-store',
      headers: { 'Strapi-Response-Format': 'v4' },
    });
    if (!data?.data) return null;

    // Strapi v5 (with v4 header) or v4: attributes may be nested or flat
    const doc = data.data;
    const attributes = doc.attributes ?? doc;
    let raw = attributes.bookDoctorServices;

    if (raw == null) return null;
    if (typeof raw === 'string') {
      try {
        raw = JSON.parse(raw);
      } catch {
        return null;
      }
    }
    if (!Array.isArray(raw) || raw.length === 0) return null;

    const list = raw.filter((s) => typeof s === 'string' && s.trim());
    return list.length > 0 ? list : null;
  } catch (error) {
    console.error('Error fetching book doctor service options:', error);
    return null;
  }
}

/**
 * Fetch Contact Us page
 */
export async function getContactUs() {
  try {
    const data = await fetchStrapiSingleType('contact-us');
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    // Transform component structure to expected format
    return {
      hero: {
        title: attributes.hero?.title || '',
        subtitle: attributes.hero?.subtitle || '',
      },
      contactInfo: {
        phone: {
          label: attributes.contactInfo?.phone?.label || '',
          value: attributes.contactInfo?.phone?.value || '',
          href: attributes.contactInfo?.phone?.href || '',
        },
        email: {
          label: attributes.contactInfo?.email?.label || '',
          value: attributes.contactInfo?.email?.value || '',
          href: attributes.contactInfo?.email?.href || '',
        },
        address: {
          label: attributes.contactInfo?.address?.label || '',
          value: attributes.contactInfo?.address?.value || '',
        },
        officeHours: {
          label: attributes.contactInfo?.officeHours?.label || '',
          value: attributes.contactInfo?.officeHours?.value || '',
        },
        map: {
          embedUrl: attributes.contactInfo?.map?.embedUrl || '',
          link: attributes.contactInfo?.map?.link || '',
        },
      },
      showContactForm: attributes.showContactForm !== false,
      leadForm: attributes.leadForm
        ? {
            enabled: attributes.leadForm.enabled !== false,
            title: attributes.leadForm.title || '',
            fallbackMessage: attributes.leadForm.fallbackMessage || '',
            embedScript: attributes.leadForm.embedScript || '',
          }
        : null,
      metadata: {
        title: attributes.seoTitle || '',
        description: attributes.seoDescription || '',
        keywords: attributes.seoKeywords || [],
        canonicalUrl: attributes.seoCanonicalUrl || '',
      },
    };
  } catch (error) {
    console.error('Error fetching contact us page:', error);
    return null;
  }
}

/**
 * Fetch FAQ page
 */
export async function getFAQ() {
  try {
    const data = await fetchStrapiSingleType('faq');
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    // Normalize categories so each has questions as array of { q, a }
    const rawCategories = attributes.categories || [];
    const categories = rawCategories.map((cat, idx) => {
      const rawQuestions = cat.questions || cat.items || [];
      const questions = Array.isArray(rawQuestions)
        ? rawQuestions.map((item) => ({
            q: item.q ?? item.question ?? '',
            a: item.a ?? item.answer ?? '',
          }))
        : [];
      return {
        categoryId: cat.categoryId ?? cat.id ?? idx + 1,
        id: cat.id ?? idx + 1,
        title: cat.title ?? '',
        questions,
      };
    });

    return {
      hero: {
        title: attributes.hero?.title || '',
        subtitle: attributes.hero?.description || '',
      },
      categories,
      contactSection: {
        title: attributes.contactSection?.title || '',
        description: attributes.contactSection?.description || '',
        ctaText: attributes.contactSection?.ctaText || '',
      },
      metadata: {
        title: attributes.seoTitle || '',
        description: attributes.seoDescription || '',
        keywords: attributes.seoKeywords || [],
        canonicalUrl: attributes.seoCanonicalUrl || '',
      },
    };
  } catch (error) {
    console.error('Error fetching FAQ page from Strapi:', error);
    return null;
  }
}

/**
 * Normalize Strapi 4 ({ attributes }) vs Strapi 5 (flat document) single-type payload.
 */
function unwrapStrapiSingleEntry(payload) {
  if (payload?.error && payload?.data == null) return null;
  const root = payload?.data;
  if (root == null) return null;
  if (typeof root === 'object' && root.attributes != null && typeof root.attributes === 'object') {
    return { ...root.attributes, id: root.id, documentId: root.documentId };
  }
  return root;
}

function unwrapStrapiComponentEntry(entry, idx) {
  if (entry == null || typeof entry !== 'object') return null;
  if (entry.attributes != null && typeof entry.attributes === 'object') {
    return {
      ...entry.attributes,
      id: entry.id ?? entry.documentId ?? idx,
      documentId: entry.documentId,
    };
  }
  return { ...entry, id: entry.id ?? entry.documentId ?? idx };
}

/**
 * Fetch Awards & Achievements page (single type).
 * Strapi 5 uses `status=published` (not `publicationState=live`). Nested components need explicit populate.
 */
export async function getAwardsAchievement() {
  const queryVariants = [
    // Strapi 5: published + nested component + media (see https://docs.strapi.io/dev-docs/api/rest/parameters#status)
    '/api/awards-achievement?status=published&populate[items][populate]=*',
    '/api/awards-achievement?status=published&populate=*',
    '/api/awards-achievement?publicationState=live&populate[items][populate]=*',
    '/api/awards-achievement?populate[items][populate]=*',
  ];

  const opts = {
    cache: 'no-store',
    ...(process.env.STRAPI_API_TOKEN && {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }),
  };

  function mapDocToResult(doc) {
    const rawItems = doc.items;
    const items = Array.isArray(rawItems)
      ? rawItems.map((item, idx) => {
          const row = unwrapStrapiComponentEntry(item, idx) || {};
          const img = row.image;
          const image = img ? getStrapiImageWithAlt(img) : { url: null, alt: '' };
          return {
            id: row.id ?? idx,
            title: row.title ?? '',
            body: row.body ?? '',
            image,
          };
        })
      : [];

    const rawSlug =
      typeof doc.slug === 'string' && doc.slug.trim()
        ? doc.slug.trim().replace(/^\/+|\/+$/g, '')
        : 'awards-achievement';

    return {
      slug: rawSlug,
      pillText: doc.pillText || doc.pill_text || '',
      pageTitle: doc.pageTitle || 'Awards & Achievements',
      pageSubtitle: doc.pageSubtitle || '',
      items,
      metadata: {
        title: doc.seoTitle || '',
        description: doc.seoDescription || '',
        keywords: Array.isArray(doc.seoKeywords) ? doc.seoKeywords : [],
      },
    };
  }

  let fallbackResult = null;

  for (const path of queryVariants) {
    try {
      const data = await fetchStrapi(path, opts);
      const doc = unwrapStrapiSingleEntry(data);
      if (!doc) continue;

      const result = mapDocToResult(doc);
      if (result.items.length > 0) {
        return result;
      }
      if (!fallbackResult) {
        fallbackResult = result;
      }
    } catch (error) {
      // try next query variant (populate / status differences)
    }
  }

  if (fallbackResult) {
    return fallbackResult;
  }

  console.error('Error fetching Awards & Achievements page from Strapi: all query variants failed');
  return null;
}

/**
 * Fetch all published press releases (collection type).
 */
export async function getPressReleases(options = {}) {
  const baseUrl = getStrapiBaseUrl();
  try {
    const params = new URLSearchParams();
    params.append('publicationState', 'live');
    params.append('populate', '*');
    params.append('pagination[pageSize]', String(options.limit || 20));
    params.append('sort', options.sort || 'updatedAt:desc');
    const url = `${baseUrl}/api/press-releases?${params.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      next: undefined,
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 404) return [];
      throw new Error(`Press Releases API ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    if (list.length === 0) return [];
    return list.map((entry) => {
      try {
        return transformPressRelease(entry);
      } catch (e) {
        console.warn('[getPressReleases] transform error:', e?.message);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error('[getPressReleases] error=%s', error?.message || error);
    return [];
  }
}

/**
 * Fetch a single press release by slug.
 */
export async function getPressRelease(slug) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('publicationState', 'live');
    queryParams.append('populate[0]', 'content');
    queryParams.append('populate[1]', 'content.sections');
    queryParams.append('populate[2]', 'image');
    queryParams.append('filters[slug][$eq]', String(slug));
    const data = await fetchStrapi(`/api/press-releases?${queryParams.toString()}`, { cache: 'no-store' });
    const list = data?.data ?? data ?? [];
    const entry = Array.isArray(list) ? list[0] : list;
    if (!entry) return null;
    const post = transformPressRelease(entry);
    if (post) post.id = String(slug);
    return post;
  } catch (error) {
    console.error('Error fetching press release:', error);
    return null;
  }
}

function transformPressRelease(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const attrs = entry.attributes || entry;
  const id = attrs.slug ?? entry.documentId ?? entry.id ?? attrs.id;
  const imageObj = attrs.image?.data ? attrs.image : attrs.image;
  const imageUrl = imageObj ? getStrapiImageUrl(imageObj) : null;
  return {
    id: id != null ? String(id) : null,
    title: attrs.title || '',
    seoTitle: attrs.seoTitle || null,
    seoDescription: attrs.seoDescription || null,
    seoKeywords: Array.isArray(attrs.seoKeywords) ? attrs.seoKeywords : [],
    excerpt: attrs.excerpt || null,
    image: imageUrl || null,
    featured: Boolean(attrs.featured),
    source: attrs.source || null,
    sourceUrl: attrs.sourceUrl || null,
    date: attrs.date || null,
    time: attrs.time || null,
    readTime: attrs.readTime || null,
    category: attrs.category || null,
    publishedAt: attrs.publishedAt || null,
    updatedAt: attrs.updatedAt || null,
    content: normalizeArticleContent(attrs.content),
    tags: Array.isArray(attrs.tags) ? attrs.tags : [],
  };
}

/**
 * Fetch Interviews & Podcast page (single type).
 */
export async function getInterviewsPodcast() {
  const queryVariants = [
    '/api/interview-podcast?status=published&populate[items][populate]=*',
    '/api/interview-podcast?status=published&populate=*',
    '/api/interview-podcast?publicationState=live&populate[items][populate]=*',
    '/api/interview-podcast?populate[items][populate]=*',
  ];

  const opts = {
    cache: 'no-store',
    ...(process.env.STRAPI_API_TOKEN && {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    }),
  };

  function mapDocToResult(doc) {
    const rawItems = doc.items;
    const items = Array.isArray(rawItems)
      ? rawItems.map((item, idx) => {
          const row = unwrapStrapiComponentEntry(item, idx) || {};
          return {
            id: row.id ?? idx,
            title: row.title ?? '',
            body: row.body ?? '',
            youtubeUrl: row.youtubeUrl ?? '',
          };
        })
      : [];

    const rawSlug =
      typeof doc.slug === 'string' && doc.slug.trim()
        ? doc.slug.trim().replace(/^\/+|\/+$/g, '')
        : 'interviews-and-podcast';

    return {
      slug: rawSlug,
      pillText: doc.pillText || doc.pill_text || '',
      pageTitle: doc.pageTitle || 'Interviews & Podcast',
      pageSubtitle: doc.pageSubtitle || '',
      items,
      metadata: {
        title: doc.seoTitle || '',
        description: doc.seoDescription || '',
        keywords: Array.isArray(doc.seoKeywords) ? doc.seoKeywords : [],
      },
    };
  }

  let fallbackResult = null;

  for (const path of queryVariants) {
    try {
      const data = await fetchStrapi(path, opts);
      const doc = unwrapStrapiSingleEntry(data);
      if (!doc) continue;

      const result = mapDocToResult(doc);
      if (result.items.length > 0) {
        return result;
      }
      if (!fallbackResult) {
        fallbackResult = result;
      }
    } catch (error) {
      // try next query variant
    }
  }

  if (fallbackResult) {
    return fallbackResult;
  }

  console.error('Error fetching Interviews & Podcast page from Strapi: all query variants failed');
  return null;
}

/**
 * Fetch Privacy Policy page
 */
export async function getPrivacyPolicy() {
  try {
    const data = await fetchStrapiSingleType('privacy-policy');
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    return {
      hero: {
        title: attributes.hero?.title || '',
        subtitle: attributes.hero?.description || '',
      },
      effectiveDate: attributes.effectiveDate || null,
      sections: attributes.sections || [],
      questionsSection: attributes.questionsSection || null,
      metadata: {
        title: attributes.seoTitle || '',
        description: attributes.seoDescription || '',
        keywords: attributes.seoKeywords || [],
        canonicalUrl: attributes.seoCanonicalUrl || '',
      },
    };
  } catch (error) {
    console.error('Error fetching privacy policy page:', error);
    return null;
  }
}

/**
 * Fetch Terms and Conditions page
 */
export async function getTermsAndConditions() {
  try {
    const data = await fetchStrapiSingleType('terms-and-conditions');
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    return {
      hero: {
        title: attributes.hero?.title || '',
        subtitle: attributes.hero?.description || '',
      },
      sections: attributes.sections || [],
      questionsSection: attributes.questionsSection || null,
      metadata: {
        title: attributes.seoTitle || '',
        description: attributes.seoDescription || '',
        keywords: attributes.seoKeywords || [],
        canonicalUrl: attributes.seoCanonicalUrl || '',
      },
    };
  } catch (error) {
    console.error('Error fetching terms and conditions page:', error);
    return null;
  }
}

/**
 * Fetch Cookie Policy page
 */
export async function getCookiePolicy() {
  try {
    const data = await fetchStrapiSingleType('cookie-policy');
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    return {
      hero: {
        title: attributes.hero?.title || '',
        subtitle: attributes.hero?.description || '',
      },
      effectiveDate: attributes.effectiveDate || null,
      sections: attributes.sections || [],
      questionsSection: attributes.questionsSection || null,
      metadata: {
        title: attributes.seoTitle || '',
        description: attributes.seoDescription || '',
        keywords: attributes.seoKeywords || [],
        canonicalUrl: attributes.seoCanonicalUrl || '',
      },
    };
  } catch (error) {
    console.error('Error fetching cookie policy page:', error);
    return null;
  }
}

/**
 * Transform Strapi article to frontend blog post shape
 * Handles Strapi 4 (entry.attributes) and Strapi 5 (flattened entry).
 */
function transformArticle(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const attrs = entry.attributes || entry;
  const id = attrs.slug ?? entry.documentId ?? entry.id ?? attrs.id;
  const imageObj = attrs.image?.data ? attrs.image : attrs.image;
  const imageUrl = imageObj ? getStrapiImageUrl(imageObj) : null;
  const avatarObj = attrs.authorAvatar?.data ? attrs.authorAvatar : attrs.authorAvatar;
  const avatarUrl = avatarObj ? getStrapiImageUrl(avatarObj) : null;
  return {
    id: id != null ? String(id) : (attrs.title || '').slice(0, 50) || null,
    title: attrs.title || '',
    seoTitle: attrs.seoTitle || null,
    seoDescription: attrs.seoDescription || null,
    seoKeywords: Array.isArray(attrs.seoKeywords) ? attrs.seoKeywords : (attrs.seoKeywords ? [attrs.seoKeywords] : null),
    seoCanonicalUrl: attrs.seoCanonicalUrl || null,
    author: {
      name: attrs.authorName || 'NADZ Team',
      avatar: avatarUrl || '/images/doctor.png',
    },
    date: attrs.date || null,
    fullDate: attrs.fullDate || null,
    publishedAt: attrs.publishedAt || null,
    updatedAt: attrs.updatedAt || null,
    readTime: attrs.readTime || null,
    category: attrs.category || null,
    categorySlug: attrs.categorySlug || null,
    categoryColor: attrs.categoryColor || null,
    excerpt: attrs.excerpt || null,
    image: imageUrl || null,
    featured: Boolean(attrs.featured),
    content: normalizeArticleContent(attrs.content),
    faqs: Array.isArray(attrs.faqs) ? attrs.faqs : [],
    tags: Array.isArray(attrs.tags) ? attrs.tags : (attrs.tags ? [attrs.tags] : []),
  };
}

/**
 * Normalize article content from Strapi (component or legacy JSON) to { intro, sections }.
 * Handles: component (intro + sections array), legacy JSON, Strapi 4/5 attributes wrapper,
 * and Strapi 5 content wrapped in .data. intro and section.content can be string or blocks array.
 */
function normalizeArticleContent(raw) {
  if (!raw || typeof raw !== 'object') return { intro: '', sections: [] };
  // Strapi 5 sometimes wraps component in .data; Strapi 4 uses .attributes
  const unwrapped = raw?.data ?? raw?.attributes ?? raw;
  if (!unwrapped || typeof unwrapped !== 'object') return { intro: '', sections: [] };
  const data = unwrapped.attributes ?? unwrapped;
  const intro = data.intro ?? '';
  const rawSections = Array.isArray(data.sections) ? data.sections : [];
  const sections = rawSections.map((s) => {
    const item = s?.attributes ?? s?.data ?? s;
    return {
      heading: item?.heading ?? '',
      content: item?.content ?? '',
      quote: item?.quote ?? '',
    };
  });
  return { intro, sections };
}

/**
 * Fetch all published articles (blog posts)
 * Uses direct fetch with no-store so latest from Strapi always shows; handles Strapi 4/5 response shapes.
 */
export async function getArticles(options = {}) {
  const baseUrl = getStrapiBaseUrl();
  try {
    const params = new URLSearchParams();
    params.append('publicationState', 'live');
    params.append('pagination[pageSize]', String(options.limit || 10));
    params.append('sort', options.sort || 'updatedAt:desc');
    const url = `${baseUrl}/api/articles?${params.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      next: undefined,
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 404) return [];
      throw new Error(`Articles API ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    if (list.length === 0) return [];
    const posts = list.map((entry) => {
      try {
        return transformArticle(entry);
      } catch (e) {
        console.warn('[getArticles] transformArticle error for entry:', e?.message);
        return null;
      }
    }).filter(Boolean);
    return posts;
  } catch (error) {
    console.error('[getArticles] baseUrl=%s error=%s', baseUrl, error?.message || error);
    return [];
  }
}

/**
 * Fetch a single article by slug or id (for URL /blog/1 or /blog/my-slug)
 */
export async function getArticle(idOrSlug) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('publicationState', 'live');
    queryParams.append('populate[0]', 'content');
    queryParams.append('populate[1]', 'content.sections');
    queryParams.append('populate[2]', 'image');
    queryParams.append('populate[3]', 'faqs');
    const filters = Number.isInteger(Number(idOrSlug)) && String(Number(idOrSlug)) === String(idOrSlug)
      ? { slug: String(idOrSlug) }
      : { slug: idOrSlug };
    queryParams.append('filters[slug][$eq]', filters.slug);
    const data = await fetchStrapi(`/api/articles?${queryParams.toString()}`, { cache: 'no-store' });
    const list = data?.data ?? data ?? [];
    const entry = Array.isArray(list) ? list[0] : list;
    if (!entry) return null;
    const post = transformArticle(entry);
    if (post) post.id = filters.slug;
    return post;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

/**
 * Normalize Strapi multiple media (gallery) to [{ url, alt }, ...]
 */
function normalizeStrapiMediaArray(field) {
  if (!field) return [];
  let list = [];
  if (Array.isArray(field)) list = field;
  else if (field.data !== undefined) {
    list = Array.isArray(field.data) ? field.data : field.data ? [field.data] : [];
  } else return [];
  return list
    .map((item) => getStrapiImageWithAlt(item))
    .filter((x) => x?.url);
}

function transformEvent(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const attrs = entry.attributes || entry;
  const id = attrs.slug ?? entry.documentId ?? entry.id ?? attrs.id;
  const gallery = normalizeStrapiMediaArray(attrs.gallery);
  const cover = attrs.coverImage ? getStrapiImageWithAlt(attrs.coverImage) : null;
  const cardImage = cover?.url || gallery[0]?.url || null;
  const cardAlt = cover?.alt || gallery[0]?.alt || attrs.title || '';
  return {
    id: id != null ? String(id) : null,
    title: attrs.title || '',
    seoTitle: attrs.seoTitle || null,
    seoDescription: attrs.seoDescription || null,
    seoKeywords: Array.isArray(attrs.seoKeywords) ? attrs.seoKeywords : [],
    excerpt: attrs.excerpt || null,
    image: cardImage,
    imageAlt: cardAlt,
    gallery,
    eventDate: attrs.eventDate || null,
    eventEndDate: attrs.eventEndDate || null,
    location: attrs.location || null,
    readTime: attrs.readTime || null,
    category: attrs.category || null,
    featured: Boolean(attrs.featured),
    publishedAt: attrs.publishedAt || null,
    updatedAt: attrs.updatedAt || null,
    content: normalizeArticleContent(attrs.content),
    tags: Array.isArray(attrs.tags) ? attrs.tags : [],
  };
}

/**
 * Fetch published events (listing)
 */
export async function getEvents(options = {}) {
  const baseUrl = getStrapiBaseUrl();
  try {
    const params = new URLSearchParams();
    params.append('publicationState', 'live');
    params.append('populate', '*');
    params.append('pagination[pageSize]', String(options.limit || 50));
    params.append('sort', options.sort || 'updatedAt:desc');
    const url = `${baseUrl}/api/events?${params.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      next: undefined,
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 404) return [];
      throw new Error(`Events API ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    if (list.length === 0) return [];
    return list
      .map((entry) => {
        try {
          return transformEvent(entry);
        } catch (e) {
          console.warn('[getEvents] transform error:', e?.message);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    console.error('[getEvents] error=%s', error?.message || error);
    return [];
  }
}

/**
 * Fetch single event by slug
 */
export async function getEvent(slug) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('publicationState', 'live');
    queryParams.append('populate', '*');
    queryParams.append('filters[slug][$eq]', String(slug));
    const data = await fetchStrapi(`/api/events?${queryParams.toString()}`, { cache: 'no-store' });
    const list = data?.data ?? data ?? [];
    const entry = Array.isArray(list) ? list[0] : list;
    if (!entry) return null;
    const ev = transformEvent(entry);
    if (ev) ev.id = String(slug);
    return ev;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

function transformTestimonial(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const attrs = entry.attributes || entry;
  const id = entry.documentId ?? entry.id ?? attrs.id ?? `${attrs.patientName}-${attrs.publishedAt}`;
  const photo = attrs.photo ? getStrapiImageWithAlt(attrs.photo) : { url: null, alt: '' };
  let rating = Number(attrs.rating);
  if (!Number.isFinite(rating) || rating < 1) rating = 5;
  if (rating > 5) rating = 5;
  return {
    id: id != null ? String(id) : Math.random().toString(36).slice(2),
    patientName: attrs.patientName || '',
    headline: attrs.headline || null,
    review: attrs.review || '',
    rating,
    photoUrl: photo?.url || null,
    photoAlt: photo?.alt || attrs.patientName || '',
    serviceLabel: attrs.serviceLabel || null,
    featured: Boolean(attrs.featured),
    sortOrder: Number.isFinite(Number(attrs.sortOrder)) ? Number(attrs.sortOrder) : 0,
    publishedAt: attrs.publishedAt || null,
    updatedAt: attrs.updatedAt || null,
  };
}

/**
 * Fetch published testimonials (patient reviews)
 */
export async function getTestimonials(options = {}) {
  const baseUrl = getStrapiBaseUrl();
  try {
    const params = new URLSearchParams();
    params.append('publicationState', 'live');
    params.append('populate', '*');
    params.append('pagination[pageSize]', String(options.limit || 100));
    params.append('sort', 'sortOrder:asc');
    const url = `${baseUrl}/api/testimonials?${params.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      next: undefined,
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 404) return [];
      throw new Error(`Testimonials API ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    if (list.length === 0) return [];
    const items = list
      .map((entry) => {
        try {
          return transformTestimonial(entry);
        } catch (e) {
          console.warn('[getTestimonials] transform error:', e?.message);
          return null;
        }
      })
      .filter(Boolean);
    items.sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return tb - ta;
    });
    return items;
  } catch (error) {
    console.error('[getTestimonials] error=%s', error?.message || error);
    return [];
  }
}

/**
 * Convert HTTP URLs to HTTPS to prevent mixed content warnings
 * @param {string} url - URL to convert
 * @returns {string} HTTPS URL
 */
function ensureHttps(url) {
  if (!url) return url;
  // Convert http:// to https:// for external URLs
  if (typeof url === 'string' && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
}

/**
 * Get Strapi image URL
 * @param {object} image - Strapi image object
 * @returns {string} Image URL (always HTTPS)
 */
export function getStrapiImageUrl(image) {
  if (!image) return null;
  
  let url = null;
  
  if (typeof image === 'string') {
    // Already a URL string
    url = image.startsWith('http') ? image : `${getStrapiBaseUrl()}${image}`;
  } else if (image.data) {
    // Nested structure: { data: { attributes: { url: '...' } } }
    const rawUrl = image.data.attributes?.url || image.data.url;
    url = rawUrl ? `${getStrapiBaseUrl()}${rawUrl}` : null;
  } else if (image.attributes) {
    // Direct structure: { attributes: { url: '...' } }
    const rawUrl = image.attributes.url;
    url = rawUrl ? `${getStrapiBaseUrl()}${rawUrl}` : null;
  } else if (image.url) {
    // Simple structure: { url: '...' }
    url = image.url.startsWith('http') ? image.url : `${getStrapiBaseUrl()}${image.url}`;
  }
  
  return url ? ensureHttps(url) : null;
}

/**
 * Extract image URL and alt text from Strapi image object
 * Handles Strapi 4 (nested data.attributes), Strapi 5 (flattened url at top level), and legacy shapes.
 * Returns { url: string | null, alt: string }
 */
function getStrapiImageWithAlt(image) {
  if (!image) return { url: null, alt: '' };
  // Unwrap if wrapped in array (some API responses)
  const img = Array.isArray(image) ? image[0] : image;
  if (!img) return { url: null, alt: '' };

  let url = null;
  let alt = '';

  if (typeof img === 'string') {
    url = img.startsWith('http') ? img : `${getStrapiBaseUrl()}${img}`;
  } else if (img.data) {
    // Strapi 4: { data: { attributes: { url, alternativeText } } } or Strapi 5: { data: { url, alternativeText } }
    const d = Array.isArray(img.data) ? img.data[0] : img.data;
    const attrs = d?.attributes || d;
    const rawUrl = attrs?.url || d?.url;
    alt = attrs?.alternativeText ?? d?.alternativeText ?? '';
    url = rawUrl ? `${getStrapiBaseUrl()}${rawUrl}` : null;
  } else if (img.attributes) {
    const rawUrl = img.attributes.url;
    alt = img.attributes.alternativeText || '';
    url = rawUrl ? `${getStrapiBaseUrl()}${rawUrl}` : null;
  } else if (img.url) {
    // Strapi 5 flattened: { url: '/uploads/...', alternativeText: '...' }
    url = img.url.startsWith('http') ? img.url : `${getStrapiBaseUrl()}${img.url}`;
    alt = img.alternativeText ?? img.caption ?? '';
  } else if (img.formats?.large?.url || img.formats?.medium?.url || img.formats?.thumbnail?.url) {
    const rawUrl = img.formats.large?.url || img.formats.medium?.url || img.formats.thumbnail?.url;
    url = rawUrl ? `${getStrapiBaseUrl()}${rawUrl}` : null;
    alt = img.alternativeText ?? '';
  }

  return { url: url ? ensureHttps(url) : null, alt: alt || '' };
}

/**
 * Fetch Header configuration
 */
export async function getHeader() {
  try {
    // Header doesn't change frequently, cache for 10 minutes
    const data = await fetchStrapiSingleType('header', { next: { revalidate: 600 } });
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    // Transform logo
    const logo = attributes.logo ? getStrapiImageWithAlt(attributes.logo) : null;
    
    return {
      logo: logo?.url || '/images/logoo.png',
      logoAlt: attributes.logoAlt || 'NADZ Healthcare',
      navLinks: attributes.navLinks || [],
      ctaButtonText: attributes.ctaButtonText || 'Book an appointment',
    };
  } catch (error) {
    console.error('Error fetching header:', error);
    return null;
  }
}

/**
 * Fetch Footer configuration
 */
export async function getFooter() {
  try {
    // Footer doesn't change frequently, cache for 10 minutes
    const data = await fetchStrapiSingleType('footer', { next: { revalidate: 600 } });
    if (!data.data) {
      return null;
    }
    
    const attributes = data.data.attributes || data.data;
    
    // Transform logo
    const logo = attributes.logo ? getStrapiImageWithAlt(attributes.logo) : null;
    
    return {
      logo: logo?.url || '/logofooter.png',
      logoAlt: attributes.logoAlt || 'NADZ Healthcare',
      description: attributes.description || '',
      socialLinks: attributes.socialLinks || [],
      linkSections: attributes.linkSections || [],
      copyrightText: attributes.copyrightText || 'All Rights Reserved © Copyright 2025',
      licenseText: attributes.licenseText || '',
      licenseNumber: attributes.licenseNumber || '',
      floatingPhoneButton: attributes.floatingPhoneButton !== false,
      floatingWhatsAppButton: attributes.floatingWhatsAppButton !== false,
      phoneNumber: attributes.phoneNumber || '+97180046239',
      whatsappNumber: attributes.whatsappNumber || '971521597336',
      whatsappUrl: attributes.whatsappUrl || 'https://wa.me/971521597336',
    };
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}

/**
 * Transform Strapi page data to match the existing frontend structure
 */
function transformHomeCarePage(page) {
  // Handle different response structures (vision/mission may be on page or page.attributes when populated by controller)
  const attributes = page.attributes || page || {};
  const topLevel = page || {};
  
  // If pageData exists (old JSON structure), use it directly
  if (attributes.pageData) {
    return {
      ...attributes.pageData,
      metadata: {
        ...attributes.pageData.metadata,
        title: attributes.seoTitle || attributes.pageData.metadata?.title || '',
        description: attributes.seoDescription || attributes.pageData.metadata?.description || '',
        keywords: attributes.seoKeywords || attributes.pageData.metadata?.keywords || [],
        canonicalUrl: attributes.seoCanonicalUrl || attributes.pageData.metadata?.canonicalUrl,
      },
    };
  }
  
  // Transform component structure to match frontend format
  const transformed = {
    slug: attributes.slug || '',
    metadata: {
      title: attributes.seoTitle || '',
      description: attributes.seoDescription || '',
      keywords: attributes.seoKeywords || [],
      canonicalUrl: attributes.seoCanonicalUrl || '',
    },
  };
  
  // Transform hero component
  if (attributes.hero) {
    // Extract hero image with alt text from media field - only if image exists
    const heroImage = attributes.hero.image ? getStrapiImageWithAlt(attributes.hero.image) : null;
    const heroLogo = attributes.hero.logo ? getStrapiImageWithAlt(attributes.hero.logo) : null;

    transformed.hero = {
      title: attributes.hero.title || '',
      subtitle: attributes.hero.subtitle || attributes.hero.subheading || '',
      description: attributes.hero.description || '',
      subheading: attributes.hero.subheading || '',
      introBlurb: attributes.hero.introBlurb || '',
      badgeLabel: attributes.hero.badgeLabel || '',
      primaryCtaText: attributes.hero.primaryCtaText || '',
      secondaryCtaText: attributes.hero.secondaryCtaText || '',
      videoUrl: attributes.hero.videoUrl || null,
      videoId: attributes.hero.videoId || null,
      imageSrc: heroImage?.url || null,
      imageAlt: heroImage?.alt || '',
      logoUrl: heroLogo?.url || null,
      logoAlt: heroLogo?.alt || '',
      showCta: attributes.hero.showCta !== false,
      buttonVariant: attributes.hero.buttonVariant || 'default',
      imageRoundedRight: attributes.hero.imageRoundedRight || false,
    };
  }
  
  // Transform who-we-are specific fields (from components)
  if (attributes.ourStory) {
    const storyParagraphs = Array.isArray(attributes.ourStory.paragraphs)
      ? attributes.ourStory.paragraphs.map((p) => (typeof p === 'string' ? p : p?.text || ''))
      : [];
    transformed.ourStory = {
      title: attributes.ourStory.title || '',
      badgeLabel: attributes.ourStory.badgeLabel || '',
      paragraphs: storyParagraphs,
      quote: attributes.ourStory.quote || '',
    };
  }
  
  if (attributes.ourCommitment) {
    // Extract image with alt text if available
    const commitmentImage = attributes.ourCommitment.image ? getStrapiImageWithAlt(attributes.ourCommitment.image) : null;
    
    transformed.ourCommitment = {
      title: attributes.ourCommitment.title || '',
      badgeLabel: attributes.ourCommitment.badgeLabel || '',
      description: attributes.ourCommitment.description || '',
      paragraph: attributes.ourCommitment.paragraph || '',
      imageSrc: commitmentImage?.url || null,
      imageAlt: commitmentImage?.alt || 'NADZ Healthcare Commitment',
    };
  }
  
  if (attributes.ourPromise) {
    transformed.ourPromise = {
      title: attributes.ourPromise.title || '',
      badgeLabel: attributes.ourPromise.badgeLabel || '',
      items: Array.isArray(attributes.ourPromise.items)
        ? attributes.ourPromise.items.map(item => ({
            title: item.title || '',
            description: item.description || '',
          }))
        : [],
    };
  }
  
  if (attributes.whoWeServe) {
    transformed.whoWeServe = {
      title: attributes.whoWeServe.title || '',
      badgeLabel: attributes.whoWeServe.badgeLabel || '',
      description: attributes.whoWeServe.description || '',
      services: Array.isArray(attributes.whoWeServe.services)
        ? attributes.whoWeServe.services.map(service => ({
            title: service.title || '',
            description: service.description || '',
          }))
        : [],
    };
  }
  
  if (attributes.whyDifferent) {
    transformed.whyDifferent = {
      title: attributes.whyDifferent.title || '',
      badgeLabel: attributes.whyDifferent.badgeLabel || '',
      items: Array.isArray(attributes.whyDifferent.items)
        ? attributes.whyDifferent.items.map(item => ({
            title: item.title || '',
            description: item.description || '',
            icon: item.icon || '',
          }))
        : [],
    };
  }
  
  if (attributes.closing) {
    transformed.closing = {
      title: attributes.closing.title || '',
      description: attributes.closing.description || '',
      subtitle: attributes.closing.subtitle || '',
    };
  }
  
  // Helper: get repeatable component array from various Strapi response shapes
  const getRepeatableArray = (obj, key) => {
    if (!obj || typeof obj !== 'object') return null;
    const raw = obj[key] ?? obj?.data;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(obj?.data)) return obj.data;
    return null;
  };

  // Helper: extract text from a single paragraph item (all known Strapi shapes)
  const getTextFromItem = (p) => {
    if (p == null) return '';
    if (typeof p === 'string') return p;
    const attrs = p?.attributes ?? p;
    const text = attrs?.text ?? attrs?.body ?? attrs?.content ?? p?.text ?? p?.body ?? p?.content ?? '';
    return typeof text === 'string' ? text : String(text || '');
  };

  const extractParagraphTexts = (arr) => {
    let list = null;
    if (Array.isArray(arr)) {
      list = arr;
    } else if (arr && typeof arr === 'object') {
      list = getRepeatableArray(arr, 'paragraphs') ?? getRepeatableArray(arr, 'points') ?? (Array.isArray(arr.data) ? arr.data : []);
    }
    if (!list?.length) return [];
    return list.map(getTextFromItem).filter((t) => t && String(t).trim() !== '');
  };

  // Unwrap component data if Strapi returned it as { data: { attributes: {...} } } or { data: {...} }
  const unwrap = (v) => (v?.data?.attributes !== undefined ? v.data.attributes : v?.data ?? v);

  // Transform vision-mission specific fields (controller may set vision/mission on entry, not only in attributes)
  const rawVision = unwrap(attributes.vision ?? topLevel.vision);
  if (rawVision) {
    const visionParRaw = rawVision.paragraphs ?? rawVision?.paragraphs?.data;
    const visionParagraphs = extractParagraphTexts(visionParRaw);
    transformed.vision = {
      title: rawVision.title || '',
      badgeLabel: rawVision.badgeLabel || '',
      paragraphs: visionParagraphs.length > 0 ? visionParagraphs : (Array.isArray(rawVision.paragraphs) ? rawVision.paragraphs.map(getTextFromItem).filter((t) => t && String(t).trim() !== '') : []),
    };
  }

  const rawMission = unwrap(attributes.mission ?? topLevel.mission);
  if (rawMission) {
    const missionParRaw = rawMission.paragraphs ?? rawMission?.paragraphs?.data;
    const missionPointsRaw = rawMission.points ?? rawMission?.points?.data;
    const missionParagraphs = extractParagraphTexts(missionParRaw);
    const missionPoints = extractParagraphTexts(missionPointsRaw);
    transformed.mission = {
      title: rawMission.title || '',
      badgeLabel: rawMission.badgeLabel || '',
      intro: rawMission.intro || '',
      paragraphs: missionParagraphs,
      points: missionPoints,
      quote: rawMission.quote || '',
    };
  }
  
  const rawWhyMatters = unwrap(attributes.whyMatters ?? topLevel.whyMatters);
  if (rawWhyMatters) {
    const rawItems = rawWhyMatters.items ?? rawWhyMatters.items?.data;
    const itemsList = Array.isArray(rawItems) ? rawItems : [];
    const whyItems = itemsList.map((item) => {
      const a = item?.attributes ?? item;
      return {
        title: a?.title ?? item?.title ?? '',
        description: a?.description ?? item?.description ?? '',
        icon: a?.icon ?? item?.icon ?? '',
      };
    }).filter((i) => i.title?.trim() || i.description?.trim());
    transformed.whyMatters = {
      title: rawWhyMatters.title || '',
      badgeLabel: rawWhyMatters.badgeLabel || '',
      items: whyItems,
    };
  }
  
  // Transform centeredText component
  if (attributes.centeredText) {
    transformed.centeredText = {
      title: attributes.centeredText.title || '',
      paragraphs: attributes.centeredText.paragraphs || [],
      ctaText: attributes.centeredText.ctaText || '',
    };
  }

  // Transform centeredText2 (second centered text block, e.g. for IV drip pages)
  if (attributes.centeredText2) {
    transformed.centeredText2 = {
      title: attributes.centeredText2.title || '',
      paragraphs: attributes.centeredText2.paragraphs || [],
      ctaText: attributes.centeredText2.ctaText || '',
    };
  }

  // Transform skinBrightening (centered text for glutathione/skin pages)
  if (attributes.skinBrightening) {
    transformed.skinBrightening = {
      title: attributes.skinBrightening.title || '',
      paragraphs: attributes.skinBrightening.paragraphs || [],
    };
  }

  // Transform ivDripTypes component
  if (attributes.ivDripTypes) {
    transformed.ivDripTypes = {
      title: attributes.ivDripTypes.title || '',
      drips: Array.isArray(attributes.ivDripTypes.drips)
        ? attributes.ivDripTypes.drips.map((drip) => {
            const d = drip?.attributes ?? drip;
            return {
              title: d?.title ?? drip?.title ?? '',
              icon: d?.icon ?? drip?.icon ?? '',
              description: d?.description ?? drip?.description ?? '',
            };
          })
        : [],
      ctaText: attributes.ivDripTypes.ctaText || '',
    };
  }
  
  // Transform servicesIntro component
  if (attributes.servicesIntro) {
    transformed.servicesIntro = {
      title: attributes.servicesIntro.title || '',
      introParagraph: attributes.servicesIntro.introParagraph || '',
      highlights: attributes.servicesIntro.highlights || [],
      closingParagraph: attributes.servicesIntro.closingParagraph || '',
      ctaText: attributes.servicesIntro.ctaText || '',
    };
  }
  
  // Transform locationServices (repeatable component)
  if (attributes.locationServices && Array.isArray(attributes.locationServices)) {
    transformed.locationServices = attributes.locationServices.map(loc => ({
      title: loc.title || '',
      description: loc.description || '',
      icon: loc.icon || '',
      bullets: loc.bullets || [],
      ctaText: loc.ctaText || '',
    }));
  }
  
  // Transform artOfHealing component
  if (attributes.artOfHealing) {
    transformed.artOfHealing = {
      title: attributes.artOfHealing.title || '',
      description: attributes.artOfHealing.description || '',
      highlights: attributes.artOfHealing.highlights || [],
      closingParagraphs: attributes.artOfHealing.closingParagraphs || [],
      videoUrl: attributes.artOfHealing.videoUrl || '',
      ctaText: attributes.artOfHealing.ctaText || '',
    };
  }
  
  // Transform visitIncludes component
  if (attributes.visitIncludes) {
    transformed.visitIncludes = {
      title: attributes.visitIncludes.title || '',
      description: attributes.visitIncludes.description || '',
      items: attributes.visitIncludes.items || [],
    };
  }
  
  // Transform nursingCareServices component
  if (attributes.nursingCareServices) {
    transformed.nursingCareServices = {
      title: attributes.nursingCareServices.title || '',
      services: Array.isArray(attributes.nursingCareServices.services)
        ? attributes.nursingCareServices.services.map(service => ({
            title: service.title || '',
            icon: service.icon || '',
            description: service.description || '',
          }))
        : [],
      note: attributes.nursingCareServices.note || '',
    };
  }
  
  // Transform pathway component - always set default so components never read undefined
  const defaultPathway = {
    title: null,
    steps: [],
    ctaBlock: null,
  };
  
  if (attributes.pathway) {
    // Handle nested steps structure
    let steps = [];
    let rawSteps = null;
    
    // Try different possible structures
    if (Array.isArray(attributes.pathway.steps)) {
      rawSteps = attributes.pathway.steps;
    } else if (attributes.pathway.steps?.data && Array.isArray(attributes.pathway.steps.data)) {
      rawSteps = attributes.pathway.steps.data;
    }
    
    // Process steps if we found them
    if (rawSteps && Array.isArray(rawSteps)) {
      steps = rawSteps.map(step => {
        // Handle nested structures: step.attributes or step directly
        const stepData = step.attributes || step;
        return {
          number: stepData.number || 0,
          title: stepData.title || '',
          description: stepData.description || '',
        };
      }).filter(step => step.title && step.title.trim() !== ''); // Filter out empty steps
    }
    
    // Handle nested ctaBlock structure
    let ctaBlock = null;
    if (attributes.pathway.ctaBlock) {
      const ctaData = attributes.pathway.ctaBlock.attributes || attributes.pathway.ctaBlock.data?.attributes || attributes.pathway.ctaBlock;
      if (ctaData.title || ctaData.description || ctaData.primaryCta || ctaData.secondaryCta) {
        ctaBlock = {
          title: ctaData.title || '',
          description: ctaData.description || '',
          primaryCta: ctaData.primaryCta || '',
          secondaryCta: ctaData.secondaryCta || '',
        };
      }
    }
    
    // Only set pathway if we have steps or a title
    if (steps.length > 0 || attributes.pathway.title) {
      transformed.pathway = {
        ...defaultPathway,
        title: attributes.pathway.title || null,
        steps,
        ctaBlock,
      };
    } else {
      transformed.pathway = defaultPathway;
    }
  } else {
    transformed.pathway = defaultPathway;
  }
  
  // Transform faqs component - always set default so components never read undefined
  const defaultFaqs = {
    title: null,
    items: [],
  };
  if (attributes.faqs) {
    try {
      // Log the raw FAQ structure for debugging (only first time to avoid spam)
      if (!global._faqDebugLogged) {
        console.log('[transformHomeCarePage] Raw FAQ structure:', JSON.stringify({
          hasFaqs: !!attributes.faqs,
          faqsKeys: attributes.faqs ? Object.keys(attributes.faqs) : null,
          hasItems: !!attributes.faqs.items,
          itemsType: typeof attributes.faqs.items,
          itemsIsArray: Array.isArray(attributes.faqs.items),
          itemsValue: attributes.faqs.items ? (Array.isArray(attributes.faqs.items) ? `Array(${attributes.faqs.items.length})` : typeof attributes.faqs.items === 'object' ? Object.keys(attributes.faqs.items) : attributes.faqs.items) : null,
        }, null, 2));
        global._faqDebugLogged = true;
      }
      
      // Handle different FAQ data structures from Strapi
      let items = [];
      
      // Extract items from different possible structures
      let rawItems = null;
      
      // Try different possible structures
      if (Array.isArray(attributes.faqs.items)) {
        rawItems = attributes.faqs.items;
      } else if (attributes.faqs.items?.data) {
        // Handle nested data wrapper
        if (Array.isArray(attributes.faqs.items.data)) {
          rawItems = attributes.faqs.items.data;
        } else if (attributes.faqs.items.data?.attributes) {
          // Single item wrapped in data.attributes
          rawItems = [attributes.faqs.items.data];
        } else if (Array.isArray(attributes.faqs.items.data?.data)) {
          // Double nested data wrapper
          rawItems = attributes.faqs.items.data.data;
        }
      } else if (attributes.faqs.items?.attributes) {
        // Items wrapped in attributes
        rawItems = Array.isArray(attributes.faqs.items.attributes) 
          ? attributes.faqs.items.attributes 
          : [attributes.faqs.items.attributes];
      }
      
      // Process items if we found them
      if (rawItems && Array.isArray(rawItems)) {
        items = rawItems
          .map((item, index) => {
            try {
              // Handle nested structures: item.attributes, item.data, or item directly
              let itemData = item;
              if (item && typeof item === 'object') {
                if (item.attributes) {
                  itemData = item.attributes;
                } else if (item.data) {
                  itemData = item.data?.attributes || item.data;
                }
              }
              
              const question = itemData?.q || itemData?.question || '';
              const answer = itemData?.a || itemData?.answer || '';
              
              if (!question || question.trim() === '') {
                return null; // Filter out empty questions
              }
              
              return { q: question, a: answer || '' };
            } catch (itemError) {
              console.warn(`[transformHomeCarePage] Error processing FAQ item ${index}:`, itemError);
              return null;
            }
          })
          .filter(item => item !== null); // Filter out null items
      }
      
      // Only set FAQs if we have items
      if (items.length > 0) {
        transformed.faqs = {
          ...defaultFaqs,
          title: attributes.faqs.title || null,
          items,
        };
      } else {
        // Log when FAQs exist but no items were extracted (for debugging)
        if (attributes.faqs && (attributes.faqs.items || attributes.faqs.title)) {
          console.warn(`[transformHomeCarePage] FAQ section exists but no items extracted. Structure:`, {
            hasItems: !!attributes.faqs.items,
            itemsType: typeof attributes.faqs.items,
            itemsIsArray: Array.isArray(attributes.faqs.items),
            itemsKeys: attributes.faqs.items ? Object.keys(attributes.faqs.items) : null,
          });
        }
        transformed.faqs = defaultFaqs;
      }
    } catch (error) {
      console.error('[transformHomeCarePage] Error transforming FAQs:', error);
      transformed.faqs = defaultFaqs;
    }
  } else {
    transformed.faqs = defaultFaqs;
  }
  
  // Transform pocTesting component
  if (attributes.pocTesting) {
    transformed.pocTesting = {
      title: attributes.pocTesting.title || '',
      description: attributes.pocTesting.description || '',
      ctaText: attributes.pocTesting.ctaText || '',
    };
  }
  
  // Transform bloodTestSection component
  if (attributes.bloodTestSection) {
    transformed.bloodTestSection = {
      title: attributes.bloodTestSection.title || '',
      paragraphs: attributes.bloodTestSection.paragraphs || [],
    };
  }
  
  // Transform labServices component
  if (attributes.labServices) {
    transformed.labServices = {
      title: attributes.labServices.title || '',
      description: attributes.labServices.description || '',
      categories: Array.isArray(attributes.labServices.categories)
        ? attributes.labServices.categories.map(cat => ({
            title: cat.title || '',
            icon: cat.icon || '',
            description: cat.description || '',
            tests: cat.tests || [],
          }))
        : [],
    };
  }
  
  // Transform packages component (supports structured packageItems from CMS or legacy packages JSON)
  if (attributes.packages) {
    const raw = attributes.packages;
    let packagesList = [];
    if (Array.isArray(raw.packageItems) && raw.packageItems.length > 0) {
      packagesList = raw.packageItems.map((item) => ({
        name: item.name || '',
        bestFor: item.bestFor || '',
        supports: item.supports || '',
        icon: item.icon || 'default',
      }));
    } else if (Array.isArray(raw.packages)) {
      packagesList = raw.packages;
    }
    transformed.packages = {
      title: raw.title || '',
      description: raw.description || '',
      packages: packagesList,
      note: raw.note || '',
    };
  }

  // Transform vitalBrainPackages (NADZ Vital Brain — CMS tier cards)
  const rawVbp = unwrap(attributes.vitalBrainPackages);
  if (rawVbp) {
    const tiersSource = rawVbp.packageTiers ?? rawVbp.packages;
    let tiersList = [];
    if (Array.isArray(tiersSource)) {
      tiersList = tiersSource;
    } else if (tiersSource && typeof tiersSource === 'object' && Array.isArray(tiersSource.data)) {
      tiersList = tiersSource.data;
    }

    const vbpPackages = tiersList
      .map((tier) => {
        const t = unwrap(tier);
        if (!t || typeof t !== 'object') return null;
        let features = t.features;
        if (typeof features === 'string') {
          try {
            features = JSON.parse(features);
          } catch {
            features = [];
          }
        }
        if (!Array.isArray(features)) {
          features = [];
        }
        features = features
          .map((f) => (typeof f === 'string' ? f : f?.text ?? ''))
          .filter((line) => line && String(line).trim() !== '');
        const name = t.name || '';
        if (!String(name).trim()) return null;
        return {
          name,
          description: t.description || '',
          features,
        };
      })
      .filter(Boolean);

    if (vbpPackages.length > 0) {
      transformed.vitalBrainPackages = {
        title: rawVbp.title || '',
        subtitle: rawVbp.subtitle || '',
        packages: vbpPackages,
        ctaText: rawVbp.ctaText || '',
      };
    }
  }
  
  // Transform whenToConsider component
  if (attributes.whenToConsider) {
    transformed.whenToConsider = {
      title: attributes.whenToConsider.title || '',
      items: attributes.whenToConsider.items || [],
    };
  }
  
  // Transform benefits component
  if (attributes.benefits) {
    transformed.benefits = {
      title: attributes.benefits.title || '',
      benefits: Array.isArray(attributes.benefits.benefits)
        ? attributes.benefits.benefits.map(benefit => ({
            title: benefit.title || '',
            icon: benefit.icon || '',
            description: benefit.description || '',
          }))
        : [],
      note: attributes.benefits.note || '',
      ctaText: attributes.benefits.ctaText || '',
    };
  }
  
  // Transform howItWorks component
  if (attributes.howItWorks) {
    // Handle items - can be JSON array or nested structure
    let items = [];
    if (attributes.howItWorks.items) {
      if (Array.isArray(attributes.howItWorks.items)) {
        items = attributes.howItWorks.items;
      } else if (typeof attributes.howItWorks.items === 'string') {
        // If items is a JSON string, parse it
        try {
          items = JSON.parse(attributes.howItWorks.items);
        } catch (e) {
          items = [];
        }
      }
    }
    
    transformed.howItWorks = {
      title: attributes.howItWorks.title || '',
      description: attributes.howItWorks.description || '',
      items: Array.isArray(items) ? items : [],
      closingParagraph: attributes.howItWorks.closingParagraph || '',
    };
  }
  
  // Transform signatureDrips component
  if (attributes.signatureDrips) {
    transformed.signatureDrips = {
      title: attributes.signatureDrips.title || '',
      drips: Array.isArray(attributes.signatureDrips.drips)
        ? attributes.signatureDrips.drips.map((drip) => ({
            title: drip.title || '',
            icon: drip.icon || '',
            description: drip.description || '',
          }))
        : [],
    };
  }
  
  return transformed;
}

/**
 * Transform Strapi wellness page data to match the existing wellness frontend structure
 */
function transformWellnessPage(page) {
  const attributes = page.attributes || page || {};

  // Transform component structure back to JSON structure expected by frontend
  const transformed = {
    slug: attributes.slug || '',
    metadata: {
      title: attributes.seoTitle || '',
      description: attributes.seoDescription || '',
      keywords: attributes.seoKeywords || [],
      canonicalUrl: attributes.seoCanonicalUrl || '',
    },
  };

  const listItemsToArray = (arr) =>
    Array.isArray(arr)
      ? arr.map((i) => (i != null && typeof i === 'object' && i.text != null ? i.text : typeof i === 'string' ? i : '')).filter(Boolean)
      : [];

  // Transform hero component - always set hero object so components never read undefined
  const defaultHero = {
    label: null,
    title: '',
    subtitle: null,
    description: null,
    primaryCta: null,
    secondaryCta: null,
    videoUrl: null,
    videoId: null,
    imageSrc: null,
    imageAlt: null,
    logoUrl: null,
    logoAlt: null,
  };
  if (attributes.hero) {
    const heroImage = attributes.hero.image ? getStrapiImageWithAlt(attributes.hero.image) : null;
    const heroLogo = attributes.hero.logo ? getStrapiImageWithAlt(attributes.hero.logo) : null;
    transformed.hero = {
      ...defaultHero,
      label: attributes.hero.label ?? null,
      title: attributes.hero.title ?? '',
      subtitle: attributes.hero.subtitle ?? null,
      description: attributes.hero.description ?? null,
      primaryCta: attributes.hero.primaryCta ?? null,
      secondaryCta: attributes.hero.secondaryCta ?? null,
      videoUrl: attributes.hero.videoUrl ?? null,
      videoId: attributes.hero.videoId ?? null,
      imageSrc: heroImage?.url ?? null,
      imageAlt: heroImage?.alt ?? null,
      logoUrl: heroLogo?.url ?? null,
      logoAlt: heroLogo?.alt ?? null,
    };
  } else {
    transformed.hero = defaultHero;
  }

  // Transform whatIs component
  if (attributes.whatIs) {
    const whatIsImage = attributes.whatIs.image ? getStrapiImageWithAlt(attributes.whatIs.image) : null;
    transformed.whatIs = {
      title: attributes.whatIs.title || null,
      paragraph: attributes.whatIs.paragraph || null,
      bullets: listItemsToArray(attributes.whatIs.bullets),
      footer: attributes.whatIs.footer || null,
      imageSrc: whatIsImage?.url || null,
      imageAlt: whatIsImage?.alt || null,
    };
  }

  // Transform benefits component
  if (attributes.benefits) {
    transformed.benefits = {
      title: attributes.benefits.title || null,
      items: (attributes.benefits.benefits || []).map(benefit => ({
        title: benefit.title || '',
        icon: benefit.icon || null,
        description: benefit.description || null,
      })),
    };
  }

  // Transform whoCanBenefit component - always set default so components never read undefined
  const defaultWhoCanBenefit = { title: null, items: [], footer: null };
  if (attributes.whoCanBenefit) {
    transformed.whoCanBenefit = {
      title: attributes.whoCanBenefit.title ?? null,
      items: listItemsToArray(attributes.whoCanBenefit.items),
      footer: attributes.whoCanBenefit.footer ?? null,
    };
  } else {
    transformed.whoCanBenefit = defaultWhoCanBenefit;
  }

  // Transform howItWorks component
  if (attributes.howItWorks) {
    transformed.howItWorks = {
      title: attributes.howItWorks.title || null,
      paragraph: attributes.howItWorks.paragraph || null,
      subtitle: attributes.howItWorks.subtitle || null,
      bullets: listItemsToArray(attributes.howItWorks.bullets),
      footer: attributes.howItWorks.footer || null,
    };
  }

  // Transform faqs component - always set default so components never read undefined
  const defaultFaqs = {
    title: null,
    items: [],
  };
  if (attributes.faqs) {
    const items = Array.isArray(attributes.faqs.items)
      ? attributes.faqs.items.map(item => ({ q: item.q || '', a: item.a || '' }))
      : [];
    transformed.faqs = {
      ...defaultFaqs,
      title: attributes.faqs.title || null,
      items,
    };
  } else {
    transformed.faqs = defaultFaqs;
  }

  // Transform conditions component
  if (attributes.conditions) {
    transformed.conditions = {
      title: attributes.conditions.title || null,
      sections: (attributes.conditions.sections || []).map(sec => ({
        title: sec.title || null,
        items: listItemsToArray(sec.items),
        note: sec.note || null,
      })),
      footer: attributes.conditions.footer || null,
    };
  }

  // Transform patientReports component
  if (attributes.patientReports) {
    transformed.patientReports = {
      title: attributes.patientReports.title || null,
      items: listItemsToArray(attributes.patientReports.items),
    };
  }

  // Transform journey component - always set default so components never read undefined
  const defaultJourney = {
    title: null,
    subtitle: null,
    steps: [],
  };
  if (attributes.journey) {
    transformed.journey = {
      ...defaultJourney,
      title: attributes.journey.title || null,
      subtitle: attributes.journey.subtitle || null,
      steps: (attributes.journey.steps || []).map(step => ({
        title: step.title || '',
        description: step.description || null,
      })),
    };
  } else {
    transformed.journey = defaultJourney;
  }

  // Transform safety component - always set default so components never read undefined
  const defaultSafety = {
    title: null,
    description: null,
  };
  if (attributes.safety) {
    transformed.safety = {
      ...defaultSafety,
      title: attributes.safety.title || null,
      description: attributes.safety.description || null,
    };
  } else {
    transformed.safety = defaultSafety;
  }

  // Transform whyChooseFunctionalMedicine component
  if (attributes.whyChooseFunctionalMedicine) {
    transformed.whyChooseFunctionalMedicine = {
      title: attributes.whyChooseFunctionalMedicine.title || null,
      description: attributes.whyChooseFunctionalMedicine.description || null,
      points: listItemsToArray(attributes.whyChooseFunctionalMedicine.points),
      footer: attributes.whyChooseFunctionalMedicine.footer || null,
    };
  }

  // Transform whyChoose component - always set default so components never read undefined
  const defaultWhyChoose = {
    title: null,
    items: [],
  };
  if (attributes.whyChoose) {
    transformed.whyChoose = {
      ...defaultWhyChoose,
      title: attributes.whyChoose.title || null,
      items: listItemsToArray(attributes.whyChoose.items),
    };
  } else {
    transformed.whyChoose = defaultWhyChoose;
  }

  // Always set a default cta object so components never read undefined (primaryCta/secondaryCta/tagline)
  if (!transformed.cta) {
    transformed.cta = {
      title: null,
      description: null,
      primaryCta: null,
      secondaryCta: null,
      tagline: null,
    };
  }

  return transformed;
}
