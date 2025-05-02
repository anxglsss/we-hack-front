"use client"

import { authStore } from "@/stores/auth.store"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Home = observer(() => {
  const router = useRouter()

  useEffect(() => {
    if (!authStore.isAuth) {
      router.replace("/auth/login")
    }
  }, [])

  return null
})

export default Home
