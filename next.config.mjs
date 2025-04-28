/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  // output: "export",
  reactStrictMode: true,

  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    domains: ["localhost"],
  },
};

export default nextConfig;
