"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import FeatureList from "@/components/feature-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <Provider store={store}>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Hệ thống Quản lý Tính năng</h1>

        <Card className="w-full">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="text-2xl">Danh sách tính năng</CardTitle>
            <CardDescription className="text-white/80">Các tính năng mới nhất của ứng dụng</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <FeatureList />
          </CardContent>
        </Card>
      </div>
    </Provider>
  )
}
