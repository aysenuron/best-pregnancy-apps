import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image optimization for better performance */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow images from any https source - narrow this down in production
      },
    ],
  },

  /* Security and performance headers */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },

  /* Trailing slash behavior - consistent URLs are important for SEO */
  trailingSlash: false,

  /* Enable compression */
  compress: true,
};

export default nextConfig;