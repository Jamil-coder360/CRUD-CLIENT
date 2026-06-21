/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
