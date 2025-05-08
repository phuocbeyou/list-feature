"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Smartphone, Globe } from "lucide-react"
import type { Feature } from "@/lib/types"

interface FeatureCardProps {
  feature: Feature
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "released":
        return "bg-green-500 hover:bg-green-600"
      case "beta":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "development":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "ui enhancement":
        return "bg-purple-100 text-purple-800"
      case "security":
        return "bg-red-100 text-red-800"
      case "notification":
        return "bg-blue-100 text-blue-800"
      case "performance":
        return "bg-green-100 text-green-800"
      case "integration":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  return (
    <Card
      className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4"
      style={{
        borderTopColor:
          feature.status.toLowerCase() === "released"
            ? "#10b981"
            : feature.status.toLowerCase() === "beta"
              ? "#f59e0b"
              : "#3b82f6",
      }}
    >
      <CardHeader className="pb-2 space-y-1">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${getTypeColor(feature.type)} font-normal`}>
            {feature.type}
          </Badge>
          <Badge className={`${getStatusColor(feature.status)} text-white`}>{feature.status}</Badge>
        </div>
        <CardTitle className="text-xl mt-2">{feature.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">ID: {feature.id}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="mb-4">
          {feature.image && (
            <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={feature.image || "/placeholder.svg?height=160&width=320"}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          <p className="text-sm mb-4 text-gray-600">{feature.description}</p>

          <div className="flex flex-wrap gap-1 mt-3">
            {feature.platforms.map((platform) => (
              <div key={platform} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                {getPlatformIcon(platform)}
                {platform}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
