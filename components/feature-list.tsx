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

      // Simulated API response with the new JSON structure
      const data = {
        new_features: [
          {
            id: "feature-001",
            title: "Chế độ tối (Dark Mode)",
            description: "Hỗ trợ giao diện chế độ tối giúp bảo vệ mắt và tiết kiệm pin.",
            type: "UI Enhancement",
            status: "Released",
            version: "1.0.3",
            release_date: "2024-05-08",
            platforms: ["Web", "iOS", "Android"],
            image: "https://example.com/images/dark-mode.png",
            documentation_link: "https://example.com/docs/dark-mode",
            developer: {
              name: "Phạm Hữu Phước",
              email: "phuoc@example.com",
              profile_image: "https://example.com/images/developer-phuoc.png",
            },
            features: [
              {
                title: "Chuyển đổi giữa chế độ tối và sáng",
                description: "Người dùng có thể bật tắt chế độ tối ngay trong cài đặt ứng dụng.",
              },
              {
                title: "Tự động chuyển đổi theo thời gian",
                description: "Chế độ tối tự động kích hoạt vào ban đêm và chuyển sang sáng vào ban ngày.",
              },
              {
                title: "Tùy chỉnh màu sắc nền và chữ",
                description: "Cho phép người dùng chọn màu sắc cho chế độ tối theo sở thích cá nhân.",
              },
            ],
            screenshots: [
              "https://example.com/images/dark-mode-preview-1.png",
              "https://example.com/images/dark-mode-preview-2.png",
            ],
            installation_guide: {
              steps: [
                {
                  step_number: 1,
                  title: "Cập nhật ứng dụng lên phiên bản mới nhất",
                  description: "Hãy chắc chắn rằng bạn đã cập nhật ứng dụng lên phiên bản 1.0.3.",
                },
                {
                  step_number: 2,
                  title: "Truy cập vào cài đặt ứng dụng",
                  description: "Đi tới Cài đặt > Hiển thị > Chế độ tối.",
                },
                {
                  step_number: 3,
                  title: "Kích hoạt chế độ tối",
                  description: "Bật công tắc để chuyển sang chế độ tối.",
                },
              ],
            },
            faq: [
              {
                question: "Chế độ tối có hỗ trợ tất cả các trang không?",
                answer: "Có, chế độ tối hỗ trợ toàn bộ giao diện của ứng dụng trên mọi trang.",
              },
              {
                question: "Tôi có thể tùy chỉnh màu sắc của chế độ tối không?",
                answer: "Có, bạn có thể chọn màu sắc tùy chỉnh trong phần Cài đặt > Hiển thị.",
              },
            ],
          },
          {
            id: "feature-002",
            title: "Đăng nhập bằng vân tay",
            description: "Cho phép người dùng đăng nhập nhanh bằng vân tay hoặc khuôn mặt.",
            type: "Security",
            status: "Released",
            version: "1.0.3",
            release_date: "2024-05-08",
            platforms: ["iOS", "Android"],
            image: "https://example.com/images/fingerprint-login.png",
            documentation_link: "https://example.com/docs/fingerprint-login",
            developer: {
              name: "Nguyễn Văn A",
              email: "nguyenvana@example.com",
              profile_image: "https://example.com/images/developer-nguyen.png",
            },
            features: [
              {
                title: "Đăng nhập nhanh chóng",
                description: "Đăng nhập chỉ trong 1 giây với vân tay hoặc khuôn mặt.",
              },
              {
                title: "Bảo mật cao",
                description: "Sử dụng công nghệ mã hóa tiên tiến để bảo vệ thông tin người dùng.",
              },
              {
                title: "Hỗ trợ nhiều thiết bị",
                description: "Hoạt động trên nhiều loại thiết bị iOS và Android khác nhau.",
              },
            ],
            screenshots: [
              "https://example.com/images/fingerprint-preview-1.png",
              "https://example.com/images/fingerprint-preview-2.png",
            ],
            installation_guide: {
              steps: [
                {
                  step_number: 1,
                  title: "Cập nhật ứng dụng",
                  description: "Cập nhật lên phiên bản mới nhất từ App Store hoặc Google Play.",
                },
                {
                  step_number: 2,
                  title: "Thiết lập vân tay",
                  description: "Vào Cài đặt > Bảo mật > Đăng nhập sinh trắc học.",
                },
                {
                  step_number: 3,
                  title: "Kích hoạt tính năng",
                  description: "Bật tính năng đăng nhập bằng vân tay hoặc khuôn mặt.",
                },
              ],
            },
            faq: [
              {
                question: "Tính năng này có an toàn không?",
                answer: "Có, chúng tôi sử dụng công nghệ mã hóa tiên tiến để bảo vệ dữ liệu sinh trắc học của bạn.",
              },
              {
                question: "Tôi có thể sử dụng cả mật khẩu và vân tay không?",
                answer: "Có, bạn có thể chọn phương thức đăng nhập tùy thích mỗi lần sử dụng.",
              },
            ],
          },
          {
            id: "feature-003",
            title: "Tùy chỉnh thông báo đẩy",
            description: "Người dùng có thể tùy chỉnh thông báo đẩy theo sở thích cá nhân.",
            type: "Notification",
            status: "Released",
            version: "1.0.3",
            release_date: "2024-05-08",
            platforms: ["Web", "iOS", "Android"],
            image: "https://example.com/images/notification-settings.png",
            documentation_link: "https://example.com/docs/custom-push",
            developer: {
              name: "Trần Thị B",
              email: "tranthib@example.com",
              profile_image: "https://example.com/images/developer-tran.png",
            },
            features: [
              {
                title: "Lọc thông báo theo loại",
                description: "Chọn loại thông báo bạn muốn nhận: tin tức, cập nhật, khuyến mãi.",
              },
              {
                title: "Đặt lịch nhận thông báo",
                description: "Chọn thời gian trong ngày bạn muốn nhận thông báo.",
              },
              {
                title: "Tùy chỉnh âm thanh",
                description: "Chọn âm thanh riêng cho từng loại thông báo.",
              },
            ],
            screenshots: [
              "https://example.com/images/notification-preview-1.png",
              "https://example.com/images/notification-preview-2.png",
            ],
            installation_guide: {
              steps: [
                {
                  step_number: 1,
                  title: "Vào cài đặt thông báo",
                  description: "Mở ứng dụng và vào Cài đặt > Thông báo.",
                },
                {
                  step_number: 2,
                  title: "Chọn loại thông báo",
                  description: "Chọn loại thông báo bạn muốn tùy chỉnh.",
                },
                {
                  step_number: 3,
                  title: "Tùy chỉnh cài đặt",
                  description: "Điều chỉnh các tùy chọn theo sở thích của bạn.",
                },
              ],
            },
            faq: [
              {
                question: "Tôi có thể tắt hoàn toàn thông báo không?",
                answer: "Có, bạn có thể tắt tất cả thông báo hoặc chỉ tắt một số loại thông báo cụ thể.",
              },
              {
                question: "Thông báo có hoạt động khi ứng dụng đóng không?",
                answer: "Có, thông báo đẩy sẽ vẫn hoạt động ngay cả khi ứng dụng không mở.",
              },
            ],
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
