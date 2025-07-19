import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BrandHeader } from "@/components/brand-header"
import {
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Play,
  RotateCcw,
  TrendingUp,
  Target,
  Brain,
} from "lucide-react"
import Link from "next/link"

// 模拟考试数据
const examData = {
  "ai-basics": {
    id: "ai-basics",
    title: "AI基础知识认证考试",
    description: "测试您对人工智能基础概念、机器学习原理和深度学习基础的掌握程度",
    image: "/images/ai-basics-exam.png",
    duration: 90,
    totalQuestions: 50,
    passingScore: 70,
    difficulty: "medium" as const,
    category: "基础认证",
    tags: ["AI基础", "机器学习", "深度学习", "认证考试"],
    prerequisites: ["完成AI基础课程", "具备基本数学知识"],
    topics: [
      "人工智能发展历史",
      "机器学习基础概念",
      "监督学习与无监督学习",
      "深度学习基础",
      "神经网络原理",
      "常见算法应用",
    ],
    examStats: {
      totalAttempts: 1250,
      passRate: 68,
      averageScore: 72,
      averageTime: 75,
    },
    sampleQuestions: [
      {
        question: "以下哪个不是监督学习的典型应用？",
        options: ["图像分类", "情感分析", "聚类分析", "语音识别"],
        correctAnswer: 2,
      },
      {
        question: "深度学习中的深度主要指的是什么？",
        options: ["数据的复杂程度", "网络的层数", "计算的复杂度", "模型的准确率"],
        correctAnswer: 1,
      },
    ],
  },
  "prompt-engineering": {
    id: "prompt-engineering",
    title: "提示工程师认证考试",
    description: "评估您在大语言模型提示设计、优化和应用方面的专业能力",
    image: "/images/prompt-engineer-exam.png",
    duration: 120,
    totalQuestions: 60,
    passingScore: 75,
    difficulty: "hard" as const,
    category: "专业认证",
    tags: ["提示工程", "大语言模型", "GPT", "专业认证"],
    prerequisites: ["完成提示工程课程", "具备LLM使用经验"],
    topics: [
      "提示工程基础理论",
      "提示设计最佳实践",
      "Chain-of-Thought技术",
      "Few-shot和Zero-shot学习",
      "提示优化策略",
      "安全性和伦理考量",
    ],
    examStats: {
      totalAttempts: 890,
      passRate: 58,
      averageScore: 69,
      averageTime: 105,
    },
    sampleQuestions: [
      {
        question: "在设计提示时，以下哪种做法最有助于提高输出质量？",
        options: ["使用复杂的技术术语", "提供清晰的上下文和示例", "尽可能简短", "使用多种语言"],
        correctAnswer: 1,
      },
      {
        question: "Chain-of-Thought提示技术的主要优势是什么？",
        options: ["减少计算成本", "提高推理能力", "加快响应速度", "减少token使用"],
        correctAnswer: 1,
      },
    ],
  },
  "ai-development": {
    id: "ai-development",
    title: "AI应用开发认证考试",
    description: "考核您在AI应用开发、模型部署和系统集成方面的实践能力",
    image: "/images/ai-development-exam.png",
    duration: 150,
    totalQuestions: 80,
    passingScore: 80,
    difficulty: "hard" as const,
    category: "高级认证",
    tags: ["AI开发", "模型部署", "系统集成", "高级认证"],
    prerequisites: ["完成AI开发课程", "具备编程经验", "了解云服务"],
    topics: ["AI应用架构设计", "模型训练与优化", "模型部署策略", "API设计与集成", "性能监控与维护", "安全性与合规性"],
    examStats: {
      totalAttempts: 650,
      passRate: 45,
      averageScore: 65,
      averageTime: 135,
    },
    sampleQuestions: [
      {
        question: "在生产环境中部署AI模型时，以下哪个因素最重要？",
        options: ["模型准确率", "推理速度", "系统稳定性", "以上都重要"],
        correctAnswer: 3,
      },
      {
        question: "A/B测试在AI应用中的主要作用是什么？",
        options: ["提高模型准确率", "评估不同版本效果", "减少计算成本", "简化部署流程"],
        correctAnswer: 1,
      },
    ],
  },
}

interface PageProps {
  params: { id: string }
}

export default async function ExamDetailPage({ params }: PageProps) {
  const { id } = params
  const exam = examData[id as keyof typeof examData]

  if (!exam) {
    notFound()
  }

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  }

  const difficultyLabels = {
    easy: "简单",
    medium: "中等",
    hard: "困难",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* 考试标题卡片 */}
          <Card className="mb-8 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
                <p className="text-blue-100 max-w-2xl">{exam.description}</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={difficultyColors[exam.difficulty]}>{difficultyLabels[exam.difficulty]}</Badge>
                <Badge variant="outline">{exam.category}</Badge>
                {exam.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                  <div className="text-sm text-gray-600">考试时长</div>
                  <div className="font-semibold">{exam.duration}分钟</div>
                </div>
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto text-green-600 mb-1" />
                  <div className="text-sm text-gray-600">题目数量</div>
                  <div className="font-semibold">{exam.totalQuestions}题</div>
                </div>
                <div className="text-center">
                  <Target className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                  <div className="text-sm text-gray-600">及格分数</div>
                  <div className="font-semibold">{exam.passingScore}分</div>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto text-orange-600 mb-1" />
                  <div className="text-sm text-gray-600">参考人数</div>
                  <div className="font-semibold">{exam.examStats.totalAttempts}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  开始考试
                </Button>
                <Button variant="outline" size="lg">
                  <BookOpen className="mr-2 h-4 w-4" />
                  查看大纲
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 主要内容 */}
            <div className="md:col-span-2 space-y-6">
              {/* 考试统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    考试统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">通过率</div>
                      <div className="flex items-center gap-2">
                        <Progress value={exam.examStats.passRate} className="flex-1" />
                        <span className="text-sm font-medium">{exam.examStats.passRate}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">平均分数</div>
                      <div className="text-2xl font-bold text-blue-600">{exam.examStats.averageScore}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">平均用时</div>
                      <div className="text-2xl font-bold text-green-600">{exam.examStats.averageTime}分钟</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">参考总数</div>
                      <div className="text-2xl font-bold text-purple-600">{exam.examStats.totalAttempts}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 考试大纲 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    考试大纲
                  </CardTitle>
                  <CardDescription>本次考试将涵盖以下主要知识点</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exam.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 样题展示 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    样题展示
                  </CardTitle>
                  <CardDescription>以下是考试中可能出现的题目类型</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {exam.sampleQuestions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="font-medium mb-3">
                        {index + 1}. {question.question}
                      </div>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle className="inline h-4 w-4 ml-2 text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 考试要求 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    考试要求
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">前置条件</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {exam.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">考试规则</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        考试时间限制为{exam.duration}分钟
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        需要达到{exam.passingScore}分以上才能通过
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        每题只能选择一次，请谨慎作答
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        考试过程中不允许查阅资料
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 相关课程 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    相关课程
                  </CardTitle>
                  <CardDescription>推荐先学习以下课程</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    href="/courses/ai-basics"
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">AI基础入门</div>
                    <div className="text-xs text-gray-600">人工智能基础概念</div>
                  </Link>
                  <Link
                    href="/courses/machine-learning"
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">机器学习实战</div>
                    <div className="text-xs text-gray-600">机器学习算法与应用</div>
                  </Link>
                  <Link
                    href="/courses/deep-learning"
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">深度学习进阶</div>
                    <div className="text-xs text-gray-600">神经网络与深度学习</div>
                  </Link>
                </CardContent>
              </Card>

              {/* 获得证书 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    获得证书
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-yellow-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      通过考试后，您将获得官方认证证书，证明您在该领域的专业能力。
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      查看证书样本
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 底部操作 */}
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="px-8">
              <Play className="mr-2 h-4 w-4" />
              开始考试
            </Button>
            <Button variant="outline" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              模拟练习
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
