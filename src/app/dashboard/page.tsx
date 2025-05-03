'use client'

import { useAuthStore } from "@/stores/auth.store"
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const authStore = useAuthStore()
  const user = authStore.user
  
  if (!user) {
    redirect('/auth/register')
  }
  
  // Редирект на страницу по роли
  switch(user.role) {
    case 'ROLE_STUDENT':
      redirect('/dashboard/student')
    case 'ROLE_CLUB_MANAGER':
      redirect('/dashboard/organizer')
    case 'ROLE_ADMIN':
      redirect('/dashboard/admin')
    default:
      redirect('/auth/register')
  }
}