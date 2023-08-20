const { parsed: env } = require('dotenv').config({
  path: `./${process.env.APP_ENV}.env`,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env,
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'res.cloudinary.com',
      'via.placeholder.com',
      'localhost',
    ],
  },
}

module.exports = nextConfig
