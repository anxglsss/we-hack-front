// src/types/ticket.types.ts
export interface TicketResponseDto {
  id: number;
  eventId: number;
  userId: number;
  purchaseDate: string;
  isUsed: boolean;
  eventTitle: string;
  eventDate: string;
  price: number;
}

// For API service methods
export interface QrCodeResponse {
  imageData: string; // Base64 encoded image
}