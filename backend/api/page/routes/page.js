module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pages',
      handler: 'page.find',
      config: {
        policies: [],
        middlewares: [],
        info: { type: 'content-api' }
      },
    },
    {
      method: 'GET',
      path: '/pages/:id',
      handler: 'page.findOne',
      config: {
        policies: [],
        middlewares: [],
        info: { type: 'content-api' }
      },
    },
  ],
};
