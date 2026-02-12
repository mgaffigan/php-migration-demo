import type { NextConfig } from "next";

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
      {
        source: "/notes.php",
        destination: "/notes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
