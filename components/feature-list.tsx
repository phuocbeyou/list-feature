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
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import EmptyState from "./empty-state"

export default function FeatureList() {
  const features = useSelector((state: RootState) => state.features.features)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  // Fetch features from API
  useEffect(() => {
    const fetchFeatures = async () => {
      setIsLoading(true)
      try {
        // Simulating API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // In a real app, you would fetch from an actual API
        // const response = await fetch('/api/features')
        // const data = await response.json()

        // Using the sample data for demonstration
        const data = {
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

        dispatch(importFeatures(data.new_features))
      } catch (error) {
        console.error("Error fetching features:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeatures()
  }, [dispatch])

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType ? feature.type === filterType : true

    return matchesSearch && matchesType
  })

  // Get unique types from the features
  const types = Array.from(new Set(features.map((feature) => feature.type)))

  if (isLoading) {
    return <FeatureListSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="search" className="mb-2 block">
            Tìm kiếm
          </Label>
          <Input
            id="search"
            placeholder="Tìm kiếm theo tiêu đề, mô tả hoặc ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div>
          <Label htmlFor="type-filter" className="mb-2 block">
            Loại tính năng
          </Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger id="type-filter" className="bg-white/50 backdrop-blur-sm">
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
      </div>

      {features.length === 0 ? (
        <EmptyState />
      ) : filteredFeatures.length === 0 ? (
        <Alert>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex justify-between pt-4">
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
