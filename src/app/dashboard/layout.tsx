import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import "@/styles/globals.css"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
  )
} 
