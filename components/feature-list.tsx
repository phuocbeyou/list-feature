"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { importFeatures } from "@/lib/redux/features/featuresSlice"
import type { RootState } from "@/lib/redux/store"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import FeatureCard from "./feature-card"
import type { Feature } from "@/lib/types"
import { AlertCircle, Search, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import EmptyState from "./empty-state"
import { Button } from "@/components/ui/button"

export default function FeatureList() {
  const features = useSelector((state: RootState) => state.features.features)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const dispatch = useDispatch()

  const fetchFeatures = async () => {
    try {
      setIsRefreshing(true)

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real application, you would use a real API endpoint
      // const response = await fetch("https://api.example.com/features")
      // const data = await response.json()

      // Simulated API response
      const data = {
        new_features: [
          {
            id: "feature-001",
            title: "Chế độ tối (Dark Mode)",
            description: "Hỗ trợ giao diện chế độ tối giúp bảo vệ mắt và tiết kiệm pin.",
            type: "UI Enhancement",
            status: "Released",
            platforms: ["Web", "iOS", "Android"],
            image: "https://example.com/images/dark-mode.png",
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
            status: "Released",
            platforms: ["iOS", "Android"],
            image: "https://example.com/images/fingerprint-login.png",
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
            developer: {
              name: "Trần Thị B",
              email: "tranthib@example.com",
            },
          },
        ],
      }

      dispatch(importFeatures(data.new_features))
    } catch (error) {
      console.error("Error fetching features:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchFeatures()
  }, [])

  const handleRefresh = () => {
    fetchFeatures()
  }

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType && filterType !== "all" ? feature.type === filterType : true

    return matchesSearch && matchesType
  })

  // Get unique types from the features
  const types = Array.from(new Set(features.map((feature) => feature.type)))

  if (isLoading) {
    return <FeatureListSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1.5 block">
            Tìm kiếm tính năng
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Tìm kiếm theo tiêu đề, mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white border-gray-200"
            />
          </div>
        </div>

        <div className="w-full md:w-64">
          <Label htmlFor="type-filter" className="text-sm font-medium text-gray-700 mb-1.5 block">
            Loại tính năng
          </Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger id="type-filter" className="bg-white border-gray-200">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-10 w-10 shrink-0"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="sr-only">Làm mới</span>
        </Button>
      </div>

      {features.length === 0 ? (
        <EmptyState />
      ) : filteredFeatures.length === 0 ? (
        <Alert className="bg-blue-50 border-blue-100 text-blue-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Không tìm thấy kết quả</AlertTitle>
          <AlertDescription>
            Không tìm thấy tính năng nào phù hợp với điều kiện tìm kiếm. Hãy thử lại với từ khóa khác.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredFeatures.map((feature: Feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      )}
    </div>
  )
}

function FeatureListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1.5" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-full md:w-64">
          <Skeleton className="h-5 w-24 mb-1.5" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-10 rounded-md shrink-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
