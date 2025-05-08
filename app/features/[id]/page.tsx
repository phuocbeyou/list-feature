"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { RootState } from "@/lib/redux/store"
import type { Feature } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Code,
  ExternalLink,
  Globe,
  HelpCircle,
  Laptop,
  Layers,
  List,
  Smartphone,
  User,
} from "lucide-react"

// Thay đổi phần đầu của component để xử lý trường hợp không có features
export default function FeatureDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const features = useSelector((state: RootState) => state.features.features)
  const [feature, setFeature] = useState<Feature | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Nếu features đã được tải
    if (features.length > 0) {
      const foundFeature = features.find((f) => f.id === id)
      if (foundFeature) {
        setFeature(foundFeature)
      }
      setIsLoading(false)
    } else {
      // Nếu không có features trong Redux store, tải dữ liệu
      const fetchFeature = async () => {
        try {
          // Simulate API call with timeout
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Simulated API response for a single feature
          const data = {
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
          }

          // Nếu ID khớp với dữ liệu mẫu, sử dụng nó
          if (id === "feature-001") {
            setFeature(data)
          } else {
            // Nếu không, chuyển hướng về trang danh sách
            router.push("/features")
          }
        } catch (error) {
          console.error("Error fetching feature:", error)
          router.push("/features")
        } finally {
          setIsLoading(false)
        }
      }

      fetchFeature()
    }
  }, [features, id, router])

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "ui enhancement":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "security":
        return "bg-red-100 text-red-800 border-red-200"
      case "notification":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "performance":
        return "bg-green-100 text-green-800 border-green-200"
      case "integration":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "web":
        return <Globe className="h-4 w-4" />
      case "ios":
      case "android":
        return <Smartphone className="h-4 w-4" />
      case "desktop":
        return <Laptop className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!feature) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy tính năng</h1>
          <p className="text-gray-500 mb-6">Tính năng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Button asChild>
            <Link href="/features">Quay lại danh sách tính năng</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/features" className="flex items-center gap-1 text-gray-500 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </Link>
          </Button>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <Badge className={`${getTypeColor(feature.type)} mb-2`}>{feature.type}</Badge>
              <h1 className="text-3xl font-bold">{feature.title}</h1>
            </div>
            {feature.documentation_link && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={feature.documentation_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Tài liệu
                </a>
              </Button>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden mb-8">
            <div className="aspect-video relative">
              <Image
                src={feature.image || "/placeholder.svg?height=400&width=800"}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Ngày phát hành
                </div>
                <p className="text-gray-600">{feature.release_date}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Code className="h-4 w-4 text-blue-500" />
                  Phiên bản
                </div>
                <p className="text-gray-600">{feature.version}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Layers className="h-4 w-4 text-blue-500" />
                  Nền tảng
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {feature.platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center gap-1 text-xs bg-gray-50 border border-gray-100 px-2 py-1 rounded-full text-gray-700"
                    >
                      {getPlatformIcon(platform)}
                      {platform}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Mô tả</h2>
            <p className="text-gray-700 leading-relaxed">{feature.description}</p>
          </div>

          <Tabs defaultValue="features" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="features" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                Tính năng
              </TabsTrigger>
              <TabsTrigger value="installation" className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                Hướng dẫn cài đặt
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {feature.features.map((item, index) => (
                      <li key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="installation">
              <Card>
                <CardContent className="p-6">
                  <ol className="space-y-6">
                    {feature.installation_guide.steps.map((step) => (
                      <li key={step.step_number} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                          {step.step_number}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="faq">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {feature.faq.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {feature.screenshots && feature.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ảnh chụp màn hình</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feature.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={feature.developer.profile_image || "/placeholder.svg?height=48&width=48"}
                alt={feature.developer.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User className="h-4 w-4 text-blue-500" />
                Người phát triển
              </div>
              <p className="text-gray-900 font-medium">{feature.developer.name}</p>
              <p className="text-gray-500 text-sm">{feature.developer.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
