const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
  dest: 'public', 
  register: true,
  skipWaiting: true,
  runtimeCaching
 })
const { withPlausibleProxy } = require('next-plausible');

const nextConfig = {
  reactStrictMode: false,
};

module.exports = withPlausibleProxy(
  withPWA({
    ...nextConfig,
    images: {
      domains: ['solution-friend-bucket.s3.ap-northeast-2.amazonaws.com'],
    },
    async rewrites() {
      return [
        {
          source: '/user/:path*',
          destination: 'http://dev.gomin-chingu.site/user/:path*', // 프록시할 서버 주소
        },
      ];
    },
  })
);
