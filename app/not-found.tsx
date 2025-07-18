"use client"

import Link from "next/link"
import { Home, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {/* 404 图标 */}
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">404</div>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* 错误信息 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">页面未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，您访问的页面不存在或已被移动。</p>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild>
                <Link href="/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  浏览课程
                </Link>
              </Button>

              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回上页
              </Button>
            </div>
          </div>

          {/* 帮助信息 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">需要帮助？</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/help" className="text-blue-600 hover:text-blue-800 transition-colors">
                帮助中心
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
                联系我们
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
