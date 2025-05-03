'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/tw-merge'
import { useClubStore } from '@/stores/club.store'
import { useEventStore } from '@/stores/event.store'
import { useVenueStore } from '@/stores/venue.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.date({ required_error: 'Date is required' }),
  startTime: z.string().min(1, 'Start time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  venueId: z.string().min(1, 'Venue is required'),
  clubId: z.string().min(1, 'Club is required'),
  price: z.string().min(1, 'Price is required'),
  capacity: z.number().min(1, 'Capacity is required')
    .transform(Number)
    .refine(val => val > 0, 'Capacity must be greater than 0'),
  isOnline: z.boolean().default(false),
  streamingUrl: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isOnline && !data.streamingUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Streaming URL is required for online events',
      path: ['streamingUrl']
    })
  }
})

type EventFormValues = z.infer<typeof eventSchema>

interface CreateEventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateEventModal = ({ open, onOpenChange }: CreateEventModalProps) => {
  const { clubs, getAllClubs } = useClubStore()
  const { venues, fetchVenues } = useVenueStore()
  const { createEvent } = useEventStore()
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      date: undefined,
      startTime: '',
      venueId: '',
      clubId: '',
      price: '',
      capacity: 100,
      isOnline: false,
      streamingUrl: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getAllClubs(), fetchVenues()])
      } catch (error) {
        toast.error('Failed to load data')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (data: EventFormValues) => {
    try {
      const formattedData = {
        ...data,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.startTime,
        price: Number(data.price),
        capacity: Number(data.capacity),
        clubId: Number(data.clubId),
        venueId: Number(data.venueId)
      }
      
      console.log('Creating event with data:', formattedData)
      await createEvent(formattedData)
      
      onOpenChange(false)
      form.reset()
      toast.success('Event created successfully')
    } catch (error) {
      toast.error('Failed to create event')
      console.error('Event creation error:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md py-10 border-none bg-zinc-900 text-white rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Создание события
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white">Название</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите название события"
                      {...field}
                      className="bg-white/10 text-white placeholder:text-white/50 h-10 px-3 rounded-md text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white">Описание</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите описание"
                      {...field}
                      className="bg-white/10 text-white placeholder:text-white/50 h-10 px-3 rounded-md text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm text-white">Дата</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left bg-white/10 hover:bg-white/20 text-white text-sm h-10 px-3 rounded-md',
                              !field.value && 'text-white/50'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value instanceof Date && !isNaN(field.value.getTime())
                              ? format(field.value, 'PPP')
                              : 'Выберите дату'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-zinc-900 text-white border border-zinc-700 rounded-md">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="bg-zinc-900 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">Время начала</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="bg-white/10 text-white placeholder:text-white/50 h-10 px-3 rounded-md text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clubId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">Клуб</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 text-white h-10 px-3 rounded-md text-sm">
                          <SelectValue placeholder="Выберите клуб" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 text-white border border-zinc-700">
                        {clubs?.map((club) => (
                          <SelectItem key={club.id} value={club.id.toString()}>
                            {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="venueId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">Место</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 text-white h-10 px-3 rounded-md text-sm">
                          <SelectValue placeholder="Выберите место" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 text-white border border-zinc-700">
                        {venues?.map((venue: any) => (
                          <SelectItem key={venue.id} value={venue.id.toString()}>
                            {venue.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">Цена билета (KZT)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Введите цену билета"
                        {...field}
                        className="bg-white/10 text-white placeholder:text-white/50 h-10 px-3 rounded-md text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">Вместимость</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Введите количество мест"
                        {...field}
                        className="bg-white/10 text-white placeholder:text-white/50 h-10 px-3 rounded-md text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isOnline"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-5 h-5 bg-white/10 text-white"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-white">Событие онлайн</FormLabel>
                </FormItem>
              )}
            />

            {form.watch('isOnline') && (
              <FormField
                control={form.control}
                name="streamingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">URL потока</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите URL для трансляции"
                        {...field}
                        className="bg-white/10 text-white placeholder:text-white/50 h-10 px-3 rounded-md text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
              >
                Создать событие
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}