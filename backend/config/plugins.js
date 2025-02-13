module.exports = ({ env }) => ({
  //
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
});
