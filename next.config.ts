import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker에서는 standalone, Vercel에서는 기본 모드
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
};

export default nextConfig;
