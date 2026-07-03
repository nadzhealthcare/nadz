'use strict';

/**
 * contact-us controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-us.contact-us', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entries = await strapi.documents('api::contact-us.contact-us').findMany({
        populate: '*',
        publicationState: 'live'
      });

      const entry = entries && entries.length > 0 ? entries[0] : null;
      if (!entry) {
        return ctx.notFound();
      }

      // Use EntityService to get properly populated component data
      try {
        const entityEntry = await strapi.entityService.findOne('api::contact-us.contact-us', entry.id, {
          populate: {
            hero: true,
            contactInfo: {
              populate: {
                phone: true,
                email: true,
                address: true,
                officeHours: true,
                map: true
              }
            }
          }
        });

        // Merge populated data
        if (entityEntry?.hero) {
          entry.hero = entityEntry.hero;
        }
        if (entityEntry?.contactInfo) {
          entry.contactInfo = entityEntry.contactInfo;
        }
      } catch (e) {
        strapi.log.error('EntityService populate error:', e.message);
      }

      return {
        data: entry,
        meta: {}
      };
    } catch (error) {
      strapi.log.error('Error in contact-us controller:', error);
      ctx.throw(500, error.message);
    }
  }
}));

