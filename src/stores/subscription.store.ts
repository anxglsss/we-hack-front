import { SubscriptionService } from '@/api/services/subscription.service'
import { SubscriptionResponseDto } from '@/types/subscription.types'
import { create } from 'zustand'

interface SubscriptionStore {
  subscriptions: SubscriptionResponseDto[]
  loading: boolean
  error: string | null

  getMySubscriptions: () => Promise<void>
  subscribe: (clubId: number) => Promise<void>
  unsubscribe: (clubId: number) => Promise<void>
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscriptions: [],
  loading: false,
  error: null,

  getMySubscriptions: async () => {
    set({ loading: true, error: null })
    try {
      const data = await SubscriptionService.getMySubscriptions()
      set({ subscriptions: data, loading: false })
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch subscriptions', loading: false })
    }
  },

  subscribe: async (clubId: number) => {
    set({ loading: true, error: null })
    try {
      const newSub = await SubscriptionService.subscribe(clubId)
      set({
        subscriptions: [...get().subscriptions, newSub],
        loading: false,
      })
    } catch (err: any) {
      set({ error: err.message || 'Failed to subscribe', loading: false })
    }
  },

  unsubscribe: async (clubId: number) => {
    set({ loading: true, error: null })
    try {
      await SubscriptionService.unsubscribe(clubId)
      set({
        subscriptions: get().subscriptions.filter((sub) => sub.clubId !== clubId),
        loading: false,
      })
    } catch (err: any) {
      set({ error: err.message || 'Failed to unsubscribe', loading: false })
    }
  },
}))
