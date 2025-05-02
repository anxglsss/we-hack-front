'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Bell, LogOut, Settings } from 'lucide-react'

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-zinc-900 text-white px-6 py-4 flex justify-between items-center shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-violet-500" />
        <Settings className="w-5 h-5 text-zinc-300" />
      </div>
      <div className="flex items-center gap-4">
        <Button>
          Telegram Bot
        </Button>
        <Bell className="text-zinc-300 w-5 h-5" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-500" />
        </div>
        <LogOut/>
      </div>
    </motion.header>
  )
}
