import ReduxProvider from "@/components/redux-provider"
import type { ReactNode } from "react"

export default function FeatureDetailLayout({ children }: { children: ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>
}
