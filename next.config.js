/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    // 启用 Turbo
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // 图片配置
  images: {
    // 允许的图片域名
    domains: ["localhost", "images.unsplash.com", "via.placeholder.com", "picsum.photos"],
    // 图片格式
    formats: ["image/webp", "image/avif"],
    // 图片尺寸
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 编译配置
  compiler: {
    // 移除 console.log
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 输出配置
  output: "standalone",

  // 压缩配置
  compress: true,

  // 严格模式
  reactStrictMode: true,

  // 电源效率
  poweredByHeader: false,

  // 生成 etags
  generateEtags: true,

  // HTTP 保持连接
  httpAgentOptions: {
    keepAlive: true,
  },

  // 重定向配置
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },

  // 头部配置
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },

  // Webpack 配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 添加 SVG 支持
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    // 优化包大小
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": require("path").resolve(__dirname),
      }
    }

    return config
  },

  // 环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // 服务器外部包
  serverExternalPackages: ["sharp", "onnxruntime-node"],

  // TypeScript 配置
  typescript: {
    // 在生产构建时忽略 TypeScript 错误
    ignoreBuildErrors: false,
  },

  // ESLint 配置
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
