import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Trophy, BookOpen } from "lucide-react"
import { BrandHeader } from "@/components/brand-header"

// 模拟考试数据
const examData = {
  "ai-basics": {
    id: "ai-basics",
    title: "AI基础认知考试",
    description: "测试您对人工智能基础概念的理解，包括机器学习、深度学习、神经网络等核心概念。",
    duration: 60,
    questionCount: 30,
    difficulty: "easy" as const,
    category: "基础认知",
    passingScore: 70,
    participants: 1250,
    passRate: 85,
    tags: ["AI基础", "机器学习", "深度学习"],
    prerequisites: [],
    topics: ["人工智能概述", "机器学习基础", "深度学习入门", "神经网络原理", "AI应用场景"],
    sampleQuestions: [
      {
        question: "什么是机器学习？",
        options: ["让机器自动学习的技术", "教机器做数学题的方法", "机器维修技术", "计算机编程语言"],
        correct: 0,
      },
    ],
  },
  "prompt-engineering": {
    id: "prompt-engineering",
    title: "提示词工程师认证",
    description: "专业的提示词设计与优化技能认证，涵盖ChatGPT、Claude等主流AI模型的提示词技巧。",
    duration: 90,
    questionCount: 45,
    difficulty: "medium" as const,
    category: "专业技能",
    passingScore: 75,
    participants: 890,
    passRate: 72,
    tags: ["提示词", "ChatGPT", "AI对话"],
    prerequisites: ["AI基础认知"],
    topics: ["提示词基础原理", "结构化提示设计", "上下文管理", "角色扮演技巧", "链式思维提示"],
    sampleQuestions: [
      {
        question: "在设计提示词时，以下哪种做法最有效？",
        options: ["使用简短的关键词", "提供详细的上下文和示例", "只使用英文提示", "避免使用标点符号"],
        correct: 1,
      },
    ],
  },
  "ai-development": {
    id: "ai-development",
    title: "AI应用开发工程师",
    description: "全面的AI应用开发技能认证，包括模型训练、API集成、应用部署等实战技能。",
    duration: 120,
    questionCount: 60,
    difficulty: "hard" as const,
    category: "工程开发",
    passingScore: 80,
    participants: 456,
    passRate: 65,
    tags: ["Python", "TensorFlow", "API开发"],
    prerequisites: ["AI基础认知", "编程基础"],
    topics: ["机器学习框架", "模型训练与调优", "API设计与集成", "云平台部署", "性能优化"],
    sampleQuestions: [
      {
        question: "在训练深度学习模型时，过拟合的主要解决方法是？",
        options: ["增加训练数据", "使用正则化技术", "降低学习率", "以上都是"],
        correct: 3,
      },
    ],
  },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ExamDetailPage({ params }: PageProps) {
  const { id } = await params
  const exam = examData[id as keyof typeof examData]

  if (!exam) {
    notFound()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "初级"
      case "medium":
        return "中级"
      case "hard":
        return "高级"
      default:
        return "未知"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 考试标题卡片 */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">{exam.title}</CardTitle>
                  <CardDescription className="text-base">{exam.description}</CardDescription>
                </div>
                <Badge className={getDifficultyColor(exam.difficulty)}>{getDifficultyText(exam.difficulty)}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {exam.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>

          {/* 考试信息卡片 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  考试详情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">考试时长</span>
                  <span className="font-medium">{exam.duration} 分钟</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">题目数量</span>
                  <span className="font-medium">{exam.questionCount} 题</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">及格分数</span>
                  <span className="font-medium">{exam.passingScore} 分</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">考试类别</span>
                  <span className="font-medium">{exam.category}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  参与统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">参与人数</span>
                  <span className="font-medium">{exam.participants.toLocaleString()} 人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">通过率</span>
                  <span className="font-medium text-green-600">{exam.passRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">难度等级</span>
                  <span className="font-medium">{getDifficultyText(exam.difficulty)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 考试大纲 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                考试大纲
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {exam.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 前置要求 */}
          {exam.prerequisites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>前置要求</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exam.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>{prereq}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 示例题目 */}
          <Card>
            <CardHeader>
              <CardTitle>示例题目</CardTitle>
            </CardHeader>
            <CardContent>
              {exam.sampleQuestions.map((q, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium">{q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          optIndex === q.correct
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                        {option}
                        {optIndex === q.correct && <Badge className="ml-2 bg-green-100 text-green-800">正确答案</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="px-8">
              开始考试
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              模拟练习
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
