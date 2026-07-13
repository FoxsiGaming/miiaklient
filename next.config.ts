import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS);
const basePath = configuredBasePath || (isGitHubPages && repoName ? `/${repoName}` : "");
const assetPrefix = basePath ? `${basePath}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
