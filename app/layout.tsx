import type React from "react"
import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
