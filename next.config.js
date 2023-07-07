/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.imagin.studio'],
    // domains: ['api.pexels.com']

  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
