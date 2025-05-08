import { PackageOpen } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-blue-50 p-4 rounded-full mb-4">
        <PackageOpen className="h-12 w-12 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Không có tính năng nào</h3>
      <p className="text-gray-500 max-w-md mb-6">
        Hiện tại chưa có tính năng nào được thêm vào hệ thống. Dữ liệu tính năng sẽ xuất hiện ở đây khi có.
      </p>
    </div>
  )
}
