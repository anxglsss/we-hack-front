import { VenueResponseDto, VenueService } from '@/api/services/venue.service'
import { create } from 'zustand'

interface VenueStoreState {
  venues: VenueResponseDto[]
  isLoading: boolean
  error: string | null
  fetchVenues: () => Promise<void>
}

export const useVenueStore = create<VenueStoreState>((set) => ({
  venues: [],
  isLoading: false,
  error: null,

  fetchVenues: async () => {
    set({ isLoading: true, error: null })

    try {
      const data = await VenueService.getAllVenues()
      set({ venues: data, isLoading: false })
    } catch (err: any) {
      set({ error: err?.message || 'Failed to load venues', isLoading: false })
    }
  },
}))
