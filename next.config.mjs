/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — no server needed, deploys as plain HTML/JS on Vercel
  output: 'export',
  // Match final URL trailing slash so canonical === served URL (SEO P1).
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
