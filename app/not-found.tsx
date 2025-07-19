"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-blue-600">404</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">页面未找到</CardTitle>
          <CardDescription className="text-gray-600">抱歉，您访问的页面不存在或已被移动</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                返回首页
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/courses">
                <Search className="w-4 h-4 mr-2" />
                浏览课程
              </Link>
            </Button>
            <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上页
            </Button>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">如果您认为这是一个错误，请联系我们的技术支持</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
