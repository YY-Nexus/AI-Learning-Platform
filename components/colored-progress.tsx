"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ColoredProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  color?: string
  size?: "sm" | "md" | "lg"
  showPercentage?: boolean
}

const ColoredProgress = React.forwardRef<HTMLDivElement, ColoredProgressProps>(
  ({ className, value, max = 100, color, size = "md", showPercentage = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    }

    // 默认使用彩色渐变，确保不是黑色
    const progressColor = color || "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={cn("relative w-full overflow-hidden rounded-full bg-gray-200/80", sizeClasses[size], className)}
          {...props}
        >
          <div
            className={cn("h-full transition-all duration-700 ease-out rounded-full shadow-sm", progressColor)}
            style={{
              width: `${percentage}%`,
              background: color || "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
            }}
          />
        </div>
        {showPercentage && (
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{Math.round(percentage)}%</span>
            <span>
              {value}/{max}
            </span>
          </div>
        )}
      </div>
    )
  },
)
ColoredProgress.displayName = "ColoredProgress"

export { ColoredProgress }
