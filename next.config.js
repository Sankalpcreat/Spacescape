/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC compiler minification
  compiler: {
    styledComponents: true, // Enable styled-components if you are using them
  },
  images: {
    domains: ["your-image-domain.com"], // Allow images from external domains if needed
  },
};

module.exports = nextConfig;
