// 用户相关类型
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  createdAt: Date
  updatedAt: Date
  displayName?: string
  bio?: string
  level?: number
  experience?: number
  totalPoints?: number
  streak?: number
  joinedAt?: Date
  lastActiveAt?: Date
  preferences?: UserPreferences
  stats?: UserStats
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

export interface NotificationSettings {
  email: boolean
  push: boolean
  courseUpdates: boolean
  examReminders: boolean
  achievements: boolean
  community: boolean
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends"
  showProgress: boolean
  showAchievements: boolean
  allowMessages: boolean
}

export interface UserStats {
  coursesCompleted: number
  coursesInProgress: number
  totalStudyTime: number
  averageScore: number
  examsPassed: number
  certificatesEarned: number
  streakDays: number
  totalLogins: number
}

// 课程相关类型
export interface Course {
  id: string
  title: string
  description: string
  image: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  students: number
  rating: number
  price: number
  instructor: string
  chapters: string[]
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  isPublished?: boolean
  isFeatured?: boolean
  syllabus?: CourseSyllabus[]
}

export interface CourseSyllabus {
  id: string
  title: string
  description: string
  duration: number
  lessons: Lesson[]
  order: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: LessonType
  content: string
  duration: number
  resources: LessonResource[]
  quiz?: Quiz
  order: number
  isCompleted?: boolean
}

export interface LessonResource {
  id: string
  title: string
  type: ResourceType
  url: string
  size?: number
}

export type CourseCategory =
  | "ai-basics"
  | "machine-learning"
  | "deep-learning"
  | "nlp"
  | "computer-vision"
  | "robotics"
  | "data-science"
  | "programming"
  | "ethics"
  | "business"

export type CourseLevel = "beginner" | "intermediate" | "advanced" | "expert"

export type LessonType = "video" | "text" | "interactive" | "quiz" | "assignment"

export type ResourceType = "pdf" | "video" | "audio" | "link" | "code" | "dataset"

// 考试相关类型
export interface Exam {
  id: string
  title: string
  description: string
  duration: number
  questionCount: number
  difficulty: "easy" | "medium" | "hard"
  category: string
  passingScore: number
  questions: Question[]
  createdAt: Date
  updatedAt: Date
  isPublic?: boolean
  prerequisites?: string[]
  tags?: string[]
}

export interface ExamAttempt {
  id: string
  examId: string
  userId: string
  startedAt: Date
  completedAt?: Date
  score?: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: ExamAnswer[]
  status: ExamStatus
  feedback?: string
}

export interface ExamAnswer {
  questionId: string
  selectedAnswer: string | string[]
  isCorrect: boolean
  timeSpent: number
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  options?: string[]
  correctAnswer: string | number
  explanation?: string
  points: number
}

export interface ExamResult {
  id: string
  examId: string
  userId: string
  score: number
  totalPoints: number
  percentage: number
  passed: boolean
  answers: UserAnswer[]
  startedAt: Date
  completedAt: Date
}

export interface UserAnswer {
  questionId: string
  answer: string | number
  isCorrect: boolean
  points: number
}

export type ExamCategory = "certification" | "assessment" | "practice" | "mock" | "final"

export type ExamLevel = "basic" | "intermediate" | "advanced" | "professional"

export type ExamStatus = "not-started" | "in-progress" | "completed" | "expired"

export type QuestionType = "single-choice" | "multiple-choice" | "true-false" | "fill-blank" | "essay" | "code"

export type QuestionDifficulty = "easy" | "medium" | "hard"

// 团队相关类型
export interface Team {
  id: string
  name: string
  description: string
  image: string
  memberCount: number
  category: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  tags?: string[]
  stats?: TeamStats
  type?: TeamType
  privacy?: TeamPrivacy
}

export interface TeamMember {
  id: string
  teamId: string
  userId: string
  role: TeamRole
  joinedAt: Date
  contribution: number
  status: MemberStatus
}

export interface TeamStats {
  totalPoints: number
  averageProgress: number
  completedCourses: number
  activeMembers: number
  weeklyActivity: number
}

export type TeamType = "study-group" | "project-team" | "competition" | "community"

export type TeamPrivacy = "public" | "private" | "invite-only"

export type TeamRole = "owner" | "admin" | "member" | "guest"

export type MemberStatus = "active" | "inactive" | "pending" | "banned"

// 学习路径相关类型
export interface LearningPath {
  id: string
  title: string
  description: string
  image: string
  courses: string[]
  estimatedDuration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  createdAt: Date
  updatedAt: Date
  isPublished?: boolean
  prerequisites?: string[]
  skills?: string[]
  certificate?: Certificate
}

export interface LearningProgress {
  id: string
  userId: string
  courseId?: string
  pathId?: string
  progress: number
  timeSpent: number
  lastAccessedAt: Date
  completedLessons: string[]
  currentLesson?: string
  notes: ProgressNote[]
}

export interface ProgressNote {
  id: string
  lessonId: string
  content: string
  createdAt: Date
}

// 成就相关类型
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: "course" | "exam" | "streak" | "social"
  requirement: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: Date
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  unlockedAt: Date
  progress?: number
  isDisplayed: boolean
}

export interface AchievementCriteria {
  type: "course_completion" | "exam_score" | "streak" | "time_spent" | "custom"
  target: number
  conditions?: Record<string, any>
}

export interface AchievementReward {
  points: number
  badge?: string
  title?: string
  certificate?: string
}

export type AchievementCategory = "learning" | "social" | "milestone" | "special" | "seasonal"

export type AchievementType = "progress" | "completion" | "mastery" | "social"

export type AchievementRarity = "common" | "uncommon" | "rare" | "epic" | "legendary"

// 证书相关类型
export interface Certificate {
  id: string
  title: string
  description: string
  issuer: string
  recipientId: string
  courseId?: string
  pathId?: string
  examId?: string
  issuedAt: Date
  expiresAt?: Date
  credentialId: string
  verificationUrl: string
  template: string
  metadata: CertificateMetadata
}

export interface CertificateMetadata {
  grade?: string
  score?: number
  duration?: number
  skills: string[]
  instructor?: string
  institution?: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: PaginationInfo
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// 表单相关类型
export interface LoginForm {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface ProfileForm {
  displayName: string
  bio?: string
  avatar?: File
  preferences: UserPreferences
}

export interface CourseForm {
  title: string
  description: string
  category: CourseCategory
  level: CourseLevel
  price: number
  thumbnail?: File
  tags: string[]
  prerequisites: string[]
  learningObjectives: string[]
}

export interface FormData {
  [key: string]: any
}

// 统计数据类型
export interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalExams: number
  totalCertificates: number
  activeUsers: number
  courseCompletions: number
  averageScore: number
  userGrowth: number
}

export interface LearningStats {
  totalStudyTime: number
  coursesCompleted: number
  coursesInProgress: number
  averageScore: number
  streakDays: number
  weeklyProgress: WeeklyProgress[]
  categoryProgress: CategoryProgress[]
}

export interface WeeklyProgress {
  date: string
  studyTime: number
  lessonsCompleted: number
  score: number
}

export interface CategoryProgress {
  category: string
  progress: number
  timeSpent: number
  coursesCompleted: number
}

export interface Statistics {
  totalUsers: number
  totalCourses: number
  totalExams: number
  totalTeams: number
  activeUsers: number
  completedCourses: number
  passedExams: number
  averageScore: number
}

// 设置相关类型
export interface AppSettings {
  general: GeneralSettings
  appearance: AppearanceSettings
  notifications: NotificationSettings
  privacy: PrivacySettings
  advanced: AdvancedSettings
}

export interface GeneralSettings {
  language: string
  timezone: string
  dateFormat: string
  autoSave: boolean
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
  colorScheme: string
  animations: boolean
}

export interface AdvancedSettings {
  debugMode: boolean
  experimentalFeatures: boolean
  dataCollection: boolean
  performanceMode: boolean
}

// 搜索相关类型
export interface SearchResult {
  id: string
  type: "course" | "exam" | "user" | "team" | "content"
  title: string
  description: string
  url: string
  thumbnail?: string
  relevance: number
  category?: string
  tags: string[]
}

export interface SearchFilters {
  type?: string[]
  category?: string
  level?: string
  duration?: string
  rating?: number
  price?: "free" | "paid"
  sortBy?: "newest" | "popular" | "rating" | "price"
  sortOrder?: "asc" | "desc"
}

// 通知相关类型
export interface Notification {
  id: string
  userId: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: Date
  expiresAt?: Date
}

export type NotificationType =
  | "course_update"
  | "exam_reminder"
  | "achievement_unlocked"
  | "team_invitation"
  | "message_received"
  | "system_announcement"

// 聊天相关类型
export interface ChatMessage {
  id: string
  senderId: string
  receiverId?: string
  teamId?: string
  content: string
  type: MessageType
  attachments?: MessageAttachment[]
  replyTo?: string
  isEdited: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface MessageAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export type MessageType = "text" | "image" | "file" | "code" | "system"

// 分析相关类型
export interface AnalyticsData {
  overview: OverviewAnalytics
  learning: LearningAnalytics
  performance: PerformanceAnalytics
  engagement: EngagementAnalytics
}

export interface OverviewAnalytics {
  totalStudyTime: number
  coursesCompleted: number
  averageScore: number
  streakDays: number
  rank: number
  percentile: number
}

export interface LearningAnalytics {
  dailyActivity: DailyActivity[]
  categoryDistribution: CategoryDistribution[]
  learningVelocity: number
  retentionRate: number
}

export interface PerformanceAnalytics {
  scoreHistory: ScoreHistory[]
  weakAreas: string[]
  strongAreas: string[]
  improvementSuggestions: string[]
}

export interface EngagementAnalytics {
  loginFrequency: number
  sessionDuration: number
  featureUsage: FeatureUsage[]
  socialActivity: number
}

export interface DailyActivity {
  date: string
  studyTime: number
  lessonsCompleted: number
  exercisesCompleted: number
}

export interface CategoryDistribution {
  category: string
  percentage: number
  timeSpent: number
}

export interface ScoreHistory {
  date: string
  score: number
  subject: string
}

export interface FeatureUsage {
  feature: string
  usage: number
  lastUsed: Date
}

// 错误类型
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
  userId?: string
  context?: Record<string, any>
}

// 事件类型
export interface AppEvent {
  type: string
  data: any
  timestamp: Date
  userId?: string
  sessionId?: string
}

// 配置类型
export interface AppConfig {
  api: {
    baseUrl: string
    timeout: number
    retries: number
  }
  features: {
    [key: string]: boolean
  }
  limits: {
    maxFileSize: number
    maxCourses: number
    maxTeamMembers: number
  }
  integrations: {
    [key: string]: any
  }
}

// 导出所有类型
export type { Quiz, QuizQuestion, QuizAnswer, QuizResult, QuizAttempt }

// Quiz 相关类型（补充）
export interface Quiz {
  id: string
  lessonId: string
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit?: number
  passingScore: number
  maxAttempts: number
  isRequired: boolean
}

export interface QuizQuestion {
  id: string
  type: QuestionType
  question: string
  options: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

export interface QuizAnswer {
  questionId: string
  answer: string | string[]
  isCorrect: boolean
  timeSpent: number
}

export interface QuizResult {
  id: string
  quizId: string
  userId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  completedAt: Date
  answers: QuizAnswer[]
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  startedAt: Date
  completedAt?: Date
  status: "in-progress" | "completed" | "abandoned"
  currentQuestion: number
  answers: QuizAnswer[]
}

export interface UserSettings {
  userId: string
  theme: "light" | "dark" | "system"
  language: string
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

export interface UserProgress {
  userId: string
  courseId: string
  progress: number
  completedChapters: string[]
  lastAccessedAt: Date
  startedAt: Date
  completedAt?: Date
}

export type QuestionOption = string
