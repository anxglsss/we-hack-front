'use client'

import logo from '@/assets/sdu.jpg'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/tw-merge'
import { useAuthStore } from '@/stores/auth.store'
import { useClubStore } from '@/stores/club.store'
import { useSubscriptionStore } from '@/stores/subscription.store'
import { Calendar, Clock, Star, Users } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function ClubsPage() {
  const { clubs, isLoading, error, getAllClubs } = useClubStore()
  const { subscribe, loading: subscriptionLoading } = useSubscriptionStore()
  const router = useRouter()
  const user = useAuthStore.getState().user

  useEffect(() => {
    getAllClubs()
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      console.log(JSON.parse(storedUser))
      console.log(JSON.parse(storedUser).role)
    }
  }, [])

  const handleSubscribe = async (clubId: number) => {
    try {
      await subscribe(clubId)
      toast.success('Подписка на клуб успешно оформлена!')
    } catch (error) {
      toast.error('Ошибка при подписке на клуб.')
    }
  }

  if (error) {
    toast.error(error)
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Клубы</h1>
      </div>

      {isLoading && !clubs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl bg-zinc-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className={cn(
                "relative rounded-xl overflow-hidden border border-zinc-700 hover:border-zinc-500 transition-all",
                "bg-gradient-to-br from-zinc-900 to-zinc-800 hover:to-zinc-700"
              )}
              onClick={() => router.push(`/dashboard/clubs/${club.id}`)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={logo}
                      alt="club logo"
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-black shadow-md"
                    />
                    <h2 className="text-xl font-semibold line-clamp-1">{club.name}</h2>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span>4.8</span>
                  </div>
                </div>
                <p className="text-zinc-300 line-clamp-3 mb-6">{club.description}</p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center text-sm text-zinc-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{club.subscribers?.length || 0} участников</span>
                  </div>

                  <div className="flex items-center text-sm text-zinc-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{club.events?.length || 0} мероприятий</span>
                  </div>

                  <div className="flex items-center text-sm text-zinc-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Создан {new Date(club.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Subscribe Button */}
                <Button
                  className="mt-4 text-white"
                  onClick={() => handleSubscribe(club.id)}
                  disabled={subscriptionLoading}
                >
                  {subscriptionLoading ? 'Подписка...' : 'Подписаться'}
                </Button>
              </div>

              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !clubs.length && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-zinc-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Клубы не найдены</h3>
          <p className="text-zinc-400 max-w-md">
            В системе пока нет активных клубов. Вы можете создать первый клуб.
          </p>
          <Button
            className="mt-6 text-white"
            onClick={() => router.push('/clubs/create')}
          >
            Создать клуб
          </Button>
        </div>
      )}
    </div>
  )
}
