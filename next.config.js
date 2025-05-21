/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  }
};
 
export default nextConfig; 