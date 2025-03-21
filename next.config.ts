import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  require("./proxy-setup");
}

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
