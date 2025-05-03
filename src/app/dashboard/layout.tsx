import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}