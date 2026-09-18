import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["src", "scripts", "tests"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
