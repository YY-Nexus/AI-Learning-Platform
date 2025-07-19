"use client"

import Image from "next/image"
import { useState } from "react"

interface CourseImageProps {
  src: string
  alt: string
  title: string
  color: string
  className?: string
  width?: number
  height?: number
}

export function CourseImage({ src, alt, title, color, className = "", width = 400, height = 300 }: CourseImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleImageError = () => {
    setError(true)
    setLoading(false)
  }

  // DeepSeek专用高级SVG设计
  if (title.includes("DeepSeek")) {
    return (
      <div className={`w-full h-48 relative overflow-hidden ${className}`}>
        {/* 动态背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          {/* 动态网格背景 */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* 浮动粒子效果 */}
          <div className="absolute inset-0">
            <div className="absolute top-4 left-8 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
            <div
              className="absolute top-12 right-12 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-16 right-8 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* 主要内容区域 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* DeepSeek Logo SVG */}
              <div className="mb-4">
                <svg width="160" height="100" viewBox="0 0 160 100" className="mx-auto">
                  <defs>
                    {/* 渐变定义 */}
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#F472B6" />
                    </linearGradient>

                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#E0E7FF" />
                    </linearGradient>

                    {/* 发光效果 */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 中央AI核心 */}
                  <g transform="translate(80, 30)">
                    {/* 外圈 */}
                    <circle cx="0" cy="0" r="25" fill="none" stroke="url(#logoGradient)" strokeWidth="3" opacity="0.8">
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 0 0"
                        to="360 0 0"
                        dur="20s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* 中圈 */}
                    <circle cx="0" cy="0" r="18" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6">
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="360 0 0"
                        to="0 0 0"
                        dur="15s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* 内核 */}
                    <circle cx="0" cy="0" r="12" fill="url(#logoGradient)" opacity="0.9" filter="url(#glow)">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* AI符号 */}
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                    >
                      AI
                    </text>
                  </g>

                  {/* 神经网络连接 */}
                  <g stroke="url(#logoGradient)" strokeWidth="2" fill="none" opacity="0.7">
                    {/* 左侧节点 */}
                    <g transform="translate(20, 30)">
                      <circle cx="0" cy="-10" r="4" fill="url(#logoGradient)" opacity="0.8" />
                      <circle cx="0" cy="0" r="4" fill="url(#logoGradient)" opacity="0.8" />
                      <circle cx="0" cy="10" r="4" fill="url(#logoGradient)" opacity="0.8" />

                      {/* 连接线到中心 */}
                      <path d="M 4 -10 Q 30 -5 55 0" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                      </path>
                      <path d="M 4 0 Q 30 0 55 0" opacity="0.6">
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                          begin="0.5s"
                        />
                      </path>
                      <path d="M 4 10 Q 30 5 55 0" opacity="0.6">
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                          begin="1s"
                        />
                      </path>
                    </g>

                    {/* 右侧节点 */}
                    <g transform="translate(140, 30)">
                      <circle cx="0" cy="-10" r="4" fill="url(#logoGradient)" opacity="0.8" />
                      <circle cx="0" cy="0" r="4" fill="url(#logoGradient)" opacity="0.8" />
                      <circle cx="0" cy="10" r="4" fill="url(#logoGradient)" opacity="0.8" />

                      {/* 连接线从中心 */}
                      <path d="M -4 -10 Q -30 -5 -55 0" opacity="0.6">
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                          begin="1.5s"
                        />
                      </path>
                      <path d="M -4 0 Q -30 0 -55 0" opacity="0.6">
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                          begin="0.2s"
                        />
                      </path>
                      <path d="M -4 10 Q -30 5 -55 0" opacity="0.6">
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                          begin="0.7s"
                        />
                      </path>
                    </g>
                  </g>

                  {/* 数据流效果 */}
                  <g>
                    <circle r="2" fill="#60A5FA" opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite">
                        <path d="M 24 20 Q 50 15 76 30" />
                      </animateMotion>
                    </circle>
                    <circle r="2" fill="#A78BFA" opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                        <path d="M 24 30 Q 50 30 76 30" />
                      </animateMotion>
                    </circle>
                    <circle r="2" fill="#F472B6" opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
                        <path d="M 24 40 Q 50 45 76 30" />
                      </animateMotion>
                    </circle>
                  </g>

                  {/* DeepSeek文字 */}
                  <text
                    x="80"
                    y="75"
                    textAnchor="middle"
                    fill="url(#textGradient)"
                    fontSize="18"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                    filter="url(#glow)"
                  >
                    DeepSeek
                  </text>
                  <text
                    x="80"
                    y="90"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.8)"
                    fontSize="10"
                    fontFamily="Arial, sans-serif"
                  >
                    大模型应用开发
                  </text>
                </svg>
              </div>

              {/* 技术标签 */}
              <div className="flex justify-center space-x-2 mt-2">
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white font-medium">
                  大模型
                </span>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white font-medium">
                  API开发
                </span>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white font-medium">
                  实战
                </span>
              </div>
            </div>
          </div>

          {/* 角落装饰 */}
          <div className="absolute top-2 right-2">
            <div className="w-8 h-8 border-2 border-white border-opacity-30 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white bg-opacity-60 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">{alt}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
        onError={handleImageError}
        priority
      />
    </div>
  )
}
