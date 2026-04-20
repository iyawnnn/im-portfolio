import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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