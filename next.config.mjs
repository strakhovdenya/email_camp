/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Настройка для обработки service worker
  async headers() {
    return [
      {
        source: '/worker.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },
  // Копирование service worker в публичную директорию
  webpack: (config, { dev, isServer }) => {
    // Добавляем поддержку TypeScript для service worker
    if (!isServer && !dev) {
      config.module.rules.push({
        test: /worker\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext',
                lib: ['webworker', 'es2015'],
              },
            },
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig; 