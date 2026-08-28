/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/SmartQuizJavaEE/:path*',
        destination: 'http://localhost:8081/SmartQuizJavaEE/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

