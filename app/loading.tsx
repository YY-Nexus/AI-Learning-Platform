import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 头部骨架 */}
      <div className="mb-8">
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 课程列表 */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 学习进度 */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 右侧边栏 */}
          <div className="space-y-6">
            {/* 用户信息 */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </CardContent>
            </Card>

            {/* 推荐内容 */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-20" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-2 w-1/2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 最新动态 */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-16" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-2 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 底部导航骨架 - 移动端 */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <Skeleton className="h-16 w-full rounded-none" />
      </div>
    </div>
  )
}
