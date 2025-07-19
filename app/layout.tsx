import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNav } from "@/components/bottom-nav"
import "./mobile-styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YanYu Smart Cloud³ Learning Platform - 言枢象限·语启未来",
  description: "万象归元于云枢，深栈智启新纪元 - 专业的AI应用开发学习平台",
  keywords: "AI学习, 人工智能, 云计算, 深度学习, YanYu Smart Cloud",
  authors: [{ name: "YanYu Smart Cloud³ Team" }],
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#3b82f6",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="safe-area-inset">
      <head>
        <link rel="icon" href="/images/yanyu-logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YanYu Smart Cloud³" />
      </head>
      <body className={`${inter.className} pb-20 md:pb-0`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen">
            <main className="pb-20 md:pb-0">{children}</main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
