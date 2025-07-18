// 用户相关类型
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "instructor" | "admin"
  createdAt: Date
  updatedAt: Date
  profile: UserProfile
}

export interface UserProfile {
  bio?: string
  location?: string
  website?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  preferences: UserPreferences
  statistics: UserStatistics
}

export interface UserPreferences {
  language: "zh-CN" | "en-US"
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
    courseUpdates: boolean
    examReminders: boolean
  }
}

export interface UserStatistics {
  totalCoursesCompleted: number
  totalExamsPassed: number
  totalStudyHours: number
  currentStreak: number
  longestStreak: number
  achievements: Achievement[]
}

// 课程相关类型
export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // 分钟
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  tags: string[]
  thumbnail: string
  rating: number
  reviewCount: number
  enrollmentCount: number
  price: number
  currency: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  modules: CourseModule[]
  prerequisites: string[]
  learningObjectives: string[]
}

export interface CourseModule {
  id: string
  title: string
  description: string
  order: number
  duration: number
  lessons: Lesson[]
  quiz?: any // Declare Quiz type here or import it
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  type: "video" | "text" | "interactive" | "assignment"
  duration: number
  order: number
  resources: LessonResource[]
  isCompleted?: boolean
}

export interface LessonResource {
  id: string
  title: string
  type: "pdf" | "link" | "code" | "image"
  url: string
  description?: string
}

// 考试相关类型
export interface Exam {
  id: string
  title: string
  description: string
  type: "practice" | "certification" | "assessment"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // 分钟
  totalQuestions: number
  passingScore: number
  maxAttempts: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  questions: ExamQuestion[]
  prerequisites: string[]
}

export interface ExamQuestion {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "short-answer" | "essay"
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
}

export interface ExamAttempt {
  id: string
  examId: string
  userId: string
  startedAt: Date
  completedAt?: Date
  score?: number
  passed?: boolean
  answers: ExamAnswer[]
  timeSpent: number
  status: "in-progress" | "completed" | "abandoned"
}

export interface ExamAnswer {
  questionId: string
  answer: string | string[]
  isCorrect: boolean
  timeSpent: number
}

// 团队相关类型
export interface Team {
  id: string
  name: string
  description: string
  type: "study-group" | "project-team" | "community"
  isPublic: boolean
  memberCount: number
  maxMembers?: number
  createdAt: Date
  updatedAt: Date
  creator: User
  members: TeamMember[]
  activities: TeamActivity[]
}

export interface TeamMember {
  userId: string
  user: User
  role: "owner" | "admin" | "member"
  joinedAt: Date
  contributions: number
}

export interface TeamActivity {
  id: string
  type: "member-joined" | "course-completed" | "exam-passed" | "discussion-created"
  description: string
  userId: string
  user: User
  createdAt: Date
  metadata?: Record<string, any>
}

// 学习路径相关类型
export interface LearningPath {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedDuration: number // 小时
  category: string
  tags: string[]
  thumbnail: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  courses: LearningPathCourse[]
  prerequisites: string[]
  outcomes: string[]
}

export interface LearningPathCourse {
  courseId: string
  course: Course
  order: number
  isRequired: boolean
  estimatedDuration: number
}

export interface UserLearningPath {
  id: string
  userId: string
  learningPathId: string
  learningPath: LearningPath
  startedAt: Date
  completedAt?: Date
  progress: number // 0-100
  currentCourseId?: string
  status: "not-started" | "in-progress" | "completed" | "paused"
}

// 成就相关类型
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: "course" | "exam" | "streak" | "social" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
  requirements: AchievementRequirement[]
  unlockedAt?: Date
}

export interface AchievementRequirement {
  type: "course-completion" | "exam-score" | "study-streak" | "social-interaction"
  target: number
  current?: number
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 表单相关类型
export interface LoginForm {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface ProfileUpdateForm {
  name: string
  bio?: string
  location?: string
  website?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

// 统计相关类型
export interface DashboardStats {
  totalCourses: number
  completedCourses: number
  totalExams: number
  passedExams: number
  studyHours: number
  currentStreak: number
  achievements: number
  rank: number
}

export interface CourseProgress {
  courseId: string
  progress: number // 0-100
  completedLessons: number
  totalLessons: number
  timeSpent: number
  lastAccessedAt: Date
}

// 设置相关类型
export interface AppSettings {
  appearance: {
    theme: "light" | "dark" | "system"
    language: "zh-CN" | "en-US"
    fontSize: "small" | "medium" | "large"
  }
  notifications: {
    email: boolean
    push: boolean
    courseUpdates: boolean
    examReminders: boolean
    teamActivities: boolean
  }
  privacy: {
    profileVisibility: "public" | "friends" | "private"
    showProgress: boolean
    showAchievements: boolean
  }
  study: {
    dailyGoal: number // 分钟
    reminderTime?: string
    autoplay: boolean
    playbackSpeed: number
  }
}

// 搜索相关类型
export interface SearchFilters {
  query?: string
  category?: string
  difficulty?: string[]
  duration?: {
    min?: number
    max?: number
  }
  rating?: number
  price?: {
    min?: number
    max?: number
  }
  tags?: string[]
}

export interface SearchResult {
  courses: Course[]
  exams: Exam[]
  learningPaths: LearningPath[]
  teams: Team[]
  total: number
}

// 通知相关类型
export interface Notification {
  id: string
  userId: string
  type: "course-update" | "exam-reminder" | "achievement" | "team-activity" | "system"
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  actionUrl?: string
  metadata?: Record<string, any>
}

// 评论和评分类型
export interface Review {
  id: string
  userId: string
  user: User
  courseId?: string
  examId?: string
  rating: number // 1-5
  comment: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
  helpful: number
  reported: boolean
}

// 讨论相关类型
export interface Discussion {
  id: string
  title: string
  content: string
  authorId: string
  author: User
  courseId?: string
  teamId?: string
  category: string
  tags: string[]
  isSticky: boolean
  isLocked: boolean
  viewCount: number
  replyCount: number
  createdAt: Date
  updatedAt: Date
  replies: DiscussionReply[]
}

export interface DiscussionReply {
  id: string
  content: string
  authorId: string
  author: User
  discussionId: string
  parentReplyId?: string
  createdAt: Date
  updatedAt: Date
  likes: number
  isAccepted: boolean
}

// 证书相关类型
export interface Certificate {
  id: string
  userId: string
  user: User
  courseId?: string
  course?: Course
  examId?: string
  exam?: Exam
  learningPathId?: string
  learningPath?: LearningPath
  title: string
  description: string
  issuedAt: Date
  expiresAt?: Date
  certificateUrl: string
  verificationCode: string
  isValid: boolean
}

// 支付相关类型
export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  transactionId?: string
  courseId?: string
  learningPathId?: string
  createdAt: Date
  updatedAt: Date
}

// 分析相关类型
export interface Analytics {
  pageViews: number
  uniqueVisitors: number
  averageSessionDuration: number
  bounceRate: number
  topPages: Array<{
    path: string
    views: number
  }>
  userEngagement: {
    dailyActiveUsers: number
    weeklyActiveUsers: number
    monthlyActiveUsers: number
  }
  courseMetrics: {
    enrollments: number
    completions: number
    averageRating: number
    dropoffRate: number
  }
}
