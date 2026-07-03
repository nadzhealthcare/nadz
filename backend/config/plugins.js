module.exports = ({ env }) => ({
  'users-permissions': {
    jwtSecret: env('JWT_SECRET'),
  },
});
