/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Suppress specific server errors in development
    serverComponentsExternalPackages: [],
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
  }
}

module.exports = nextConfig
