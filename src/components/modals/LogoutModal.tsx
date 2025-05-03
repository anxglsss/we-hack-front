'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/auth.store'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LogoutModal() {
  const [open, setOpen] = useState(false)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    setOpen(false)
    router.push('/auth/login') // Redirect to login page
    await logout() // This clears tokens and sets user to null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <LogOut className="text-zinc-300 w-5 h-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-zinc-800 text-white rounded-xl border-none shadow-lg max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Выход из аккаунта</DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Вы уверены, что хотите выйти? Вы будете перенаправлены на страницу входа.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button className='bg-zinc-700 hover:bg-zinc-500 text-white py-3 px-12' onClick={() => setOpen(false)}>Отмена</Button>
          <Button className='bg-red-600 hover:bg-red-500 text-white py-3 px-12' onClick={handleLogout}>Выйти</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
