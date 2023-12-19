/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Add your webpack configurations here
      return config;
    },
    images: {
      domains: ['drive.google.com'],
    },
  };

module.exports = nextConfig
