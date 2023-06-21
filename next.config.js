/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "dev.backend.littleknitsstory.com",
      },
    ],
  },
};

module.exports = nextConfig;
