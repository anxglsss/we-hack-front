'use client'

import { UserService } from '@/api/services/user.service'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

export function TelegramModal() {
  const [open, setOpen] = useState(false)
  const [tgLink, setTgLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setLoading(true)
      UserService.getTgLink()
        .then((link) => setTgLink(link ?? null))
        .catch(() => setTgLink(null))
        .finally(() => setLoading(false))
    } else {
      setTgLink(null)
      setLoading(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Telegram Bot</Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800 text-white rounded-xl border-none shadow-lg max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Наш Telegram Бот</DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Перейдите по ссылке ниже, чтобы начать использовать нашего бота.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <span className="text-sm text-zinc-400 mt-4">Загрузка ссылки...</span>
        ) : tgLink ? (
          <a
            href={tgLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-400 hover:underline"
          >
            Открыть Telegram
          </a>
        ) : (
          <span className="text-sm text-red-400 mt-2">Не удалось получить ссылку</span>
        )}
      </DialogContent>
    </Dialog>
  )
}
