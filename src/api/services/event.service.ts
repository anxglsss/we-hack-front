// src/api/services/event.service.ts
import { axiosInstance } from '@/api/axios-instance';
import { AxiosResponse } from 'axios';

// Define types based on your backend DTOs
export interface EventRequestDto {
  clubId: number;
  venueId: number;
  title: string;           // [0, 255] characters
  description: string;
  date: string;            // date format
  time: string;            // matches ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$
  isOnline: boolean;
  streamingUrl?: string;
  price: number;
  capacity: number;
  totalCapacity: number;
}

export interface TicketDto {
  id: number;
  qrCode: string;
  status: string;
}

export interface EventReviewDto {
  id: number;
  rating: number;
  comment: string;
  author: {
    id: number;
    username: string;
  };
}

export interface EventResponseDto {
  id: number;
  club: {
    id: number;
    name: string;
  };
  venue: {
    id: number;
    name: string;
  };
  title: string;
  description: string;
  date: string;            // date format
  time: string;            // time format
  isOnline: boolean;
  streamingUrl?: string;
  price: number;
  capacity: number;
  totalCapacity: number;
  createdAt: string;       // date-time format
  tickets: TicketDto[];
  reviews: EventReviewDto[];
}

export interface EventReviewRequestDto {
  rating: number;
  comment: string;
}

export class EventService {
  private static readonly BASE_URL = '/events';

  /**
   * Get all events (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async getAllEvents(): Promise<EventResponseDto[]> {
    const response: AxiosResponse<EventResponseDto[]> = await axiosInstance.get(this.BASE_URL);
    return response.data;
  }

  /**
   * Get event by ID (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async getEventById(id: number): Promise<EventResponseDto> {
    const response: AxiosResponse<EventResponseDto> = await axiosInstance.get(
      `${this.BASE_URL}/${id}`
    );
    return response.data;
  }

  /**
   * Create new event (CLUB_MANAGER, ADMIN roles required)
   */
  static async createEvent(eventData: EventRequestDto): Promise<EventResponseDto> {
    const response: AxiosResponse<EventResponseDto> = await axiosInstance.post(
      this.BASE_URL, 
      eventData
    );
    return response.data;
  }

  /**
   * Update event (CLUB_MANAGER, ADMIN roles required)
   */
  static async updateEvent(
    id: number, 
    eventData: EventRequestDto
  ): Promise<EventResponseDto> {
    const response: AxiosResponse<EventResponseDto> = await axiosInstance.put(
      `${this.BASE_URL}/${id}`, 
      eventData
    );
    return response.data;
  }

  /**
   * Delete event (CLUB_MANAGER, ADMIN roles required)
   */
  static async deleteEvent(id: number): Promise<void> {
    await axiosInstance.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Get event tickets (CLUB_MANAGER, ADMIN roles required)
   */
  static async getEventTickets(eventId: number): Promise<TicketDto[]> {
    const response: AxiosResponse<TicketDto[]> = await axiosInstance.get(
      `${this.BASE_URL}/${eventId}/tickets`
    );
    return response.data;
  }

  /**
   * Get event reviews (Public access)
   */
  static async getEventReviews(eventId: number): Promise<EventReviewDto[]> {
    const response: AxiosResponse<EventReviewDto[]> = await axiosInstance.get(
      `${this.BASE_URL}/${eventId}/reviews`
    );
    return response.data;
  }

  /**
   * Add event review (STUDENT role required)
   */
  static async addEventReview(
    eventId: number,
    reviewData: EventReviewRequestDto
  ): Promise<EventReviewDto> {
    const response: AxiosResponse<EventReviewDto> = await axiosInstance.post(
      `${this.BASE_URL}/${eventId}/reviews`,
      reviewData
    );
    return response.data;
  }

  /**
   * Filter events by type or specific date (STUDENT, CLUB_MANAGER, ADMIN roles allowed)
   */
  static async filterEvents(
    filterType?: 'today' | 'thisWeek' | 'nextWeek' | 'thisMonth',
    specificDate?: string // ISO date string: 'YYYY-MM-DD'
  ): Promise<EventResponseDto[]> {
    const params: Record<string, string> = {};
    if (filterType) params.filterType = filterType;
    if (specificDate) params.specificDate = specificDate;

    const response: AxiosResponse<EventResponseDto[]> = await axiosInstance.get(
      `${this.BASE_URL}/filter`,
      { params }
    );
    return response.data;
  }
}