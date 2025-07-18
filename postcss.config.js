module.exports = {
  plugins: {
    // CSS 导入支持
    "postcss-import": {},

    // CSS 嵌套支持
    "tailwindcss/nesting": "postcss-nested",

    // Tailwind CSS 核心插件
    tailwindcss: {},

    // 自动添加浏览器前缀
    autoprefixer: {},
  },
}
