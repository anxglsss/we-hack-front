// src/app/(auth)/layout.tsx
"use client"

import type { ReactNode } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  email: string
  password: string
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-dark overflow-hidden">
      {/* Background circles and neon gradient */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute top-0 right-[-400px] w-[1200px] h-[1000px] bg-gradient-to-br from-white/20 to-transparent blur-[200px] rounded-full" />

        {/* Pulsing circles */}
        {[
          "top-1/5 left-1/4 w-48 h-48",
          "top-1/5 right-1/4 w-52 h-52",
          "bottom-1/7 left-1/2 w-46 h-46",
          "top-1/2 left-1/4 w-50 h-50",
          "bottom-1/3 right-1/4 w-48 h-48",
          "top-[10%] left-[10%] w-40 h-40",
          "bottom-[15%] right-[15%] w-44 h-44",
          "top-[40%] right-[35%] w-46 h-46",
          "bottom-[30%] left-[20%] w-48 h-48",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} rounded-full border border-white/20 animate-pulse-scale`}
          />
        ))}
      </div>

      {children}
      
    </div>
  )
}
