/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ang-next-back.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

