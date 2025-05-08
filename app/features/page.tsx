"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import FeatureList from "@/components/feature-list"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <Provider store={store}>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Danh sách tính năng mới
          </h1>
          <p className="text-center text-gray-500 mb-8">Khám phá những tính năng mới nhất của ứng dụng</p>

          <Card className="w-full border-none shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <FeatureList />
            </CardContent>
          </Card>
        </div>
      </div>
    </Provider>
  )
}
