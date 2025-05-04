'use client'

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface StoredUser {
  email: string
  role: string
}

export default function DashboardPage() {
  const [checked, setChecked] = useState(false)
  
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      redirect('/auth/register')
      return
    }

    const user: StoredUser = JSON.parse(stored)

    switch (user.role) {
      case 'ROLE_STUDENT':
        redirect('/dashboard/events')
        break
      case 'ROLE_CLUB_MANAGER':
        redirect('/dashboard/events')
        break
      case 'ROLE_ADMIN':
        redirect('/dashboard/events')
        break
      default:
        redirect('/auth/register')
        break
    }

    setChecked(true) // Won't really render anything since we redirect before this
  }, [])

  return null // You can also return a loading spinner here if needed
}
