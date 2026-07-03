'use strict';

/**
 * wellness-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wellness-page.wellness-page', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    if (!data || data.length === 0) return { data: [], meta: meta || {} };
    const populated = await Promise.all(
      data.map(async (entry) => {
        const id = entry.id || entry.documentId;
        if (!id) return entry;
        try {
          const full = await strapi.entityService.findOne('api::wellness-page.wellness-page', id, {
            populate: {
              hero: { populate: { image: true, logo: true } },
              whatIs: { populate: { image: true, bullets: true } },
              benefits: { populate: { benefits: true } },
              whoCanBenefit: { populate: { items: true } },
              howItWorks: { populate: { bullets: true } },
              faqs: { populate: { items: true } },
              conditions: { populate: { sections: { populate: { items: true } } } },
              patientReports: { populate: { items: true } },
              whyChoose: { populate: { items: true } },
              journey: { populate: { steps: true } },
              safety: true,
              whyChooseFunctionalMedicine: { populate: { points: true } },
            },
          });
          const target = entry.attributes != null ? entry.attributes : entry;
          if (full?.hero) target.hero = full.hero;
          if (full?.whatIs) target.whatIs = full.whatIs;
          if (full?.benefits) target.benefits = full.benefits;
          if (full?.whoCanBenefit) target.whoCanBenefit = full.whoCanBenefit;
          if (full?.howItWorks) target.howItWorks = full.howItWorks;
          if (full?.faqs) target.faqs = full.faqs;
          if (full?.conditions) target.conditions = full.conditions;
          if (full?.patientReports) target.patientReports = full.patientReports;
          if (full?.whyChoose) target.whyChoose = full.whyChoose;
          if (full?.journey) target.journey = full.journey;
          if (full?.safety) target.safety = full.safety;
          if (full?.whyChooseFunctionalMedicine) target.whyChooseFunctionalMedicine = full.whyChooseFunctionalMedicine;
        } catch (e) {
          strapi.log.warn('wellness-page populate:', e.message);
        }
        return entry;
      })
    );
    return { data: populated, meta: meta || {} };
  },
}));
