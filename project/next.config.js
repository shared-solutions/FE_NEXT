/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");


const config = {
  reactStrictMode: false,
  images: {
    domains: ["solution-friend-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "http://dev.gomin-chingu.site/user/:path*", // 프록시할 서버 주소
      },
    ];
  },
};

const nextConfig = withPWA({
  dest: "public",
  disable: false, // Ensure PWA is enabled in production
  runtimeCaching: [],
  buildExcludes: [/middleware-manifest\.json$/], // Exclude specific files
})(config);

module.exports = nextConfig;

