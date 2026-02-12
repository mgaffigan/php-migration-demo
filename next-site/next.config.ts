import type { NextConfig } from "next";

const phpBackend = process.env.PHP_BACKEND_URL || "http://php:80";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/todos.php",
        destination: "/todos",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // Fallback: proxy everything not handled by Next.js to PHP
      fallback: [
        {
          source: "/:path*",
          destination: `${phpBackend}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
