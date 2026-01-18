/** @type {import('next').NextConfig} */
const repoName = "qrido";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",

  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",

  images: {
    unoptimized: true
  },

  trailingSlash: true
};

module.exports = nextConfig;
