'use strict';

const fs = require('fs-extra');
const path = require('path');

// Path to project root (assuming script runs from backend/scripts)
const PROJECT_ROOT = path.resolve(__dirname, '../..');
// Path to frontend data directory
const DATA_DIR = path.join(PROJECT_ROOT, 'src/data');

async function migrateSSRPages() {
  try {
    console.log('🚀 Starting SSR pages migration to Strapi...\n');

    // Set public permissions first
    await setPublicPermissions();

    // Migrate single types
    await migrateFAQ();
    await migratePrivacyPolicy();
    await migrateTermsAndConditions();
    await migrateCookiePolicy();

    // Migrate home-care pages (collection type)
    await migrateHomeCarePages();

    console.log('\n✅ SSR pages migration completed successfully!');
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
    'faq': ['find'],
    'privacy-policy': ['find'],
    'terms-and-conditions': ['find'],
    'cookie-policy': ['find'],
    'home-care-page': ['find', 'findOne'],
  };

  // Only remove permissions for the content types we're managing
  const contentTypesToManage = Object.keys(permissions);
  for (const contentType of contentTypesToManage) {
    const actions = permissions[contentType];
    for (const action of actions) {
      const actionName = `api::${contentType}.${contentType}.${action}`;
      // Delete existing permission if it exists
      await strapi.query('plugin::users-permissions.permission').deleteMany({
        where: {
          role: publicRole.id,
          action: actionName,
        },
      });
      // Create new permission
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: actionName,
          role: publicRole.id,
        },
      });
    }
  }

  console.log('✅ Public permissions set\n');
}

async function migrateFAQ() {
  console.log('❓ Migrating FAQ...');
  const data = await readJSONFile('faq.json');

  const entryData = {
    seoTitle: data.metadata?.title || '',
    seoDescription: data.metadata?.description || '',
    seoKeywords: data.metadata?.keywords || [],
    hero: {
      title: data.hero?.title || '',
      description: data.hero?.subtitle || '',
    },
    categories: (data.categories || []).map(category => ({
      categoryId: category.id,
      title: category.title || '',
      questions: (category.questions || []).map(q => ({
        q: q.q || '',
        a: q.a || '',
      })),
    })),
    contactSection: {
      title: data.contactSection?.title || '',
      description: data.contactSection?.description || '',
      ctaText: data.contactSection?.ctaText || '',
    },
  };

  await createOrUpdateSingleType('faq', entryData);
  console.log('✅ FAQ migrated\n');
}

async function migratePrivacyPolicy() {
  console.log('🔒 Migrating Privacy Policy...');
  const data = await readJSONFile('privacy-policy.json');

  const entryData = {
    seoTitle: data.metadata?.title || '',
    seoDescription: data.metadata?.description || '',
    seoKeywords: data.metadata?.keywords || [],
    hero: {
      title: data.hero?.title || '',
      description: data.hero?.subtitle || '',
    },
    effectiveDate: data.effectiveDate ? {
      effectiveDate: data.effectiveDate.effectiveDate || '',
      lastUpdated: data.effectiveDate.lastUpdated || '',
    } : null,
    sections: (data.sections || []).map(section => {
      const sectionData = {
        number: section.number,
        title: section.title || '',
        intro: section.intro || null,
        content: section.content || null,
        items: section.items || null,
        note: section.note || null,
        emergency: section.emergency || null,
      };

      // Add subsections if present
      if (section.subsections && Array.isArray(section.subsections)) {
        sectionData.subsections = section.subsections.map(sub => ({
          title: sub.title || '',
          content: sub.content || '',
        }));
      }

      // Add browserInstructions if present
      if (section.browserInstructions) {
        sectionData.browserInstructions = {
          intro: section.browserInstructions.intro || '',
          instructions: section.browserInstructions.instructions || [],
        };
      }

      // Add disclaimer if present
      if (section.disclaimer) {
        sectionData.disclaimer = {
          title: section.disclaimer.title || '',
          items: section.disclaimer.items || [],
        };
      }

      // Add contact if present
      if (section.contact) {
        sectionData.contact = {
          name: section.contact.name || null,
          email: section.contact.email || null,
          phone: section.contact.phone || null,
          location: section.contact.location || null,
        };
      }

      return sectionData;
    }),
    questionsSection: data.questionsSection ? {
      title: data.questionsSection.title || '',
      description: data.questionsSection.description || '',
      ctaText: data.questionsSection.ctaText || '',
      ctaLink: data.questionsSection.ctaLink || null,
    } : null,
  };

  await createOrUpdateSingleType('privacy-policy', entryData);
  console.log('✅ Privacy Policy migrated\n');
}

async function migrateTermsAndConditions() {
  console.log('📋 Migrating Terms and Conditions...');
  const data = await readJSONFile('terms-and-conditions.json');

  const entryData = {
    seoTitle: data.metadata?.title || '',
    seoDescription: data.metadata?.description || '',
    seoKeywords: data.metadata?.keywords || [],
    hero: {
      title: data.hero?.title || '',
      description: data.hero?.subtitle || '',
    },
    sections: (data.sections || []).map(section => {
      const sectionData = {
        number: section.number,
        title: section.title || '',
        intro: section.intro || null,
        content: section.content || null,
        items: section.items || null,
        emergency: section.emergency || null,
      };

      // Add disclaimer if present
      if (section.disclaimer) {
        sectionData.disclaimer = {
          title: section.disclaimer.title || '',
          items: section.disclaimer.items || [],
        };
      }

      // Add contact if present
      if (section.contact) {
        sectionData.contact = {
          company: section.contact.company || null,
          address: section.contact.address || null,
          email: section.contact.email || null,
          phone: section.contact.phone || null,
        };
      }

      return sectionData;
    }),
    questionsSection: data.questionsSection ? {
      title: data.questionsSection.title || '',
      description: data.questionsSection.description || '',
      ctaText: data.questionsSection.ctaText || '',
      ctaLink: data.questionsSection.ctaLink || null,
    } : null,
  };

  await createOrUpdateSingleType('terms-and-conditions', entryData);
  console.log('✅ Terms and Conditions migrated\n');
}

async function migrateCookiePolicy() {
  console.log('🍪 Migrating Cookie Policy...');
  const data = await readJSONFile('cookie-policy.json');

  const entryData = {
    seoTitle: data.metadata?.title || '',
    seoDescription: data.metadata?.description || '',
    seoKeywords: data.metadata?.keywords || [],
    hero: {
      title: data.hero?.title || '',
      description: data.hero?.subtitle || '',
    },
    effectiveDate: data.effectiveDate ? {
      effectiveDate: data.effectiveDate.effectiveDate || '',
      lastUpdated: data.effectiveDate.lastUpdated || null,
    } : null,
    sections: (data.sections || []).map(section => {
      const sectionData = {
        number: section.number,
        title: section.title || '',
        intro: section.intro || null,
        content: section.content || null,
        items: section.items || null,
        note: section.note || null,
      };

      // Add subsections if present
      if (section.subsections && Array.isArray(section.subsections)) {
        sectionData.subsections = section.subsections.map(sub => ({
          title: sub.title || '',
          content: sub.content || '',
        }));
      }

      // Add browserInstructions if present
      if (section.browserInstructions) {
        sectionData.browserInstructions = {
          intro: section.browserInstructions.intro || '',
          instructions: section.browserInstructions.instructions || [],
        };
      }

      // Add contact if present
      if (section.contact) {
        sectionData.contact = {
          name: section.contact.name || null,
          email: section.contact.email || null,
          phone: section.contact.phone || null,
          location: section.contact.location || null,
        };
      }

      return sectionData;
    }),
    questionsSection: data.questionsSection ? {
      title: data.questionsSection.title || '',
      description: data.questionsSection.description || '',
      ctaText: data.questionsSection.ctaText || '',
      ctaLink: data.questionsSection.ctaLink || null,
    } : null,
  };

  await createOrUpdateSingleType('cookie-policy', entryData);
  console.log('✅ Cookie Policy migrated\n');
}

async function migrateHomeCarePages() {
  console.log('🏠 Migrating Home Care Pages (vision-mission, who-we-are)...');
  
  // Check if home-care-page content type exists
  try {
    const contentType = strapi.contentTypes['api::home-care-page.home-care-page'];
    if (!contentType) {
      console.log('  ⚠️  home-care-page content type not found, skipping...');
      console.log('  ℹ️  Note: Home care pages are still using static JSON files');
      return;
    }
  } catch (error) {
    console.log('  ⚠️  Could not check home-care-page content type, skipping...');
    console.log('  ℹ️  Note: Home care pages are still using static JSON files');
    return;
  }

  const data = await readJSONFile('home-care-pages.json');

  // Filter for vision-mission and who-we-are pages
  const pagesToMigrate = data.filter(page => 
    page.slug === 'vision-mission' || page.slug === 'who-we-are'
  );

  for (const pageData of pagesToMigrate) {
    console.log(`  📄 Migrating ${pageData.slug}...`);

    try {
      // Use entityService instead of documents service for collection types
      const existing = await strapi.entityService.findMany('api::home-care-page.home-care-page', {
        filters: { slug: pageData.slug },
        limit: 1,
      });

      // Map to Strapi component shape (editable fields for non-IT editors)
      const entryData = {
        slug: pageData.slug,
        seoTitle: pageData.metadata?.title || '',
        seoDescription: pageData.metadata?.description || '',
        seoKeywords: pageData.metadata?.keywords || [],
        hero: pageData.hero ? {
          title: pageData.hero.title || '',
          subheading: pageData.hero.subtitle || pageData.hero.subheading || '',
          description: pageData.hero.description || '',
        } : null,
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
          items: (pageData.whyMatters.items || []).map((item) => ({ title: item.title || '', description: item.description || '', icon: item.icon || '' })),
        } : null,
        faqs: pageData.faqs ? { title: pageData.faqs.title || '', items: (pageData.faqs.items || []).map((item) => ({ q: item.q || '', a: item.a || '' })) } : null,
        ourStory: pageData.ourStory ? {
          title: pageData.ourStory.title || '',
          paragraphs: (pageData.ourStory.paragraphs || []).map((text) => ({ text: typeof text === 'string' ? text : text?.text || '' })),
          quote: pageData.ourStory.quote || '',
        } : null,
        ourCommitment: pageData.ourCommitment ? { title: pageData.ourCommitment.title || '', description: pageData.ourCommitment.description || '', paragraph: pageData.ourCommitment.paragraph || '' } : null,
        ourPromise: pageData.ourPromise ? { title: pageData.ourPromise.title || '', items: (pageData.ourPromise.items || []).map((item) => ({ title: item.title || '', description: item.description || '' })) } : null,
        whoWeServe: pageData.whoWeServe ? { title: pageData.whoWeServe.title || '', description: pageData.whoWeServe.description || '', services: (pageData.whoWeServe.services || []).map((s) => ({ title: s.title || '', description: s.description || '' })) } : null,
        whyDifferent: pageData.whyDifferent ? { title: pageData.whyDifferent.title || '', items: (pageData.whyDifferent.items || []).map((item) => ({ title: item.title || '', description: item.description || '', icon: item.icon || '' })) } : null,
        closing: pageData.closing ? { title: pageData.closing.title || '', description: pageData.closing.description || '', subtitle: pageData.closing.subtitle || '' } : null,
      };

      if (existing && existing.length > 0) {
        await strapi.entityService.update('api::home-care-page.home-care-page', existing[0].id, {
          data: entryData,
        });
        console.log(`  ✓ Updated ${pageData.slug}`);
      } else {
        await strapi.entityService.create('api::home-care-page.home-care-page', {
          data: entryData,
        });
        console.log(`  ✓ Created ${pageData.slug}`);
      }
    } catch (error) {
      console.log(`  ⚠️  Could not migrate ${pageData.slug}: ${error.message}`);
      console.log(`  ℹ️  This page will continue using static JSON data`);
    }
  }

  console.log('✅ Home Care Pages migration completed\n');
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

// Removed createOrUpdateCollectionType - now handled directly in migrateHomeCarePages

async function readJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  // Make strapi available globally for migration functions
  global.strapi = app;

  await migrateSSRPages();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = migrateSSRPages;

