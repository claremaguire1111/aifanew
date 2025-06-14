import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.optimization.moduleIds = 'named';
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['aifilmacademy.io', 'www.aifilmacademy.io', 'myaifafinalists.s3.us-east-2.amazonaws.com'],
  },
  distDir: '.next',
  publicRuntimeConfig: {
    dulwichPassword: process.env.DULWICH_PASSWORD,
  },
  env: {
    NEXT_PUBLIC_DULWICH_PASSWORD: process.env.DULWICH_PASSWORD,
    RUNWAY_API_KEY: process.env.RUNWAY_API_KEY, // ✅ REQUIRED FOR BACKEND ROUTE
  },
  // API configuration for handling larger payloads
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase limit for image uploads
    },
    responseLimit: false, // No limit on response size
    externalResolver: true, // Mark routes as being handled by external resolver to prevent conflicts
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;