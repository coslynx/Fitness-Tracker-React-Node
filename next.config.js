const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')(['chart.js', 'recharts']);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: '/api/:path*',
    },
  ],
  headers: () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: 'your_csp_value' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
      ],
    },
  ],
  cors: {
    origin: ['your_allowed_origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
};

module.exports = withTM(
  withSentryConfig({
    ...nextConfig,
    sentry: {
      disableServerSideTelemetry: false,
    },
  },
  {
    // Sentry configuration
  }
));