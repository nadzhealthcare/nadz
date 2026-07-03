'use strict';

/**
 * home-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Use Document Service with explicit deep populate so component media (hero image, carouselImages) are included.
      // populate: '*' alone may not populate nested component media in all Strapi 5 setups.
      const entries = await strapi.documents('api::home-page.home-page').findMany({
        publicationState: 'live',
        populate: {
          hero: {
            populate: ['image', 'carouselImages', 'serviceChips'],
          },
          trustedProviders: {
            populate: ['statistics', 'card1Image', 'card2Image'],
          },
          mainGoal: {
            populate: ['image'],
          },
          howItWorks: {
            populate: {
              steps: {
                populate: ['image'],
              },
            },
          },
          expertDoctors: {
            populate: {
              doctors: {
                populate: ['image'],
              },
            },
          },
          keyVision: {
            populate: ['items'],
          },
          partners: {
            populate: {
              partners: {
                populate: ['logo'],
              },
            },
          },
          associates: {
            populate: {
              associates: {
                populate: ['image'],
              },
            },
          },
          googleReviews: {
            populate: ['reviews'],
          },
          servicesSection: {
            populate: ['services'],
          },
          premiumCta: {
            populate: ['backgroundImage'],
          },
        },
      });

      const entry = entries && entries.length > 0 ? entries[0] : null;
      if (!entry) {
        return ctx.notFound();
      }

      // Ensure top-level component objects exist so frontend never gets undefined
      if (!entry.hero) entry.hero = {};
      if (!entry.trustedProviders) entry.trustedProviders = {};
      if (!entry.mainGoal) entry.mainGoal = {};
      if (!entry.howItWorks) entry.howItWorks = {};
      if (!entry.expertDoctors) entry.expertDoctors = {};
      if (!entry.keyVision) entry.keyVision = {};
      if (!entry.partners) entry.partners = {};
      if (!entry.associates) entry.associates = {};
      if (!entry.googleReviews) entry.googleReviews = {};
      if (!entry.servicesSection) entry.servicesSection = {};
      if (!entry.premiumCta) entry.premiumCta = {};

      return {
        data: entry,
        meta: {},
      };
    } catch (error) {
      strapi.log.error('Error in home-page controller:', error);
      return ctx.internalServerError(error.message);
    }
  }
}));

