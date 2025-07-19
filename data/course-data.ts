import type { Course } from "@/app/types"

export const courseData: Course[] = [
  {
    id: "gpt-basics",
    title: "GPT基础应用课程",
    description: "学习如何有效使用GPT进行日常工作",
    image: "/images/gpt-basics-course.png",
    duration: "15小时",
    level: "入门",
    students: 2100,
    category: "应用",
    chapters: ["GPT模型介绍", "基础对话技巧", "文本生成应用", "工作效率提升", "常见问题解决"],
  },
  {
    id: "prompt-engineering",
    title: "提示工程师专业课程",
    description: "掌握AI提示工程的核心技能和最佳实践",
    image: "/images/prompt-engineering-course.png",
    duration: "25小时",
    level: "中级",
    students: 890,
    category: "专业",
    chapters: ["提示工程基础理论", "高效提示设计技巧", "多模态提示应用", "提示优化与调试", "企业级提示管理"],
  },
  {
    id: "multimodal-ai",
    title: "多模态AI应用开发",
    description: "深入了解图像、文本、音频等多模态AI技术的实际应用和开发方法",
    image: "/images/multimodal-ai-course.png",
    level: "advanced",
    duration: "16小时",
    progress: 0,
    chapters: 20,
    category: "AI开发",
    instructor: "张博士",
    rating: 4.7,
    students: 642,
    studentsCount: 642,
    price: 599,
    tags: ["多模态", "计算机视觉", "深度学习"],
    isEnrolled: false,
    difficulty: "advanced",
  },
  {
    id: "ai-ethics",
    title: "AI伦理与安全",
    description: "探讨人工智能的伦理问题，学习负责任的AI开发实践和安全防护措施",
    image: "/images/ai-ethics-course.png",
    level: "intermediate",
    duration: "6小时",
    progress: 0,
    chapters: 8,
    category: "AI伦理",
    instructor: "陈教授",
    rating: 4.6,
    students: 423,
    studentsCount: 423,
    price: 199,
    tags: ["AI伦理", "安全", "负责任AI"],
    isEnrolled: false,
    difficulty: "intermediate",
  },
  {
    id: "ai-development",
    title: "AI应用开发实战",
    description: "通过实际项目学习AI应用开发，掌握从概念到部署的完整开发流程",
    image: "/images/ai-development-course.png",
    level: "advanced",
    duration: "20小时",
    progress: 0,
    chapters: 25,
    category: "AI开发",
    instructor: "刘工程师",
    rating: 4.9,
    students: 789,
    studentsCount: 789,
    price: 799,
    tags: ["应用开发", "项目实战", "部署"],
    isEnrolled: false,
    difficulty: "advanced",
  },
  {
    id: "ai-certification",
    title: "AI工程师认证课程",
    description: "全面的AI工程师认证培训，涵盖理论基础和实践技能的综合课程",
    image: "/images/ai-certification-course.png",
    level: "advanced",
    duration: "40小时",
    progress: 0,
    chapters: 50,
    category: "认证课程",
    instructor: "专家团队",
    rating: 4.8,
    students: 1567,
    studentsCount: 1567,
    price: 1299,
    tags: ["认证", "综合课程", "专业技能"],
    isEnrolled: false,
    difficulty: "advanced",
  },
  {
    id: "medical-ai",
    title: "医疗AI应用",
    description: "探索人工智能在医疗健康领域的应用，学习医疗AI的开发和部署",
    image: "/images/medical-ai-course.png",
    level: "advanced",
    duration: "14小时",
    progress: 0,
    chapters: 18,
    category: "行业应用",
    instructor: "医疗AI专家",
    rating: 4.7,
    students: 345,
    studentsCount: 345,
    price: 699,
    tags: ["医疗AI", "健康科技", "行业应用"],
    isEnrolled: false,
    difficulty: "advanced",
  },
  {
    id: "fintech-ai",
    title: "金融科技AI",
    description: "学习AI在金融科技领域的应用，包括风控、投资分析等核心场景",
    image: "/images/fintech-ai-course.png",
    level: "advanced",
    duration: "12小时",
    progress: 0,
    chapters: 16,
    category: "行业应用",
    instructor: "金融科技专家",
    rating: 4.6,
    students: 567,
    studentsCount: 567,
    price: 599,
    tags: ["金融科技", "风控", "投资分析"],
    isEnrolled: false,
    difficulty: "advanced",
  },
  {
    id: "no-code-ai",
    title: "无代码AI应用构建",
    description: "学习使用无代码平台快速构建AI应用，适合非技术背景的学习者",
    image: "/images/no-code-ai-course.png",
    level: "beginner",
    duration: "8小时",
    progress: 0,
    chapters: 12,
    category: "无代码开发",
    instructor: "产品专家",
    rating: 4.5,
    students: 892,
    studentsCount: 892,
    price: 299,
    tags: ["无代码", "快速开发", "产品设计"],
    isEnrolled: false,
    difficulty: "beginner",
  },
  {
    id: "model-tuning",
    title: "AI模型微调技术",
    description: "深入学习AI模型的微调技术，掌握模型优化和定制化开发方法",
    image: "/images/model-tuning-course.png",
    level: "advanced",
    duration: "18小时",
    progress: 0,
    chapters: 22,
    category: "模型优化",
    instructor: "算法专家",
    rating: 4.8,
    students: 234,
    studentsCount: 234,
    price: 899,
    tags: ["模型微调", "算法优化", "深度学习"],
    isEnrolled: false,
    difficulty: "advanced",
  },
  {
    id: "ai-engineer",
    title: "AI工程师入门课程",
    description: "从零开始学习人工智能工程师必备技能",
    image: "/images/ai-development-course.png",
    duration: "40小时",
    level: "初级",
    students: 1250,
    category: "工程",
    chapters: ["人工智能基础概念", "机器学习算法入门", "深度学习框架使用", "AI项目实战演练", "模型部署与优化"],
  },
]

// 按分类获取课程
export const getCoursesByCategory = (category: string): Course[] => {
  return courseData.filter((course) => course.category === category)
}

// 按难度获取课程
export const getCoursesByLevel = (level: string): Course[] => {
  return courseData.filter((course) => course.level === level)
}

// 获取推荐课程
export const getRecommendedCourses = (limit = 5): Course[] => {
  return courseData
    .filter((course) => course.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

// 获取用户已报名课程
export const getEnrolledCourses = (): Course[] => {
  return courseData.filter((course) => course.isEnrolled)
}

// 搜索课程
export const searchCourses = (query: string): Course[] => {
  const searchTerm = query.toLowerCase()
  return courseData.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      course.instructor.toLowerCase().includes(searchTerm),
  )
}

// 获取课程统计信息
export const getCourseStats = () => {
  return {
    total: courseData.length,
    byLevel: {
      初级: courseData.filter((c) => c.level === "初级").length,
      中级: courseData.filter((c) => c.level === "中级").length,
      高级: courseData.filter((c) => c.level === "高级").length,
    },
    byCategory: courseData.reduce(
      (acc, course) => {
        acc[course.category] = (acc[course.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
    averageRating: courseData.reduce((sum, course) => sum + course.rating, 0) / courseData.length,
    totalStudents: courseData.reduce((sum, course) => sum + (course.students || 0), 0),
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  const course = courseData.find((c) => c.id === id)
  return course || null
}

export async function getAllCourses(): Promise<Course[]> {
  return courseData
}

export default courseData
