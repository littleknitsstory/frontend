/** @type {import('next').NextConfig} */
const nextConfig = {
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
  output: "standalone",
};

module.exports = nextConfig;
