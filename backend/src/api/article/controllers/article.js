'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    if (!data || data.length === 0) return { data: [], meta: meta || {} };
    const populated = await Promise.all(
      data.map(async (entry) => {
        const id = entry.id || entry.documentId;
        if (!id) return entry;
        try {
          const full = await strapi.entityService.findOne('api::article.article', id, {
            populate: { image: true, authorAvatar: true },
          });
          if (full?.image) entry.image = full.image;
          if (full?.authorAvatar) entry.authorAvatar = full.authorAvatar;
        } catch (e) {
          strapi.log.warn('article populate:', e.message);
        }
        return entry;
      })
    );
    return { data: populated, meta: meta || {} };
  },
  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    if (!data) return { data: null };
    const id = data.id || data.documentId;
    try {
      const full = await strapi.entityService.findOne('api::article.article', id, {
        populate: { image: true, authorAvatar: true },
      });
      if (full?.image) data.image = full.image;
      if (full?.authorAvatar) data.authorAvatar = full.authorAvatar;
    } catch (e) {
      strapi.log.warn('article findOne populate:', e.message);
    }
    return { data };
  },
}));
