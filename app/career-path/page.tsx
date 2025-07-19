"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandHeader } from "@/components/brand-header"
import {
  Brain,
  Code,
  BookOpen,
  BarChart,
  CheckCircle,
  ChevronRight,
  Rocket,
  Award,
  TrendingUp,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function CareerPathPage() {
  const [selectedLevel, setSelectedLevel] = useState("junior")

  // 职业发展路径数据
  const careerLevels = [
    {
      id: "junior",
      title: "初级AI工程师",
      years: "0-2年",
      description: "掌握基础AI技术，能够在指导下完成模型训练和部署任务",
      responsibilities: [
        "学习与实践深度学习框架（TensorFlow/PyTorch）",
        "参与数据预处理和特征工程",
        "在指导下训练和评估模型",
        "编写清晰的技术文档",
        "参与代码评审和团队协作",
      ],
      skills: [
        { name: "Python编程", level: 80 },
        { name: "深度学习基础", level: 70 },
        { name: "数据处理", level: 75 },
        { name: "模型训练", level: 65 },
        { name: "团队协作", level: 70 },
      ],
      salary: "25-40万/年",
      nextSteps: ["深入学习高级深度学习技术", "参与端到端AI项目", "提升模型优化能力", "扩展领域知识"],
    },
    {
      id: "intermediate",
      title: "中级AI工程师",
      years: "2-5年",
      description: "能够独立设计和实现AI解决方案，具备一定的模型优化能力",
      responsibilities: [
        "独立设计和实现AI模型架构",
        "优化模型性能和资源使用效率",
        "解决复杂的技术挑战",
        "指导初级工程师",
        "与产品和业务团队协作",
      ],
      skills: [
        { name: "高级模型架构", level: 80 },
        { name: "模型优化技术", level: 85 },
        { name: "分布式训练", level: 75 },
        { name: "问题诊断", level: 80 },
        { name: "跨团队协作", level: 75 },
      ],
      salary: "40-60万/年",
      nextSteps: ["掌握大规模分布式训练技术", "深入研究模型优化和压缩方法", "提升系统设计能力", "培养项目管理技能"],
    },
    {
      id: "senior",
      title: "高级AI工程师",
      years: "5-8年",
      description: "精通AI技术栈，能够设计和实现复杂的AI系统，具备技术领导力",
      responsibilities: [
        "设计和实现复杂的AI系统架构",
        "优化大规模分布式训练流程",
        "解决关键技术瓶颈",
        "指导团队成员的技术成长",
        "参与技术战略决策",
      ],
      skills: [
        { name: "系统架构设计", level: 90 },
        { name: "大规模分布式系统", level: 85 },
        { name: "性能优化", level: 90 },
        { name: "技术领导力", level: 85 },
        { name: "战略规划", level: 80 },
      ],
      salary: "60-100万/年",
      nextSteps: ["发展技术专家或管理路径", "参与开源项目或发表技术论文", "拓展跨领域知识", "提升团队管理能力"],
    },
    {
      id: "principal",
      title: "首席/架构师",
      years: "8年以上",
      description: "具备战略视野和深厚技术积累，能够引领技术方向和创新",
      responsibilities: [
        "制定技术战略和路线图",
        "设计企业级AI架构",
        "推动技术创新和突破",
        "指导跨团队技术协作",
        "参与高层决策",
      ],
      skills: [
        { name: "技术战略", level: 95 },
        { name: "架构设计", level: 95 },
        { name: "创新领导力", level: 90 },
        { name: "跨组织影响力", level: 85 },
        { name: "业务洞察力", level: 85 },
      ],
      salary: "100-200万+/年",
      nextSteps: ["引领行业技术发展", "建立技术影响力", "培养下一代技术领导者", "推动组织技术变革"],
    },
  ]

  const selectedLevelData = careerLevels.find((level) => level.id === selectedLevel)

  const techStack = [
    {
      category: "编程语言",
      technologies: [
        { name: "Python", importance: "核心", description: "AI开发主要语言" },
        { name: "C++", importance: "重要", description: "性能优化必备" },
        { name: "JavaScript", importance: "有用", description: "前端集成开发" },
        { name: "Go", importance: "有用", description: "微服务开发" },
      ],
    },
    {
      category: "深度学习框架",
      technologies: [
        { name: "PyTorch", importance: "核心", description: "动态计算图框架" },
        { name: "TensorFlow", importance: "核心", description: "生产级部署" },
        { name: "JAX", importance: "新兴", description: "高性能计算" },
        { name: "ONNX", importance: "重要", description: "模型转换标准" },
      ],
    },
    {
      category: "大模型技术",
      technologies: [
        { name: "Transformer", importance: "核心", description: "注意力机制架构" },
        { name: "BERT/GPT", importance: "核心", description: "预训练模型" },
        { name: "LLaMA", importance: "重要", description: "开源大语言模型" },
        { name: "Fine-tuning", importance: "核心", description: "模型微调技术" },
      ],
    },
    {
      category: "部署与运维",
      technologies: [
        { name: "Docker", importance: "核心", description: "容器化部署" },
        { name: "Kubernetes", importance: "重要", description: "容器编排" },
        { name: "MLOps", importance: "核心", description: "机器学习运维" },
        { name: "监控系统", importance: "重要", description: "模型性能监控" },
      ],
    },
  ]

  const industryApplications = [
    {
      industry: "金融科技",
      applications: ["智能风控", "量化交易", "客户服务", "反欺诈检测"],
      growth: "+45%",
      avgSalary: "50-80万",
    },
    {
      industry: "医疗健康",
      applications: ["医学影像", "药物发现", "诊断辅助", "健康管理"],
      growth: "+38%",
      avgSalary: "45-75万",
    },
    {
      industry: "自动驾驶",
      applications: ["感知算法", "决策规划", "仿真测试", "数据标注"],
      growth: "+52%",
      avgSalary: "60-100万",
    },
    {
      industry: "互联网",
      applications: ["推荐系统", "搜索优化", "内容生成", "用户画像"],
      growth: "+35%",
      avgSalary: "40-70万",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI大模型工程师职业发展路径</h1>
            <p className="text-gray-600">探索AI大模型工程师的能力要求、发展阶段和行业应用</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">职业概述</TabsTrigger>
              <TabsTrigger value="career-path">发展路径</TabsTrigger>
              <TabsTrigger value="tech-stack">技术栈</TabsTrigger>
              <TabsTrigger value="applications">行业应用</TabsTrigger>
            </TabsList>

            {/* 职业概述 */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-blue-600" />
                    AI大模型工程师职业定义
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    负责设计、开发和优化大规模AI模型的专业技术人才
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Target className="h-5 w-5 text-blue-600 mr-2" />
                          核心职责
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>设计和实现复杂的AI模型架构</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>优化大规模分布式训练流程</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>解决模型性能和资源利用的关键挑战</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>指导团队成员的技术成长</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                          行业趋势
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>大模型技术持续突破，参数规模和能力不断提升</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>模型效率优化成为关键，追求更低的计算和存储成本</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>多模态融合成为主流，实现跨模态理解和生成</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 市场需求统计 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-600">企业计划增加AI投入</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">120万</div>
                      <div className="text-sm text-gray-600">AI人才缺口</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">45%</div>
                      <div className="text-sm text-gray-600">年薪增长率</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">3-5年</div>
                      <div className="text-sm text-gray-600">成为专家周期</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 发展路径 */}
            <TabsContent value="career-path" className="space-y-6">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <div className="flex flex-wrap gap-4">
                  {careerLevels.map((level) => (
                    <Button
                      key={level.id}
                      variant={selectedLevel === level.id ? "default" : "outline"}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`flex-1 min-w-[120px] ${
                        selectedLevel === level.id
                          ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors duration-200"
                          : "shadow-md hover:shadow-lg transition-shadow duration-200"
                      }`}
                    >
                      {level.title}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedLevelData && (
                <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-indigo-600" />
                          {selectedLevelData.title}
                        </CardTitle>
                        <CardDescription>经验：{selectedLevelData.years}</CardDescription>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 shadow-md transition-shadow duration-200">
                        {selectedLevelData.salary}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">职位描述</h3>
                      <p className="text-gray-700">{selectedLevelData.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">核心职责</h3>
                      <ul className="space-y-2">
                        {selectedLevelData.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">核心技能要求</h3>
                      <div className="space-y-3">
                        {selectedLevelData.skills.map((skill, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{skill.name}</span>
                              <span className="text-sm text-gray-600">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">下一步发展</h3>
                      <ul className="space-y-2">
                        {selectedLevelData.nextSteps.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* 技术栈 */}
            <TabsContent value="tech-stack" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techStack.map((stack, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-blue-600" />
                        {stack.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {stack.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">{tech.name}</span>
                              <Badge
                                variant={
                                  tech.importance === "核心"
                                    ? "default"
                                    : tech.importance === "重要"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {tech.importance}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{tech.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 学习路径推荐 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    推荐学习路径
                  </CardTitle>
                  <CardDescription>根据不同阶段的技能要求，为您推荐最适合的学习路径</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">基础阶段</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Python编程基础</li>
                        <li>• 机器学习原理</li>
                        <li>• 深度学习入门</li>
                        <li>• PyTorch/TensorFlow</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">进阶阶段</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 大模型架构设计</li>
                        <li>• 分布式训练</li>
                        <li>• 模型优化技术</li>
                        <li>• MLOps实践</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">专家阶段</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 系统架构设计</li>
                        <li>• 技术创新研究</li>
                        <li>• 团队管理</li>
                        <li>• 行业应用实践</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 行业应用 */}
            <TabsContent value="applications" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industryApplications.map((industry, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart className="h-5 w-5 text-gray-600" />
                          {industry.industry}
                        </CardTitle>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            增长 {industry.growth}
                          </Badge>
                          <div className="text-sm text-gray-600">{industry.avgSalary}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {industry.applications.map((app, appIndex) => (
                          <div key={appIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{app}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 就业前景 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    就业前景分析
                  </CardTitle>
                  <CardDescription>AI大模型工程师的就业市场趋势和机会</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                      <div className="text-sm text-gray-600 mb-1">就业率</div>
                      <div className="text-xs text-gray-500">毕业后6个月内</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">65万</div>
                      <div className="text-sm text-gray-600 mb-1">平均年薪</div>
                      <div className="text-xs text-gray-500">3年工作经验</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                      <div className="text-sm text-gray-600 mb-1">招聘岗位</div>
                      <div className="text-xs text-gray-500">每日新增</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 行动号召 */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <Rocket className="h-6 w-6 mr-2 text-indigo-600" />
              开启您的AI大模型工程师职业之旅
            </h2>
            <p className="text-indigo-700 mb-6">通过系统学习和实践，掌握AI大模型技术，成为行业中的技术专家和领导者</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-shadow duration-200"
                onClick={() => setSelectedLevel("junior")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                探索学习路径
              </Button>
              <Button
                variant="outline"
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 shadow-md hover:shadow-lg transition-shadow duration-200 bg-transparent"
                asChild
              >
                <Link href="/courses">
                  <Target className="h-4 w-4 mr-2" />
                  浏览相关课程
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 shadow-md hover:shadow-lg transition-shadow duration-200 bg-transparent"
                asChild
              >
                <Link href="/exam">
                  <Award className="h-4 w-4 mr-2" />
                  参加专业认证
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
