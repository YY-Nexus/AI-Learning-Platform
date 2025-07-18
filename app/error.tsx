"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("应用错误:", error)
  }, [error])

  const isDevelopment = typeof window !== "undefined" && window.location.hostname === "localhost"

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">出现了一些问题</CardTitle>
          <CardDescription className="text-gray-600">应用遇到了意外错误，请尝试刷新页面或返回首页</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="rounded-md bg-red-50 p-3 border border-red-200">
              <p className="text-sm text-red-800 font-mono break-words">{error.message}</p>
              {error.digest && <p className="text-xs text-red-600 mt-1">错误ID: {error.digest}</p>}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              重试
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
