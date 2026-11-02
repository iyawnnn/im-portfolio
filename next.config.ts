import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/resume", destination: "/experience", permanent: true }];
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [10, 75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;