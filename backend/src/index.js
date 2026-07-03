'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_DOCTOR_IMAGE_PATH = path.join(PROJECT_ROOT, 'public', 'images', 'doctor.png');

/**
 * Find or upload the default doctor.png so wellness pages can show it in CMS.
 * @returns {Promise<number|null>} - Strapi file id or null
 */
async function getOrUploadDefaultDoctorImage(strapi) {
  try {
    const existing = await strapi.db.query('plugin::upload.file').findOne({
      where: { name: 'doctor.png' },
    });
    if (existing) {
      return existing.id;
    }
    if (!fs.existsSync(DEFAULT_DOCTOR_IMAGE_PATH)) {
      strapi.log.warn('[wellness-page migration] public/images/doctor.png not found, skipping default image.');
      return null;
    }
    const fileBuffer = fs.readFileSync(DEFAULT_DOCTOR_IMAGE_PATH);
    const stats = fs.statSync(DEFAULT_DOCTOR_IMAGE_PATH);
    const uploadResult = await strapi.plugins.upload.services.upload.upload({
      data: {
        fileInfo: {
          name: 'doctor.png',
          alternativeText: 'Default wellness / What Is section image',
          caption: 'Default image shown when no image is set',
        },
      },
      files: {
        name: 'doctor.png',
        size: stats.size,
        type: 'image/png',
        path: DEFAULT_DOCTOR_IMAGE_PATH,
        buffer: fileBuffer,
      },
    });
    const file = Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;
    const fileId = file?.id ?? file?.documentId ?? (await strapi.db.query('plugin::upload.file').findOne({ where: { name: 'doctor.png' } }))?.id;
    if (fileId) {
      strapi.log.info('[wellness-page migration] Uploaded default doctor.png to media library.');
    }
    return fileId || null;
  } catch (e) {
    strapi.log.warn('[wellness-page migration] Could not upload default doctor image:', e.message);
    return null;
  }
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // 1. Set public API permissions for wellness-pages and articles so the website can fetch content
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });
      if (publicRole) {
        for (const contentTypeUid of ['api::wellness-page.wellness-page', 'api::article.article']) {
          const actions = ['find', 'findOne'];
          for (const action of actions) {
            const fullAction = `${contentTypeUid}.${action}`;
            const existing = await strapi.query('plugin::users-permissions.permission').findOne({
              where: { role: publicRole.id, action: fullAction },
            });
            if (!existing) {
              await strapi.query('plugin::users-permissions.permission').create({
                data: { action: fullAction, role: publicRole.id },
              });
              strapi.log.info(`[bootstrap] Public permission set: ${fullAction}`);
            }
          }
        }
      }
    } catch (permErr) {
      strapi.log.warn('[bootstrap] Could not set public permissions:', permErr.message);
    }

    const forceJsonBootstrapSync =
      process.env.STRAPI_ENABLE_JSON_BOOTSTRAP_SYNC === 'true' ||
      process.env.STRAPI_ENABLE_JSON_BOOTSTRAP_SYNC === '1';
    const skipJsonBootstrapSync =
      !forceJsonBootstrapSync ||
      process.env.STRAPI_SKIP_JSON_BOOTSTRAP_SYNC === 'true' ||
      process.env.STRAPI_SKIP_JSON_BOOTSTRAP_SYNC === '1';
    if (skipJsonBootstrapSync) {
      strapi.log.info(
        '[bootstrap] Skipping JSON → Strapi sync (wellness-pages.json, blogs.json). CMS edits are preserved. Set STRAPI_ENABLE_JSON_BOOTSTRAP_SYNC=true to seed/update from JSON (overwrites existing entries).'
      );
      return;
    }
    strapi.log.warn(
      '[bootstrap] STRAPI_ENABLE_JSON_BOOTSTRAP_SYNC is on — wellness pages and articles will be updated from src/data JSON on this startup.'
    );

    // 2. Migrate wellness pages from frontend JSON into Strapi wellness-page entries
    try {
      const wellnessJsonPath = path.join(
        __dirname,
        '..',
        '..',
        'src',
        'data',
        'wellness-pages.json'
      );

      if (!fs.existsSync(wellnessJsonPath)) {
        strapi.log.warn(
          '[wellness-page migration] wellness-pages.json not found, skipping migration.'
        );
      } else {
      const defaultDoctorImageId = await getOrUploadDefaultDoctorImage(strapi);

      const raw = fs.readFileSync(wellnessJsonPath, 'utf-8');
      const wellnessPages = JSON.parse(raw);

      const entries = Object.entries(wellnessPages || {});
      if (entries.length === 0) {
        strapi.log.info(
          '[wellness-page migration] wellness-pages.json is empty, nothing to migrate.'
        );
      } else {
      for (const [slug, page] of entries) {
        if (!slug || !page || typeof page !== 'object') {
          continue;
        }

        // Extract metadata from JSON
        const metadata = page.metadata || {};

        // Transform JSON structure into component structure
        const hero = page.hero ? {
          label: page.hero.label || null,
          title: page.hero.title || '',
          subtitle: page.hero.subtitle || null,
          description: page.hero.description || null,
          primaryCta: page.hero.primaryCta || null,
          secondaryCta: page.hero.secondaryCta || null,
          videoUrl: page.hero.videoUrl || null,
          videoId: page.hero.videoId || null,
        } : null;

        const toListItems = (arr) => (Array.isArray(arr) ? arr.map((s) => ({ text: typeof s === 'string' ? s : s?.text || '' })) : []);

        const whatIs = page.whatIs ? {
          title: page.whatIs.title || null,
          paragraph: page.whatIs.paragraph || null,
          bullets: toListItems(page.whatIs.bullets),
          footer: page.whatIs.footer || null,
          image: defaultDoctorImageId || undefined,
        } : null;

        const benefits = page.benefits ? {
          title: page.benefits.title || null,
          benefits: (page.benefits.items || []).map(item => ({
            title: item.title || '',
            icon: item.icon || null,
            description: item.description || null,
          })),
          note: null,
          ctaText: null,
        } : null;

        const whoCanBenefit = page.whoCanBenefit ? {
          title: page.whoCanBenefit.title || null,
          items: toListItems(page.whoCanBenefit.items),
          footer: page.whoCanBenefit.footer || null,
        } : null;

        const howItWorks = page.howItWorks ? {
          title: page.howItWorks.title || null,
          paragraph: page.howItWorks.paragraph || null,
          subtitle: page.howItWorks.subtitle || null,
          bullets: toListItems(page.howItWorks.bullets),
          footer: page.howItWorks.footer || null,
        } : null;

        const faqs = page.faqs ? {
          title: (typeof page.faqs === 'object' && page.faqs.title) ? page.faqs.title : null,
          items: Array.isArray(page.faqs)
            ? page.faqs.map(item => ({ q: item.q || '', a: item.a || '' }))
            : (page.faqs?.items || []).map(item => ({ q: item.q || '', a: item.a || '' })),
        } : null;

        const conditions = page.conditions ? {
          title: page.conditions.title || null,
          sections: (page.conditions.sections || []).map(sec => ({
            title: sec.title || null,
            items: toListItems(sec.items),
            note: sec.note || null,
          })),
          footer: page.conditions.footer || null,
        } : null;

        const patientReports = page.patientReports ? {
          title: page.patientReports.title || null,
          items: toListItems(page.patientReports.items),
        } : null;

        const whyChoose = page.whyChoose ? {
          title: page.whyChoose.title || null,
          items: toListItems(page.whyChoose.items),
        } : null;

        const journey = page.journey ? {
          title: page.journey.title || null,
          subtitle: page.journey.subtitle || null,
          steps: (page.journey.steps || []).map(step => ({
            title: step.title || '',
            description: step.description || null,
          })),
        } : null;

        const safety = page.safety ? {
          title: page.safety.title || null,
          description: page.safety.description || null,
        } : null;

        const whyChooseFunctionalMedicine = page.whyChooseFunctionalMedicine ? {
          title: page.whyChooseFunctionalMedicine.title || null,
          description: page.whyChooseFunctionalMedicine.description || null,
          points: toListItems(page.whyChooseFunctionalMedicine.points),
          footer: page.whyChooseFunctionalMedicine.footer || null,
        } : null;

        const dataToSave = {
          slug,
          seoTitle: metadata.title || null,
          seoDescription: metadata.description || null,
          seoKeywords: Array.isArray(metadata.keywords)
            ? metadata.keywords
            : metadata.keywords || null,
          hero,
          whatIs,
          benefits,
          whoCanBenefit,
          howItWorks,
          faqs,
          conditions,
          patientReports,
          whyChoose,
          journey,
          safety,
          whyChooseFunctionalMedicine,
        };

        // Check if a wellness-page with this slug already exists
        const existing = await strapi.entityService.findMany(
          'api::wellness-page.wellness-page',
          {
            filters: { slug },
            limit: 1,
          }
        );

        if (existing && existing.length > 0) {
          strapi.log.info(
            `[wellness-page migration] Skipping update for existing slug "${slug}" (CMS content preserved). Delete the entry or use STRAPI_ENABLE_JSON_BOOTSTRAP_SYNC to overwrite.`
          );
        } else {
          await strapi.entityService.create(
            'api::wellness-page.wellness-page',
            { data: dataToSave }
          );
        }
      }

      strapi.log.info(
        `[wellness-page migration] Migrated ${entries.length} wellness pages from wellness-pages.json.`
      );
      }
      }
    } catch (error) {
      strapi.log.error(
        '[wellness-page migration] Error migrating wellness pages from JSON:',
        error
      );
    }

    // 3. Migrate blog posts from frontend JSON into Strapi articles
    try {
      const blogsJsonPath = path.join(PROJECT_ROOT, 'src', 'data', 'blogs.json');
      if (!fs.existsSync(blogsJsonPath)) {
        strapi.log.warn('[article migration] blogs.json not found, skipping.');
      } else {
      const raw = fs.readFileSync(blogsJsonPath, 'utf-8');
      const blogsData = JSON.parse(raw);
      const blogPosts = Array.isArray(blogsData?.blogPosts) ? blogsData.blogPosts : [];
      if (blogPosts.length === 0) {
        strapi.log.info('[article migration] No blog posts in JSON, skipping.');
      } else {
      for (const post of blogPosts) {
        const titleSlug = post.title ? String(post.title).replace(/\s+/g, '-').toLowerCase() : '';
        const slug = String(post.id != null ? post.id : (post.slug != null ? post.slug : (titleSlug || '')));
        if (!slug) continue;
        const author = post.author && typeof post.author === 'object' ? post.author : { name: 'NADZ Team', avatar: null };
        const dataToSave = {
          title: post.title || 'Untitled',
          slug,
          excerpt: post.excerpt || null,
          featured: Boolean(post.featured),
          authorName: author.name || 'NADZ Team',
          date: post.date || null,
          fullDate: post.fullDate || null,
          readTime: post.readTime || null,
          category: post.category || null,
          categorySlug: post.categorySlug || null,
          categoryColor: post.categoryColor || null,
          content: post.content || null,
          tags: Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : []),
        };
        const existing = await strapi.entityService.findMany('api::article.article', {
          filters: { slug },
          limit: 1,
        });
        if (existing?.length > 0) {
          strapi.log.info(
            `[article migration] Skipping update for existing slug "${slug}" (CMS content preserved).`
          );
        } else {
          await strapi.entityService.create('api::article.article', { data: dataToSave });
        }
      }
      strapi.log.info(`[article migration] Migrated ${blogPosts.length} articles from blogs.json.`);
      }
      }
    } catch (error) {
      strapi.log.error('[article migration] Error migrating articles from JSON:', error);
    }
  },
};

