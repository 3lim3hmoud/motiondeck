import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    // React 19 + Next 15 optimizations
    optimizePackageImports: ["lucide-react", "framer-motion", "@radix-ui/react-icons"],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "utfs.io" }, // UploadThing CDN
      { protocol: "https", hostname: "*.ufs.sh" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google avatars
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  async headers() {
    return [
      {
        // Security headers applied app-wide. Embeds get relaxed framing rules
        // scoped separately inside the /s/[shareToken]/embed route segment.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/login", destination: "/auth/login", permanent: false },
    ];
  },
};

export default nextConfig;
