import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-900 overflow-hidden">
      {/* Background blue gradient blur - Top Right Corner */}
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-600 rounded-full blur-3xl opacity-30 z-0 pointer-events-none" />

      {/* Content */}
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
