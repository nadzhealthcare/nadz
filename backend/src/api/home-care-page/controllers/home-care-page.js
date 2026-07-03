'use strict';

/**
 * home-care-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-care-page.home-care-page', ({ strapi }) => ({
  async find(ctx) {
    try {
      // First, get the default response with filters applied
      const { data, meta } = await super.find(ctx);
      
      if (!data || data.length === 0) {
        return { data: [], meta: {} };
      }

      // Use EntityService to properly populate component media fields for each entry
      const populatedEntries = await Promise.all(
        data.map(async (entry) => {
          try {
            // Get the entry ID (could be id or documentId)
            const entryId = entry.id || entry.documentId;
            if (!entryId) {
              return entry;
            }

            // Populate all sections and nested components so every CMS section is visible on frontend
            const entityEntry = await strapi.entityService.findOne('api::home-care-page.home-care-page', entryId, {
              populate: {
                hero: { populate: { image: true, logo: true } },
                vision: { populate: { paragraphs: true } },
                mission: { populate: { paragraphs: true, points: true } },
                whyMatters: { populate: { items: true } },
                centeredText: true,
                centeredText2: true,
                skinBrightening: true,
                servicesIntro: true,
                locationServices: true,
                artOfHealing: true,
                visitIncludes: true,
                nursingCareServices: { populate: { services: true } },
                pathway: { populate: { steps: true, ctaBlock: true } },
                faqs: { populate: '*' },
                pocTesting: true,
                bloodTestSection: true,
                labServices: { populate: { categories: true } },
                packages: { populate: { packageItems: true } },
                vitalBrainPackages: { populate: { packageTiers: true } },
                whenToConsider: true,
                benefits: { populate: { benefits: true } },
                howItWorks: true,
                signatureDrips: { populate: { drips: true } },
                ivDripTypes: { populate: { drips: true } },
                ourStory: true,
                ourCommitment: { populate: { image: true } },
                ourPromise: { populate: { items: true } },
                whoWeServe: { populate: { services: true } },
                whyDifferent: { populate: { items: true } },
                closing: true,
              }
            });

            if (!entityEntry) {
              return entry;
            }

            // Ensure entry.attributes exists (Strapi REST response uses attributes)
            const attrs = entry.attributes || entry;
            if (!entry.attributes && entry.id) {
              entry.attributes = { ...attrs };
            }
            const target = entry.attributes || entry;

            // Copy every populated section from entityEntry into response so all CMS sections appear on frontend
            const skipKeys = ['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale'];
            for (const key of Object.keys(entityEntry)) {
              if (skipKeys.includes(key)) continue;
              const value = entityEntry[key];
              if (value !== undefined && value !== null) {
                target[key] = typeof value === 'object' && !Array.isArray(value) && value !== null
                  ? JSON.parse(JSON.stringify(value))
                  : value;
                entry[key] = target[key];
              }
            }

            return entry;
          } catch (e) {
            strapi.log.error('EntityService populate error for home-care-page:', e.message);
            return entry;
          }
        })
      );

      return {
        data: populatedEntries,
        meta
      };
    } catch (error) {
      strapi.log.error('Error in home-care-page find controller:', error);
      return ctx.internalServerError(error.message);
    }
  },
  
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      
      // Use Documents API to get entry
      const entry = await strapi.documents('api::home-care-page.home-care-page').findOne({
        documentId: id,
        populate: '*',
        publicationState: 'live'
      });

      if (!entry) {
        return ctx.notFound();
      }

      // Use EntityService to populate all sections so every CMS section is visible on frontend
      try {
        const entityEntry = await strapi.entityService.findOne('api::home-care-page.home-care-page', entry.id, {
          populate: {
            hero: { populate: { image: true, logo: true } },
            vision: { populate: { paragraphs: true } },
            mission: { populate: { paragraphs: true, points: true } },
            whyMatters: { populate: { items: true } },
            centeredText: true,
            centeredText2: true,
            skinBrightening: true,
            servicesIntro: true,
            locationServices: true,
            artOfHealing: true,
            visitIncludes: true,
            nursingCareServices: { populate: { services: true } },
            pathway: { populate: { steps: true, ctaBlock: true } },
            faqs: { populate: '*' },
            pocTesting: true,
            bloodTestSection: true,
            labServices: { populate: { categories: true } },
            packages: { populate: { packageItems: true } },
            vitalBrainPackages: { populate: { packageTiers: true } },
            whenToConsider: true,
            benefits: { populate: { benefits: true } },
            howItWorks: true,
            signatureDrips: { populate: { drips: true } },
            ivDripTypes: { populate: { drips: true } },
            ourStory: true,
            ourCommitment: { populate: { image: true } },
            ourPromise: { populate: { items: true } },
            whoWeServe: { populate: { services: true } },
            whyDifferent: { populate: { items: true } },
            closing: true,
          }
        });

        if (entityEntry) {
          const attrs = entry.attributes || entry;
          if (!entry.attributes && entry.id) {
            entry.attributes = typeof attrs === 'object' && attrs !== null ? { ...attrs } : {};
          }
          const target = entry.attributes || entry;
          const skipKeys = ['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale'];
          for (const key of Object.keys(entityEntry)) {
            if (skipKeys.includes(key)) continue;
            const value = entityEntry[key];
            if (value !== undefined && value !== null) {
              target[key] = typeof value === 'object' && !Array.isArray(value) && value !== null
                ? JSON.parse(JSON.stringify(value))
                : value;
              entry[key] = target[key];
            }
          }
        }
      } catch (e) {
        strapi.log.error('EntityService populate error for home-care-page:', e.message);
      }

      return {
        data: entry,
        meta: {}
      };
    } catch (error) {
      strapi.log.error('Error in home-care-page findOne controller:', error);
      return ctx.internalServerError(error.message);
    }
  },
}));

