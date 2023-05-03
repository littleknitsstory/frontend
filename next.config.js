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
};

module.exports = nextConfig;
