'use strict';

/**
 * global controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::global.global', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entries = await strapi.documents('api::global.global').findMany({
        populate: '*',
        publicationState: 'live'
      });

      const entry = entries && entries.length > 0 ? entries[0] : null;
      if (!entry) {
        return ctx.notFound();
      }

      // Use EntityService to get properly populated media fields
      try {
        const entityEntry = await strapi.entityService.findOne('api::global.global', entry.id, {
          populate: {
            openGraphImage: true
          }
        });

        if (entityEntry?.openGraphImage) {
          entry.openGraphImage = entityEntry.openGraphImage;
        }
      } catch (e) {
        strapi.log.error('EntityService populate error:', e.message);
      }

      return {
        data: entry,
        meta: {}
      };
    } catch (error) {
      strapi.log.error('Error in global controller:', error);
      ctx.throw(500, error.message);
    }
  }
}));
