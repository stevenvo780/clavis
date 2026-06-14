/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — no server needed, deploys as plain HTML/JS on Vercel
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
