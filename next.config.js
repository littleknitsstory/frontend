/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
