export default ({ env }) => ({
    // Other admin-related configurations go here
    // (see docs.strapi.io/cms/configurations/admin-panel)
    preview: {
      enabled: true,
      config: {
        allowedOrigins: env('CLIENT_URL'),
      },
    },
  });