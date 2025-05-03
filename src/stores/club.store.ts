// src/stores/club.store.ts
import { ClubService } from "@/api/services/club.service";
import { ClubEventDto, ClubRequestDto, ClubResponseDto } from "@/types/club.types";
import { toast } from "sonner";
import { create } from "zustand";

interface ClubState {
  clubs: ClubResponseDto[];
  currentClub: ClubResponseDto | null;
  isLoading: boolean;
  error: string | null;
  
  // Methods
  getAllClubs: () => Promise<void>;
  getClubById: (id: number) => Promise<void>;
  createClub: (data: ClubRequestDto) => Promise<void>;
  updateClub: (id: number, data: ClubRequestDto) => Promise<void>;
  deleteClub: (id: number) => Promise<void>;
  getClubEvents: (clubId: number) => Promise<ClubEventDto[]>;
  resetCurrentClub: () => void;
}

export const useClubStore = create<ClubState>((set) => ({
  clubs: [],
  currentClub: null,
  isLoading: false,
  error: null,

  async getAllClubs() {
    set({ isLoading: true, error: null });
    try {
      const clubs = await ClubService.getAllClubs();
      set({ clubs });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch clubs" });
      toast.error("Failed to fetch clubs");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async getClubById(id) {
    set({ isLoading: true, error: null });
    try {
      const club = await ClubService.getClubById(id);
      set({ currentClub: club });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch club" });
      toast.error("Failed to fetch club details");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async createClub(data) {
    set({ isLoading: true, error: null });
    try {
      const newClub = await ClubService.createClub(data);
      set((state) => ({
        clubs: [...state.clubs, newClub],
        currentClub: newClub
      }));
      toast.success("Club created successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to create club" });
      toast.error("Failed to create club");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async updateClub(id, data) {
    set({ isLoading: true, error: null });
    try {
      const updatedClub = await ClubService.updateClub(id, data);
      set((state) => ({
        clubs: state.clubs.map(club => 
          club.id === id ? updatedClub : club
        ),
        currentClub: updatedClub
      }));
      toast.success("Club updated successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to update club" });
      toast.error("Failed to update club");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async deleteClub(id) {
    set({ isLoading: true, error: null });
    try {
      await ClubService.deleteClub(id);
      set((state) => ({
        clubs: state.clubs.filter(club => club.id !== id),
        currentClub: null
      }));
      toast.success("Club deleted successfully");
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to delete club" });
      toast.error("Failed to delete club");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async getClubEvents(clubId) {
    set({ isLoading: true, error: null });
    try {
      const events = await ClubService.getClubEvents(clubId);
      return events;
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch club events" });
      toast.error("Failed to fetch club events");
      console.error(error);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  resetCurrentClub() {
    set({ currentClub: null });
  }
}));