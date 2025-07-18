"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, User, GraduationCap, Target } from "lucide-react"
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
    icon: GraduationCap,
  },
  {
    name: "练习",
    href: "/practice",
    icon: Target,
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
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
