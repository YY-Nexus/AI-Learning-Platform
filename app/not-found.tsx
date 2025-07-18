import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">页面未找到</h1>
          <p className="text-gray-600">抱歉，您访问的页面不存在或已被移动。</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                返回首页
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex items-center gap-2 bg-transparent">
              <Link href="/courses">
                <Search className="h-4 w-4" />
                浏览课程
              </Link>
            </Button>
          </div>

          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              返回上一页
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>如果您认为这是一个错误，请联系我们的技术支持。</p>
        </div>
      </div>
    </div>
  )
}
