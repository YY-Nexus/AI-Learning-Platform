"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandHeader } from "@/components/brand-header"
import {
  Eye,
  Ear,
  MousePointer,
  Keyboard,
  Volume2,
  Type,
  Zap,
  CheckCircle,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"

export default function AccessibilityPage() {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: true,
    reducedMotion: false,
    audioDescriptions: false,
    fontSize: [16],
    speechRate: [1],
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const accessibilityFeatures = [
    {
      icon: Eye,
      title: "视觉辅助",
      description: "为视觉障碍用户提供的功能",
      features: ["高对比度模式", "大字体显示", "屏幕阅读器支持", "颜色盲友好设计", "焦点指示器"],
    },
    {
      icon: Ear,
      title: "听觉辅助",
      description: "为听觉障碍用户提供的功能",
      features: ["字幕支持", "音频描述", "视觉提示", "手语翻译", "振动反馈"],
    },
    {
      icon: MousePointer,
      title: "运动辅助",
      description: "为运动障碍用户提供的功能",
      features: ["键盘导航", "语音控制", "眼动追踪", "开关控制", "停留点击"],
    },
    {
      icon: Keyboard,
      title: "认知辅助",
      description: "为认知障碍用户提供的功能",
      features: ["简化界面", "清晰导航", "一致性设计", "错误预防", "帮助提示"],
    },
  ]

  const deviceSupport = [
    {
      icon: Monitor,
      name: "桌面端",
      features: ["完整键盘支持", "屏幕阅读器", "高对比度", "缩放功能"],
    },
    {
      icon: Tablet,
      name: "平板端",
      features: ["触摸优化", "手势支持", "自适应布局", "语音输入"],
    },
    {
      icon: Smartphone,
      name: "移动端",
      features: ["单手操作", "语音助手", "振动反馈", "大按钮模式"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandHeader />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">无障碍设置</h1>
            <p className="text-gray-600">
              我们致力于为所有用户提供平等的学习机会，包括残障用户。调整以下设置以获得最佳的学习体验。
            </p>
          </div>

          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings">个人设置</TabsTrigger>
              <TabsTrigger value="features">功能介绍</TabsTrigger>
              <TabsTrigger value="support">设备支持</TabsTrigger>
            </TabsList>

            {/* 个人设置 */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 视觉设置 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      视觉设置
                    </CardTitle>
                    <CardDescription>调整视觉显示相关设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">高对比度模式</label>
                        <p className="text-xs text-gray-500">增强文字和背景的对比度</p>
                      </div>
                      <Switch
                        checked={settings.highContrast}
                        onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">大字体显示</label>
                        <p className="text-xs text-gray-500">使用更大的字体大小</p>
                      </div>
                      <Switch
                        checked={settings.largeText}
                        onCheckedChange={(checked) => updateSetting("largeText", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">字体大小</label>
                      <Slider
                        value={settings.fontSize}
                        onValueChange={(value) => updateSetting("fontSize", value)}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>12px</span>
                        <span>当前: {settings.fontSize[0]}px</span>
                        <span>24px</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 听觉设置 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-green-600" />
                      听觉设置
                    </CardTitle>
                    <CardDescription>调整音频和语音相关设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">屏幕阅读器</label>
                        <p className="text-xs text-gray-500">启用屏幕内容朗读</p>
                      </div>
                      <Switch
                        checked={settings.screenReader}
                        onCheckedChange={(checked) => updateSetting("screenReader", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">音频描述</label>
                        <p className="text-xs text-gray-500">为视频内容提供音频描述</p>
                      </div>
                      <Switch
                        checked={settings.audioDescriptions}
                        onCheckedChange={(checked) => updateSetting("audioDescriptions", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">语音速度</label>
                      <Slider
                        value={settings.speechRate}
                        onValueChange={(value) => updateSetting("speechRate", value)}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>慢</span>
                        <span>当前: {settings.speechRate[0]}x</span>
                        <span>快</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 交互设置 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Keyboard className="h-5 w-5 text-purple-600" />
                      交互设置
                    </CardTitle>
                    <CardDescription>调整交互方式和动画设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">键盘导航</label>
                        <p className="text-xs text-gray-500">使用键盘进行页面导航</p>
                      </div>
                      <Switch
                        checked={settings.keyboardNavigation}
                        onCheckedChange={(checked) => updateSetting("keyboardNavigation", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">减少动画</label>
                        <p className="text-xs text-gray-500">减少页面动画和过渡效果</p>
                      </div>
                      <Switch
                        checked={settings.reducedMotion}
                        onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 快速操作 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      快速操作
                    </CardTitle>
                    <CardDescription>一键应用预设配置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          highContrast: true,
                          largeText: true,
                          fontSize: [20],
                        })
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      视觉障碍优化
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          screenReader: true,
                          audioDescriptions: true,
                          speechRate: [1.2],
                        })
                      }}
                    >
                      <Ear className="mr-2 h-4 w-4" />
                      听觉障碍优化
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          keyboardNavigation: true,
                          reducedMotion: true,
                        })
                      }}
                    >
                      <MousePointer className="mr-2 h-4 w-4" />
                      运动障碍优化
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setSettings({
                          highContrast: false,
                          largeText: false,
                          screenReader: false,
                          keyboardNavigation: true,
                          reducedMotion: false,
                          audioDescriptions: false,
                          fontSize: [16],
                          speechRate: [1],
                        })
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      恢复默认设置
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 保存按钮 */}
              <div className="flex justify-center">
                <Button size="lg" className="px-8">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  保存设置
                </Button>
              </div>
            </TabsContent>

            {/* 功能介绍 */}
            <TabsContent value="features" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {accessibilityFeatures.map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WCAG 合规性 */}
              <Card>
                <CardHeader>
                  <CardTitle>WCAG 2.1 合规性</CardTitle>
                  <CardDescription>我们遵循国际无障碍标准，确保平台的可访问性</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        A级
                      </Badge>
                      <p className="text-sm text-gray-600">基础可访问性</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        AA级
                      </Badge>
                      <p className="text-sm text-gray-600">标准可访问性</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="mb-2">
                        AAA级
                      </Badge>
                      <p className="text-sm text-gray-600">增强可访问性（部分）</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 设备支持 */}
            <TabsContent value="support" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {deviceSupport.map((device, index) => (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <device.icon className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                      <CardTitle>{device.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {device.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 辅助技术支持 */}
              <Card>
                <CardHeader>
                  <CardTitle>支持的辅助技术</CardTitle>
                  <CardDescription>我们的平台与以下辅助技术兼容</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">屏幕阅读器</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• NVDA (Windows)</li>
                        <li>• JAWS (Windows)</li>
                        <li>• VoiceOver (macOS/iOS)</li>
                        <li>• TalkBack (Android)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">其他辅助工具</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 语音识别软件</li>
                        <li>• 眼动追踪设备</li>
                        <li>• 开关控制设备</li>
                        <li>• 放大镜软件</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 联系支持 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>需要帮助？</CardTitle>
              <CardDescription>如果您在使用过程中遇到无障碍相关问题，请联系我们的支持团队</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  <Ear className="mr-2 h-4 w-4" />
                  无障碍支持热线
                </Button>
                <Button variant="outline">
                  <Type className="mr-2 h-4 w-4" />
                  在线文字客服
                </Button>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  技术支持邮箱
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
