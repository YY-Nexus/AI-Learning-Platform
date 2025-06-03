"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Award, User, BarChart2 } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "首页",
      href: "/",
      icon: Home,
      description: "返回首页查看学习概览",
    },
    {
      name: "课程",
      href: "/courses",
      icon: BookOpen,
      description: "浏览和学习AI课程",
    },
    {
      name: "考试",
      href: "/exam",
      icon: Award,
      description: "参加专业考试和测试",
    },
    {
      name: "职业路径",
      href: "/career-path",
      icon: BarChart2,
      description: "查看AI工程师职业发展路径",
    },
    {
      name: "我的",
      href: "/profile",
      icon: User,
      description: "查看个人资料和设置",
    },
  ]

  return (
    <>
      {/* 调试信息 - 显示当前路径 */}
      <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded text-xs md:hidden">
        当前路径: {pathname}
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden"
        role="navigation"
        aria-label="底部导航"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          minHeight: "64px",
        }}
      >
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const IconComponent = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-1 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50 shadow-sm border border-indigo-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
                aria-label={item.description}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  console.log(`点击了: ${item.name} -> ${item.href}`)
                }}
              >
                <IconComponent
                  className={`h-5 w-5 mb-1 transition-colors ${isActive ? "text-indigo-600" : "text-gray-500"}`}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs font-medium transition-colors ${isActive ? "text-indigo-600" : "text-gray-500"}`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
