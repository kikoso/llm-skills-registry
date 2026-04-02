/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '/llm-skills-registry',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
