import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNav } from "@/components/bottom-nav"
import "./mobile-styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "生成式AI应用工程师学习系统",
  description: "专业的AI应用开发学习平台",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="safe-area-inset">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className={`${inter.className} pb-20 md:pb-0`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen">
            <main className="pb-20 md:pb-0">{children}</main>
            {/* 底部导航栏 - 确保在所有页面显示 */}
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
