'use client'

import defaultEventImage from '@/assets/sdu.jpg'
import { useEventStore } from '@/stores/event.store'
import { Calendar, Clock, MapPin, Monitor, Star, Ticket, Users } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EventDetailPage() {
  const params = useParams()
  const id = params.slug as string
  const { events, getAllEvents } = useEventStore()
  const [event, setEvent] = useState<any | null>(null)

  useEffect(() => {
    getAllEvents().then(() => {
      const found = events.find(e => String(e.id) === id)
      setEvent(found)
    }).catch(() => toast.error('Не удалось загрузить событие'))
  }, [id, events])

  if (!event) {
    return <div className="text-white p-6">Загрузка события...</div>
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT' }).format(price)

  const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews?.length) return null
    const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    return avg.toFixed(1)
  }

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg mb-8">
        <Image src={defaultEventImage} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-end p-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-2 text-yellow-400 text-lg">
              <Star className="w-5 h-5" />
              {getAverageRating(event.reviews) || 'Нет оценок'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-zinc-300">
            <Calendar className="text-blue-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <Clock className="text-blue-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            {event.isOnline ? (
              <>
                <Monitor className="text-green-400" />
                <span>Онлайн</span>
                {event.streamingUrl && (
                  <a href={event.streamingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline ml-2">
                    Перейти
                  </a>
                )}
              </>
            ) : (
              <>
                <MapPin className="text-red-400" />
                <span>{event.venue.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <Users className="text-purple-400" />
            <span>{event.club.name}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-300">
            <Ticket className="text-amber-400" />
            <span>{formatPrice(event.price)}</span>
          </div>
          <div className="text-sm text-zinc-400">
            Мест: {event.tickets?.length || 0} / {event.capacity}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Описание</h2>
          <p className="text-zinc-300 whitespace-pre-wrap">{event.description || 'Описание недоступно'}</p>
        </div>
      </div>
    </div>
  )
}
