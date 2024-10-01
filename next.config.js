/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // SWC compiler for minification
  compiler: {
    styledComponents: true, // Enable styled-components support
  },
  images: {
    // Next.js optimizes local images automatically in the public folder
  },
  // Enable environment variables for client-side (Optional)
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
};

module.exports = nextConfig;
