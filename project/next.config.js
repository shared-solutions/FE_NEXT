// next.config.js
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  nextConfig,
  // async rewrites() {
  //     return [
  //       {
  //         source: '/user/:path*',
  //         destination: 'http://dev.gomin-chingu.site/user/:path*', // 프록시할 서버 주소
  //       },
  //     ];
  //   },
};
