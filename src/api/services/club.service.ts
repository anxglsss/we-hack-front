// src/api/services/club.service.ts
import { axiosInstance } from '@/api/axios-instance';
import { ClubEventDto, ClubRequestDto, ClubResponseDto } from '@/types/club.types';
import { AxiosResponse } from 'axios';

export class ClubService {
  private static readonly BASE_URL = '/clubs';

  /**
   * Get all clubs (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async getAllClubs(): Promise<ClubResponseDto[]> {
    const response: AxiosResponse<ClubResponseDto[]> = await axiosInstance.get(this.BASE_URL);
    return response.data;
  }

  /**
   * Get club by ID (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async getClubById(id: number): Promise<ClubResponseDto> {
    const response: AxiosResponse<ClubResponseDto> = await axiosInstance.get(
      `${this.BASE_URL}/${id}`
    );
    return response.data;
  }

  /**
   * Create new club (ADMIN role required)
   */
  static async createClub(clubData: ClubRequestDto): Promise<ClubResponseDto> {
    const response: AxiosResponse<ClubResponseDto> = await axiosInstance.post(
      this.BASE_URL, 
      clubData
    );
    return response.data;
  }

  /**
   * Update club (ADMIN role required)
   */
  static async updateClub(
    id: number, 
    clubData: ClubRequestDto
  ): Promise<ClubResponseDto> {
    const response: AxiosResponse<ClubResponseDto> = await axiosInstance.put(
      `${this.BASE_URL}/${id}`, 
      clubData
    );
    return response.data;
  }

  /**
   * Delete club (ADMIN role required)
   */
  static async deleteClub(id: number): Promise<void> {
    await axiosInstance.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Get club events (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async getClubEvents(clubId: number): Promise<ClubEventDto[]> {
    const response: AxiosResponse<ClubEventDto[]> = await axiosInstance.get(
      `${this.BASE_URL}/${clubId}/events`
    );
    return response.data;
  }
}