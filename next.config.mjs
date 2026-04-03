/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '/llm-skills-registry',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
