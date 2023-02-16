/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'http://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f5f9c186305e769c7ae49bd7ed601aa4%7ec5_720x720.jpeg?',
    ],
  },
}

module.exports = nextConfig
