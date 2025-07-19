"use client"

import Image from "next/image"
import Link from "next/link"
import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/yanyu-logo.png"
              alt="YanYu Smart Cloud³"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">YanYu Smart Cloud³</h1>
              <p className="text-xs text-gray-500">言枢象限·语启未来</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">用</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BrandHeader
