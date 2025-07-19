import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, Play, BookOpen, Award } from "lucide-react"
import { BrandHeader } from "@/components/brand-header"

// 模拟课程数据
const courseData = {
  "ai-engineer": {
    id: "ai-engineer",
    title: "AI工程师全栈开发",
    description: "从零开始学习AI工程师必备技能，包括机器学习、深度学习、自然语言处理等核心技术，以及实际项目开发经验。",
    image: "/images/ai-development-course.png",
    instructor: "张教授",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "12周",
    level: "intermediate" as const,
    students: 2340,
    rating: 4.8,
    reviewCount: 456,
    price: 1999,
    originalPrice: 2999,
    category: "AI开发",
    tags: ["Python", "TensorFlow", "PyTorch", "机器学习"],
    progress: 0,
    chapters: [
      {
        id: 1,
        title: "AI基础概念",
        duration: "2小时",
        lessons: 8,
        completed: false,
      },
      {
        id: 2,
        title: "Python编程基础",
        duration: "3小时",
        lessons: 12,
        completed: false,
      },
      {
        id: 3,
        title: "机器学习算法",
        duration: "4小时",
        lessons: 15,
        completed: false,
      },
      {
        id: 4,
        title: "深度学习框架",
        duration: "5小时",
        lessons: 18,
        completed: false,
      },
      {
        id: 5,
        title: "自然语言处理",
        duration: "3小时",
        lessons: 10,
        completed: false,
      },
      {
        id: 6,
        title: "计算机视觉",
        duration: "4小时",
        lessons: 14,
        completed: false,
      },
      {
        id: 7,
        title: "项目实战",
        duration: "6小时",
        lessons: 20,
        completed: false,
      },
    ],
    skills: ["Python编程", "机器学习", "深度学习", "TensorFlow", "PyTorch", "数据处理", "模型部署"],
    requirements: ["具备基础的编程经验", "了解基本的数学概念", "有学习新技术的热情"],
    features: ["实战项目驱动学习", "一对一导师指导", "完整的学习路径", "就业推荐服务", "终身学习社群"],
  },
  "prompt-engineering": {
    id: "prompt-engineering",
    title: "提示词工程师专业课程",
    description: "掌握AI时代最重要的技能之一，学会如何与AI高效对话，成为专业的提示词工程师。",
    image: "/images/prompt-engineering-course.png",
    instructor: "李老师",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "6周",
    level: "beginner" as const,
    students: 3240,
    rating: 4.9,
    reviewCount: 678,
    price: 899,
    originalPrice: 1299,
    category: "AI应用",
    tags: ["ChatGPT", "提示词", "AI对话", "效率工具"],
    progress: 25,
    chapters: [
      {
        id: 1,
        title: "提示词基础",
        duration: "1.5小时",
        lessons: 6,
        completed: true,
      },
      {
        id: 2,
        title: "结构化提示设计",
        duration: "2小时",
        lessons: 8,
        completed: true,
      },
      {
        id: 3,
        title: "角色扮演技巧",
        duration: "1.5小时",
        lessons: 7,
        completed: false,
      },
      {
        id: 4,
        title: "链式思维提示",
        duration: "2小时",
        lessons: 9,
        completed: false,
      },
      {
        id: 5,
        title: "高级提示技巧",
        duration: "2.5小时",
        lessons: 10,
        completed: false,
      },
      {
        id: 6,
        title: "实战案例分析",
        duration: "3小时",
        lessons: 12,
        completed: false,
      },
    ],
    skills: ["提示词设计", "AI对话技巧", "效率提升", "创意写作", "问题解决"],
    requirements: ["无需编程基础", "对AI工具有基本了解", "具备逻辑思维能力"],
    features: ["零基础友好", "实用案例丰富", "即学即用", "社群答疑", "持续更新"],
  },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params
  const course = courseData[id as keyof typeof courseData]

  if (!course) {
    notFound()
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case "beginner":
        return "初级"
      case "intermediate":
        return "中级"
      case "advanced":
        return "高级"
      default:
        return "未知"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const completedChapters = course.chapters.filter((chapter) => chapter.completed).length
  const totalChapters = course.chapters.length

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 课程头部 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                        <p className="text-gray-600">{course.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.students.toLocaleString()} 学员
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {course.rating} ({course.reviewCount})
                        </div>
                        <Badge className={getLevelColor(course.level)}>{getLevelText(course.level)}</Badge>
                      </div>

                      {course.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>学习进度</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 课程章节 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    课程内容
                  </CardTitle>
                  <CardDescription>
                    共 {totalChapters} 个章节，{completedChapters} 个已完成
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className={`p-4 rounded-lg border ${
                          chapter.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                chapter.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {chapter.completed ? "✓" : index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{chapter.title}</h4>
                              <p className="text-sm text-gray-600">
                                {chapter.lessons} 课时 · {chapter.duration}
                              </p>
                            </div>
                          </div>
                          <Button variant={chapter.completed ? "secondary" : "default"} size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            {chapter.completed ? "复习" : "开始"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 学习收获 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    学习收获
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 课程要求 */}
              <Card>
                <CardHeader>
                  <CardTitle>学习要求</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 价格卡片 */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-red-600">¥{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">¥{course.originalPrice}</span>
                        )}
                      </div>
                      {course.originalPrice && (
                        <p className="text-sm text-green-600">限时优惠，节省 ¥{course.originalPrice - course.price}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {course.progress > 0 ? (
                        <Button className="w-full" size="lg">
                          继续学习
                        </Button>
                      ) : (
                        <Button className="w-full" size="lg">
                          立即购买
                        </Button>
                      )}
                      <Button variant="outline" className="w-full bg-transparent">
                        免费试听
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 讲师信息 */}
              <Card>
                <CardHeader>
                  <CardTitle>讲师介绍</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={course.instructorAvatar || "/placeholder.svg"}
                      alt={course.instructor}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{course.instructor}</h4>
                      <p className="text-sm text-gray-600">资深AI工程师</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    拥有10年以上AI领域工作经验，曾在多家知名科技公司担任技术专家，
                    专注于机器学习和深度学习技术的研究与应用。
                  </p>
                </CardContent>
              </Card>

              {/* 课程特色 */}
              <Card>
                <CardHeader>
                  <CardTitle>课程特色</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
