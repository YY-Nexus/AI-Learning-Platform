"use client"

import Image from "next/image"
import Link from "next/link"
import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BrandHeaderProps {
  title?: string
  showSearch?: boolean
  showNotifications?: boolean
  showMenu?: boolean
}

export function BrandHeader({
  title = "YanYu Smart Cloud³",
  showSearch = true,
  showNotifications = true,
  showMenu = false,
}: BrandHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {showMenu && (
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/yanyu-logo.png"
              alt="YanYu Smart Cloud³"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">{title}</h1>
              <p className="text-xs text-gray-500">万象归元于云枢，深栈智启新纪元</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              <span className="sr-only">通知</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default BrandHeader
