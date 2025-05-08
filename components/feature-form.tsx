"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addFeature, updateFeature } from "@/lib/redux/features/featuresSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { Feature } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { toast } from "@/components/ui/use-toast"

interface FeatureFormProps {
  feature?: Feature
  onSuccess?: () => void
}

const defaultFeature: Feature = {
  id: "",
  title: "",
  description: "",
  type: "",
  status: "Development",
  platforms: [],
  image: "",
  documentation_link: "",
  developer: {
    name: "",
    email: "",
  },
}

const featureTypes = ["UI Enhancement", "Security", "Performance", "Notification", "Integration", "Analytics", "Other"]

const statusOptions = ["Development", "Beta", "Released", "Deprecated"]

const platformOptions = ["Web", "iOS", "Android", "Desktop", "API"]

export default function FeatureForm({ feature, onSuccess }: FeatureFormProps) {
  const [formData, setFormData] = useState<Feature>(feature || { ...defaultFeature, id: uuidv4() })
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(feature ? feature.platforms : [])
  const dispatch = useDispatch()

  useEffect(() => {
    if (feature) {
      setFormData(feature)
      setSelectedPlatforms(feature.platforms)
    }
  }, [feature])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof Feature],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.description || !formData.type || !formData.status) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      })
      return
    }

    const updatedFeature = {
      ...formData,
      platforms: selectedPlatforms,
    }

    if (feature) {
      dispatch(updateFeature(updatedFeature))
      toast({
        title: "Thành công",
        description: "Đã cập nhật tính năng.",
      })
    } else {
      dispatch(addFeature(updatedFeature))
      setFormData({ ...defaultFeature, id: uuidv4() })
      setSelectedPlatforms([])
      toast({
        title: "Thành công",
        description: "Đã thêm tính năng mới.",
      })
    }

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">
              Tiêu đề <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề tính năng"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">
              Mô tả <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về tính năng"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">
              Loại <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại tính năng" />
              </SelectTrigger>
              <SelectContent>
                {featureTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">
              Trạng thái <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Nền tảng</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {platformOptions.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                  />
                  <Label htmlFor={`platform-${platform}`} className="cursor-pointer">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="image">URL Hình ảnh</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/images/feature.png"
            />
          </div>

          <div>
            <Label htmlFor="documentation_link">Link tài liệu</Label>
            <Input
              id="documentation_link"
              name="documentation_link"
              value={formData.documentation_link}
              onChange={handleChange}
              placeholder="https://example.com/docs/feature"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="developer.name">Tên người phát triển</Label>
              <Input
                id="developer.name"
                name="developer.name"
                value={formData.developer.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <Label htmlFor="developer.email">Email</Label>
              <Input
                id="developer.email"
                name="developer.email"
                value={formData.developer.email}
                onChange={handleChange}
                placeholder="example@example.com"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{feature ? "Cập nhật tính năng" : "Tạo tính năng mới"}</Button>
      </div>
    </form>
  )
}
