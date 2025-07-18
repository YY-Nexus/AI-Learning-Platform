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
          cssnano: {
            preset: [
              "default",
              {
                // 保留重要注释
                discardComments: {
                  removeAll: false,
                },
                // 优化字体权重
                minifyFontValues: {
                  removeQuotes: false,
                },
                // 优化选择器
                minifySelectors: true,
                // 合并规则
                mergeRules: true,
                // 移除未使用的CSS
                reduceIdents: false,
                // 优化calc()
                calc: true,
                // 优化颜色值
                colormin: true,
                // 移除重复规则
                discardDuplicates: true,
                // 移除空规则
                discardEmpty: true,
                // 移除覆盖的声明
                discardOverridden: true,
                // 移除未使用的@font-face
                discardUnused: false,
                // 合并媒体查询
                mergeMediaQueries: true,
                // 标准化字符串
                normalizeString: true,
                // 标准化URL
                normalizeUrl: true,
                // 优化背景
                reduceBackgroundRepeat: true,
                // 优化边框
                reduceBorderZero: true,
                // 优化显示值
                reduceDisplayValues: true,
                // 优化初始值
                reduceInitial: true,
                // 优化变换
                reduceTransforms: true,
                // 排序媒体查询
                sortMediaQueries: true,
                // 唯一选择器
                uniqueSelectors: true,
              },
            ],
          },

          // 移除未使用的CSS
          "@fullhuman/postcss-purgecss": {
            content: [
              "./app/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./pages/**/*.{js,ts,jsx,tsx}",
            ],
            defaultExtractor: (content) => {
              // 提取类名的正则表达式
              const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
              const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
              return broadMatches.concat(innerMatches)
            },
            safelist: {
              // 保护的类名
              standard: [
                /^bg-gradient-/,
                /^from-/,
                /^via-/,
                /^to-/,
                /^text-gradient/,
                /^animate-/,
                /^transition-/,
                /^duration-/,
                /^ease-/,
                /^delay-/,
                /^transform/,
                /^scale-/,
                /^rotate-/,
                /^translate-/,
                /^skew-/,
                /^origin-/,
              ],
              // 保护的深度选择器
              deep: [/^dark:/, /^hover:/, /^focus:/, /^active:/, /^disabled:/, /^group-hover:/, /^group-focus:/],
              // 保护的贪婪模式
              greedy: [/^data-/, /^aria-/, /^role-/],
            },
          },
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
