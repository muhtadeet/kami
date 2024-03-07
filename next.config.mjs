/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipwaiting: true,
  }),
  images: {
    domains: ["files.edgestore.dev"],
  },
  reactStrictMode: false,
};

export default nextConfig;
