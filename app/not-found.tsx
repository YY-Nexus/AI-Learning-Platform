import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">页面未找到</CardTitle>
          <CardDescription className="text-gray-600">抱歉，您访问的页面不存在或已被移动</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">可能的原因：</p>
            <ul className="text-xs text-gray-400 space-y-1 mb-6">
              <li>• 页面链接已过期</li>
              <li>• 输入的网址有误</li>
              <li>• 页面正在维护中</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                浏览课程
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
