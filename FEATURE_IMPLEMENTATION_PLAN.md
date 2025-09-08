# YanYu Smart Cloud³ Learning Platform 功能实现方案

基于对现有代码库的分析，以下是实现用户提出的五个功能建议的详细方案：

## 1. AI评分机制实现方案

### 功能概述
为高级考试中的主观题引入更智能的AI评分机制，替代当前基于关键词和回答长度的简单评分逻辑。

### 技术方案

1. **创建AI评分服务接口**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/lib/ai-scoring-service.ts

interface AIScoringRequest {
  question: string;
  userAnswer: string;
  referenceAnswer?: string;
  keywords?: string[];
  scoringCriteria?: string[];
  questionType?: string;
}

interface AIScoringResult {
  score: number;
  feedback: string;
  strengths?: string[];
  weaknesses?: string[];
  improvementSuggestions?: string[];
  confidenceScore: number;
}

export const scoreWithAI = async (request: AIScoringRequest): Promise<AIScoringResult> => {
  // 在实际实现中，这里应该调用真实的AI服务API
  // 这里使用模拟实现
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟AI评分逻辑
    const answerLength = request.userAnswer.trim().length;
    const hasKeywords = request.keywords?.some(keyword => 
      request.userAnswer.toLowerCase().includes(keyword.toLowerCase())
    ) || false;
    
    let baseScore = 0;
    if (answerLength > 150 && hasKeywords) {
      baseScore = 0.8; // 80%的基础分数
    } else if (answerLength > 80 || hasKeywords) {
      baseScore = 0.6; // 60%的基础分数
    } else {
      baseScore = 0.3; // 30%的基础分数
    }
    
    // 添加一些随机性来模拟AI评估的不确定性
    const randomFactor = 0.9 + Math.random() * 0.2; // 0.9-1.1之间的随机因子
    const finalScore = Math.min(1.0, baseScore * randomFactor);
    
    return {
      score: finalScore,
      feedback: finalScore > 0.7 ? 
        "您的回答包含了核心概念，解释清晰。" : 
        "您的回答需要补充更多关键信息和详细解释。",
      strengths: finalScore > 0.5 ? ["回答结构合理", "包含部分关键概念"] : [],
      weaknesses: finalScore < 0.7 ? ["关键概念阐述不足", "需要更深入的分析"] : [],
      improvementSuggestions: ["尝试结合具体案例进行分析", "补充更多专业术语和原理解释"],
      confidenceScore: 0.85, // 模拟的置信度
    };
  } catch (error) {
    console.error("AI评分服务出错:", error);
    // 降级到简单的基于规则的评分
    const answerLength = request.userAnswer.trim().length;
    const score = answerLength > 100 ? 0.7 : answerLength > 50 ? 0.5 : 0.3;
    
    return {
      score,
      feedback: "AI评分服务暂时不可用，使用备用评分机制。",
      confidenceScore: 0.5,
    };
  }
};
```

2. **修改高级考试组件以使用AI评分**

```typescript
// 修改文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/advanced-exam.tsx

import { scoreWithAI } from '../lib/ai-scoring-service';

// 修改handleSubmitExam函数
const handleSubmitExam = async () => {
  const timeUsed = timeLimit * 60 - timeRemaining;
  let totalPoints = 0;
  let earnedPoints = 0;
  const feedback: Record<string, string> = {};
  
  setIsScoring(true); // 添加评分中的状态指示
  
  // 逐个评分
  for (const question of examQuestions) {
    totalPoints += question.points;
    const userAnswer = answers[question.id] || "";
    
    if (userAnswer.trim().length > 0) {
      // 使用AI评分服务
      const scoringResult = await scoreWithAI({
        question: question.question,
        userAnswer,
        referenceAnswer: question.referenceAnswer,
        keywords: question.keywords,
        scoringCriteria: question.scoringCriteria,
        questionType: question.type,
      });
      
      const score = scoringResult.score * question.points;
      earnedPoints += score;
      
      // 构建详细反馈
      let detailedFeedback = `得分：${score.toFixed(1)}/${question.points}分。\n`;
      detailedFeedback += `${scoringResult.feedback}\n`;
      
      if (scoringResult.strengths && scoringResult.strengths.length > 0) {
        detailedFeedback += `优点：${scoringResult.strengths.join('、')}\n`;
      }
      
      if (scoringResult.improvementSuggestions && scoringResult.improvementSuggestions.length > 0) {
        detailedFeedback += `改进建议：${scoringResult.improvementSuggestions.join('、')}`;
      }
      
      feedback[question.id] = detailedFeedback;
    } else {
      feedback[question.id] = `未作答，得分：0/${question.points}分。`;
    }
  }
  
  const examResults: AdvancedExamResults = {
    totalQuestions: examQuestions.length,
    totalPoints,
    earnedPoints,
    score: Math.round((earnedPoints / totalPoints) * 100),
    timeUsed,
    answers,
    feedback,
  };
  
  setResults(examResults);
  setExamCompleted(true);
  setShowResults(true);
  setIsScoring(false);
  onComplete?.(examResults);
};

// 在考试界面添加评分状态指示器
const renderExamInterface = () => {
  // ...现有代码...
  
  return (
    <Card>
      {/* ...现有代码... */}
      {isScoring && (
        <div className="flex justify-center items-center p-8">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-blue-600">AI正在评分，请稍候...</p>
          </div>
        </div>
      )}
      {/* ...现有代码... */}
    </Card>
  );
};
```

## 2. 自适应考试功能实现方案

### 功能概述
实现基于用户能力水平的自适应考试，根据用户的答题情况动态调整后续题目的难度和类型。

### 技术方案

1. **创建自适应考试数据结构**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/data/adaptive-exam-data.ts

export interface AdaptiveExamQuestion {
  id: string;
  type: 'single' | 'multiple' | 'essay';
  question: string;
  options?: string[];
  correctAnswers?: any[];
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string;
  prerequisites?: string[]; // 前置知识点
  learningObjective: string; // 考查的学习目标
}

// 示例自适应题库
const adaptiveQuestions: AdaptiveExamQuestion[] = [
  // 简单题目
  {
    id: 'adaptive_001',
    type: 'single',
    question: '以下哪个不是机器学习的主要类型？',
    options: ['监督学习', '无监督学习', '强化学习', '批量学习'],
    correctAnswers: [3],
    explanation: '批量学习是一种学习方式，不是机器学习的主要类型。',
    points: 1,
    difficulty: 'easy',
    category: '基础概念',
    learningObjective: '理解机器学习的基本分类',
  },
  // 更多题目...
];

export default adaptiveQuestions;
```

2. **创建自适应考试组件**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/adaptive-exam.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import adaptiveQuestions, { AdaptiveExamQuestion } from '../data/adaptive-exam-data';
import { Clock, ChevronRight, BarChart2, Award } from 'lucide-react';

interface AdaptiveExamProps {
  examTitle?: string;
  initialDifficulty?: 'easy' | 'medium' | 'hard';
  maxQuestions?: number;
  onComplete?: (results: any) => void;
}

const AdaptiveExam: React.FC<AdaptiveExamProps> = ({
  examTitle = '自适应AI能力测试',
  initialDifficulty = 'medium',
  maxQuestions = 15,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveExamQuestion | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [abilityEstimate, setAbilityEstimate] = useState(0.5); // 初始能力估计值 (0-1)
  const [questionHistory, setQuestionHistory] = useState<Array<{
    questionId: string;
    difficulty: string;
    wasCorrect: boolean;
  }>>([]);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30分钟
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);

  // 定时器
  useEffect(() => {
    if (!examCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining <= 0 && !examCompleted) {
      handleExamComplete();
    }
  }, [examCompleted, timeRemaining]);

  // 选择下一个题目
  const selectNextQuestion = () => {
    // 如果达到最大题目数，结束考试
    if (questionNumber >= maxQuestions) {
      handleExamComplete();
      return;
    }

    // 根据当前能力估计选择合适难度的题目
    const targetDifficulty = getTargetDifficulty(abilityEstimate);
    
    // 过滤可用题目
    const availableQuestions = adaptiveQuestions.filter(q => 
      q.difficulty === targetDifficulty &&
      !questionHistory.some(h => h.questionId === q.id)
    );
    
    // 如果没有合适难度的题目，放宽条件
    const fallbackQuestions = adaptiveQuestions.filter(q => 
      !questionHistory.some(h => h.questionId === q.id)
    );
    
    const questionsPool = availableQuestions.length > 0 ? availableQuestions : fallbackQuestions;
    
    if (questionsPool.length > 0) {
      // 随机选择一个题目
      const randomIndex = Math.floor(Math.random() * questionsPool.length);
      setCurrentQuestion(questionsPool[randomIndex]);
      setCurrentAnswer('');
      setQuestionNumber(prev => prev + 1);
    } else {
      handleExamComplete();
    }
  };

  // 根据能力估计计算目标难度
  const getTargetDifficulty = (ability: number): 'easy' | 'medium' | 'hard' | 'expert' => {
    if (ability < 0.3) return 'easy';
    if (ability < 0.5) return 'medium';
    if (ability < 0.8) return 'hard';
    return 'expert';
  };

  // 处理答案提交
  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;

    let isCorrect = false;
    
    if (currentQuestion.type === 'single') {
      isCorrect = currentAnswer === String(currentQuestion.correctAnswers?.[0]);
    } else if (currentQuestion.type === 'multiple') {
      // 多选题简化判断
      const userAnswersArray = Array.isArray(currentAnswer) ? currentAnswer : [currentAnswer];
      isCorrect = userAnswersArray.length === currentQuestion.correctAnswers?.length &&
        userAnswersArray.every(ans => currentQuestion.correctAnswers?.includes(parseInt(ans)));
    } else if (currentQuestion.type === 'essay') {
      // 主观题简化判断
      isCorrect = currentAnswer.length > 100;
    }

    // 更新用户答案
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: currentAnswer }));

    // 更新能力估计值 (简化的IRT模型)
    const difficultyLevel = getDifficultyLevel(currentQuestion.difficulty);
    const newAbility = updateAbilityEstimate(abilityEstimate, difficultyLevel, isCorrect);
    setAbilityEstimate(newAbility);

    // 记录答题历史
    setQuestionHistory(prev => [...prev, {
      questionId: currentQuestion.id,
      difficulty: currentQuestion.difficulty,
      wasCorrect: isCorrect,
    }]);

    // 选择下一个题目
    selectNextQuestion();
  };

  // 难度级别映射为数字
  const getDifficultyLevel = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy': return 0.2;
      case 'medium': return 0.5;
      case 'hard': return 0.8;
      case 'expert': return 1.0;
      default: return 0.5;
    }
  };

  // 更新能力估计值
  const updateAbilityEstimate = (current: number, difficulty: number, isCorrect: boolean): number => {
    const adjustmentFactor = 0.08; // 每次调整的幅度
    if (isCorrect) {
      // 如果答对了更难的题目，能力值增加更多
      const adjustment = adjustmentFactor * (1 - Math.abs(current - difficulty));
      return Math.min(1.0, current + adjustment);
    } else {
      // 如果答错了更容易的题目，能力值减少更多
      const adjustment = adjustmentFactor * (1 - Math.abs(current - difficulty));
      return Math.max(0.0, current - adjustment);
    }
  };

  // 完成考试
  const handleExamComplete = () => {
    setExamCompleted(true);
    
    // 计算考试结果
    const correctAnswers = questionHistory.filter(h => h.wasCorrect).length;
    const accuracy = questionHistory.length > 0 ? correctAnswers / questionHistory.length : 0;
    
    const results = {
      abilityLevel: Math.round(abilityEstimate * 100),
      accuracy: Math.round(accuracy * 100),
      correctAnswers,
      totalQuestions: questionHistory.length,
      timeUsed: 30 * 60 - timeRemaining,
      questionHistory,
    };
    
    onComplete?.(results);
  };

  // 格式化剩余时间
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 初始加载第一个题目
  useEffect(() => {
    selectNextQuestion();
  }, []);

  // 渲染考试结果
  const renderResults = () => {
    const correctAnswers = questionHistory.filter(h => h.wasCorrect).length;
    const accuracy = questionHistory.length > 0 ? correctAnswers / questionHistory.length : 0;
    
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            考试结果
          </CardTitle>
          <CardDescription>基于您的表现的自适应评估</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-sm text-gray-600 mb-2">能力水平</h3>
              <div className="text-3xl font-bold text-blue-700">{Math.round(abilityEstimate * 100)}</div>
              <div className="mt-2 text-xs text-gray-500">
                {abilityEstimate < 0.3 ? '入门级' : 
                 abilityEstimate < 0.5 ? '基础级' : 
                 abilityEstimate < 0.7 ? '中级' : 
                 abilityEstimate < 0.9 ? '高级' : '专家级'}
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="text-sm text-gray-600 mb-2">正确率</h3>
              <div className="text-3xl font-bold text-green-700">{Math.round(accuracy * 100)}%</div>
              <div className="mt-2 text-xs text-gray-500">
                {correctAnswers}/{questionHistory.length} 题正确
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <h3 className="text-sm text-gray-600 mb-2">用时</h3>
              <div className="text-3xl font-bold text-purple-700">{formatTime(30 * 60 - timeRemaining)}</div>
              <div className="mt-2 text-xs text-gray-500">
                完成 {questionHistory.length} 题
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-4">能力分析</h3>
            <div className="h-3 w-full bg-gray-200 rounded-full">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                style={{ width: `${abilityEstimate * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>入门</span>
              <span>基础</span>
              <span>中级</span>
              <span>高级</span>
              <span>专家</span>
            </div>
          </div>
          
          <Button className="w-full" onClick={() => window.location.reload()}>
            重新开始自适应考试
          </Button>
        </CardContent>
      </Card>
    );
  };

  // 渲染考试界面
  const renderExamInterface = () => {
    if (!currentQuestion) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">加载题目中...</p>
        </div>
      );
    }

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>{examTitle}</CardTitle>
            <CardDescription>问题 {questionNumber}/{maxQuestions}</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs text-gray-500">{currentQuestion.category}</span>
            </div>
            <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>
            
            {currentQuestion.type === 'single' && (
              <RadioGroup 
                value={currentAnswer} 
                onValueChange={setCurrentAnswer}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQuestion.type === 'essay' && (
              <Textarea
                placeholder="请在此输入您的答案..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="min-h-[200px]"
              />
            )}
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSubmitAnswer}
            disabled={currentQuestion.type === 'single' ? !currentAnswer : currentAnswer.length < 10}
          >
            提交答案
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {examCompleted ? renderResults() : renderExamInterface()}
    </div>
  );
};

export default AdaptiveExam;
```

3. **创建自适应考试页面路由**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/app/adaptive-exam/page.tsx

import AdaptiveExam from '@/components/adaptive-exam';
import { ResponsiveLayout } from '@/components/responsive-layout';

const AdaptiveExamPage = () => {
  return (
    <ResponsiveLayout title="自适应AI能力测试">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">自适应AI能力测试</h1>
        <p className="text-gray-600 mb-8">
          本测试将根据您的答题情况自动调整难度，精准评估您的AI知识水平。
          测试包含{15}道题目，预计需要30分钟完成。
        </p>
        <AdaptiveExam 
          examTitle="AI知识自适应测试"
          maxQuestions={15}
          onComplete={(results) => {
            console.log('自适应考试结果:', results);
            // 这里可以添加结果保存逻辑
          }}
        />
      </div>
    </ResponsiveLayout>
  );
};

export default AdaptiveExamPage;
```

## 3. 错题本功能实现方案

### 功能概述
允许用户收藏和复习错题，帮助用户针对性地提升薄弱环节。

### 技术方案

1. **创建错题本服务**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/lib/error-notebook-service.ts

interface ErrorNotebookItem {
  id: string;
  questionId: string;
  examId?: string;
  question: string;
  userAnswer: any;
  correctAnswer: any;
  explanation: string;
  category: string;
  difficulty: string;
  addedAt: string;
  lastReviewedAt?: string;
  reviewCount: number;
  isMastered: boolean;
}

// 使用localStorage存储错题本数据
const STORAGE_KEY = 'yan_yu_error_notebook';

// 获取用户错题本
export const getErrorNotebook = (): ErrorNotebookItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('获取错题本失败:', error);
    return [];
  }
};

// 添加题目到错题本
export const addToErrorNotebook = (item: Omit<ErrorNotebookItem, 'id' | 'addedAt' | 'reviewCount' | 'isMastered'>): void => {
  try {
    const notebook = getErrorNotebook();
    const newItem: ErrorNotebookItem = {
      ...item,
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString(),
      reviewCount: 0,
      isMastered: false,
    };
    
    notebook.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notebook));
  } catch (error) {
    console.error('添加错题失败:', error);
  }
};

// 从错题本移除题目
export const removeFromErrorNotebook = (itemId: string): void => {
  try {
    const notebook = getErrorNotebook();
    const filtered = notebook.filter(item => item.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('移除错题失败:', error);
  }
};

// 更新错题本中的题目
export const updateErrorNotebookItem = (itemId: string, updates: Partial<ErrorNotebookItem>): void => {
  try {
    const notebook = getErrorNotebook();
    const index = notebook.findIndex(item => item.id === itemId);
    if (index !== -1) {
      notebook[index] = { ...notebook[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notebook));
    }
  } catch (error) {
    console.error('更新错题失败:', error);
  }
};

// 标记题目为已掌握
export const markAsMastered = (itemId: string): void => {
  updateErrorNotebookItem(itemId, {
    isMastered: true,
    lastReviewedAt: new Date().toISOString(),
  });
};

// 复习题目
export const markAsReviewed = (itemId: string): void => {
  const notebook = getErrorNotebook();
  const item = notebook.find(i => i.id === itemId);
  if (item) {
    updateErrorNotebookItem(itemId, {
      reviewCount: item.reviewCount + 1,
      lastReviewedAt: new Date().toISOString(),
    });
  }
};

// 获取分类统计
export const getErrorCategoryStats = (): Record<string, number> => {
  const notebook = getErrorNotebook();
  const stats: Record<string, number> = {};
  
  notebook.forEach(item => {
    if (!item.isMastered) {
      stats[item.category] = (stats[item.category] || 0) + 1;
    }
  });
  
  return stats;
};
```

2. **创建错题本组件**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/error-notebook.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Trash2, BookOpen, Filter, Calendar, Award } from 'lucide-react';
import {
  getErrorNotebook,
  removeFromErrorNotebook,
  markAsMastered,
  markAsReviewed,
  getErrorCategoryStats,
} from '../lib/error-notebook-service';
import { ErrorNotebookItem } from '../lib/error-notebook-service';

interface ErrorNotebookProps {
  onReviewItem?: (item: ErrorNotebookItem) => void;
}

const ErrorNotebook: React.FC<ErrorNotebookProps> = ({ onReviewItem }) => {
  const [notebookItems, setNotebookItems] = useState<ErrorNotebookItem[]>([]);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'reviewed'>('newest');

  // 加载错题本数据
  const loadNotebookData = () => {
    const items = getErrorNotebook();
    const stats = getErrorCategoryStats();
    
    // 排序
    let sortedItems = [...items];
    switch (sortOrder) {
      case 'newest':
        sortedItems.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        break;
      case 'oldest':
        sortedItems.sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime());
        break;
      case 'reviewed':
        sortedItems.sort((a, b) => {
          const aReviewed = a.lastReviewedAt ? new Date(a.lastReviewedAt).getTime() : 0;
          const bReviewed = b.lastReviewedAt ? new Date(b.lastReviewedAt).getTime() : 0;
          return bReviewed - aReviewed;
        });
        break;
    }
    
    // 过滤
    let filteredItems = sortedItems;
    if (filter === 'mastered') {
      filteredItems = sortedItems.filter(item => item.isMastered);
    } else if (filter === 'not-mastered') {
      filteredItems = sortedItems.filter(item => !item.isMastered);
    }
    
    setNotebookItems(filteredItems);
    setCategoryStats(stats);
  };

  // 初始化和刷新数据
  useEffect(() => {
    loadNotebookData();
    // 添加事件监听器，以便在其他组件修改localStorage时刷新数据
    window.addEventListener('storage', loadNotebookData);
    return () => window.removeEventListener('storage', loadNotebookData);
  }, [filter, sortOrder]);

  // 处理删除
  const handleDelete = (itemId: string) => {
    if (confirm('确定要从错题本中移除这道题吗？')) {
      removeFromErrorNotebook(itemId);
      loadNotebookData(); // 立即刷新数据
    }
  };

  // 处理标记为已掌握
  const handleMarkAsMastered = (itemId: string) => {
    markAsMastered(itemId);
    loadNotebookData();
  };

  // 处理复习
  const handleReview = (item: ErrorNotebookItem) => {
    markAsReviewed(item.id);
    loadNotebookData();
    if (onReviewItem) {
      onReviewItem(item);
    }
  };

  // 计算总体掌握进度
  const calculateMasteryProgress = () => {
    const total = notebookItems.length;
    if (total === 0) return 0;
    const mastered = notebookItems.filter(item => item.isMastered).length;
    return (mastered / total) * 100;
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* 错题本概览 */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                我的错题本
              </CardTitle>
              <CardDescription>针对性复习，快速提升薄弱环节</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              共 {notebookItems.length} 题
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">总题数</h3>
              <div className="text-2xl font-bold">{notebookItems.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">已掌握</h3>
              <div className="text-2xl font-bold text-green-600">
                {notebookItems.filter(item => item.isMastered).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">掌握进度</h3>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(calculateMasteryProgress())}%
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">掌握进度</h3>
            <Progress value={calculateMasteryProgress()} className="h-2" />
          </div>
          
          {/* 分类统计 */}
          {Object.keys(categoryStats).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">按分类统计</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <Badge key={category} className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                    {category}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 筛选和排序 */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`${filter === 'all' ? 'bg-blue-50 text-blue-700' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`${filter === 'not-mastered' ? 'bg-blue-50 text-blue-700' : ''}`}
            onClick={() => setFilter('not-mastered')}
          >
            未掌握
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`${filter === 'mastered' ? 'bg-blue-50 text-blue-700' : ''}`}
            onClick={() => setFilter('mastered')}
          >
            已掌握
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">排序:</span>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="newest">最新添加</option>
            <option value="oldest">最早添加</option>
            <option value="reviewed">最近复习</option>
          </select>
        </div>
      </div>

      {/* 错题列表 */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">列表视图</TabsTrigger>
          <TabsTrigger value="study">学习模式</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {notebookItems.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">错题本还是空的</h3>
              <p className="text-gray-500">完成考试后，答错的题目会自动添加到这里</p>
            </div>
          ) : (
            notebookItems.map((item) => (
              <Card key={item.id} className={`${item.isMastered ? 'opacity-70' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{item.question.substring(0, 80)}{item.question.length > 80 ? '...' : ''}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.addedAt)}
                      </span>
                      {item.reviewCount > 0 && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          复习 {item.reviewCount} 次
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 pb-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-red-50 p-3 rounded">
                      <div className="text-gray-500 mb-1">您的答案</div>
                      <div className="text-gray-800">{item.userAnswer || '未作答'}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-gray-500 mb-1">正确答案</div>
                      <div className="text-gray-800">{item.correctAnswer}</div>
                    </div>
                  </div>
                  
                  {item.explanation && (
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-500 mb-1">解析</div>
                      <div className="text-gray-800 text-sm">{item.explanation}</div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleReview(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        复习此题
                      </Button>
                      {!item.isMastered && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleMarkAsMastered(item.id)}
                          className="border-green-500 text-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          标记为已掌握
                        </Button>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      移除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="study">
          <div className="bg-blue-50 p-8 rounded-lg text-center border border-blue-200 mb-6">
            <Award className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-blue-800 mb-2">学习模式</h3>
            <p className="text-blue-700">按顺序复习错题，巩固知识点</p>
          </div>
          
          {notebookItems.filter(item => !item.isMastered).length > 0 ? (
            <div className="space-y-6">
              {/* 这里可以实现学习模式的具体逻辑 */}
              <p className="text-center text-gray-500">学习模式功能正在开发中...</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">太棒了！</h3>
              <p className="text-gray-500">您已经掌握了所有错题</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ErrorNotebook;
```

3. **在考试结果页面添加保存错题功能**

```typescript
// 修改文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/exam-result-analysis.tsx

import { addToErrorNotebook } from '../lib/error-notebook-service';

// 在组件中添加保存错题的函数
const handleSaveToErrorNotebook = () => {
  const incorrectQuestions = questionResults.filter(q => !q.isCorrect);
  
  incorrectQuestions.forEach(question => {
    addToErrorNotebook({
      questionId: question.questionId || `q_${Date.now()}`,
      examId: examId,
      question: question.question,
      userAnswer: question.userAnswer,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      category: question.category || '未分类',
      difficulty: question.difficulty || 'medium',
    });
  });
  
  // 显示保存成功的提示
  if (incorrectQuestions.length > 0) {
    alert(`已成功保存 ${incorrectQuestions.length} 道错题到错题本！`);
  } else {
    alert('您没有答错的题目，很棒！');
  }
};

// 在操作按钮部分添加保存错题按钮
// ...现有代码...
<div className="flex flex-wrap gap-4 justify-center">
  <Button onClick={onRetake} variant="outline" className="flex items-center gap-2">
    <RefreshCw className="h-4 w-4" />
    重新考试
  </Button>
  
  <Button onClick={handleSaveToErrorNotebook} variant="outline" className="flex items-center gap-2">
    <BookOpen className="h-4 w-4" />
    保存错题到错题本
  </Button>
  
  {results.score >= 60 && (
    <Button onClick={onDownloadCertificate} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      下载证书
    </Button>
  )}
  
  <Button onClick={onShare} variant="outline" className="flex items-center gap-2">
    <Share2 className="h-4 w-4" />
    分享成绩
  </Button>
</div>
// ...现有代码...
```

4. **创建错题本页面路由**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/app/error-notebook/page.tsx

import ErrorNotebook from '@/components/error-notebook';
import { ResponsiveLayout } from '@/components/responsive-layout';

const ErrorNotebookPage = () => {
  return (
    <ResponsiveLayout title="我的错题本">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">我的错题本</h1>
        <ErrorNotebook 
          onReviewItem={(item) => {
            console.log('复习题目:', item);
            // 这里可以添加跳转到特定题目复习页面的逻辑
          }}
        />
      </div>
    </ResponsiveLayout>
  );
};

export default ErrorNotebookPage;
```

## 4. 考试历史记录功能实现方案

### 功能概述
记录用户的考试历史和进度，让用户可以查看自己的学习轨迹和进步情况。

### 技术方案

1. **创建考试历史服务**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/lib/exam-history-service.ts

export interface ExamHistoryItem {
  id: string;
  examId: string;
  examName: string;
  examType: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeUsed: number; // 秒
  date: string;
  questionsCount: number;
  correctAnswers: number;
  categoryScores?: Record<string, { correct: number; total: number }>;
  isPassed: boolean;
}

// 使用localStorage存储考试历史
const STORAGE_KEY = 'yan_yu_exam_history';
const MAX_HISTORY_ITEMS = 50; // 最多保存50条记录

// 获取考试历史
export const getExamHistory = (): ExamHistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const history = stored ? JSON.parse(stored) : [];
    // 按日期降序排序
    return history.sort((a: ExamHistoryItem, b: ExamHistoryItem) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('获取考试历史失败:', error);
    return [];
  }
};

// 添加考试记录
export const addExamHistory = (item: Omit<ExamHistoryItem, 'id' | 'date'>): void => {
  try {
    const history = getExamHistory();
    const newItem: ExamHistoryItem = {
      ...item,
      id: `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };
    
    // 添加新记录并限制数量
    history.unshift(newItem);
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('添加考试记录失败:', error);
  }
};

// 删除考试记录
export const deleteExamHistoryItem = (itemId: string): void => {
  try {
    const history = getExamHistory();
    const filtered = history.filter(item => item.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('删除考试记录失败:', error);
  }
};

// 清空考试历史
export const clearExamHistory = (): void => {
  try {
    if (confirm('确定要清空所有考试历史记录吗？此操作不可恢复。')) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('清空考试历史失败:', error);
  }
};

// 获取考试统计信息
export const getExamStatistics = () => {
  const history = getExamHistory();
  
  if (history.length === 0) {
    return {
      totalExams: 0,
      averageScore: 0,
      passRate: 0,
      bestScore: 0,
      recentScores: [],
      performanceTrend: 'neutral', // 'improving', 'declining', 'neutral'
    };
  }
  
  const totalExams = history.length;
  const passedExams = history.filter(item => item.isPassed).length;
  const totalScore = history.reduce((sum, item) => sum + item.score, 0);
  const averageScore = Math.round(totalScore / totalExams);
  const passRate = Math.round((passedExams / totalExams) * 100);
  const bestScore = Math.max(...history.map(item => item.score));
  
  // 获取最近5次考试成绩作为趋势分析
  const recentScores = history.slice(0, 5).map(item => item.score).reverse();
  
  // 简单的趋势分析
  let performanceTrend = 'neutral';
  if (recentScores.length >= 3) {
    const firstThree = recentScores.slice(0, 3);
    const lastThree = recentScores.slice(-3);
    const avgFirstThree = firstThree.reduce((sum, score) => sum + score, 0) / 3;
    const avgLastThree = lastThree.reduce((sum, score) => sum + score, 0) / 3;
    
    if (avgLastThree > avgFirstThree + 5) {
      performanceTrend = 'improving';
    } else if (avgLastThree < avgFirstThree - 5) {
      performanceTrend = 'declining';
    }
  }
  
  return {
    totalExams,
    averageScore,
    passRate,
    bestScore,
    recentScores,
    performanceTrend,
  };
};

// 获取按考试类型的统计
export const getExamTypeStatistics = () => {
  const history = getExamHistory();
  const stats: Record<string, {
    count: number;
    averageScore: number;
    passRate: number;
  }> = {};
  
  history.forEach(item => {
    if (!stats[item.examType]) {
      stats[item.examType] = { count: 0, averageScore: 0, passRate: 0 };
    }
    stats[item.examType].count++;
  });
  
  // 计算平均分和通过率
  Object.keys(stats).forEach(type => {
    const typeExams = history.filter(item => item.examType === type);
    const totalScore = typeExams.reduce((sum, item) => sum + item.score, 0);
    const passedExams = typeExams.filter(item => item.isPassed).length;
    
    stats[type].averageScore = Math.round(totalScore / typeExams.length);
    stats[type].passRate = Math.round((passedExams / typeExams.length) * 100);
  });
  
  return stats;
};
```

2. **创建考试历史组件**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/exam-history.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trash2, BarChart2, Calendar, Award, FileText, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from '@/components/ui/chart';
import {
  getExamHistory,
  deleteExamHistoryItem,
  clearExamHistory,
  getExamStatistics,
  getExamTypeStatistics,
  ExamHistoryItem,
} from '../lib/exam-history-service';

const ExamHistory: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<ExamHistoryItem[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [typeStatistics, setTypeStatistics] = useState<Record<string, any>>({});
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  // 加载考试历史数据
  const loadHistoryData = () => {
    const items = getExamHistory();
    const stats = getExamStatistics();
    const typeStats = getExamTypeStatistics();
    
    // 应用过滤
    let filteredItems = items;
    
    // 按考试类型过滤
    if (filterType !== 'all') {
      filteredItems = items.filter(item => item.examType === filterType);
    }
    
    // 按时间范围过滤
    if (timeRange !== 'all') {
      const now = new Date();
      let startTime = new Date(0);
      
      switch (timeRange) {
        case 'week':
          startTime.setDate(now.getDate() - 7);
          break;
        case 'month':
          startTime.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startTime.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filteredItems = items.filter(item => new Date(item.date) >= startTime);
    }
    
    setHistoryItems(filteredItems);
    setStatistics(stats);
    setTypeStatistics(typeStats);
  };

  // 初始化和刷新数据
  useEffect(() => {
    loadHistoryData();
    window.addEventListener('storage', loadHistoryData);
    return () => window.removeEventListener('storage', loadHistoryData);
  }, [filterType, timeRange]);

  // 处理删除单个记录
  const handleDeleteItem = (itemId: string) => {
    if (confirm('确定要删除这条考试记录吗？')) {
      deleteExamHistoryItem(itemId);
      loadHistoryData(); // 立即刷新数据
    }
  };

  // 处理清空所有记录
  const handleClearAll = () => {
    clearExamHistory();
    loadHistoryData(); // 立即刷新数据
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // 格式化时间
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 获取成绩颜色
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // 准备图表数据
  const prepareChartData = () => {
    if (!statistics || !statistics.recentScores || statistics.recentScores.length === 0) {
      return [];
    }
    
    return statistics.recentScores.map((score: number, index: number) => ({
      name: `考试${index + 1}`,
      分数: score,
    }));
  };

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <span className="text-green-600">📈 进步中</span>;
      case 'declining':
        return <span className="text-red-600">📉 需要努力</span>;
      default:
        return <span className="text-gray-600">📊 保持稳定</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 考试历史概览 */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                考试历史记录
              </CardTitle>
              <CardDescription>查看您的考试轨迹和进步情况</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              共 {historyItems.length} 次考试
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">总考试次数</h3>
              <div className="text-2xl font-bold">{statistics?.totalExams || 0}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">平均成绩</h3>
              <div className="text-2xl font-bold text-blue-600">
                {statistics?.averageScore || 0}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">通过率</h3>
              <div className="text-2xl font-bold text-green-600">
                {statistics?.passRate || 0}%
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm text-gray-600 mb-1">最高分</h3>
              <div className="text-2xl font-bold text-purple-600">
                {statistics?.bestScore || 0}
              </div>
            </div>
          </div>
          
          {/* 趋势分析 */}
          {statistics && statistics.recentScores && statistics.recentScores.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                最近考试成绩趋势 {getTrendIcon(statistics.performanceTrend)}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={prepareChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="#888888" 
                      fontSize={12}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}分`, '成绩']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="分数" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* 按考试类型统计 */}
          {Object.keys(typeStatistics).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">按考试类型统计</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(typeStatistics).map(([type, stats]) => (
                  <div key={type} className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="text-sm font-medium mb-2 capitalize">{type}</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">考试次数:</span>
                      <span>{stats.count}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">平均分:</span>
                      <span className="text-blue-600">{stats.averageScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">通过率:</span>
                      <span className="text-green-600">{stats.passRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 筛选和排序 */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filterType === 'all' ? 'bg-blue-50 text-blue-700' : ''}`}
              onClick={() => setFilterType('all')}
            >
              全部类型
            </Button>
            {Object.keys(typeStatistics).map(type => (
              <Button 
                key={type} 
                variant="outline" 
                size="sm" 
                className={`${filterType === type ? 'bg-blue-50 text-blue-700' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">时间范围:</span>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">全部时间</option>
              <option value="week">近一周</option>
              <option value="month">近一月</option>
              <option value="year">近一年</option>
            </select>
          </div>
        </div>

        {/* 历史记录列表 */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="list">详细列表</TabsTrigger>
            <TabsTrigger value="summary">简要概览</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {historyItems.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">暂无考试记录</h3>
                <p className="text-gray-500">完成考试后，您的考试记录将显示在这里</p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={`
                              ${item.isPassed ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'}
                            `}>
                              {item.isPassed ? '通过' : '未通过'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.examType}
                            </Badge>
                          </div>
                          <CardTitle className="text-base">{item.examName}</CardTitle>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xl font-bold ${getScoreColor(item.score)}`}>
                            {item.score}/{item.maxScore}
                          </span>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDeleteItem(item.id)}
                            className="h-8 w-8 p-0 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2 pb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500 mb-1">正确率</div>
                          <div className="text-gray-800 font-medium">{item.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">用时</div>
                          <div className="text-gray-800 font-medium">{formatTime(item.timeUsed)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">题目数量</div>
                          <div className="text-gray-800 font-medium">{item.questionsCount}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">正确题数</div>
                          <div className="text-gray-800 font-medium">{item.correctAnswers}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(item.date)}
                      </div>
                      
                      {/* 分类得分详情 */}
                      {item.categoryScores && Object.keys(item.categoryScores).length > 0 && (
                        <div className="mt-4">
                          <div className="text-xs text-gray-500 mb-2">分类得分详情</div>
                          <div className="space-y-2">
                            {Object.entries(item.categoryScores).map(([category, scoreData]) => {
                              const categoryPercentage = Math.round((scoreData.correct / scoreData.total) * 100);
                              return (
                                <div key={category} className="text-xs">
                                  <div className="flex justify-between mb-1">
                                    <span>{category}</span>
                                    <span>{scoreData.correct}/{scoreData.total} ({categoryPercentage}%)</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                                      style={{ width: `${categoryPercentage}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {historyItems.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300 col-span-full">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">暂无考试记录</h3>
                  <p className="text-gray-500">完成考试后，您的考试记录将显示在这里</p>
                </div>
              ) : (
                historyItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <div className={`h-2 ${item.isPassed ? 'bg-green-500' : 'bg-red-500'}`} />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-sm line-clamp-1">{item.examName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.examType}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-xl font-bold ${getScoreColor(item.score)}`}>
                          {item.score}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>正确率: {item.percentage}%</span>
                        <span>用时: {formatTime(item.timeUsed)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* 清空记录按钮 */}
        {historyItems.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button 
              variant="destructive" 
              onClick={handleClearAll}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              清空所有考试记录
            </Button>
          </div>
        )}
      </div>
    );
};

export default ExamHistory;
```

3. **在考试完成时保存历史记录**

```typescript
// 修改文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/professional-exam.tsx

import { addExamHistory } from '../lib/exam-history-service';

// 修改handleSubmitExam函数，在考试完成时保存记录
const handleSubmitExam = () => {
  // ...现有代码...
  
  // 保存考试历史记录
  addExamHistory({
    examId: examType, // 假设examType可以作为examId
    examName: examTitle,
    examType: 'professional',
    score: examResults.score,
    maxScore: 100, // 假设满分是100
    percentage: examResults.score,
    timeUsed: timeLimit * 60 - timeRemaining,
    questionsCount: examQuestions.length,
    correctAnswers: examResults.correctAnswers,
    categoryScores: examResults.categoryScores,
    isPassed: examResults.score >= 60,
  });
  
  setResults(examResults);
  setExamCompleted(true);
  setShowResults(true);
};
```

4. **创建考试历史页面路由**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/app/exam-history/page.tsx

import ExamHistory from '@/components/exam-history';
import { ResponsiveLayout } from '@/components/responsive-layout';

const ExamHistoryPage = () => {
  return (
    <ResponsiveLayout title="我的考试历史">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">我的考试历史</h1>
        <ExamHistory />
      </div>
    </ResponsiveLayout>
  );
};

export default ExamHistoryPage;
```

## 5. 协作学习功能实现方案

### 功能概述
添加学习小组和协作考试功能，促进用户之间的互动和知识共享。

### 技术方案

1. **创建协作学习服务接口**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/lib/collaborative-learning-service.ts

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  creatorName: string;
  members: StudyGroupMember[];
  createdAt: string;
  lastActivityAt: string;
  topics: string[];
  isPublic: boolean;
  memberCount: number;
}

export interface StudyGroupMember {
  userId: string;
  userName: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  lastActiveAt?: string;
  contributionScore?: number;
}

export interface CollaborativeExam {
  id: string;
  groupId: string;
  examName: string;
  creatorId: string;
  creatorName: string;
  questions: any[];
  startTime: string;
  endTime?: string;
  status: 'pending' | 'active' | 'completed' | 'closed';
  participants: CollaborativeExamParticipant[];
  createdAt: string;
}

export interface CollaborativeExamParticipant {
  userId: string;
  userName: string;
  answers: any;
  score: number;
  completedAt?: string;
  isSubmitted: boolean;
}

export interface DiscussionPost {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  likes: number;
  comments: DiscussionComment[];
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
}

export interface DiscussionComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: number;
}

// 模拟数据存储
const mockStudyGroups: StudyGroup[] = [
  {
    id: 'group_001',
    name: 'AI基础知识学习小组',
    description: '一起学习AI的基础知识，分享学习心得和资源。',
    creatorId: 'user_001',
    creatorName: '张教授',
    members: [
      { userId: 'user_001', userName: '张教授', role: 'admin', joinedAt: '2023-10-01T10:00:00Z' },
      { userId: 'user_002', userName: '李同学', role: 'member', joinedAt: '2023-10-02T14:30:00Z' },
      { userId: 'user_003', userName: '王同学', role: 'member', joinedAt: '2023-10-03T09:15:00Z' },
    ],
    createdAt: '2023-10-01T10:00:00Z',
    lastActivityAt: '2023-10-15T16:45:00Z',
    topics: ['AI基础', '机器学习', '深度学习'],
    isPublic: true,
    memberCount: 3,
  },
  {
    id: 'group_002',
    name: 'Prompt工程师进阶班',
    description: '专注于Prompt工程技术的学习和实践，提升AI应用开发能力。',
    creatorId: 'user_004',
    creatorName: '刘工程师',
    members: [
      { userId: 'user_004', userName: '刘工程师', role: 'admin', joinedAt: '2023-09-15T08:30:00Z' },
      { userId: 'user_005', userName: '陈同学', role: 'moderator', joinedAt: '2023-09-16T11:20:00Z' },
    ],
    createdAt: '2023-09-15T08:30:00Z',
    lastActivityAt: '2023-10-14T13:30:00Z',
    topics: ['Prompt工程', 'LLM应用', 'AI对话系统'],
    isPublic: true,
    memberCount: 2,
  },
];

const mockCollaborativeExams: CollaborativeExam[] = [
  {
    id: 'exam_001',
    groupId: 'group_001',
    examName: 'AI基础知识月度测试',
    creatorId: 'user_001',
    creatorName: '张教授',
    questions: [], // 简化处理
    startTime: '2023-10-20T14:00:00Z',
    endTime: '2023-10-20T16:00:00Z',
    status: 'pending',
    participants: [
      { userId: 'user_002', userName: '李同学', answers: {}, score: 0, isSubmitted: false },
      { userId: 'user_003', userName: '王同学', answers: {}, score: 0, isSubmitted: false },
    ],
    createdAt: '2023-10-15T10:00:00Z',
  },
];

const mockDiscussionPosts: DiscussionPost[] = [
  {
    id: 'post_001',
    groupId: 'group_001',
    userId: 'user_002',
    userName: '李同学',
    title: '关于神经网络的一些疑问',
    content: '大家好，我在学习神经网络时遇到了一些问题，想请教一下大家...',
    likes: 2,
    comments: [
      {
        id: 'comment_001',
        postId: 'post_001',
        userId: 'user_001',
        userName: '张教授',
        content: '这个问题很好，让我来解释一下...',
        createdAt: '2023-10-15T11:30:00Z',
        likes: 1,
      },
    ],
    createdAt: '2023-10-15T10:15:00Z',
    tags: ['神经网络', '学习疑问'],
  },
];

// 获取学习小组列表
export const getStudyGroups = (): StudyGroup[] => {
  // 模拟API延迟
  return mockStudyGroups;
};

// 获取单个学习小组详情
export const getStudyGroupById = (groupId: string): StudyGroup | undefined => {
  return mockStudyGroups.find(group => group.id === groupId);
};

// 创建学习小组
export const createStudyGroup = (group: Omit<StudyGroup, 'id' | 'createdAt' | 'lastActivityAt' | 'memberCount'>): Promise<StudyGroup> => {
  return new Promise((resolve) => {
    // 模拟API延迟
    setTimeout(() => {
      const newGroup: StudyGroup = {
        ...group,
        id: `group_${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        memberCount: group.members.length,
      };
      mockStudyGroups.push(newGroup);
      resolve(newGroup);
    }, 500);
  });
};

// 加入学习小组
export const joinStudyGroup = (groupId: string, userId: string, userName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // 模拟API延迟
    setTimeout(() => {
      const group = mockStudyGroups.find(g => g.id === groupId);
      if (group) {
        // 检查用户是否已在小组中
        const isAlreadyMember = group.members.some(member => member.userId === userId);
        if (!isAlreadyMember) {
          group.members.push({
            userId,
            userName,
            role: 'member',
            joinedAt: new Date().toISOString(),
          });
          group.memberCount += 1;
          group.lastActivityAt = new Date().toISOString();
          resolve(true);
        } else {
          resolve(false); // 已在小组中
        }
      } else {
        resolve(false); // 小组不存在
      }
    }, 500);
  });
};

// 退出学习小组
export const leaveStudyGroup = (groupId: string, userId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // 模拟API延迟
    setTimeout(() => {
      const group = mockStudyGroups.find(g => g.id === groupId);
      if (group) {
        // 不能退出自己创建的小组
        if (group.creatorId === userId) {
          resolve(false);
          return;
        }
        
        const initialMemberCount = group.members.length;
        group.members = group.members.filter(member => member.userId !== userId);
        group.memberCount = group.members.length;
        group.lastActivityAt = new Date().toISOString();
        
        resolve(initialMemberCount > group.memberCount);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

// 获取小组协作考试
export const getGroupExams = (groupId: string): CollaborativeExam[] => {
  return mockCollaborativeExams.filter(exam => exam.groupId === groupId);
};

// 创建协作考试
export const createCollaborativeExam = (exam: Omit<CollaborativeExam, 'id' | 'createdAt'>): Promise<CollaborativeExam> => {
  return new Promise((resolve) => {
    // 模拟API延迟
    setTimeout(() => {
      const newExam: CollaborativeExam = {
        ...exam,
        id: `exam_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      mockCollaborativeExams.push(newExam);
      resolve(newExam);
    }, 500);
  });
};

// 获取小组讨论帖子
export const getGroupDiscussionPosts = (groupId: string): DiscussionPost[] => {
  return mockDiscussionPosts.filter(post => post.groupId === groupId);
};

// 创建讨论帖子
export const createDiscussionPost = (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'likes' | 'comments'>): Promise<DiscussionPost> => {
  return new Promise((resolve) => {
    // 模拟API延迟
    setTimeout(() => {
      const newPost: DiscussionPost = {
        ...post,
        id: `post_${Date.now()}`,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      mockDiscussionPosts.push(newPost);
      resolve(newPost);
    }, 500);
  });
};

// 添加评论
export const addComment = (comment: Omit<DiscussionComment, 'id' | 'createdAt' | 'likes'>): Promise<DiscussionComment> => {
  return new Promise((resolve) => {
    // 模拟API延迟
    setTimeout(() => {
      const newComment: DiscussionComment = {
        ...comment,
        id: `comment_${Date.now()}`,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      
      // 将评论添加到对应的帖子
      const post = mockDiscussionPosts.find(p => p.id === comment.postId);
      if (post) {
        post.comments.push(newComment);
      }
      
      resolve(newComment);
    }, 500);
  });
};
```

2. **创建学习小组列表组件**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/study-groups.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Search, Users, BookOpen, Calendar, Plus, ChevronRight, ExternalLink } from 'lucide-react';
import {
  getStudyGroups,
  joinStudyGroup,
  StudyGroup,
} from '../lib/collaborative-learning-service';

const StudyGroups: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<StudyGroup[]>([]);

  // 加载学习小组数据
  const loadStudyGroups = () => {
    const groups = getStudyGroups();
    setStudyGroups(groups);
    
    // 模拟我的小组（通常应该基于用户ID过滤）
    const myJoinedGroups = groups.filter(group => 
      group.members.some(member => member.userId === 'user_002') // 假设当前用户ID是user_002
    );
    setMyGroups(myJoinedGroups);
    
    // 初始过滤
    filterGroups(searchQuery);
  };

  // 过滤小组
  const filterGroups = (query: string) => {
    if (!query.trim()) {
      setFilteredGroups(studyGroups);
    } else {
      const lowercaseQuery = query.toLowerCase();
      const filtered = studyGroups.filter(group => 
        group.name.toLowerCase().includes(lowercaseQuery) ||
        group.description.toLowerCase().includes(lowercaseQuery) ||
        group.topics.some(topic => topic.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredGroups(filtered);
    }
  };

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterGroups(query);
  };

  // 处理加入小组
  const handleJoinGroup = async (groupId: string) => {
    // 模拟当前用户信息
    const currentUserId = 'user_002';
    const currentUserName = '李同学';
    
    const success = await joinStudyGroup(groupId, currentUserId, currentUserName);
    if (success) {
      alert('加入小组成功！');
      loadStudyGroups(); // 刷新数据
    } else {
      alert('加入小组失败，您可能已经在小组中或小组不存在。');
    }
  };

  // 初始化数据
  useEffect(() => {
    loadStudyGroups();
  }, []);

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">学习小组</h1>
          <p className="text-gray-600">加入或创建学习小组，与志同道合的伙伴一起学习进步</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            创建小组
          </Button>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="搜索学习小组..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="discover">
        <TabsList className="mb-6">
          <TabsTrigger value="discover">发现小组</TabsTrigger>
          <TabsTrigger value="my-groups">我的小组</TabsTrigger>
        </TabsList>

        {/* 发现小组 */}
        <TabsContent value="discover">
          {filteredGroups.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">未找到匹配的学习小组</h3>
              <p className="text-gray-500">尝试使用其他关键词搜索，或创建一个新的学习小组</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => {
                // 检查当前用户是否已加入该小组
                const isJoined = group.members.some(member => member.userId === 'user_002');
                
                return (
                  <Card key={group.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{group.memberCount}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2 pb-4">
                      {/* 主题标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      {/* 创建者信息 */}
                      <div className="flex items-center gap-2 mb-4">
                        <Avatar className="h-8 w-8">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${group.creatorId}`} alt={group.creatorName} />
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{group.creatorName}</div>
                          <div className="text-xs text-gray-500">创建于 {formatDate(group.createdAt)}</div>
                        </div>
                      </div>

                      {/* 最近活动 */}
                      <div className="text-xs text-gray-500 mb-4">
                        最近活动: {formatDate(group.lastActivityAt)}
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            // 跳转到小组详情页
                            console.log('跳转到小组详情页:', group.id);
                          }}
                        >
                          查看详情
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                        
                        {!isJoined && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            加入
                          </Button>
                        )}
                        
                        {isJoined && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                          >
                            已加入
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* 我的小组 */}
        <TabsContent value="my-groups">
          {myGroups.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">您还没有加入任何学习小组</h3>
              <p className="text-gray-500">浏览发现页面，加入感兴趣的学习小组吧！</p>
              <Button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // 切换到发现标签页
                  const discoverTab = document.querySelector('[data-value="discover"]') as HTMLElement;
                  discoverTab?.click();
                }}
              >
                发现小组
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myGroups.map((group) => (
                <Card key={group.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">已加入</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 pb-4">
                    {/* 主题标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* 小组统计 */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-medium">{group.memberCount}</div>
                        <div className="text-xs text-gray-500">成员</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-medium">3</div>
                        <div className="text-xs text-gray-500">考试</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-medium">12</div>
                        <div className="text-xs text-gray-500">讨论</div>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // 跳转到小组详情页
                          console.log('跳转到小组详情页:', group.id);
                        }}
                      >
                        进入小组
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyGroups;
```

3. **创建学习小组页面路由**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/app/study-groups/page.tsx

import StudyGroups from '@/components/study-groups';
import { ResponsiveLayout } from '@/components/responsive-layout';

const StudyGroupsPage = () => {
  return (
    <ResponsiveLayout title="学习小组">
      <div className="container mx-auto px-4 py-6">
        <StudyGroups />
      </div>
    </ResponsiveLayout>
  );
};

export default StudyGroupsPage;
```

4. **在考试组件中添加协作考试支持**

```typescript
// 创建文件: /Users/yanyu/Desktop/近期开发/学习中心-AI/components/collaborative-exam.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Users, Calendar, Clock, Trophy, BarChart2, Share2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from '@/components/ui/chart';
import {
  getGroupExams,
  createCollaborativeExam,
  CollaborativeExam,
} from '../lib/collaborative-learning-service';

interface CollaborativeExamProps {
  groupId: string;
  groupName: string;
}

const CollaborativeExam: React.FC<CollaborativeExamProps> = ({ groupId, groupName }) => {
  const [exams, setExams] = useState<CollaborativeExam[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 加载小组考试
  const loadGroupExams = () => {
    setIsLoading(true);
    try {
      const groupExams = getGroupExams(groupId);
      setExams(groupExams);
    } catch (error) {
      console.error('加载小组考试失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    loadGroupExams();
  }, [groupId]);

  // 创建新的协作考试
  const handleCreateExam = async () => {
    // 模拟创建考试数据
    const newExam = {
      groupId,
      examName: `${groupName} - 协作考试 ${new Date().toLocaleDateString()}`,
      creatorId: 'user_002', // 假设当前用户ID
      creatorName: '李同学', // 假设当前用户名称
      questions: [], // 简化处理
      startTime: new Date().toISOString(),
      status: 'pending' as const,
      participants: [], // 将由小组管理员添加
    };
    
    try {
      await createCollaborativeExam(newExam);
      alert('协作考试创建成功！');
      loadGroupExams(); // 刷新考试列表
    } catch (error) {
      console.error('创建协作考试失败:', error);
      alert('创建协作考试失败，请重试。');
    }
  };

  // 获取考试状态标签
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">待开始</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">进行中</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">已完成</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">已关闭</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  // 格式化日期时间
  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // 模拟考试结果数据（用于排行榜）
  const getMockExamResults = (examId: string) => {
    return [
      { name: '张同学', score: 95 },
      { name: '李同学', score: 88 },
      { name: '王同学', score: 82 },
      { name: '赵同学', score: 76 },
      { name: '陈同学', score: 70 },
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">协作考试</h2>
          <p className="text-gray-600">{groupName} 的小组协作考试</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateExam}
        >
          创建协作考试
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">加载中...</p>
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">待参加</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="statistics">统计分析</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {exams.filter(e => e.status === 'pending' || e.status === 'active').length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">暂无待参加的协作考试</h3>
                <p className="text-gray-500">请等待管理员创建新的协作考试</p>
              </div>
            ) : (
              <div className="space-y-4">
                {exams
                  .filter(e => e.status === 'pending' || e.status === 'active')
                  .map((exam) => (
                    <Card key={exam.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getStatusBadge(exam.status)}
                            </div>
                            <CardTitle className="text-lg">{exam.examName}</CardTitle>
                            <CardDescription>
                              创建者: {exam.creatorName} · {formatDateTime(exam.createdAt)}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">开始时间: {formatDateTime(exam.startTime)}</span>
                          </div>
                          {exam.endTime && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">结束时间: {formatDateTime(exam.endTime)}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">参与者: {exam.participants.length}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            {exam.status === 'active' ? '参加考试' : '准备考试'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {exams.filter(e => e.status === 'completed' || e.status === 'closed').length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">暂无已完成的协作考试</h3>
                <p className="text-gray-500">完成协作考试后，成绩将显示在这里</p>
              </div>
            ) : (
              <div className="space-y-4">
                {exams
                  .filter(e => e.status === 'completed' || e.status === 'closed')
                  .map((exam) => {
                    const results = getMockExamResults(exam.id);
                    const userResult = results.find(r => r.name === '李同学');
                    
                    return (
                      <Card key={exam.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getStatusBadge(exam.status)}
                                {userResult && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    您的得分: {userResult.score}
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg">{exam.examName}</CardTitle>
                              <CardDescription>
                                结束于: {formatDateTime(exam.endTime || exam.createdAt)}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2 pb-4">
                          <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">考试排行榜 (Top 5)</h3>
                            <div className="space-y-2">
                              {results.map((result, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs font-bold">
                                    {index + 1}
                                  </div>
                                  <Avatar className="h-8 w-8">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${result.name}`} alt={result.name} />
                                  </Avatar>
                                  <div className="flex-1 text-sm">{result.name}</div>
                                  <div className="text-sm font-bold text-blue-600">{result.score}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                              查看详细报告
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Share2 className="h-4 w-4" />
                              分享结果
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  协作考试统计分析
                </CardTitle>
                <CardDescription>小组协作考试表现分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '考试1', 平均分: 75, 最高分: 95, 最低分: 60 },
                        { name: '考试2', 平均分: 82, 最高分: 98, 最低分: 68 },
                        { name: '考试3', 平均分: 78, 最高分: 92, 最低分: 55 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}分`, '']} />
                      <Legend />
                      <Bar dataKey="平均分" fill="#3b82f6" />
                      <Bar dataKey="最高分" fill="#10b981" />
                      <Bar dataKey="最低分" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-600 mb-1">总考试次数</h3>
                    <div className="text-2xl font-bold">3</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-600 mb-1">平均得分</h3>
                    <div className="text-2xl font-bold text-green-600">78.3</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-600 mb-1">参与率</h3>
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CollaborativeExam;
```

## 实现建议与总结

### 优先级排序
根据功能的复杂性和用户价值，建议按以下优先级实现：

1. **错题本功能** - 相对简单，能直接提升用户学习效果
2. **考试历史记录** - 中等复杂度，提供学习轨迹和进步反馈
3. **AI评分机制** - 中等复杂度，提升主观题评分的准确性
4. **自适应考试** - 较高复杂度，提供个性化考试体验
5. **协作学习功能** - 最高复杂度，涉及多人交互和数据同步

### 技术注意事项

1. **数据存储**
   - 当前方案使用localStorage进行数据存储，适合原型演示
   - 实际生产环境应考虑使用后端数据库和API服务
   - 可考虑使用Firebase或Supabase等BaaS解决方案快速实现后端功能

2. **性能优化**
   - 对于自适应考试和AI评分等计算密集型功能，考虑使用Web Workers
   - 对于大型题库，实现懒加载和分页加载策略
   - 使用React.memo和useMemo优化组件渲染性能

3. **用户体验**
   - 添加加载状态指示器和错误处理
   - 实现响应式设计，确保在移动设备上有良好体验
   - 添加无障碍支持，提高应用的可访问性

4. **安全性**
   - 对于协作学习功能，实现适当的权限控制
   - 防止考试作弊，特别是在在线考试场景
   - 保护用户数据隐私，遵守相关数据保护法规

通过以上实现方案，YanYu Smart Cloud³ Learning Platform将能够提供更加智能化、个性化和社交化的学习体验，帮助用户更有效地提升AI知识和技能水平。