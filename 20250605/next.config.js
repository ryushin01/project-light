/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/view/searchestm/:path*",
  //       destination: "/view/searchestm",
  //       permanent: true,
  //     },
  //   ];
  // },

  async rewrites() {
    return {
      fallback: [
        {
          source: "/api11111111/:path*",
          destination: `https://appwooridev.kosapp.co.kr/api111/:path*`,
        },
      ],
    };
  },
};

if (process.env.NEXT_PUBLIC_APP_MODE === "production") {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  };
}

module.exports = nextConfig;
