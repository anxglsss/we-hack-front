// src/api/services/ticket.service.ts
import { axiosInstance } from '@/api/axios-instance';
import { TicketResponseDto } from '@/types/ticket.types';

export const TicketService = {
  async getUserTickets(): Promise<TicketResponseDto[]> {
    const response = await axiosInstance.get('/api/tickets');
    return response.data;
  },

  async getTicketById(id: number): Promise<TicketResponseDto> {
    const response = await axiosInstance.get(`/api/tickets/${id}`);
    return response.data;
  },

  async getTicketQrCode(id: number): Promise<string> {
    const response = await axiosInstance.get(`/api/tickets/${id}/qr`, {
      responseType: 'arraybuffer'
    });
    
    // Convert arraybuffer to base64
    const base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    
    return `data:image/png;base64,${base64}`;
  }
};