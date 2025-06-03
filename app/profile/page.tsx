"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Settings,
  Trophy,
  BookOpen,
  Clock,
  Target,
  Star,
  Award,
  Download,
  Share2,
  Edit,
  HelpCircle,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { ResponsiveLayout } from "@/components/responsive-layout"
import { AccessibleProgress } from "@/components/accessibility/accessible-progress"

export default function ProfilePage() {
  const [currentUser] = useState({
    name: "张同学",
    email: "zhang@example.com",
    avatar: "/placeholder.svg?height=80&width=80&text=张",
    level: "中级工程师",
    points: 2450,
    streak: 7,
    joinDate: "2024年1月",
    completedCourses: 12,
    totalStudyTime: 156,
    certificates: 5,
    rank: 156,
  })

  return (
    <ResponsiveLayout title="我的资料" user={currentUser}>
      <div className="space-y-6">
        {/* 页面加载确认 */}
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">✅ 个人资料页面已成功加载！</span>
          </div>
          <p className="text-sm mt-1">底部菜单的"我的"按钮跳转功能正常工作。</p>
        </div>

        {/* 用户信息卡片 */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4 border-white/30 shadow-lg">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback className="text-indigo-600 text-xl font-bold bg-white">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
                <p className="text-white/80 mb-2">{currentUser.email}</p>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {currentUser.level}
                  </Badge>
                  <span className="text-sm text-white/70">加入时间：{currentUser.joinDate}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link href="/profile/edit">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑资料
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 学习统计 */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
            学习统计
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{currentUser.points}</p>
                <p className="text-sm text-gray-600 font-medium">学习积分</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{currentUser.completedCourses}</p>
                <p className="text-sm text-gray-600 font-medium">完成课程</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                  <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{currentUser.totalStudyTime}小时</p>
                <p className="text-sm text-gray-600 font-medium">学习时长</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Award className="h-6 w-6 text-purple-600" />
                  <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{currentUser.certificates}</p>
                <p className="text-sm text-gray-600 font-medium">获得证书</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 成就徽章 */}
        <Card className="shadow-lg border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>成就徽章</span>
            </CardTitle>
            <CardDescription>您获得的学习成就</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 bg-white border-gray-200 shadow-sm">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">AI学习先锋</h3>
                <p className="text-sm text-gray-600 mb-2">完成首个AI课程</p>
                <p className="text-xs text-gray-500">获得时间：2024年2月</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 bg-white border-gray-200 shadow-sm">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white">
                <Target className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">连续学习者</h3>
                <p className="text-sm text-gray-600 mb-2">连续学习30天</p>
                <p className="text-xs text-gray-500">获得时间：2024年3月</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 bg-gray-50 border-gray-100">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gray-200 text-gray-400">
                <Star className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-500">知识分享者</h3>
                <p className="text-sm text-gray-600 mb-2">帮助10位同学解答问题</p>
                <div className="space-y-1">
                  <AccessibleProgress value={60} label="知识分享者进度" size="sm" showPercentage={false} />
                  <p className="text-xs text-gray-500">进度：60%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快速操作 */}
        <Card className="shadow-lg border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-indigo-600" />
              <span>快速操作</span>
            </CardTitle>
            <CardDescription>管理您的账户和设置</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 hover:border-indigo-300 hover:bg-indigo-50"
                asChild
              >
                <Link href="/profile/settings">
                  <Settings className="h-6 w-6 text-indigo-600" />
                  <span className="text-sm font-medium">账户设置</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 hover:border-green-300 hover:bg-green-50"
                asChild
              >
                <Link href="/profile/certificates">
                  <Download className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">下载证书</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 hover:border-blue-300 hover:bg-blue-50"
                asChild
              >
                <Link href="/profile/share">
                  <Share2 className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium">分享成就</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 hover:border-purple-300 hover:bg-purple-50"
                asChild
              >
                <Link href="/help">
                  <HelpCircle className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium">帮助中心</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 测试说明 */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🧪 测试说明</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• 如果您能看到这个页面，说明底部菜单的"我的"按钮跳转功能正常</p>
              <p>• 右上角显示当前路径应该为 "/profile"</p>
              <p>• 底部菜单中的"我的"按钮应该显示为活跃状态（蓝色高亮）</p>
              <p>• 您可以点击其他菜单项测试导航功能</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  )
}
