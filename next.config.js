/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dev.backend.littleknitsstory.com",
        port: "26363",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
