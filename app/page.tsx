"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Users, Trophy, Clock, Target, Play, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { ResponsiveLayout } from "@/components/responsive-layout"
import { AccessibleProgress } from "@/components/accessibility/accessible-progress"
import { AccessibleButton } from "@/components/accessibility/accessible-button"
import { ScreenReaderOnly } from "@/components/accessibility/screen-reader-only"
import { LiveRegion } from "@/components/accessibility/live-region"

export default function Dashboard() {
  const [currentUser] = useState({
    name: "张同学",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "中级工程师",
    points: 2450,
    streak: 7,
  })

  const [announcements, setAnnouncements] = useState("")

  const courses = [
    {
      id: 1,
      title: "GPT模型基础与应用",
      description: "深入理解大语言模型的原理和实际应用",
      progress: 75,
      chapters: 12,
      completed: 9,
      difficulty: "初级",
      duration: "8小时",
      image: "/placeholder.svg?height=200&width=300&text=GPT基础课程",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "Prompt Engineering实战",
      description: "掌握提示词工程的核心技巧和最佳实践",
      progress: 45,
      chapters: 15,
      completed: 7,
      difficulty: "中级",
      duration: "12小时",
      image: "/placeholder.svg?height=200&width=300&text=Prompt工程课程",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      id: 3,
      title: "AI应用开发框架",
      description: "学习主流AI应用开发框架和工具链",
      progress: 20,
      chapters: 18,
      completed: 4,
      difficulty: "高级",
      duration: "16小时",
      image: "/placeholder.svg?height=200&width=300&text=AI开发框架课程",
      color: "bg-gradient-to-r from-purple-500 to-violet-600",
    },
  ]

  const recentActivities = [
    { type: "完成章节", content: "GPT-4 API集成实践", time: "2小时前", icon: CheckCircle },
    { type: "通过测试", content: "Prompt优化技巧测验", time: "1天前", icon: Trophy },
    { type: "加入团队", content: "AI创新实验室", time: "3天前", icon: Users },
    { type: "获得徽章", content: "连续学习7天", time: "1周前", icon: Star },
  ]

  const handleContinueLearning = (courseTitle: string) => {
    setAnnouncements(`开始学习课程：${courseTitle}`)
  }

  return (
    <ResponsiveLayout title="AI学习系统" user={currentUser}>
      <LiveRegion message={announcements} />

      <div>
        {/* 欢迎区域 */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">欢迎回来，{currentUser.name}！</h1>
          <p className="text-gray-600">继续您的AI学习之旅，掌握前沿技术</p>
        </header>

        {/* 统计卡片 */}
        <section aria-labelledby="stats-heading" className="mb-6 sm:mb-8">
          <h2 id="stats-heading" className="sr-only">
            学习统计概览
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs sm:text-sm">学习积分</p>
                    <p className="text-xl sm:text-2xl font-bold" aria-label={`学习积分 ${currentUser.points} 分`}>
                      {currentUser.points}
                    </p>
                  </div>
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-xs sm:text-sm">连续学习</p>
                    <p className="text-xl sm:text-2xl font-bold" aria-label={`连续学习 ${currentUser.streak} 天`}>
                      {currentUser.streak}天
                    </p>
                  </div>
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-200" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-xs sm:text-sm">完成课程</p>
                    <p className="text-xl sm:text-2xl font-bold" aria-label="完成课程 12 门">
                      12
                    </p>
                  </div>
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-xs sm:text-sm">学习时长</p>
                    <p className="text-xl sm:text-2xl font-bold" aria-label="学习时长 156 小时">
                      156小时
                    </p>
                  </div>
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-200" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* 课程进度 */}
          <section aria-labelledby="courses-heading" className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                  <span id="courses-heading">我的课程</span>
                </CardTitle>
                <CardDescription>继续学习您的课程</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {courses.map((course) => (
                  <article key={course.id} className="group">
                    <Card className="border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={`${course.title}课程封面`}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {course.title}
                              </h3>
                              <Badge
                                variant={
                                  course.difficulty === "初级"
                                    ? "default"
                                    : course.difficulty === "中级"
                                      ? "secondary"
                                      : "destructive"
                                }
                                aria-label={`课程难度：${course.difficulty}`}
                              >
                                {course.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span aria-label={`已完成 ${course.completed} 章节，共 ${course.chapters} 章节`}>
                                  {course.completed}/{course.chapters} 章节
                                </span>
                                <span aria-label={`课程时长 ${course.duration}`}>{course.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <AccessibleProgress
                                value={course.progress}
                                label={`${course.title}学习进度`}
                                color={course.color}
                                className="flex-1 mr-4"
                                showPercentage={false}
                              />
                              <span className="text-sm font-medium text-indigo-600 mr-4">{course.progress}%</span>
                              <AccessibleButton
                                size="sm"
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                onClick={() => handleContinueLearning(course.title)}
                                asChild
                              >
                                <Link href={`/courses/${course.id}`}>
                                  <Play className="h-4 w-4 mr-1" aria-hidden="true" />
                                  继续学习
                                  <ScreenReaderOnly>课程：{course.title}</ScreenReaderOnly>
                                </Link>
                              </AccessibleButton>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 最近活动 */}
            <section aria-labelledby="activities-heading">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" aria-hidden="true" />
                    <span id="activities-heading">最近活动</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4" role="list">
                    {recentActivities.map((activity, index) => {
                      const IconComponent = activity.icon
                      return (
                        <li key={index} className="flex items-start space-x-3" role="listitem">
                          <div className="flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-green-500" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                            <p className="text-sm text-gray-600 truncate">{activity.content}</p>
                            <time className="text-xs text-gray-400" dateTime={activity.time}>
                              {activity.time}
                            </time>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* 快速操作 */}
            <section aria-labelledby="quick-actions-heading">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle id="quick-actions-heading">快速操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AccessibleButton
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href="/practice">
                      <Brain className="h-4 w-4 mr-2" aria-hidden="true" />
                      开始练习
                    </Link>
                  </AccessibleButton>
                  <AccessibleButton
                    variant="outline"
                    className="w-full border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href="/courses">
                      <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
                      浏览课程
                    </Link>
                  </AccessibleButton>
                  <AccessibleButton
                    variant="outline"
                    className="w-full border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href="/team">
                      <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                      团队协作
                    </Link>
                  </AccessibleButton>
                </CardContent>
              </Card>
            </section>
          </aside>
        </div>
      </div>
    </ResponsiveLayout>
  )
}
