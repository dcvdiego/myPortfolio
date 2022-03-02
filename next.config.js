const withTM = require('next-transpile-modules')(['three']);
// withTM still gives me issues, it only just makes things slower :D
module.exports = {
  experimental: {
    runtime: 'nodejs'
  },
  reactStrictMode: false,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false };
    return config;
  }
};
