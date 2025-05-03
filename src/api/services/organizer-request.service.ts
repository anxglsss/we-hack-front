// src/api/services/organizer-request.service.ts
import { axiosInstance } from '@/api/axios-instance';
import { AxiosResponse } from 'axios';

// Define types based on your backend DTOs
export interface OrganizerRequestDto {
  clubId: number;
}

export interface OrganizerRequest {
  id: number;
  clubId: number;
  userId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Adjust based on your Status enum
  createdAt: string;
  updatedAt: string;
}

export class OrganizerRequestService {
  private static readonly BASE_URL = '/organizer-requests';

  /**
   * Submit a new organizer request (STUDENT role required)
   */
  static async submitRequest(data: OrganizerRequestDto): Promise<void> {
    await axiosInstance.post(this.BASE_URL, data);
  }

  /**
   * Get all organizer requests (ADMIN role required)
   */
  static async getAllRequests(): Promise<OrganizerRequest[]> {
    const response: AxiosResponse<OrganizerRequest[]> = await axiosInstance.get(this.BASE_URL);
    return response.data;
  }

  /**
   * Update request status (ADMIN role required)
   * @param id Request ID
   * @param status New status ('PENDING', 'APPROVED', or 'REJECTED')
   */
  static async updateRequestStatus(id: number, status: string): Promise<void> {
    await axiosInstance.put(`${this.BASE_URL}/${id}`, null, {
      params: { status }
    });
  }
}