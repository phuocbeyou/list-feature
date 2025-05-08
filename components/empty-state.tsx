import { PackageOpen } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-lg">
      <div className="bg-white p-5 rounded-full shadow-sm mb-4">
        <PackageOpen className="h-12 w-12 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Chưa có tính năng nào</h3>
      <p className="text-gray-500 max-w-md mb-6">
        Hiện tại chưa có tính năng nào được thêm vào hệ thống. Dữ liệu tính năng sẽ xuất hiện ở đây khi có.
      </p>
    </div>
  )
}
