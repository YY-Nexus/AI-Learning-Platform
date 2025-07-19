"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Trophy, User, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

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
    icon: Brain,
  },
  {
    name: "成就",
    href: "/achievements",
    icon: Trophy,
  },
  {
    name: "我的",
    href: "/profile",
    icon: User,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
