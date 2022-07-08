/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GMAIL_APP_PASSWORD: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD,
  },
};

module.exports = nextConfig;
