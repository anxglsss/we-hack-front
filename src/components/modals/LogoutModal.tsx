'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export function LogoutModal() {
  const [open, setOpen] = useState(false)

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
          <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
          <Button
            variant="destructive"
            onClick={() => {
              // TODO: Handle logout logic here
              console.log('Logged out')
              setOpen(false)
            }}
          >
            Выйти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
