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
