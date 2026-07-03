'use strict';

const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

// 1) Load .env from backend root if it exists
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// 2) Fallback: use Strapi env from ecosystem.config.js (e.g. PM2) so no .env is required
try {
  const ecosystem = require(path.join(PROJECT_ROOT, 'ecosystem.config.js'));
  const strapiApp = Array.isArray(ecosystem.apps) && ecosystem.apps.find((a) => a.name === 'strapi');
  if (strapiApp && strapiApp.env && typeof strapiApp.env === 'object') {
    for (const [key, value] of Object.entries(strapiApp.env)) {
      if (process.env[key] === undefined && value != null) {
        process.env[key] = String(value);
      }
    }
  }
} catch (_) {
  // ecosystem.config.js missing or invalid – rely on .env / shell env
}

const fs = require('fs-extra');
const mimeTypes = require('mime-types');

// Path to frontend data directory
const DATA_DIR = path.join(PROJECT_ROOT, 'src/data');
// Path to public images directory (relative to project root)
const PUBLIC_IMAGES_DIR = path.join(PROJECT_ROOT, 'public/images');

async function migrateHomeCarePages() {
  try {
    console.log('🚀 Starting Home Care Pages migration to Strapi...\n');

    // Set public permissions first
    await setPublicPermissions();

    // Migrate all home-care pages
    await migrateAllPages();

    console.log('\n✅ Home Care Pages migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  }
}

async function setPublicPermissions() {
  console.log('📝 Setting public permissions for home-care-page...');
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const contentTypeUid = 'api::home-care-page.home-care-page';
  const model = strapi.contentTypes[contentTypeUid];

  if (!model) {
    console.warn(`  ⚠️  Content type ${contentTypeUid} not found. Skipping permission setup.`);
    console.log('✅ Permissions skipped (content type not found)\n');
    return;
  }

  const actions = ['find', 'findOne'];
  const allPermissionsToCreate = [];

  for (const action of actions) {
    const fullAction = `${contentTypeUid}.${action}`;
    // Check if permission already exists
    const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
      where: {
        role: publicRole.id,
        action: fullAction,
      },
    });

    if (!existingPermission) {
      allPermissionsToCreate.push(
        strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: fullAction,
            role: publicRole.id,
          },
        })
      );
    }
  }

  if (allPermissionsToCreate.length > 0) {
    await Promise.all(allPermissionsToCreate);
    console.log('✅ Public permissions set for home-care-page\n');
  } else {
    console.log('✅ Public permissions already exist for home-care-page\n');
  }
}

async function migrateAllPages() {
  console.log('📄 Migrating all Home Care Pages...');
  
  // Check if home-care-page content type exists
  const contentTypeUid = 'api::home-care-page.home-care-page';
  const model = strapi.contentTypes[contentTypeUid];

  if (!model) {
    console.warn(`  ⚠️  Content type ${contentTypeUid} not found. Skipping migration.`);
    console.log('  ℹ️  Note: Please create the home-care-page content type first');
    return;
  }

  const data = await readJSONFile('home-care-pages.json');
  const totalPages = data.length;
  let successCount = 0;
  let errorCount = 0;

  console.log(`  Found ${totalPages} pages to migrate\n`);

  for (const pageData of data) {
    try {
      console.log(`  📄 Migrating ${pageData.slug}...`);

      // Check if entry exists
      const existing = await strapi.entityService.findMany(contentTypeUid, {
        filters: { slug: pageData.slug },
        limit: 1,
      });

      // Upload hero image if it exists
      let heroImageId = null;
      if (pageData.hero?.imageSrc) {
        const heroImagePath = pageData.hero.imageSrc.startsWith('/')
          ? path.join(PROJECT_ROOT, 'public', pageData.hero.imageSrc)
          : path.join(PUBLIC_IMAGES_DIR, path.basename(pageData.hero.imageSrc));
        const heroImageAlt = pageData.hero.imageAlt || pageData.hero.title || 'Hero image';
        heroImageId = await uploadImageToStrapi(heroImagePath, heroImageAlt);
      }

      // Prepare entry data with component structure
      const entryData = {
        slug: pageData.slug,
        seoTitle: pageData.metadata?.title || '',
        seoDescription: pageData.metadata?.description || '',
        seoKeywords: pageData.metadata?.keywords || [],
        // Map hero section
        hero: pageData.hero ? {
          title: pageData.hero.title || '',
          subheading: pageData.hero.subheading || pageData.hero.subtitle || '',
          description: pageData.hero.description || '',
          introBlurb: pageData.hero.introBlurb || '',
          primaryCtaText: pageData.hero.primaryCtaText || '',
          secondaryCtaText: pageData.hero.secondaryCtaText || '',
          image: heroImageId || null,
          buttonVariant: pageData.hero.buttonVariant || 'default',
          imageRoundedRight: pageData.hero.imageRoundedRight || false,
        } : null,
        // Map centeredText section
        centeredText: pageData.centeredText ? {
          title: pageData.centeredText.title || '',
          paragraphs: pageData.centeredText.paragraphs || [],
          ctaText: pageData.centeredText.ctaText || '',
        } : null,
        // Map servicesIntro section
        servicesIntro: pageData.servicesIntro ? {
          title: pageData.servicesIntro.title || '',
          introParagraph: pageData.servicesIntro.introParagraph || '',
          highlights: pageData.servicesIntro.highlights || [],
          closingParagraph: pageData.servicesIntro.closingParagraph || '',
          ctaText: pageData.servicesIntro.ctaText || '',
        } : null,
        // Map locationServices (repeatable component)
        locationServices: Array.isArray(pageData.locationServices) 
          ? pageData.locationServices.map(loc => ({
              title: loc.title || '',
              description: loc.description || '',
              icon: loc.icon || '',
              bullets: loc.bullets || [],
              ctaText: loc.ctaText || '',
            }))
          : [],
        // Map artOfHealing section
        artOfHealing: pageData.artOfHealing ? {
          title: pageData.artOfHealing.title || '',
          description: pageData.artOfHealing.description || '',
          highlights: pageData.artOfHealing.highlights || [],
          closingParagraphs: pageData.artOfHealing.closingParagraphs || [],
          videoUrl: pageData.artOfHealing.videoUrl || '',
          ctaText: pageData.artOfHealing.ctaText || '',
        } : null,
        // Map visitIncludes section
        visitIncludes: pageData.visitIncludes ? {
          title: pageData.visitIncludes.title || '',
          description: pageData.visitIncludes.description || '',
          items: pageData.visitIncludes.items || [],
        } : null,
        // Map nursingCareServices section
        nursingCareServices: pageData.nursingCareServices ? {
          title: pageData.nursingCareServices.title || '',
          services: Array.isArray(pageData.nursingCareServices.services)
            ? pageData.nursingCareServices.services.map(service => ({
                title: service.title || '',
                icon: service.icon || '',
                description: service.description || '',
              }))
            : [],
          note: pageData.nursingCareServices.note || '',
        } : null,
        // Map pathway section
        pathway: pageData.pathway ? {
          title: pageData.pathway.title || '',
          steps: Array.isArray(pageData.pathway.steps)
            ? pageData.pathway.steps.map(step => ({
                number: step.number || 0,
                title: step.title || '',
                description: step.description || '',
              }))
            : [],
          ctaBlock: pageData.pathway.ctaBlock ? {
            title: pageData.pathway.ctaBlock.title || '',
            description: pageData.pathway.ctaBlock.description || '',
            primaryCta: pageData.pathway.ctaBlock.primaryCta || '',
            secondaryCta: pageData.pathway.ctaBlock.secondaryCta || '',
          } : null,
        } : null,
        // Map faqs section
        faqs: pageData.faqs ? {
          title: pageData.faqs.title || '',
          items: Array.isArray(pageData.faqs.items)
            ? pageData.faqs.items.map(item => ({
                q: item.q || '',
                a: item.a || '',
              }))
            : [],
        } : null,
        // Map pocTesting section
        pocTesting: pageData.pocTesting ? {
          title: pageData.pocTesting.title || '',
          description: pageData.pocTesting.description || '',
          ctaText: pageData.pocTesting.ctaText || '',
        } : null,
        // Map bloodTestSection
        bloodTestSection: pageData.bloodTestSection ? {
          title: pageData.bloodTestSection.title || '',
          paragraphs: pageData.bloodTestSection.paragraphs || [],
        } : null,
        // Map labServices
        labServices: pageData.labServices ? {
          title: pageData.labServices.title || '',
          description: pageData.labServices.description || '',
          categories: Array.isArray(pageData.labServices.categories)
            ? pageData.labServices.categories.map(cat => ({
                title: cat.title || '',
                icon: cat.icon || '',
                description: cat.description || '',
                tests: cat.tests || [],
              }))
            : [],
        } : null,
        // Map packages
        packages: pageData.packages ? {
          title: pageData.packages.title || '',
          description: pageData.packages.description || '',
          packages: pageData.packages.packages || [],
          note: pageData.packages.note || '',
        } : null,
        vitalBrainPackages: pageData.vitalBrainPackages
          ? {
              title: pageData.vitalBrainPackages.title || '',
              subtitle: pageData.vitalBrainPackages.subtitle || '',
              ctaText: pageData.vitalBrainPackages.ctaText || '',
              packageTiers: Array.isArray(pageData.vitalBrainPackages.packages)
                ? pageData.vitalBrainPackages.packages.map((p) => ({
                    name: p.name || '',
                    description: p.description || '',
                    features: Array.isArray(p.features) ? p.features : [],
                  }))
                : [],
            }
          : null,
        // Map whenToConsider
        whenToConsider: pageData.whenToConsider ? {
          title: pageData.whenToConsider.title || '',
          items: pageData.whenToConsider.items || [],
        } : null,
        // Map benefits
        benefits: pageData.benefits ? {
          title: pageData.benefits.title || '',
          benefits: Array.isArray(pageData.benefits.benefits)
            ? pageData.benefits.benefits.map(benefit => ({
                title: benefit.title || '',
                icon: benefit.icon || '',
                description: benefit.description || '',
              }))
            : [],
          note: pageData.benefits.note || '',
          ctaText: pageData.benefits.ctaText || '',
        } : null,
        // Map howItWorks
        howItWorks: pageData.howItWorks ? {
          title: pageData.howItWorks.title || '',
          description: pageData.howItWorks.description || '',
          items: pageData.howItWorks.items || [],
          closingParagraph: pageData.howItWorks.closingParagraph || '',
        } : null,
        // Map signatureDrips (IV drip pages e.g. hangover / IV Hydration)
        signatureDrips: pageData.signatureDrips ? {
          title: pageData.signatureDrips.title || '',
          drips: Array.isArray(pageData.signatureDrips.drips)
            ? pageData.signatureDrips.drips.map((drip) => ({
                title: drip.title || '',
                icon: drip.icon || '',
                description: drip.description || '',
              }))
            : [],
        } : null,
        // Vision & Mission page – component structure for editors
        vision: pageData.vision ? {
          title: pageData.vision.title || '',
          paragraphs: (pageData.vision.paragraphs || []).map((text) => ({ text: typeof text === 'string' ? text : text?.text || '' })),
        } : null,
        mission: pageData.mission ? {
          title: pageData.mission.title || '',
          intro: pageData.mission.intro || '',
          paragraphs: (pageData.mission.paragraphs || []).map((text) => ({ text: typeof text === 'string' ? text : text?.text || '' })),
          points: (pageData.mission.points || []).map((text) => ({ text: typeof text === 'string' ? text : text?.text || '' })),
          quote: pageData.mission.quote || '',
        } : null,
        whyMatters: pageData.whyMatters ? {
          title: pageData.whyMatters.title || '',
          items: (pageData.whyMatters.items || []).map((item) => ({
            title: item.title || '',
            description: item.description || '',
            icon: item.icon || '',
          })),
        } : null,
        // Who We Are page – component structure for editors
        ourStory: pageData.ourStory ? {
          title: pageData.ourStory.title || '',
          paragraphs: (pageData.ourStory.paragraphs || []).map((text) => ({ text: typeof text === 'string' ? text : text?.text || '' })),
          quote: pageData.ourStory.quote || '',
        } : null,
        ourCommitment: pageData.ourCommitment ? {
          title: pageData.ourCommitment.title || '',
          description: pageData.ourCommitment.description || '',
          paragraph: pageData.ourCommitment.paragraph || '',
        } : null,
        ourPromise: pageData.ourPromise ? {
          title: pageData.ourPromise.title || '',
          items: (pageData.ourPromise.items || []).map((item) => ({
            title: item.title || '',
            description: item.description || '',
          })),
        } : null,
        whoWeServe: pageData.whoWeServe ? {
          title: pageData.whoWeServe.title || '',
          description: pageData.whoWeServe.description || '',
          services: (pageData.whoWeServe.services || []).map((s) => ({
            title: s.title || '',
            description: s.description || '',
          })),
        } : null,
        whyDifferent: pageData.whyDifferent ? {
          title: pageData.whyDifferent.title || '',
          items: (pageData.whyDifferent.items || []).map((item) => ({
            title: item.title || '',
            description: item.description || '',
            icon: item.icon || '',
          })),
        } : null,
        closing: pageData.closing ? {
          title: pageData.closing.title || '',
          description: pageData.closing.description || '',
          subtitle: pageData.closing.subtitle || '',
        } : null,
      };

      let documentId;
      
      // Use documents service for collection types to get documentId directly
      const documentsService = strapi.documents(contentTypeUid);
      
      if (existing && existing.length > 0) {
        // Get documentId from existing entry
        try {
          const existingDocs = await documentsService.findMany({
            filters: { slug: pageData.slug },
            limit: 1,
          });
          documentId = existingDocs?.[0]?.documentId;
        } catch (e) {
          // If documents service fails, try to get from entity
          documentId = existing[0].documentId || existing[0].id;
        }
        
        if (documentId) {
          await documentsService.update({
            documentId,
            data: entryData,
          });
          console.log(`    ✓ Updated ${pageData.slug}`);
        } else {
          // Fallback to entityService if documents service doesn't work
          await strapi.entityService.update(contentTypeUid, existing[0].id, {
            data: entryData,
          });
          console.log(`    ✓ Updated ${pageData.slug} (using entityService)`);
        }
      } else {
        // Create new entry using documents service
        try {
          const created = await documentsService.create({
            data: entryData,
          });
          documentId = created.documentId;
          console.log(`    ✓ Created ${pageData.slug}`);
        } catch (createError) {
          // Fallback to entityService if documents service doesn't work
          const created = await strapi.entityService.create(contentTypeUid, {
            data: entryData,
          });
          // Try to get documentId after creation
          try {
            const createdDocs = await documentsService.findMany({
              filters: { slug: pageData.slug },
              limit: 1,
            });
            documentId = createdDocs?.[0]?.documentId;
          } catch (e) {
            documentId = created.documentId || created.id;
          }
          console.log(`    ✓ Created ${pageData.slug} (using entityService)`);
        }
      }

      // Publish if draftAndPublish is enabled
      if (model.options.draftAndPublish && documentId) {
        try {
          await documentsService.publish({
            documentId,
          });
          console.log(`    ✓ Published ${pageData.slug}`);
        } catch (publishError) {
          // Silently ignore publish errors if draft/publish is not enabled or other expected errors
          if (publishError.message && !publishError.message.includes('not enabled') && !publishError.message.includes('already published')) {
            console.warn(`    ⚠️  Could not publish ${pageData.slug}: ${publishError.message}`);
          }
        }
      }

      successCount++;
    } catch (error) {
      errorCount++;
      console.error(`    ❌ Error migrating ${pageData.slug}:`, error.message);
      if (error.details) {
        console.error(`    Details:`, JSON.stringify(error.details, null, 2));
      }
    }
  }

  console.log(`\n  ✅ Migration Summary:`);
  console.log(`     Success: ${successCount}/${totalPages}`);
  if (errorCount > 0) {
    console.log(`     Errors: ${errorCount}/${totalPages}`);
  }
  console.log('');
}

async function readJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function uploadImageToStrapi(filePath, altText = '') {
  try {
    if (!await fs.pathExists(filePath)) {
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
      return existingFile.id;
    }

    const stats = await fs.stat(filePath);
    const fileBuffer = await fs.readFile(filePath);
    
    // Create file object in the format Strapi upload service expects
    const fileObj = {
      name: fileName,
      size: stats.size,
      type: mimeType,
      path: filePath,
      buffer: fileBuffer,
    };

    // Upload using Strapi's upload service
    try {
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
        return fileId;
      } else {
        throw new Error('Upload succeeded but could not get file ID');
      }
    } catch (uploadError) {
      // If upload fails, try alternative method: create file record directly
      try {
        // Copy file to Strapi's upload directory
        const uploadDir = path.join(PROJECT_ROOT, 'backend', 'public', 'uploads');
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

        return fileRecord.id;
      } catch (altError) {
        return null;
      }
    }
  } catch (error) {
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

  await migrateHomeCarePages();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = migrateHomeCarePages;

