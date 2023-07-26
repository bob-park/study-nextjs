/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image 외부 이미지 사용 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazone.com',
        port: '',
        pathname: '/my-bucket/**',
      },
    ],
  },
};

module.exports = nextConfig;
