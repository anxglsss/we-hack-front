// src/stores/event.store.ts
import { EventRequestDto, EventResponseDto, EventReviewDto, EventReviewRequestDto, EventService, TicketDto } from '@/api/services/event.service';
import { toast } from 'sonner';
import { create } from 'zustand';

interface EventState {
  events: EventResponseDto[];
  currentEvent: EventResponseDto | null;
  isLoading: boolean;
  error: string | null;
  
  // Methods
  getAllEvents: () => Promise<void>;
  getEventById: (id: number) => Promise<void>;
  createEvent: (data: EventRequestDto) => Promise<void>;
  updateEvent: (id: number, data: EventRequestDto) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  getEventTickets: (eventId: number) => Promise<TicketDto[]>;
  getEventReviews: (eventId: number) => Promise<EventReviewDto[]>;
  addEventReview: (eventId: number, reviewData: EventReviewRequestDto) => Promise<void>;
  resetCurrentEvent: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,

  async getAllEvents() {
    set({ isLoading: true, error: null });
    try {
      const events = await EventService.getAllEvents();
      set({ events });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch events" });
      toast.error("Failed to fetch events");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async getEventById(id) {
    set({ isLoading: true, error: null });
    try {
      const event = await EventService.getEventById(id);
      set({ currentEvent: event });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch event" });
      toast.error("Failed to fetch event details");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async createEvent(data) {
    set({ isLoading: true, error: null });
    try {
      const newEvent = await EventService.createEvent(data);
      set((state) => ({
        events: [...state.events, newEvent],
        currentEvent: newEvent
      }));
      toast.success("Event created successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to create event" });
      toast.error("Failed to create event");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async updateEvent(id, data) {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await EventService.updateEvent(id, data);
      set((state) => ({
        events: state.events.map(event => 
          event.id === id ? updatedEvent : event
        ),
        currentEvent: updatedEvent
      }));
      toast.success("Event updated successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to update event" });
      toast.error("Failed to update event");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async deleteEvent(id) {
    set({ isLoading: true, error: null });
    try {
      await EventService.deleteEvent(id);
      set((state) => ({
        events: state.events.filter(event => event.id !== id),
        currentEvent: state.currentEvent?.id === id ? null : state.currentEvent
      }));
      toast.success("Event deleted successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to delete event" });
      toast.error("Failed to delete event");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async getEventTickets(eventId) {
    set({ isLoading: true, error: null });
    try {
      const tickets = await EventService.getEventTickets(eventId);
      // Update current event if it's the one we're viewing
      if (get().currentEvent?.id === eventId) {
        set({ currentEvent: { ...(get().currentEvent as EventResponseDto), tickets } });
      }
      return tickets;
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch tickets" });
      toast.error("Failed to fetch event tickets");
      console.error(error);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  async getEventReviews(eventId) {
    set({ isLoading: true, error: null });
    try {
      const reviews = await EventService.getEventReviews(eventId);
      // Update current event if it's the one we're viewing
      if (get().currentEvent?.id === eventId) {
        set({ currentEvent: { ...(get().currentEvent as EventResponseDto), reviews } });
      }
      return reviews;
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch reviews" });
      toast.error("Failed to fetch event reviews");
      console.error(error);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  async addEventReview(eventId, reviewData) {
    set({ isLoading: true, error: null });
    try {
      const newReview = await EventService.addEventReview(eventId, reviewData);
      // Update current event if it's the one we're viewing
      if (get().currentEvent?.id === eventId) {
        set({
          currentEvent: {
            ...(get().currentEvent as EventResponseDto),
            reviews: [...(get().currentEvent?.reviews || []), newReview]
          }
        });
      }
      toast.success("Review added successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to add review" });
      toast.error("Failed to add review");
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  resetCurrentEvent() {
    set({ currentEvent: null });
  }
}));