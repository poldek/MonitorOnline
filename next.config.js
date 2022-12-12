/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["openweathermap.org", "api.mapbox.com"],
  },
};

module.exports = nextConfig;
