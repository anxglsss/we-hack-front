// src/api/services/venue.service.ts
import { axiosInstance } from '@/api/axios-instance';
import { AxiosResponse } from 'axios';

// Define types based on your backend DTOs
export interface VenueResponseDto {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description: string
}

export class VenueService {
  private static readonly BASE_URL = '/halls';

  /**
   * Get all venues (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async getAllVenues(): Promise<VenueResponseDto[]> {
    const response: AxiosResponse<VenueResponseDto[]> = await axiosInstance.get(this.BASE_URL);
    return response.data;
  }
}