/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
module.exports = nextConfig;
