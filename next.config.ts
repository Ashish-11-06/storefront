import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.36",
        port: "8000",
        pathname: "/media/**",
      },
    ],
     dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;