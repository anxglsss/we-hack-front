'use client'

import { ClubService } from '@/api/services/club.service'
import { OrganizerRequestService } from '@/api/services/organizer-request.service'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const eventSchema = z.object({
  club: z.string().min(1, 'Клуб обязателен для выбора'),
})

type OrganizerFormValues = z.infer<typeof eventSchema>

interface OrganizerRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Club {
  id: number
  name: string
}

export const OrganizerRequestModal = ({ open, onOpenChange }: OrganizerRequestModalProps) => {
  const form = useForm<OrganizerFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      club: '',
    },
  })

  const [clubs, setClubs] = useState<Club[]>([])
  const [loadingClubs, setLoadingClubs] = useState(false)

  useEffect(() => {
    if (!open) return
    const fetchClubs = async () => {
      setLoadingClubs(true)
      try {
        const response = await ClubService.getAllClubs()
        setClubs(response)
      } catch (err) {
        console.error(err)
        toast.error('Не удалось загрузить клубы')
      } finally {
        setLoadingClubs(false)
      }
    }

    fetchClubs()
  }, [open])

  const onSubmit = async (data: OrganizerFormValues) => {
    try {
      const clubId = Number(data.club)
      const loadingToast = toast.loading('Отправка запроса...')
      await OrganizerRequestService.submitRequest({ clubId })
      toast.success('Запрос успешно отправлен!', { id: loadingToast })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error)
      toast.error('Не удалось отправить запрос', {
        description: error instanceof Error ? error.message : 'Попробуйте позже',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md py-10 border-none bg-zinc-900 text-white rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Запрос на организацию
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="club"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white">Выберите клуб</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={form.formState.isSubmitting || loadingClubs}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-white/10 text-white h-10 px-3 rounded-md text-sm">
                        <SelectValue placeholder="Выберите клуб" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full bg-zinc-800 text-white border border-zinc-700">
                      {clubs.map((club) => (
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

            <div className="pt-2">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-11 rounded-lg text-white text-sm font-medium"
              >
                {form.formState.isSubmitting ? 'Отправка...' : 'Отправить запрос'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
