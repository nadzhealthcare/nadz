'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::footer.footer', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entries = await strapi.documents('api::footer.footer').findMany({
        populate: '*',
        publicationState: 'live'
      });

      const entry = entries && entries.length > 0 ? entries[0] : null;
      if (!entry) {
        return ctx.notFound();
      }

      try {
        const entityEntry = await strapi.entityService.findOne('api::footer.footer', entry.id, {
          populate: {
            logo: true,
            socialLinks: true,
            linkSections: {
              populate: {
                links: true
              }
            }
          }
        });

        if (entityEntry?.logo) {
          entry.logo = entityEntry.logo;
        }
        if (entityEntry?.socialLinks) {
          entry.socialLinks = entityEntry.socialLinks;
        }
        if (entityEntry?.linkSections) {
          entry.linkSections = entityEntry.linkSections;
        }
      } catch (e) {
        strapi.log.error('EntityService populate error for footer:', e.message);
      }

      return {
        data: entry,
        meta: {}
      };
    } catch (error) {
      strapi.log.error('Error in footer controller:', error);
      return ctx.internalServerError(error.message);
    }
  }
}));

