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
  // O xxhash em WebAssembly do webpack quebra com binários no Node 24
  // (https://github.com/webpack/webpack/issues/17870); sha256 evita o crash.
  webpack: (config) => {
    config.output.hashFunction = "sha256";
    return config;
  },
};

export default nextConfig;
