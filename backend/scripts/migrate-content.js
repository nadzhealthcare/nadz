'use strict';

const fs = require('fs-extra');
const path = require('path');
const mimeTypes = require('mime-types');
const { Readable } = require('stream');

// Path to project root (assuming script runs from backend/scripts)
const PROJECT_ROOT = path.resolve(__dirname, '../..');
// Path to frontend data directory
const DATA_DIR = path.join(PROJECT_ROOT, 'src/data');
// Path to public images directory (relative to project root)
const PUBLIC_IMAGES_DIR = path.join(PROJECT_ROOT, 'public/images');

async function migrateContent() {
  try {
    console.log('🚀 Starting content migration to Strapi...');
    console.log('⚠️  This OVERWRITES Strapi entries from src/data JSON. Do not run on production after CMS edits.');
    console.log('    Use only for initial seeding, or set STRAPI_ENABLE_JSON_BOOTSTRAP_SYNC for controlled bootstrap.\n');

    // Set public permissions first
    await setPublicPermissions();

    // Migrate single types
    await migrateGlobal();
    await migrateHomePage();
    await migrateContactUs();
    await migrateHeader();
    await migrateFooter();

    console.log('\n✅ Content migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  }
}

async function setPublicPermissions() {
  console.log('📝 Setting public permissions...');
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const permissions = {
    'global': ['find'],
    'home-page': ['find'],
    'home-care-page': ['find', 'findOne'],
    'contact-us': ['find'],
    'header': ['find'],
    'footer': ['find'],
    'faq': ['find'],
    'privacy-policy': ['find'],
    'terms-and-conditions': ['find'],
    'cookie-policy': ['find'],
    'service': ['find', 'findOne'],
  };

  // Remove existing permissions first to avoid duplicates
  await strapi.query('plugin::users-permissions.permission').deleteMany({
    where: {
      role: publicRole.id,
      action: {
        $contains: 'api::',
      },
    },
  });

  // Create new permissions
  const allPermissionsToCreate = [];
  Object.entries(permissions).forEach(([contentType, actions]) => {
    actions.forEach((action) => {
      allPermissionsToCreate.push(
        strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::${contentType}.${contentType}.${action}`,
            role: publicRole.id,
          },
        })
      );
    });
  });

  await Promise.all(allPermissionsToCreate);
  console.log('✅ Public permissions set\n');
}

async function migrateGlobal() {
  console.log('🌐 Migrating Global Settings...');
  
  const entryData = {
    siteName: 'NADZ Healthcare Dubai',
    siteUrl: 'https://nadzhealthcare.com',
    siteDescription: 'Rooted in trust and discretion, our bespoke medical services are tailored to your lifestyle, focusing not only on treatment, but on the art of prevention. Home, Hotel & Office Care in Dubai.',
    defaultSeoTitle: 'NADZ Healthcare Dubai',
    defaultSeoDescription: 'Rooted in trust and discretion, our bespoke medical services are tailored to your lifestyle, focusing not only on treatment, but on the art of prevention. Home, Hotel & Office Care in Dubai.',
    defaultSeoKeywords: [
      'home healthcare',
      'doctor on call',
      'nursing care',
      'elderly care',
      'physiotherapy',
      'labs at home',
      'wellness at home',
      'Dubai healthcare',
      '24/7 healthcare',
      'medical tourism',
    ],
    twitterHandle: '@nadzhealthcare',
    organizationName: 'NADZ Healthcare',
    organizationLogo: 'https://nadzhealthcare.com/logo.svg',
    organizationPhone: '+971-800-4-6239',
    organizationEmail: 'info@nadzhealthcare.com',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/nadzhealthcare',
    },
    themeColor: '#165976',
    robotsConfig: {
      index: true,
      follow: true,
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/', '/admin/'],
      sitemap: 'https://nadzhealthcare.com/sitemap.xml',
    },
    schemaOrgConfig: {
      organization: {
        areaServed: 'AE',
        availableLanguage: ['en', 'ar'],
        contactType: 'customer support',
      },
    },
    sitemapConfig: {
      defaultPriority: '0.8',
      defaultChangefreq: 'monthly',
    },
  };

  await createOrUpdateSingleType('global', entryData);
  console.log('✅ Global Settings migrated\n');
}

async function migrateHomePage() {
  console.log('📄 Migrating Home Page...');
  const data = await readJSONFile('home.json');
  
  // Try to find or upload hero image
  const heroImagePath = path.join(PUBLIC_IMAGES_DIR, 'drnadia.png');
  const heroImageAlt = data.hero?.imageAlt || 'Healthcare Professional';
  
  // Try to upload the image
  const heroImageId = await uploadImageToStrapi(heroImagePath, heroImageAlt);
  
  // Upload card images from public/images
  const card1ImagePath = path.join(PUBLIC_IMAGES_DIR, 'card_1.png');
  const card2ImagePath = path.join(PUBLIC_IMAGES_DIR, 'card_2.png');
  
  const card1ImageId = await uploadImageToStrapi(card1ImagePath, 'Card 1 Image');
  const card2ImageId = await uploadImageToStrapi(card2ImagePath, 'Card 2 Image');
  
  // Upload mainGoal image
  const mainGoalImagePath = data.mainGoal?.image 
    ? path.join(PUBLIC_IMAGES_DIR, path.basename(data.mainGoal.image))
    : null;
  const mainGoalImageAlt = data.mainGoal?.imageAlt || 'Healthcare professional';
  const mainGoalImageId = mainGoalImagePath ? await uploadImageToStrapi(mainGoalImagePath, mainGoalImageAlt) : null;
  
  // Upload howItWorks step images
  const howItWorksSteps = (data.howItWorks?.steps || []).map(async (step) => {
    const stepImagePath = step.image 
      ? path.join(PUBLIC_IMAGES_DIR, path.basename(step.image))
      : null;
    const stepImageAlt = step.title || `Step ${step.number}`;
    const stepImageId = stepImagePath ? await uploadImageToStrapi(stepImagePath, stepImageAlt) : null;
    
    return {
      number: step.number || '',
      title: step.title || '',
      description: step.description || '',
      icon: step.icon || '',
      image: stepImageId || null,
      bgGradient: step.bgGradient || '',
    };
  });
  const howItWorksStepsWithImages = await Promise.all(howItWorksSteps);
  
  // Upload expertDoctors doctor images
  const expertDoctorsDoctors = (data.expertDoctors?.doctors || []).map(async (doctor) => {
    const doctorImagePath = doctor.image 
      ? path.join(PUBLIC_IMAGES_DIR, path.basename(doctor.image))
      : null;
    const doctorImageAlt = doctor.name || 'Healthcare professional';
    const doctorImageId = doctorImagePath ? await uploadImageToStrapi(doctorImagePath, doctorImageAlt) : null;
    
    return {
      name: doctor.name || '',
      role: doctor.role || '',
      languages: doctor.languages || '',
      yearsOfExperience: doctor.yearsOfExperience || '',
      image: doctorImageId || null,
      featured: doctor.featured || false,
    };
  });
  const expertDoctorsWithImages = await Promise.all(expertDoctorsDoctors);
  
  // Build component structure
  // For media fields in components, use the ID directly (not { id: ID })
  const entryData = {
    hero: {
      title: data.hero?.title || '',
      description: data.hero?.description || '',
      reassuranceText: data.hero?.reassuranceText || '',
      image: heroImageId || null,
      whatsappButtonText: data.hero?.whatsappButton?.text || 'Book a Home Visit',
      whatsappButtonUrl: data.hero?.whatsappButton?.url || 'https://wa.me/971521597336',
      callButtonText: data.hero?.callButton?.text || 'Call Now (24/7)',
      callButtonPhone: data.hero?.callButton?.phone || '+97180046239',
      // All 20 service chips with their positions (matching allPillPositions)
      serviceChips: data.hero?.serviceChips || [
        // Left side (first 10 services)
        { name: 'Doctor on Call', icon: 'MdHome', color: '#A855F7', positionTop: '5%', positionLeft: '5%' },
        { name: 'Nursing Care', icon: 'MdLocalHospital', color: '#6366F1', positionTop: '30%', positionLeft: '8%' },
        { name: 'Elderly Care', icon: 'MdAccessibility', color: '#8B5CF6', positionTop: '55%', positionLeft: '12%' },
        { name: 'Mother & Baby Care', icon: 'MdFamilyRestroom', color: '#EC4899', positionTop: '80%', positionLeft: '6%' },
        { name: 'Babysitting', icon: 'MdChildCare', color: '#F472B6', positionBottom: '20%', positionLeft: '10%' },
        { name: 'Palliative Care', icon: 'MdHealing', color: '#A78BFA', positionBottom: '45%', positionLeft: '14%' },
        { name: 'Physiotherapy', icon: 'MdHealthAndSafety', color: '#10B981', positionBottom: '70%', positionLeft: '8%' },
        { name: 'IV Drips', icon: 'MdMedication', color: '#EC4899', positionTop: '15%', positionLeft: '15%' },
        { name: 'IV Glutathione', icon: 'MdSpa', color: '#F59E0B', positionTop: '40%', positionLeft: '5%' },
        { name: 'IV Hydration', icon: 'MdWaterDrop', color: '#06B6D4', positionTop: '65%', positionLeft: '10%' },
        // Right side (next 10 services)
        { name: 'IV NAD⁺', icon: 'MdTrendingUp', color: '#14B8A6', positionTop: '5%', positionRight: '5%' },
        { name: 'Labs at Home', icon: 'MdScience', color: '#10B981', positionTop: '30%', positionRight: '8%' },
        { name: 'Blood Tests', icon: 'MdBloodtype', color: '#EF4444', positionTop: '55%', positionRight: '12%' },
        { name: 'Genetic Testing', icon: 'FaDna', color: '#8B5CF6', positionTop: '80%', positionRight: '6%' },
        { name: 'Vaccinations', icon: 'MdVaccines', color: '#3B82F6', positionBottom: '20%', positionRight: '10%' },
        { name: 'POC Testing', icon: 'MdBiotech', color: '#06B6D4', positionBottom: '45%', positionRight: '14%' },
        { name: 'Medical Tourism', icon: 'MdLocalHospital', color: '#6366F1', positionBottom: '70%', positionRight: '8%' },
        { name: 'NADZ Vital Brain', icon: 'MdPsychology', color: '#A855F7', positionTop: '15%', positionRight: '15%' },
        { name: 'Radiology', icon: 'FaXRay', color: '#6366F1', positionTop: '40%', positionRight: '5%' },
        { name: 'Longevity Care', icon: 'MdAutoAwesome', color: '#F59E0B', positionTop: '65%', positionRight: '10%' },
      ],
    },
    trustedProviders: {
      title: data.trustedProviders?.title || '',
      description: data.trustedProviders?.description || '',
      ctaText: data.trustedProviders?.ctaText || '',
      card1Title: data.trustedProviders?.card1?.title || '',
      card1Description: data.trustedProviders?.card1?.description || '',
      card1Image: card1ImageId || null,
      card2Title: data.trustedProviders?.card2?.title || '',
      card2Description: data.trustedProviders?.card2?.description || '',
      card2Image: card2ImageId || null,
      // Statistics is a repeatable component, so map to array of component objects
      statistics: Array.isArray(data.trustedProviders?.statistics) 
        ? data.trustedProviders.statistics.map(stat => ({
            value: stat.value || '',
            label: stat.label || '',
            number: stat.number || '',
            icon: stat.icon || '', // Icon is string identifier, not media
          }))
        : [],
    },
    mainGoal: {
      title: data.mainGoal?.title || '',
      description: data.mainGoal?.description || '',
      goalsLeft: data.mainGoal?.goalsLeft || [],
      goalsRight: data.mainGoal?.goalsRight || [],
      image: mainGoalImageId || null,
    },
    howItWorks: {
      title: data.howItWorks?.title || '',
      ctaText: data.howItWorks?.ctaText || '',
      ctaSubtext: data.howItWorks?.ctaSubtext || '',
      steps: howItWorksStepsWithImages,
    },
    keyVision: {
      title: data.keyVision?.title || '',
      description: data.keyVision?.description || '',
      items: (data.keyVision?.items || []).map(item => ({
        title: item.title || '',
        description: item.description || '',
        icon: item.icon || '',
      })),
    },
    expertDoctors: {
      title: data.expertDoctors?.title || '',
      subtitle: data.expertDoctors?.subtitle || '',
      doctors: expertDoctorsWithImages,
    },
    partners: {
      title: data.partners?.title || 'Our Partners',
      partners: (data.partners?.partners && data.partners.partners.length > 0
        ? data.partners.partners
        : [
            { name: 'Practo', logo: 'https://nadzhealthcare.com/wp-content/uploads/2025/06/Frame-32-1536x788.png', url: '' },
            { name: 'Partner 2', logo: 'https://nadzhealthcare.com/wp-content/uploads/2025/06/Frame-28-1536x788.png', url: '' },
            { name: 'Partner 3', logo: 'https://nadzhealthcare.com/wp-content/uploads/2025/06/Frame-29-1536x788.png', url: '' },
            { name: 'Partner 4', logo: 'https://nadzhealthcare.com/wp-content/uploads/2025/06/Frame-30-1536x788.png', url: '' },
            { name: 'Partner 5', logo: 'https://nadzhealthcare.com/wp-content/uploads/2025/07/Asset-1@2x.png', url: '' },
            { name: 'Partner 6', logo: 'https://nadzhealthcare.com/wp-content/uploads/2025/07/fusion-log@2x.png', url: '' },
          ]
      ).map((p) => ({
        name: p.name || '',
        logoUrl: p.logo || '',
        url: p.url || '',
      })),
    },
    googleReviews: {
      title: data.googleReviews?.title || 'What Our Patients Say',
      subtitle: data.googleReviews?.subtitle || 'Google Reviews',
      reviews: (data.googleReviews?.reviews && data.googleReviews.reviews.length > 0
        ? data.googleReviews.reviews
        : [
            { author: 'Sarah M.', rating: 5, text: 'Exceptional care. The doctor arrived within 30 minutes and was professional and kind. Highly recommend NADZ for home healthcare in Dubai.', date: 'Jan 2025' },
            { author: 'Ahmed K.', rating: 5, text: 'Used their nursing care for my mother. The team was compassionate and skilled. Couldn\'t ask for better service.', date: 'Dec 2024' },
            { author: 'Emma L.', rating: 5, text: 'Booked a home visit for my child. Fast, thorough, and the follow-up was excellent. NADZ feels like having a family doctor again.', date: 'Jan 2025' },
          ]
      ).map((r) => ({
        author: r.author || '',
        rating: r.rating ?? 5,
        text: r.text || '',
        date: r.date || '',
      })),
    },
    premiumCta: {
      title: data.premiumCta?.title || '',
      description: data.premiumCta?.description || '',
      whatsappButtonText: data.premiumCta?.whatsappButton?.text || '',
      whatsappButtonUrl: data.premiumCta?.whatsappButton?.url || '',
      callButtonText: data.premiumCta?.callButton?.text || '',
      callButtonPhone: data.premiumCta?.callButton?.phone || '',
    },
    servicesSection: {
      title: data.servicesSection?.title || 'Services We Provide',
      ctaText: data.servicesSection?.ctaText || 'View All Services',
      ctaUrl: data.servicesSection?.ctaUrl || '/services',
      // Migrate default services from fallbackServices in the component
      services: data.servicesSection?.services || [
        {
          title: 'Doctor on Call (Urgent & Primary Care)',
          description: 'Fever, infections, migraines, food poisoning or a sick child at 2am, a NADZ doctor comes with a clear plan and fast access to labs and IV support if needed.',
          icon: 'Phone',
        },
        {
          title: 'Nursing & Long-Term Care',
          description: 'Medication administration, wound dressings, post-surgery recovery, elderly support, palliative care, and mother–baby care, delivered with professional, family-like attention.',
          icon: 'Favorite',
        },
        {
          title: 'IV Drips & NAD+ Therapies',
          description: 'Clinic-grade IV therapies at home or in your hotel suite, for hydration, immunity, radiance, jet lag recovery, energy and longevity support.',
          icon: 'WaterDrop',
        },
        {
          title: 'Labs & Diagnostics at Home',
          description: 'Blood tests, genetic and hormone panels, allergy testing and coordinated radiology, samples collected at home and reviewed through a medical lens.',
          icon: 'Science',
        },
        {
          title: 'NADZ Exclusive',
          description: 'Beyond standard home healthcare, NADZ offers cutting-edge, doctor-designed programs that blend neuromodulation, biohacking and advanced diagnostics.',
          icon: 'AutoAwesome',
        },
      ],
    },
    // SEO metadata - use default values from layout.jsx if not in home.json
    seoTitle: data.metadata?.title || 'NADZ Healthcare Dubai',
    seoDescription: data.metadata?.description || 'Rooted in trust and discretion, our bespoke medical services are tailored to your lifestyle, focusing not only on treatment, but on the art of prevention. Home, Hotel & Office Care in Dubai.',
    seoKeywords: data.metadata?.keywords || [
      'home healthcare',
      'doctor on call',
      'nursing care',
      'elderly care',
      'physiotherapy',
      'labs at home',
      'wellness at home',
      'Dubai healthcare',
      '24/7 healthcare',
      'medical tourism',
    ],
    
  };

  await createOrUpdateSingleType('home-page', entryData);
  console.log('✅ Home Page migrated\n');
}

async function migrateContactUs() {
  console.log('📄 Migrating Contact Us...');
  const data = await readJSONFile('contact-us.json');
  
  // Build component structure
  const entryData = {
    hero: {
      title: data.hero?.title || '',
      subtitle: data.hero?.subtitle || '',
    },
    contactInfo: {
      phone: {
        label: data.contactInfo?.phone?.label || '',
        value: data.contactInfo?.phone?.value || '',
        href: data.contactInfo?.phone?.href || '',
      },
      email: {
        label: data.contactInfo?.email?.label || '',
        value: data.contactInfo?.email?.value || '',
        href: data.contactInfo?.email?.href || '',
      },
      address: {
        label: data.contactInfo?.address?.label || '',
        value: data.contactInfo?.address?.value || '',
      },
      officeHours: {
        label: data.contactInfo?.officeHours?.label || '',
        value: data.contactInfo?.officeHours?.value || '',
      },
      map: {
        embedUrl: data.contactInfo?.map?.embedUrl || '',
        link: data.contactInfo?.map?.link || '',
      },
    },
    showContactForm: data.showContactForm !== false,
    seoTitle: data.metadata?.title || '',
    seoDescription: data.metadata?.description || '',
    seoKeywords: data.metadata?.keywords || [],
  };

  await createOrUpdateSingleType('contact-us', entryData);
  console.log('✅ Contact Us migrated\n');
}

async function migrateHeader() {
  console.log('📄 Migrating Header...');
  
  // Default navigation structure from Header.jsx
  const defaultNavLinks = [
    { label: 'Home', href: '/', hasDropdown: false },
    {
      label: 'About Us',
      href: '#about',
      hasDropdown: true,
      submenu: [
        { label: 'Mission & Vision', href: '/home-care/vision-mission', hasNested: false },
        { label: 'Who We Are', href: '/home-care/who-we-are', hasNested: false },
        { label: 'Testimonials', href: '#testimonials', hasNested: false },
        { label: 'Careers', href: '#careers', hasNested: false },
        { label: 'FAQs', href: '/faq', hasNested: false },
        { label: 'Our Team', href: '#our-team', hasNested: false },
        { label: 'Blog', href: '/blog', hasNested: false },
        {
          label: 'Media & Press Release',
          href: '#media-press',
          hasNested: true,
          nested: [
            { label: 'Awards & Achievements', href: '#awards' },
            { label: 'Press Releases', href: '#press-releases' },
            { label: 'Interviews & Podcasts', href: '#interviews' },
            { label: 'Events & Highlights', href: '#events' },
          ],
        },
      ],
    },
    {
      label: 'Services',
      href: '#services',
      hasDropdown: true,
      submenu: [
        { label: 'Doctor on Call', href: '/home-care/doctor-on-call-dubai', hasNested: false },
        {
          label: 'Nursing Care',
          href: '/home-care/home-nursing-supportive-care',
          hasNested: true,
          nested: [
            { label: 'Elderly care', href: '/home-care/elderly-care' },
            { label: 'Mother & Baby care', href: '/home-care/mother-and-baby-care' },
            { label: 'Babysitting', href: '/home-care/babysitting' },
            { label: 'Palliative care', href: '/home-care/palliative-care' },
          ],
        },
        { label: 'Physiotherapy at Home', href: '/home-care/physiotherapy-at-home', hasNested: false },
        {
          label: 'IV Drips',
          href: '/home-care/iv-drips',
          hasNested: true,
          nested: [
            { label: 'IV NAD⁺', href: '/home-care/nad-iv' },
            { label: 'IV Glutathione Radiance Drip', href: '/home-care/glutathione-iv-therapy' },
            { label: 'IV Vitamin Therapy', href: '/home-care/iv-vitamin-therapy' },
            { label: 'IV Hydration', href: '/home-care/hangover' },
          ],
        },
        {
          label: 'Labs at Home',
          href: '/home-care/lab-testing-at-home',
          hasNested: true,
          nested: [
            { label: 'Basic & Advanced Blood Panels', href: '#blood-panels' },
            { label: 'Genetic & Epigenetic Testing', href: '/home-care/genetic-genomics-testing-at-home' },
            { label: 'Food Intolerance & Allergies', href: '/home-care/food-intolerance-testing-at-home' },
            { label: 'Hormone Panels', href: '#hormone-panels' },
            { label: "NIPT / Women's Health Panels", href: '/home-care/nipt-testing-at-home' },
            { label: 'STD Testing & Sexual Health', href: '/home-care/std-testing-at-home' },
            { label: 'COVID PCR', href: '/home-care/pcr-testing-at-home' },
          ],
        },
        { label: 'Vaccinations at Home', href: '/home-care/vaccinations-at-home', hasNested: false },
        { label: 'Concierge Radiology & Advanced Diagnostics', href: '#radiology', hasNested: false },
        { label: 'Medical Tourism', href: '/home-care/medical-tourism', hasNested: false },
      ],
    },
    {
      label: 'NADZ Exclusive',
      href: '#exclusive',
      hasDropdown: true,
      submenu: [
        { label: 'NADZ Vital Brain™', href: '/home-care/nadz-vital-brain', hasNested: false },
        {
          label: 'NADZ Autonomic Control™',
          href: '/wellness/autonomic-control',
          hasNested: true,
          nested: [
            { label: 'Sleeping Disorder', href: '/wellness/sleeping-disorder' },
            { label: 'Anxiety & Stress', href: '/wellness/anxiety-stress' },
            { label: 'Chronic Pain', href: '/wellness/chronic-pain' },
            { label: 'Erectile Dysfunction', href: '/wellness/erectile-dysfunction' },
            { label: 'Overreacting Bladder', href: '/wellness/overactive-bladder' },
          ],
        },
        { label: 'NADZ Blueprint™ (Diagnostic + Therapeutic)', href: '#blueprint', hasNested: false },
        { label: 'POC Testing (Point-of-Care Instant Screens)', href: '/home-care/poc-testing', hasNested: false },
        { label: 'NADZ Reset™ (Concierge Wellness Reset)', href: '#reset', hasNested: false },
      ],
    },
    {
      label: 'Wellness & Longevity',
      href: '#wellness',
      hasDropdown: true,
      submenu: [
        { label: 'Longevity Diagnostic Panels', href: '#longevity-panels', hasNested: false },
        { label: 'NAD⁺ + IV Therapy', href: '/wellness/nad-plus-iv-therapy', hasNested: false },
        { label: 'Peptide Therapy', href: '/wellness/peptide-therapy', hasNested: false },
        { label: 'Functional & Integrative Medicine', href: '/wellness/functional-integrated-medicine', hasNested: false },
        { label: 'Biohacking & Human Performance', href: '#biohacking', hasNested: false },
        { label: 'Gut & Microbiome Health', href: '#gut-health', hasNested: false },
        { label: 'Sleep & Stress Optimization', href: '#sleep-stress', hasNested: false },
      ],
    },
    { label: 'Contact Us', href: '/contact-us', hasDropdown: false },
  ];

  // Upload logo if it exists
  const logoPath = path.join(PUBLIC_IMAGES_DIR, 'logoo.png');
  let logoId = null;
  if (await fs.pathExists(logoPath)) {
    logoId = await uploadImageToStrapi(logoPath, 'NADZ Healthcare Logo');
  }

  const entryData = {
    logo: logoId,
    logoAlt: 'NADZ Healthcare',
    navLinks: defaultNavLinks.map(link => ({
      label: link.label,
      href: link.href,
      hasDropdown: link.hasDropdown || false,
      submenu: link.submenu?.map(subItem => ({
        label: subItem.label,
        href: subItem.href,
        hasNested: subItem.hasNested || false,
        nested: subItem.nested?.map(nestedItem => ({
          label: nestedItem.label,
          href: nestedItem.href,
        })) || [],
      })) || [],
    })),
    ctaButtonText: 'Book an appointment',
  };

  await createOrUpdateSingleType('header', entryData);
  console.log('✅ Header migrated\n');
}

async function migrateFooter() {
  console.log('📄 Migrating Footer...');
  
  // Default footer structure from NewFooter.jsx
  const defaultLinkSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Home Healthcare', href: '#' },
        { label: 'Careers', href: '#careers' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Doctor on call', href: '#' },
        { label: 'Nursing care', href: '/home-care/home-nursing-supportive-care' },
        { label: 'Elderly care', href: '/home-care/elderly-care' },
        { label: 'IV Drips', href: '/home-care/iv-drips' },
        { label: 'NADZ Vital Brain', href: '/home-care/medical-tourism' },
        { label: 'Lab testing at home', href: '/home-care/lab-testing-at-home' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Cookies Policy', href: '/cookie-policy' },
      ],
    },
  ];

  const defaultSocialLinks = [
    { platform: 'twitter', url: 'https://twitter.com', ariaLabel: 'Twitter' },
    { platform: 'instagram', url: 'https://instagram.com', ariaLabel: 'Instagram' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/nadzhealthcare', ariaLabel: 'LinkedIn' },
  ];

  // Upload footer logo if it exists
  const footerLogoPath = path.join(PROJECT_ROOT, 'public/logofooter.png');
  let footerLogoId = null;
  if (await fs.pathExists(footerLogoPath)) {
    footerLogoId = await uploadImageToStrapi(footerLogoPath, 'NADZ Healthcare Footer Logo');
  }

  const entryData = {
    logo: footerLogoId,
    logoAlt: 'NADZ Healthcare',
    description: 'At NADZ Home Healthcare, your needs guide our care. We deliver personalized health support precisely where you need it: your home, office, or hotel.',
    socialLinks: defaultSocialLinks,
    linkSections: defaultLinkSections.map(section => ({
      title: section.title,
      links: section.links.map(link => ({
        label: link.label,
        href: link.href,
      })),
    })),
    copyrightText: 'All Rights Reserved © Copyright 2025',
    licenseText: 'Licensed by Ministry of Health',
    licenseNumber: 'P4DWL25W-100725',
    floatingPhoneButton: true,
    floatingWhatsAppButton: true,
    phoneNumber: '+97180046239',
    whatsappNumber: '971521597336',
    whatsappUrl: 'https://wa.me/971521597336',
  };

  await createOrUpdateSingleType('footer', entryData);
  console.log('✅ Footer migrated\n');
}

async function createOrUpdateSingleType(contentType, data) {
  try {
    // For single types, use documents service to properly handle components
    const existing = await strapi.documents(`api::${contentType}.${contentType}`).findMany({
      limit: 1,
    });

    let documentId;
    if (existing && existing.length > 0) {
      // Update existing entry
      documentId = existing[0].documentId;
      await strapi.documents(`api::${contentType}.${contentType}`).update({
        documentId,
        data,
      });
      console.log(`  ✓ Updated existing ${contentType}`);
    } else {
      // Create new entry
      const result = await strapi.documents(`api::${contentType}.${contentType}`).create({
        data,
      });
      documentId = result.documentId;
      console.log(`  ✓ Created new ${contentType}`);
    }

    // Publish if draftAndPublish is enabled
    try {
      await strapi.documents(`api::${contentType}.${contentType}`).publish({
        documentId,
      });
      console.log(`  ✓ Published ${contentType}`);
    } catch (publishError) {
      // Draft/publish might not be enabled, ignore error
      if (!publishError.message || !publishError.message.includes('not enabled')) {
        // Ignore publish errors silently
      }
    }
  } catch (error) {
    console.error(`  ❌ Error migrating ${contentType}:`, error.message);
    if (error.details) {
      console.error(`  Details:`, JSON.stringify(error.details, null, 2));
    }
    throw error;
  }
}

async function createOrUpdateCollectionType(contentType, data, where = {}) {
  try {
    // Check if entry exists using documents service
    const existing = await strapi.documents(`api::${contentType}.${contentType}`).findMany({
      filters: where,
      limit: 1,
    });

    if (existing && existing.length > 0) {
      // Update existing entry
      await strapi.documents(`api::${contentType}.${contentType}`).update({
        documentId: existing[0].documentId,
        data,
      });
    } else {
      // Create new entry
      await strapi.documents(`api::${contentType}.${contentType}`).create({
        data,
      });
    }
  } catch (error) {
    console.error(`  ❌ Error migrating ${contentType}:`, error.message);
    throw error;
  }
}

async function readJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Upload image file to Strapi media library
 * @param {string} filePath - Absolute path to the image file
 * @param {string} altText - Alt text for the image
 * @returns {Promise<number|null>} - Media ID or null if upload fails
 */
async function uploadImageToStrapi(filePath, altText = '') {
  try {
    if (!await fs.pathExists(filePath)) {
      console.log(`  ⚠️  Image file not found: ${filePath}`);
      return null;
    }

    const fileName = path.basename(filePath);
    const mimeType = mimeTypes.lookup(filePath) || 'image/png';

    // Check if file already exists in Strapi using db query
    const existingFile = await strapi.db.query('plugin::upload.file').findOne({
      where: { name: fileName },
    });

    if (existingFile) {
      // Update existing file with alt text if needed
      if (altText && existingFile.alternativeText !== altText) {
        await strapi.db.query('plugin::upload.file').update({
          where: { id: existingFile.id },
          data: { alternativeText: altText },
        });
      }
      console.log(`  ✓ Using existing image: ${fileName} (ID: ${existingFile.id})`);
      return existingFile.id;
    }

    const stats = await fs.stat(filePath);
    const fileBuffer = await fs.readFile(filePath);
    
    // Create file object in the format Strapi upload service expects
    // Strapi v5 expects a file-like object with specific properties
    const fileObj = {
      name: fileName,
      size: stats.size,
      type: mimeType,
      path: filePath,
      buffer: fileBuffer,
    };

    // Upload using Strapi's upload service
    try {
      // The upload service expects { data: { fileInfo }, files: fileObject }
      const uploadResult = await strapi.plugins.upload.services.upload.upload({
        data: {
          fileInfo: {
            name: fileName,
            alternativeText: altText || fileName,
            caption: altText || '',
          },
        },
        files: fileObj,
      });

      // Handle response - could be array or single object
      const uploadedFile = Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;
      
      // Get the ID - could be id, documentId, or nested
      let fileId = uploadedFile?.id || uploadedFile?.documentId;
      
      // If still no ID, try to find it by name after upload
      if (!fileId) {
        const found = await strapi.db.query('plugin::upload.file').findOne({
          where: { name: fileName },
        });
        fileId = found?.id;
      }

      if (fileId) {
        console.log(`  ✓ Uploaded image: ${fileName} (ID: ${fileId})`);
        return fileId;
      } else {
        throw new Error('Upload succeeded but could not get file ID');
      }
    } catch (uploadError) {
      // If upload fails, try alternative method: create file record directly
      try {
        console.log(`  ⚠️  Standard upload failed, trying alternative method...`);
        
        // Copy file to Strapi's upload directory
        const uploadDir = path.join(__dirname, '../public/uploads');
        await fs.ensureDir(uploadDir);
        const destPath = path.join(uploadDir, fileName);
        await fs.copy(filePath, destPath);
        
        // Create file record in database
        const fileRecord = await strapi.db.query('plugin::upload.file').create({
          data: {
            name: fileName,
            alternativeText: altText || fileName,
            caption: altText || '',
            mime: mimeType,
            size: stats.size,
            url: `/uploads/${fileName}`,
            provider: 'local',
          },
        });

        console.log(`  ✓ Created image record: ${fileName} (ID: ${fileRecord.id})`);
        return fileRecord.id;
      } catch (altError) {
        console.log(`  ⚠️  Could not upload image automatically: ${uploadError.message}`);
        console.log(`  ⚠️  Please upload ${fileName} manually in Strapi Media Library`);
        return null;
      }
    }
  } catch (error) {
    console.error(`  ❌ Error uploading image ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  // Make strapi available globally for migration functions
  global.strapi = app;

  await migrateContent();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

