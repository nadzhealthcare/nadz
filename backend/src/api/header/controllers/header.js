'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::header.header', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entries = await strapi.documents('api::header.header').findMany({
        populate: '*',
        publicationState: 'live'
      });

      const entry = entries && entries.length > 0 ? entries[0] : null;
      if (!entry) {
        return ctx.notFound();
      }

      try {
        const entityEntry = await strapi.entityService.findOne('api::header.header', entry.id, {
          populate: {
            logo: true,
            navLinks: {
              populate: {
                submenu: {
                  populate: {
                    nested: true
                  }
                }
              }
            }
          }
        });

        if (entityEntry?.logo) {
          entry.logo = entityEntry.logo;
        }
        if (entityEntry?.navLinks) {
          entry.navLinks = entityEntry.navLinks;
        }
      } catch (e) {
        strapi.log.error('EntityService populate error for header:', e.message);
      }

      return {
        data: entry,
        meta: {}
      };
    } catch (error) {
      strapi.log.error('Error in header controller:', error);
      return ctx.internalServerError(error.message);
    }
  }
}));

