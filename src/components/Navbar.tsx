'use client'

import { motion } from 'framer-motion'
import { Bell, Settings } from 'lucide-react'
import { LogoutModal } from './modals/LogoutModal'
import { TelegramModal } from './modals/TelegramModal'

export function Navbar() {
  return (
    <div className="px-2 pt-2">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-zinc-900 text-white px-6 py-5 flex justify-between items-center rounded-2xl shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-violet-500" />
          <Settings className="w-5 h-5 text-zinc-300" />
        </div>
        <div className="flex items-center gap-4">
          <TelegramModal />
          <Bell className="text-zinc-300 w-5 h-5" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-violet-500" />
          </div>
          <LogoutModal />
        </div>
      </motion.header>
    </div>
  )
}
