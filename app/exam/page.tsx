"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Clock, CheckCircle, BookOpen, Brain } from "lucide-react"
import Link from "next/link"

export default function ExamPage() {
  const exams = [
    {
      id: 1,
      title: "AI基础知识测试",
      description: "测试您对人工智能基本概念和原理的理解",
      questions: 20,
      duration: "30分钟",
      difficulty: "初级",
      category: "基础理论",
      image: "/placeholder.svg?height=200&width=300&text=AI基础测试",
    },
    {
      id: 2,
      title: "Prompt工程师认证考试",
      description: "评估您设计高效提示词的能力和技巧",
      questions: 30,
      duration: "45分钟",
      difficulty: "中级",
      category: "Prompt工程",
      image: "/placeholder.svg?height=200&width=300&text=Prompt认证",
    },
    {
      id: 3,
      title: "AI应用开发综合测评",
      description: "全面测试您在AI应用开发领域的专业技能",
      questions: 40,
      duration: "60分钟",
      difficulty: "高级",
      category: "开发实战",
      image: "/placeholder.svg?height=200&width=300&text=开发测评",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "初级":
        return "bg-green-200 text-green-800 border border-green-300"
      case "中级":
        return "bg-yellow-200 text-yellow-800 border border-yellow-300"
      case "高级":
        return "bg-red-200 text-red-800 border border-red-300"
      default:
        return "bg-gray-200 text-gray-800 border border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 页面加载确认 */}
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">✅ 考试页面加载成功！</span>
          </div>
          <p className="text-sm mt-1">底部菜单"考试"按钮跳转功能正常工作。</p>
        </div>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">考试中心</h1>
          <p className="text-gray-600">测试您的AI知识和技能，获取专业认证</p>
        </div>

        {/* 考试列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card
              key={exam.id}
              className="hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img src={exam.image || "/placeholder.svg"} alt={exam.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className={getDifficultyColor(exam.difficulty)}>{exam.difficulty}</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg text-gray-800">{exam.title}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-600">
                    <Brain className="h-4 w-4 mr-1" />
                    <span className="text-sm">{exam.questions}题</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{exam.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="text-sm">{exam.category}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href={`/exam/${exam.id}`}>
                    <Award className="h-4 w-4 mr-2" />
                    开始考试
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
