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

    // CSS 变量支持
    "postcss-custom-properties": {
      preserve: false,
      importFrom: [
        // 导入设计 tokens
        "./styles/design-tokens.css",
        {
          customProperties: {
            "--border": "214.3 31.8% 91.4%",
            "--input": "214.3 31.8% 91.4%",
            "--ring": "222.2 84% 4.9%",
            "--background": "0 0% 100%",
            "--foreground": "222.2 84% 4.9%",
            "--primary": "221.2 83.2% 53.3%",
            "--primary-foreground": "210 40% 98%",
            "--secondary": "210 40% 96%",
            "--secondary-foreground": "222.2 84% 4.9%",
            "--destructive": "0 84.2% 60.2%",
            "--destructive-foreground": "210 40% 98%",
            "--muted": "210 40% 96%",
            "--muted-foreground": "215.4 16.3% 46.9%",
            "--accent": "210 40% 96%",
            "--accent-foreground": "222.2 84% 4.9%",
            "--popover": "0 0% 100%",
            "--popover-foreground": "222.2 84% 4.9%",
            "--card": "0 0% 100%",
            "--card-foreground": "222.2 84% 4.9%",
            "--radius": "0.5rem",
            "--color-primary": "#3b82f6",
            "--color-primary-foreground": "#ffffff",
            "--color-secondary": "#f1f5f9",
            "--color-secondary-foreground": "#0f172a",
            "--color-muted": "#f8fafc",
            "--color-muted-foreground": "#64748b",
            "--color-accent": "#f1f5f9",
            "--color-accent-foreground": "#0f172a",
            "--color-destructive": "#ef4444",
            "--color-destructive-foreground": "#ffffff",
            "--color-border": "#e2e8f0",
            "--color-input": "#e2e8f0",
            "--color-ring": "#3b82f6",
            "--font-sans":
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
            "--font-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          },
        },
        {
          customProperties: {
            "--color-background": "#ffffff",
            "--color-foreground": "#0f172a",
          },
        },
      ],
    },

    // 生产环境优化
    ...(process.env.NODE_ENV === "production"
      ? {
          // CSS 压缩
          cssnano: {},
        }
      : {}),

    // 开发环境插件
    ...(process.env.NODE_ENV === "development"
      ? {
          // CSS 语法检查
          stylelint: {
            configFile: ".stylelintrc.json",
            fix: true,
          },
        }
      : {}),
  },
}
