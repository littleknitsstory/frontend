/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dev.backend.littleknitsstory.com",
        port: "26363",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
