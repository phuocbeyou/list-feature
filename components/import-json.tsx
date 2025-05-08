"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { importFeatures } from "@/lib/redux/features/featuresSlice"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Upload, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function ImportJson() {
  const [jsonInput, setJsonInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const validateJson = (jsonString: string): { valid: boolean; data?: any; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString)

      // Check if the JSON has the expected structure
      if (!parsed.new_features || !Array.isArray(parsed.new_features)) {
        return {
          valid: false,
          error: "JSON không hợp lệ. Cần có trường 'new_features' là một mảng.",
        }
      }

      // Validate each feature
      for (const feature of parsed.new_features) {
        if (!feature.id || !feature.title || !feature.description) {
          return {
            valid: false,
            error: "Một số tính năng thiếu các trường bắt buộc (id, title, description).",
          }
        }
      }

      return { valid: true, data: parsed.new_features }
    } catch (err) {
      return { valid: false, error: "JSON không hợp lệ. Vui lòng kiểm tra cú pháp." }
    }
  }

  const handleImport = () => {
    setError(null)

    if (!jsonInput.trim()) {
      setError("Vui lòng nhập dữ liệu JSON.")
      return
    }

    const validation = validateJson(jsonInput)

    if (!validation.valid) {
      setError(validation.error)
      return
    }

    dispatch(importFeatures(validation.data))
    toast({
      title: "Nhập dữ liệu thành công",
      description: `Đã nhập ${validation.data.length} tính năng.`,
    })

    setJsonInput("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setJsonInput(content)
    }
    reader.readAsText(file)

    // Reset the input so the same file can be selected again
    e.target.value = ""
  }

  const handlePasteExample = () => {
    const exampleJson = {
      version: "1.0.3",
      release_date: "2024-05-08",
      new_features: [
        {
          id: "feature-001",
          title: "Chế độ tối (Dark Mode)",
          description: "Hỗ trợ giao diện chế độ tối giúp bảo vệ mắt và tiết kiệm pin.",
          type: "UI Enhancement",
          status: "Released",
          platforms: ["Web", "iOS", "Android"],
          image: "https://example.com/images/dark-mode.png",
          documentation_link: "https://example.com/docs/dark-mode",
          developer: {
            name: "Phạm Hữu Phước",
            email: "phuoc@example.com",
          },
        },
        {
          id: "feature-002",
          title: "Đăng nhập bằng vân tay",
          description: "Cho phép người dùng đăng nhập nhanh bằng vân tay hoặc khuôn mặt.",
          type: "Security",
          status: "Beta",
          platforms: ["iOS", "Android"],
          image: "https://example.com/images/fingerprint-login.png",
          documentation_link: "https://example.com/docs/fingerprint-login",
          developer: {
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
          },
        },
        {
          id: "feature-003",
          title: "Tùy chỉnh thông báo đẩy",
          description: "Người dùng có thể tùy chỉnh thông báo đẩy theo sở thích cá nhân.",
          type: "Notification",
          status: "Released",
          platforms: ["Web", "iOS", "Android"],
          image: "https://example.com/images/notification-settings.png",
          documentation_link: "https://example.com/docs/custom-push",
          developer: {
            name: "Trần Thị B",
            email: "tranthib@example.com",
          },
        },
      ],
    }

    setJsonInput(JSON.stringify(exampleJson, null, 2))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="json-input">Nhập dữ liệu JSON</Label>
        <Textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"version": "1.0.0", "new_features": [...]}'
          className="font-mono h-80"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-4">
        <Button onClick={handleImport}>
          <Upload className="mr-2 h-4 w-4" />
          Nhập dữ liệu
        </Button>

        <div className="relative">
          <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
            <FileText className="mr-2 h-4 w-4" />
            Tải lên file JSON
          </Button>
          <input id="file-upload" type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
        </div>

        <Button variant="secondary" onClick={handlePasteExample}>
          Dán dữ liệu mẫu
        </Button>
      </div>
    </div>
  )
}
