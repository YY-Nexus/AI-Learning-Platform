"use client"

import Link from "next/link"
import Image from "next/image"
import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BrandHeaderProps {
  showSearch?: boolean
  showNotifications?: boolean
  showMenu?: boolean
}

export function BrandHeader({ showSearch = true, showNotifications = true, showMenu = true }: BrandHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo 和品牌名称 */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-8 w-8">
              <Image src="/images/yanyu-logo.png" alt="YanYu Smart Cloud³" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                言枢象限
              </h1>
              <p className="text-xs text-gray-500 -mt-1">语启未来</p>
            </div>
          </Link>
        </div>

        {/* 搜索框 - 桌面端 */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="搜索课程、考试、知识点..." className="pl-10 pr-4 w-full" />
            </div>
          </div>
        )}

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-2">
          {/* 移动端搜索按钮 */}
          {showSearch && (
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* 通知按钮 */}
          {showNotifications && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>
          )}

          {/* 菜单按钮 */}
          {showMenu && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile">个人中心</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/achievements">我的成就</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/analytics">学习分析</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/community">学习社区</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-assistant">AI助手</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/settings">设置</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

export default BrandHeader
