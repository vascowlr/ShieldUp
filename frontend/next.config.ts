import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: "export",
  // O Next.js vai descobrir o nome do seu repositório automaticamente
  basePath: isGithubActions ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
