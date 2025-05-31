import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Fix "Unexpected end of JSON input" errors
    config.optimization.moduleIds = 'named';
    
    return config;
  },
  eslint: {
    // Allow production builds to continue even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to continue even with TypeScript errors
    ignoreBuildErrors: true,
  },
  // Ensure images are properly handled
  images: {
    unoptimized: true,
    domains: ['aifilmacademy.io', 'www.aifilmacademy.io'],
  },
  // Set asset prefix if needed (uncomment if you're having path issues)
  // assetPrefix: '.',
};

export default nextConfig;
