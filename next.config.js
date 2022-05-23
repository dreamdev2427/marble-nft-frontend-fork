module.exports = {
  reactStrictMode: true,
  target: "serverless",
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dk8s7xjsl/image/upload/',
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false, crypto: false };
    return config;

  }
}
