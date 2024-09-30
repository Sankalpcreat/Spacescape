/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC compiler minification
  compiler: {
    styledComponents: true, // Enable styled-components if you are using them
  },
  images: {
    // No need for domains or remotePatterns since images are in public folder
  },
};

module.exports = nextConfig;
