"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Smartphone, Globe } from "lucide-react"
import type { Feature } from "@/lib/types"

interface FeatureCardProps {
  feature: Feature
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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
        return <Globe className="h-3.5 w-3.5" />
      case "ios":
      case "android":
        return <Smartphone className="h-3.5 w-3.5" />
      case "desktop":
        return <Laptop className="h-3.5 w-3.5" />
      default:
        return <Globe className="h-3.5 w-3.5" />
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 group">
      <div className="relative">
        {feature.image && (
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <Image
              src={feature.image || "/placeholder.svg?height=160&width=320"}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <Badge className={`${getTypeColor(feature.type)} absolute top-3 left-3 font-normal`}>{feature.type}</Badge>
      </div>

      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{feature.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{feature.description}</p>

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
  )
}
