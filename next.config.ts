import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iansebastian.dev" }],
        destination: "https://iansebastian.dev/:path*",
        permanent: true,
      },
    ];
  },
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