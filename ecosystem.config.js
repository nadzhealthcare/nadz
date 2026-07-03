module.exports = {
  apps: [
    {
      name: 'nadz',
      script: 'npm',
      args: 'start',
      cwd: '/srv/nadz',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        // Frontend → Backend: Next.js fetches content from this Strapi URL (server + client)
        NEXT_PUBLIC_STRAPI_URL: 'https://admincms.nadzhealthcare.com',
        STRAPI_URL: 'https://admincms.nadzhealthcare.com'
      }
    },
    {
      name: 'strapi',
      script: 'npm',
      args: 'start',
      cwd: '/srv/nadz/backend',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=2048',
        HOST: '0.0.0.0',
        PORT: 1337,
        PUBLIC_URL: 'https://admincms.nadzhealthcare.com',
        STRAPI_ADMIN_BACKEND_URL: 'https://admincms.nadzhealthcare.com',
        ADMIN_JWT_SECRET: 'R2PZ+fwn8hR8Wzo+XVrzAbkwYiROUuZ7WXWCcIDK7ak=',
        API_TOKEN_SALT: 'M9WLCx50RTolWXkuiRa9rldlRBCaC6l2siwWJVzve/o=',
        TRANSFER_TOKEN_SALT: 'vNG8tySLjlZcTCUaKvacNOTyrkR92bSbzMuxsnEli/k=',
        ENCRYPTION_KEY: 'yIaSt7TB+krsqcfEWsv/BntHQWN/FtokgNdTqroGw9A=',
        APP_KEYS: 'BdejGvakSvawvyoT1ZdHeIcufauT/ZFX4nx7CYu2Chk=,uGXD93/q3PiULw6+FITy9jiABsrAJPPPo8l7j9a9kPg=,vMzD96dhKfczipf3xJESO8VfXrDyWhs9351S3MI1QzE=,Xn3fJOP3aGrXSoBWeyqGP6lly41VdnkirzCmQJUCq3c=',
        DATABASE_CLIENT: 'mysql',
        DATABASE_HOST: 'localhost',
        DATABASE_PORT: 3306,
        DATABASE_NAME: 'nadz_prod',
        DATABASE_USERNAME: 'strapi',
        DATABASE_PASSWORD: 'strapi',
        JWT_SECRET: '0LkJ5f5mn7glNR67caUmFw=='
      }
    }
  ]
};
