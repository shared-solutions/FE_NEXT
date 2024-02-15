
// next.config.js
const nextConfig = {
    reactStrictMode: false,
  };
  
  module.exports = {
    images: {
      domains: ['solution-friend-bucket.s3.ap-northeast-2.amazonaws.com'],
    },
    ...nextConfig,
    async rewrites() {
        return [
          {
            source: '/user/:path*',
            destination: 'http://dev.gomin-chingu.site/user/:path*', // 프록시할 서버 주소
          },
        ];
      },
  };
  

