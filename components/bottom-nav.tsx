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
    },
    {
      name: "课程",
      href: "/courses",
      icon: BookOpen,
    },
    {
      name: "考试",
      href: "/exam",
      icon: Award,
    },
    {
      name: "职业路径",
      href: "/career-path",
      icon: BarChart2,
    },
    {
      name: "我的",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-lg md:hidden"
      style={{ display: "block !important" }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-1 rounded-lg transition-all duration-200 ${
                isActive ? "text-blue-600 bg-blue-100" : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`}
            >
              <IconComponent className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
