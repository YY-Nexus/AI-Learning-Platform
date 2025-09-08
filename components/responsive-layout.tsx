import type { ReactNode } from "react"
import { MobileNav } from "./mobile-nav"
import { BottomNav } from "./bottom-nav"
import { BrandHeader } from "./brand-header"
import { BrandFooter } from "./brand-footer"
import { SkipLink } from "./accessibility/skip-link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface ResponsiveLayoutProps {
  children: ReactNode
  title?: string
  user: {
    name: string
    avatar: string
    level: string
  }
}

export function ResponsiveLayout({ children, title, user }: ResponsiveLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SkipLink href="#main-content">跳到主内容</SkipLink>

      {/* 导航栏 */}
      <nav
        className="bg-white/95 backdrop-blur-md border-b-2 border-gray-200 sticky top-0 z-40 shadow-sm"
        role="navigation"
        aria-label="主导航"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <MobileNav user={user} />
              <BrandHeader showSubtitle={false} size="sm" />
              {title && (
                <div className="hidden sm:block">
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-lg font-semibold text-gray-900">{title}</span>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-4" role="menubar">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                asChild
              >
                <Link href="/" role="menuitem">
                  首页
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                asChild
              >
                <Link href="/courses" role="menuitem">
                  课程中心
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                asChild
              >
                <Link href="/exam" role="menuitem">
                  练习测试
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                asChild
              >
                <Link href="/progress" role="menuitem">
                  学习进度
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                asChild
              >
                <Link href="/team" role="menuitem">
                  团队管理
                </Link>
              </Button>
              <div className="relative group">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-blue-50"
                  aria-expanded="false"
                  aria-controls="user-menu"
                  aria-label="用户菜单"
                >
                  <Avatar className="h-8 w-8 border-2 border-blue-200">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.name || '用户'}的头像`} />
                    <AvatarFallback>{user.name ? user.name[0] : '用'}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium hidden lg:inline-block">{user.name || '用户'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* 品牌页脚 */}
      <BrandFooter />

      {/* 底部导航 - 确保在移动端显示 */}
      <BottomNav />
    </div>
  )
}
