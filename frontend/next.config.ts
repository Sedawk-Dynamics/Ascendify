import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/_/backend/:path*",
        destination: "http://localhost:5002/:path*",
      },
    ];
  },
};

export default nextConfig;
