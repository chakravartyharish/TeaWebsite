/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Suppress specific server errors in development
    serverComponentsExternalPackages: [],
  },
  // Production optimizations
  images: {
    domains: ['innerveda.in', 'www.innerveda.in'],
    unoptimized: true, // For static export compatibility
  },
  // Environment-specific configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://innerveda-tea-api.herokuapp.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://innerveda.netlify.app',
  },
  // Custom webpack config to suppress console warnings
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Suppress specific console warnings in development
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const message = args[0]?.toString() || '';
        // Filter out Clerk-related headers() warnings
        if (message.includes('headers()` should be awaited') || 
            message.includes('sync-dynamic-apis')) {
          return; // Don't log these specific warnings
        }
        originalConsoleError.apply(console, args);
      };
    }
    return config;
  },
  // Netlify-specific optimizations
  trailingSlash: false,
  reactStrictMode: true,
}

module.exports = nextConfig
