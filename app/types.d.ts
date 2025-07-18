import type React from "react"
// 用户相关类型
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  createdAt: string
  updatedAt: string
  profile: UserProfile
  preferences: UserPreferences
}

export interface UserProfile {
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  skills: string[]
  interests: string[]
  experience: "beginner" | "intermediate" | "advanced"
  goals: string[]
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: "zh-CN" | "en-US"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    progressVisible: boolean
    achievementsVisible: boolean
  }
}

// 课程相关类型
export interface Course {
  id: string
  title: string
  description: string
  image: string
  instructor: string
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  enrolledCount: number
  price: number
  originalPrice?: number
  isPopular: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  modules: CourseModule[]
  prerequisites: string[]
  learningOutcomes: string[]
  certificate: boolean
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: number
  lessons: Lesson[]
  quiz?: any // Declare Quiz type here if needed
  assignment?: any // Declare Assignment type here if needed
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: "video" | "text" | "interactive" | "quiz"
  content: string
  duration: number
  resources: Resource[]
  completed: boolean
}

export interface Resource {
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
  duration: number
  totalQuestions: number
  passingScore: number
  attempts: number
  maxAttempts: number
  questions: Question[]
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "fill-blank" | "essay"
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  category: string
  tags: string[]
}

export interface ExamResult {
  id: string
  examId: string
  userId: string
  score: number
  totalScore: number
  percentage: number
  passed: boolean
  timeSpent: number
  answers: Answer[]
  startedAt: string
  completedAt: string
}

export interface Answer {
  questionId: string
  answer: string | string[]
  isCorrect: boolean
  timeSpent: number
}

// 学习进度相关类型
export interface Progress {
  userId: string
  courseId: string
  moduleId?: string
  lessonId?: string
  completionPercentage: number
  timeSpent: number
  lastAccessedAt: string
  status: "not-started" | "in-progress" | "completed"
  notes: string[]
  bookmarks: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: "course" | "exam" | "streak" | "milestone"
  criteria: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
}

// 团队相关类型
export interface Team {
  id: string
  name: string
  description: string
  image: string
  type: "study-group" | "project-team" | "community"
  memberCount: number
  maxMembers: number
  isPublic: boolean
  tags: string[]
  createdAt: string
  members: TeamMember[]
  activities: TeamActivity[]
}

export interface TeamMember {
  userId: string
  role: "owner" | "admin" | "member"
  joinedAt: string
  contributions: number
  status: "active" | "inactive"
}

export interface TeamActivity {
  id: string
  type: "join" | "leave" | "complete-course" | "pass-exam" | "discussion"
  userId: string
  description: string
  createdAt: string
  metadata?: Record<string, any>
}

// 学习路径相关类型
export interface LearningPath {
  id: string
  title: string
  description: string
  image: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedDuration: number
  courses: string[]
  prerequisites: string[]
  outcomes: string[]
  popularity: number
  rating: number
  createdAt: string
  updatedAt: string
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
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
  remember?: boolean
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface ProfileForm {
  name: string
  bio?: string
  location?: string
  website?: string
  skills: string[]
  interests: string[]
  experience: "beginner" | "intermediate" | "advanced"
}

// 统计数据类型
export interface Statistics {
  totalUsers: number
  totalCourses: number
  totalExams: number
  totalTeams: number
  activeUsers: number
  completedCourses: number
  passedExams: number
  averageRating: number
}

export interface UserStatistics {
  coursesCompleted: number
  examsPasssed: number
  totalStudyTime: number
  currentStreak: number
  longestStreak: number
  achievementsUnlocked: number
  teamParticipations: number
  averageScore: number
}

// 设置相关类型
export interface AppSettings {
  theme: "light" | "dark" | "system"
  language: "zh-CN" | "en-US"
  timezone: string
  dateFormat: string
  currency: string
  notifications: NotificationSettings
  privacy: PrivacySettings
  accessibility: AccessibilitySettings
}

export interface NotificationSettings {
  email: {
    courseUpdates: boolean
    examReminders: boolean
    teamActivities: boolean
    achievements: boolean
    newsletter: boolean
  }
  push: {
    studyReminders: boolean
    deadlines: boolean
    teamMessages: boolean
    systemUpdates: boolean
  }
  sms: {
    importantUpdates: boolean
    securityAlerts: boolean
  }
}

export interface PrivacySettings {
  profileVisibility: "public" | "friends" | "private"
  progressVisibility: "public" | "friends" | "private"
  achievementsVisibility: "public" | "friends" | "private"
  allowDataCollection: boolean
  allowMarketing: boolean
  allowThirdPartySharing: boolean
}

export interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "extra-large"
  contrast: "normal" | "high"
  animations: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  colorBlindSupport: boolean
}

// 搜索和过滤类型
export interface SearchFilters {
  query?: string
  category?: string
  difficulty?: string[]
  duration?: {
    min: number
    max: number
  }
  rating?: number
  price?: {
    min: number
    max: number
  }
  tags?: string[]
  instructor?: string
  sortBy?: "popularity" | "rating" | "newest" | "price-low" | "price-high"
}

// 错误类型
export interface AppError {
  code: string
  message: string
  details?: string
  timestamp: string
  userId?: string
  context?: Record<string, any>
}

// 事件类型
export interface AppEvent {
  type: string
  payload: Record<string, any>
  timestamp: string
  userId?: string
  sessionId?: string
}

// 全局状态类型
export interface AppState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AppError | null
  settings: AppSettings
  currentCourse: Course | null
  currentExam: Exam | null
  progress: Record<string, Progress>
  achievements: Achievement[]
  teams: Team[]
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  createdAt: string
  expiresAt?: string
  actionUrl?: string
  actionText?: string
}

// 组件 Props 类型
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends ComponentProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export interface CardProps extends ComponentProps {
  title?: string
  description?: string
  image?: string
  href?: string
  onClick?: () => void
}

// 工具类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 数据库类型
export interface DatabaseUser extends Omit<User, "profile" | "preferences"> {
  profileId: string
  preferencesId: string
}

export interface DatabaseCourse extends Omit<Course, "modules"> {
  moduleIds: string[]
}

// 外部服务类型
export interface PaymentProvider {
  id: string
  name: string
  type: "credit-card" | "paypal" | "alipay" | "wechat"
  enabled: boolean
  config: Record<string, any>
}

export interface EmailProvider {
  id: string
  name: string
  type: "smtp" | "sendgrid" | "mailgun" | "ses"
  enabled: boolean
  config: Record<string, any>
}

// 分析和报告类型
export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  averageSessionDuration: number
  conversionRate: number
  topPages: Array<{
    path: string
    views: number
  }>
  topCourses: Array<{
    id: string
    title: string
    enrollments: number
  }>
  userGrowth: Array<{
    date: string
    newUsers: number
    totalUsers: number
  }>
}

export interface ReportData {
  type: "user" | "course" | "exam" | "financial"
  period: "daily" | "weekly" | "monthly" | "yearly"
  data: Record<string, any>
  generatedAt: string
  generatedBy: string
}
