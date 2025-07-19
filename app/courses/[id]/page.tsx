import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandHeader } from "@/components/brand-header"
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Download,
  Share2,
  Heart,
  MessageCircle,
  User,
  Target,
  Zap,
} from "lucide-react"

// 模拟课程数据
const courseData = {
  "ai-basics": {
    id: "ai-basics",
    title: "AI基础入门：从零开始学人工智能",
    description: "全面系统地学习人工智能基础知识，包括机器学习、深度学习、神经网络等核心概念，适合零基础学员",
    image: "/images/ai-basics-course.png",
    instructor: "张教授",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "12小时",
    level: "beginner" as const,
    students: 15420,
    rating: 4.8,
    reviewCount: 2341,
    price: 299,
    originalPrice: 599,
    category: "人工智能",
    tags: ["AI基础", "机器学习", "深度学习", "入门课程"],
    features: ["12小时高质量视频内容", "50+实战练习题", "完整项目案例", "专业讲师答疑", "学习证书认证", "终身免费更新"],
    requirements: ["具备基本的数学知识（高中水平）", "了解基础的编程概念", "有学习新技术的热情", "准备好投入时间学习"],
    learningOutcomes: [
      "理解人工智能的基本概念和发展历程",
      "掌握机器学习的核心算法和应用",
      "了解深度学习和神经网络原理",
      "能够识别和分析AI在各行业的应用",
      "具备进一步学习高级AI技术的基础",
    ],
    chapters: [
      {
        id: "1",
        title: "人工智能概述",
        duration: "45分钟",
        lessons: [
          { id: "1-1", title: "什么是人工智能", duration: "15分钟", completed: true },
          { id: "1-2", title: "AI发展历程", duration: "20分钟", completed: true },
          { id: "1-3", title: "AI的分类和应用", duration: "10分钟", completed: false },
        ],
      },
      {
        id: "2",
        title: "机器学习基础",
        duration: "2小时30分钟",
        lessons: [
          { id: "2-1", title: "机器学习概念", duration: "30分钟", completed: false },
          { id: "2-2", title: "监督学习", duration: "45分钟", completed: false },
          { id: "2-3", title: "无监督学习", duration: "45分钟", completed: false },
          { id: "2-4", title: "强化学习", duration: "30分钟", completed: false },
        ],
      },
      {
        id: "3",
        title: "深度学习入门",
        duration: "3小时15分钟",
        lessons: [
          { id: "3-1", title: "神经网络基础", duration: "60分钟", completed: false },
          { id: "3-2", title: "深度神经网络", duration: "45分钟", completed: false },
          { id: "3-3", title: "卷积神经网络", duration: "45分钟", completed: false },
          { id: "3-4", title: "循环神经网络", duration: "45分钟", completed: false },
        ],
      },
      {
        id: "4",
        title: "实战项目",
        duration: "2小时",
        lessons: [
          { id: "4-1", title: "图像识别项目", duration: "60分钟", completed: false },
          { id: "4-2", title: "文本分析项目", duration: "60分钟", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "1",
        user: "李同学",
        avatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        date: "2024-01-15",
        content: "课程内容非常全面，讲解清晰易懂，特别适合初学者。老师的教学方式很棒，推荐！",
      },
      {
        id: "2",
        user: "王工程师",
        avatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        date: "2024-01-10",
        content: "作为转行学AI的人，这门课程给了我很好的基础。实战项目很有价值。",
      },
      {
        id: "3",
        user: "陈学生",
        avatar: "/placeholder.svg?height=32&width=32",
        rating: 4,
        date: "2024-01-08",
        content: "内容丰富，但建议增加更多的练习题。总体来说是一门很好的入门课程。",
      },
    ],
  },
  "prompt-engineering": {
    id: "prompt-engineering",
    title: "提示工程实战：掌握AI对话的艺术",
    description: "深入学习大语言模型的提示工程技术，掌握与AI高效对话的方法和技巧",
    image: "/images/prompt-engineering-course.png",
    instructor: "刘博士",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    duration: "8小时",
    level: "intermediate" as const,
    students: 8750,
    rating: 4.9,
    reviewCount: 1456,
    price: 399,
    originalPrice: 799,
    category: "提示工程",
    tags: ["提示工程", "大语言模型", "GPT", "实战应用"],
    features: ["8小时专业视频教学", "100+提示模板", "实际案例分析", "行业应用指导", "专家在线答疑", "持续内容更新"],
    requirements: ["了解基本的AI概念", "有使用ChatGPT等工具的经验", "具备逻辑思维能力", "对AI应用有浓厚兴趣"],
    learningOutcomes: [
      "掌握提示工程的核心原理和方法",
      "能够设计高效的提示模板",
      "了解不同场景下的提示策略",
      "具备优化AI输出质量的能力",
      "能够将提示工程应用到实际工作中",
    ],
    chapters: [
      {
        id: "1",
        title: "提示工程基础",
        duration: "1小时30分钟",
        lessons: [
          { id: "1-1", title: "什么是提示工程", duration: "20分钟", completed: false },
          { id: "1-2", title: "提示的基本结构", duration: "25分钟", completed: false },
          { id: "1-3", title: "常见提示类型", duration: "25分钟", completed: false },
          { id: "1-4", title: "提示设计原则", duration: "20分钟", completed: false },
        ],
      },
      {
        id: "2",
        title: "高级提示技术",
        duration: "2小时45分钟",
        lessons: [
          { id: "2-1", title: "Chain-of-Thought", duration: "45分钟", completed: false },
          { id: "2-2", title: "Few-shot Learning", duration: "40分钟", completed: false },
          { id: "2-3", title: "Role Playing", duration: "35分钟", completed: false },
          { id: "2-4", title: "提示链接技术", duration: "45分钟", completed: false },
        ],
      },
      {
        id: "3",
        title: "行业应用实战",
        duration: "3小时45分钟",
        lessons: [
          { id: "3-1", title: "内容创作应用", duration: "60分钟", completed: false },
          { id: "3-2", title: "数据分析应用", duration: "55分钟", completed: false },
          { id: "3-3", title: "客服自动化", duration: "50分钟", completed: false },
          { id: "3-4", title: "教育培训应用", duration: "40分钟", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "1",
        user: "产品经理小张",
        avatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        date: "2024-01-20",
        content: "这门课程完全改变了我使用AI的方式，工作效率提升了300%！",
      },
      {
        id: "2",
        user: "创业者老王",
        avatar: "/placeholder.svg?height=32&width=32",
        rating: 5,
        date: "2024-01-18",
        content: "提示工程真的是一门艺术，这个课程教会了我很多实用技巧。",
      },
    ],
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

  const levelLabels = {
    beginner: "初级",
    intermediate: "中级",
    advanced: "高级",
  }

  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  }

  const totalLessons = course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
  const completedLessons = course.chapters.reduce(
    (total, chapter) => total + chapter.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* 课程头部 */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={levelColors[course.level]}>{levelLabels[course.level]}</Badge>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{course.students.toLocaleString()}名学员</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">
                    {course.rating} ({course.reviewCount}条评价)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 课程卡片 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900">¥{course.price}</div>
                    {course.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">¥{course.originalPrice}</div>
                    )}
                  </div>

                  {progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>学习进度</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      {progress > 0 ? "继续学习" : "立即购买"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Heart className="mr-2 h-4 w-4" />
                      收藏课程
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        分享
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        下载
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 课程详情 */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">课程概述</TabsTrigger>
              <TabsTrigger value="curriculum">课程大纲</TabsTrigger>
              <TabsTrigger value="instructor">讲师介绍</TabsTrigger>
              <TabsTrigger value="reviews">学员评价</TabsTrigger>
            </TabsList>

            {/* 课程概述 */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      学习目标
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      课程要求
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    课程特色
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 课程大纲 */}
            <TabsContent value="curriculum" className="space-y-4">
              {course.chapters.map((chapter, index) => (
                <Card key={chapter.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        第{index + 1}章：{chapter.title}
                      </CardTitle>
                      <Badge variant="outline">{chapter.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Play className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="text-sm font-medium">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* 讲师介绍 */}
            <TabsContent value="instructor">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src={course.instructorAvatar || "/placeholder.svg"}
                      alt={course.instructor}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                      <p className="text-gray-600 mb-4">
                        资深AI专家，拥有10年以上人工智能领域研发经验，曾在多家知名科技公司担任技术负责人。
                        专注于机器学习、深度学习和大语言模型的研究与应用，发表过多篇高质量学术论文。
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">50+</div>
                          <div className="text-sm text-gray-600">授课课程</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">10万+</div>
                          <div className="text-sm text-gray-600">学员数量</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">4.9</div>
                          <div className="text-sm text-gray-600">平均评分</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">10年</div>
                          <div className="text-sm text-gray-600">教学经验</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 学员评价 */}
            <TabsContent value="reviews" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">学员评价</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(course.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {course.rating} 分 · {course.reviewCount} 条评价
                    </span>
                  </div>
                </div>
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  写评价
                </Button>
              </div>

              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.user}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">{review.user}</div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${
                                        star <= review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
