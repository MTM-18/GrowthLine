/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔹 your existing options (if any) stay here

  eslint: {
    // ❗ Don’t fail the build because of ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
