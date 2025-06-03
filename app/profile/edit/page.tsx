"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Save } from "lucide-react"
import Link from "next/link"
import { ResponsiveLayout } from "@/components/responsive-layout"
import { AccessibleButton } from "@/components/accessibility/accessible-button"

export default function EditProfilePage() {
  const [currentUser] = useState({
    name: "张同学",
    email: "zhang@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "热爱AI技术，致力于成为优秀的AI工程师",
    phone: "138****8888",
    location: "北京市",
    company: "科技有限公司",
    position: "AI工程师",
  })

  const [formData, setFormData] = useState(currentUser)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // 这里处理保存逻辑
    console.log("保存用户信息:", formData)
    // 可以添加成功提示
  }

  return (
    <ResponsiveLayout title="编辑资料" user={currentUser}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 返回按钮 */}
        <div className="flex items-center space-x-4">
          <AccessibleButton variant="outline" size="sm" asChild>
            <Link href="/profile">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回资料
            </Link>
          </AccessibleButton>
        </div>

        {/* 头像编辑 */}
        <Card>
          <CardHeader>
            <CardTitle>头像设置</CardTitle>
            <CardDescription>上传您的个人头像</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
              <AvatarFallback className="text-2xl">{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <AccessibleButton variant="outline" className="mb-2">
                <Camera className="h-4 w-4 mr-2" />
                上传头像
              </AccessibleButton>
              <p className="text-sm text-gray-500">支持 JPG、PNG 格式，文件大小不超过 2MB</p>
            </div>
          </CardContent>
        </Card>

        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>编辑您的个人基本信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="请输入您的邮箱"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">手机号</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="请输入您的手机号"
                />
              </div>
              <div>
                <Label htmlFor="location">所在地</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="请输入您的所在地"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">个人简介</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="介绍一下您自己..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* 职业信息 */}
        <Card>
          <CardHeader>
            <CardTitle>职业信息</CardTitle>
            <CardDescription>编辑您的工作相关信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">公司</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="请输入您的公司名称"
                />
              </div>
              <div>
                <Label htmlFor="position">职位</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="请输入您的职位"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 保存按钮 */}
        <div className="flex justify-end space-x-4">
          <AccessibleButton variant="outline" asChild>
            <Link href="/profile">取消</Link>
          </AccessibleButton>
          <AccessibleButton onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="h-4 w-4 mr-2" />
            保存更改
          </AccessibleButton>
        </div>
      </div>
    </ResponsiveLayout>
  )
}
