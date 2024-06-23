/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.API_PROXY_DESTINATION ||
          "http://localhost:8080/api/:path*",
      },
    ];
  },

  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/**",
      },
    ],
  },
};

module.exports = nextConfig;
