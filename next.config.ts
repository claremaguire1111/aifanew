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
    domains: ['aifilmacademy.io', 'www.aifilmacademy.io'],
  },
  distDir: process.env.VERCEL ? '.vercel/output/static' : '.next',
  publicRuntimeConfig: {
    dulwichPassword: process.env.DULWICH_PASSWORD,
  },
  env: {
    NEXT_PUBLIC_DULWICH_PASSWORD: process.env.DULWICH_PASSWORD,
    RUNWAY_API_KEY: process.env.RUNWAY_API_KEY, // ✅ REQUIRED FOR BACKEND ROUTE
  },
};

export default nextConfig;
