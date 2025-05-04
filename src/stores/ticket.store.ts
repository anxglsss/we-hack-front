// src/stores/ticket.store.ts
import { TicketService } from "@/api/services/ticket.service";
import { TicketResponseDto } from "@/types/ticket.types";
import { toast } from "sonner";
import { create } from "zustand";

interface TicketState {
  tickets: TicketResponseDto[];
  currentTicket: TicketResponseDto | null;
  isLoading: boolean;
  error: string | null;
  qrCodeImage: string | null;
  
  // Methods
  getUserTickets: () => Promise<void>;
  getTicketById: (id: number) => Promise<void>;
  getTicketQrCode: (id: number) => Promise<void>;
  resetCurrentTicket: () => void;
  clearQrCode: () => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  currentTicket: null,
  isLoading: false,
  error: null,
  qrCodeImage: null,

  async getUserTickets() {
    set({ isLoading: true, error: null });
    try {
      const tickets = await TicketService.getUserTickets();
      set({ tickets });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch tickets" });
      toast.error("Failed to fetch your tickets");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async getTicketById(id) {
    set({ isLoading: true, error: null });
    try {
      const ticket = await TicketService.getTicketById(id);
      set({ currentTicket: ticket });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch ticket" });
      toast.error("Failed to fetch ticket details");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async getTicketQrCode(id) {
    set({ isLoading: true, error: null, qrCodeImage: null });
    try {
      const qrCodeImage = await TicketService.getTicketQrCode(id);
      set({ qrCodeImage });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to generate QR code" });
      toast.error("Failed to generate QR code");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  resetCurrentTicket() {
    set({ currentTicket: null });
  },

  clearQrCode() {
    set({ qrCodeImage: null });
  }
}));