'use client'

import { useTicketStore } from '@/stores/ticket.store'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

export default function TicketsPage() {
  const {
    tickets,
    isLoading,
    getUserTickets,
  } = useTicketStore()

  useEffect(() => {
    getUserTickets()
  }, [getUserTickets])

  return (
    <div className="p-6 text-white min-h-screen bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6">🎟 Мои билеты</h1>

      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center mt-20 text-zinc-400 text-lg">
          У вас пока нет билетов.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className="bg-zinc-800 rounded-xl p-5 shadow-lg border border-zinc-700 hover:border-primary transition-all"
            >
              <h2 className="text-xl font-semibold text-primary mb-2">{ticket.eventTitle}</h2>
              <p className="text-red-300 mb-1"><span className="text-red-400">Дата:</span>{ticket.eventDate}</p>
              <p className="text-zinc-300 mb-3"><span className="text-zinc-400">Срок:</span> {ticket.purchaseDate}</p>
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Билет № {ticket.id}</span>
                <span>{ticket.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
