# YanYu Smart Cloud³ Learning Platform

<div align="center">
  <img src="public/images/yanyu-logo.png" alt="YanYu Logo" width="120" height="120" />
  <h1>言枢象限·语启未来</h1>
  <p>万象归元于云枢，深栈智启新纪元</p>
  <div style="display: flex; gap: 8px; justify-content: center; margin-top: 16px;">
    <img src="https://img.shields.io/badge/Next.js-15-blue?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-v3-purple?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Radix%20UI-v1-orange?style=flat-square" alt="Radix UI" />
  </div>
</div>

## 📋 项目简介

**YanYu Smart Cloud³ Learning Platform** 是一个专业的AI应用开发学习平台，致力于提供系统化的人工智能知识体系和实践指导，帮助学习者快速掌握AI技术并应用于实际场景。

平台采用现代化的前端技术栈构建，提供流畅的用户体验和丰富的学习资源，涵盖从AI基础知识到高级应用开发的全链路学习路径。

## 🚀 核心功能

### 🔍 学习仪表盘
- 个性化学习概览，展示学习进度和成就
- 智能推荐课程，基于用户兴趣和学习历史
- 学习数据可视化，直观呈现学习状态

### 📚 课程体系
- 多元化AI课程内容，覆盖大语言模型、提示词工程等热门领域
- 章节化学习路径，循序渐进掌握知识点
- 进度跟踪功能，实时记录学习状态

### 📝 专业考试
- 多样化的测试题型，检验学习成果
- 考试结果分析，提供详细的能力评估
- 专业认证体系，提升职业竞争力

### 🎯 职业路径规划
- AI工程师职业发展路径设计
- 技能图谱，清晰展示能力成长路线
- 学习建议，助力职业目标达成

### 👤 个人中心
- 个人资料管理，支持信息编辑
- 学习成就展示，记录成长历程
- 账户设置，提供个性化配置选项

## 🛠️ 技术栈

### 前端技术
| 技术/框架 | 版本 | 用途 |
|----------|------|------|
| Next.js | 15.2.4 | React框架，服务端渲染 |
| React | 18+ | 前端UI构建 |
| TypeScript | - | 静态类型检查 |
| Tailwind CSS | v3 | 实用优先的CSS框架 |
| Radix UI | v1 | 可访问性组件库 |
| lucide-react | ^0.454.0 | 图标库 |
| @hookform/resolvers | ^3.9.1 | 表单验证 |
| date-fns | 4.1.0 | 日期处理 |
| embla-carousel-react | 8.5.1 | 轮播组件 |

### 开发工具
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **pnpm**: 包管理器

## 📁 项目结构

```text
├── app/                  # Next.js应用目录
│   ├── accessibility/    # 无障碍相关页面
│   ├── achievements/     # 成就页面
│   ├── ai-assistant/     # AI助手页面
│   ├── analytics/        # 分析页面
│   ├── career-path/      # 职业路径页面
│   ├── community/        # 社区页面
│   ├── courses/          # 课程页面
│   ├── exam/             # 考试页面
│   ├── profile/          # 个人资料页面
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 布局组件
│   └── page.tsx          # 首页组件
├── components/           # 公共组件
│   ├── accessibility/    # 无障碍组件
│   ├── ui/               # UI组件
│   ├── bottom-nav.tsx    # 底部导航组件
│   ├── brand-header.tsx  # 品牌头部组件
│   ├── mobile-nav.tsx    # 移动端导航组件
│   └── responsive-layout.tsx # 响应式布局组件
├── data/                 # 模拟数据
├── hooks/                # 自定义hooks
├── lib/                  # 工具函数
├── public/               # 静态资源
│   ├── images/           # 图片资源
├── styles/               # 样式文件
└── tailwind.config.ts    # Tailwind配置
```

## 🚀 快速开始

### 环境要求
- **Node.js**: 18.17.0或更高版本
- **pnpm**: 8.0.0或更高版本

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动开发服务器。

### 构建生产版本

```bash
pnpm build
```

### 运行生产版本

```bash
pnpm start
```

## 📱 响应式设计

平台支持多设备访问，自动适配不同屏幕尺寸：

- **移动端**: 底部导航栏 + 侧边菜单
- **平板端**: 优化的布局和交互
- **桌面端**: 顶部导航栏 + 完整内容展示

## 🌐 页面导航

### 移动端
通过底部导航栏访问主要功能模块：
- **首页**: 学习仪表盘和推荐课程
- **课程**: 浏览和学习AI相关课程
- **考试**: 参加专业测试和认证
- **职业路径**: 查看AI工程师职业发展路线
- **我的**: 个人资料和设置

### 桌面端
通过顶部导航栏访问各个功能模块，提供更丰富的操作选项和内容展示。

## 🎨 设计风格

平台采用现代化的设计风格：
- **色彩方案**: 蓝色为主色调，代表科技和智慧
- **视觉层次**: 清晰的卡片式布局，突出重点内容
- **交互体验**: 平滑的过渡动画，即时的反馈效果
- **排版**: 现代无衬线字体，清晰的层级结构

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目仅供学习和参考使用。

## 📧 联系我们

如有任何问题或建议，请随时联系我们。

<div align="center">
  <p>© 2024 YanYu Smart Cloud³ Team. 言枢象限·语启未来</p>
</div>