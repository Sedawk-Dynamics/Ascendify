import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
        destination: process.env.BACKEND_URL
          ? `${process.env.BACKEND_URL}/:path*`
          : "http://localhost:5002/:path*",
      },
    ];
  },
};

export default nextConfig;
