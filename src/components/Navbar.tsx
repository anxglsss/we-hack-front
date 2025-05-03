'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LogoutModal } from './modals/LogoutModal'
import { OrganizerRequestModal } from './modals/OrganizerRequestModal'
import { TelegramModal } from './modals/TelegramModal'

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openOrganizerModal = () => setIsModalOpen(true)
  const closeOrganizerModal = () => setIsModalOpen(false)

  return (
    <div className="px-2 pt-2">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-zinc-900 text-white px-6 py-4 flex justify-between items-center rounded-2xl shadow-md"
      >
        <div className="flex items-center gap-4">
          <TelegramModal />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* "Are you Organizer?" Button */}
            <button
              onClick={openOrganizerModal}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition"
            >
              Вы организатор?
            </button>
          </div>
          <LogoutModal />
        </div>
      </motion.header>

      {/* Modal for Organizer Request */}
      <OrganizerRequestModal open={isModalOpen} onOpenChange={closeOrganizerModal} />
    </div>
  )
}
