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
  // Custom output directory configuration for Vercel
  distDir: process.env.VERCEL ? '.vercel/output/static' : '.next',
};

export default nextConfig;
