'use client'

import defaultEventImage from '@/assets/sdu.jpg'
import { CreateEventModal } from '@/components/modals/CreateEventModal'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/stores/auth.store'
import { useEventStore } from '@/stores/event.store'
import {
  Calendar, Clock, MapPin, Monitor, Plus, Star, Ticket, Users
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export default function EventsPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { events, isLoading, getAllEvents, deleteEvent } = useEventStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [filterClub, setFilterClub] = useState('')
  const [onlyFree, setOnlyFree] = useState(false)
  const [onlyOnline, setOnlyOnline] = useState(false)
  const [futureOnly, setFutureOnly] = useState(true)

  useEffect(() => {
    getAllEvents().catch(error => {
      toast.error('Failed to load events')
      console.error(error)
    })
  }, [])

  const role = user?.role
  const canCreateEvent = role === 'ROLE_CLUB_MANAGER' || role === 'ROLE_ADMIN'

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const lowerSearch = search.toLowerCase()
      const titleMatch = event.title.toLowerCase().includes(lowerSearch)
      const clubMatch = filterClub ? event.club.name === filterClub : true
      const freeMatch = onlyFree ? event.price === 0 : true
      const onlineMatch = onlyOnline ? event.isOnline : true
      const futureMatch = futureOnly
        ? new Date(event.date) > new Date()
        : true

      return titleMatch && clubMatch && freeMatch && onlineMatch && futureMatch
    })
  }, [events, search, filterClub, onlyFree, onlyOnline, futureOnly])

  const visibleEvents = showMore ? filteredEvents : filteredEvents.slice(0, 6)

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id)
      toast.success('Event deleted successfully')
    } catch (error) {
      toast.error('Failed to delete event')
      console.error(error)
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('ru-RU', options)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
    }).format(price)
  }

  const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews?.length) return null
    const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    return avg.toFixed(1)
  }

  const clubOptions = useMemo(() => {
    const unique = Array.from(new Set(events.map(e => e.club.name)))
    return unique.sort()
  }, [events])

  return (
    <div className="p-6 max-h-screen overflow-hidden bg-zinc-900 rounded-lg text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">События</h1>
          <p className="text-zinc-400 mt-2">
            {filteredEvents.length} найдено
          </p>
        </div>

       
        {canCreateEvent && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Создать событие
          </button>
        )}
       
      </div>

      {/* Filters */}
     {/* Filters */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
  <Input
    placeholder="Поиск по названию"
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="bg-zinc-800 text-white placeholder-zinc-400"
  />

  <Select onValueChange={setFilterClub} value={filterClub}>
    <SelectTrigger className="bg-zinc-800 text-white">
      <SelectValue placeholder="Все клубы" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">Все клубы</SelectItem>
      {clubOptions.map(name => (
        <SelectItem key={name} value={name}>
          {name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <div className="flex items-center gap-6 text-sm">
    <label className="flex items-center gap-2">
      <Checkbox
        checked={onlyFree}
        onCheckedChange={(checked) => setOnlyFree(!!checked)}
        className="border-purple-600 data-[state=checked]:bg-purple-600"
      />
      Бесплатные
    </label>
    <label className="flex items-center gap-2">
      <Checkbox
        checked={onlyOnline}
        onCheckedChange={(checked) => setOnlyOnline(!!checked)}
        className="border-purple-600 data-[state=checked]:bg-purple-600"
      />
      Онлайн
    </label>
    <label className="flex items-center gap-2">
      <Checkbox
        checked={futureOnly}
        onCheckedChange={(checked: any) => setFutureOnly(!!checked)}
        className="border-purple-600 data-[state=checked]:bg-purple-600"
      />
      Только будущие
    </label>
  </div>
</div>

      {/* Events */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-xl overflow-hidden h-96 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[calc(100vh-14rem)] pb-6">
          {filteredEvents.length === 0 ? (
            <p className="text-zinc-500 text-center">Событий не найдено.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => router.push(`/dashboard/events/${event.id}`)}
                  className="cursor-pointer bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col border border-zinc-800 hover:border-zinc-700"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={defaultEventImage}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h2 className="text-xl font-bold line-clamp-1">{event.title}</h2>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400">
                          {getAverageRating(event.reviews) || 'Нет оценок'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      {event.isOnline ? (
                        <>
                          <Monitor className="w-4 h-4 text-green-400" />
                          <span>Онлайн</span>
                          {event.streamingUrl && (
                            <a
                              href={event.streamingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                              onClick={e => e.stopPropagation()}
                            >
                              Ссылка
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 text-red-400" />
                          <span>{event.venue.name}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>{event.club.name}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Ticket className="w-4 h-4 text-amber-400" />
                        <span>{formatPrice(event.price)}</span>
                      </div>
                      <div className="text-sm text-zinc-400">
                        {event.tickets?.length || 0}/{event.capacity} мест
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  
                </div>
              ))}
            </div>
          )}

          {filteredEvents.length > 6 && (
            <button
              onClick={() => setShowMore(prev => !prev)}
              className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-lg transition"
            >
              {showMore ? 'Скрыть' : `Показать еще ${filteredEvents.length - 6} событий`}
            </button>
          )}
        </div>
      )}

      <CreateEventModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
