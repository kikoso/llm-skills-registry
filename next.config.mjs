/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  // On a custom domain like findskills.dev, we usually don't need a basePath 
  // unless it's hosted in a subdirectory. Assuming root for the new domain.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
