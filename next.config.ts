import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    return [
      { source: "/v3", destination: "/", permanent: false },
      { source: "/yomapanel/login", destination: "/login", permanent: false },
      { source: "/yomapanel/selecionar", destination: "/selecionar", permanent: false },
    ];
  },
};

export default nextConfig;
