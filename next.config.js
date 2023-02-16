/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['http://p16-sign-va.tiktokcdn.com'],
  },
}

module.exports = nextConfig
