"use client"

import { useAuthStore } from "@/stores/auth.store"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Home = observer(() => {
  const router = useRouter()
  const {isAuth} = useAuthStore()

  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth/login")
    }
  }, [])

  return null
})

export default Home
