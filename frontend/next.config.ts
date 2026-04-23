import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: "export",
  // Se o erro 404 persistir, tente mudar o basePath para o nome exato do seu repositório no GitHub
  basePath: isGithubActions ? "/ShieldUp" : "", 
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
