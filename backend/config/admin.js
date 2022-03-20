module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f6250fa19356a7c6ee8061d14208cd6d'),
  },
});
