'use client'

import logo from '@/assets/sdu.jpg'
import { Skeleton } from '@/components/ui/skeleton'
import { useClubStore } from '@/stores/club.store'
import { Calendar, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function ClubDetailPage() {
  const params = useParams()
  const id = params.slug as string
  const { currentClub, isLoading, error, getClubById } = useClubStore()

  useEffect(() => {
    const numericId = Number(id)
    if (!currentClub || currentClub.id !== numericId) {
      getClubById(numericId)
    }
  }, [id, currentClub, getClubById])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (isLoading || !currentClub) {
    return <Skeleton className="h-64 rounded-xl bg-zinc-800" />
  }

  return (
    <div className="p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={logo}
          alt="club logo"
          width={60}
          height={60}
          className="rounded-full object-cover border border-black shadow-md"
        />
        <h1 className="text-3xl font-bold">{currentClub.name}</h1>
      </div>

      <p className="text-zinc-300 mb-6">{currentClub.description}</p>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-zinc-400">
          <Users className="w-4 h-4 mr-2" />
          <span>{currentClub.subscribers?.length || 0} участников</span>
        </div>
        <div className="flex items-center text-sm text-zinc-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{currentClub.events?.length || 0} мероприятий</span>
        </div>
        <div className="flex items-center text-sm text-zinc-400">
          <Clock className="w-4 h-4 mr-2" />
          <span>Создан {new Date(currentClub.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
