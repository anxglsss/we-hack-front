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
    case 'ROLE_USER':
      redirect('/dashboard/student')
    case 'ROLE_ORGANIZER':
      redirect('/dashboard/organizer')
    case 'ROLE_ADMIN':
      redirect('/dashboard/admin')
    default:
      redirect('/auth/register')
  }
}