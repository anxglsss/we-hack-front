// Define types based on your backend DTOs
export interface ClubRequestDto {
  name: string;           // [0, 255] characters
  description: string;
}

export interface ReviewDto {
  id: number;
  rating: number;
  comment: string;
}

export interface SubscriberDto {
  id: number;
  username: string;
}

export interface ClubEventDto {
  id: number;
  title: string;
  date: string;  // date-time format
}

export interface ClubResponseDto {
  id: number;
  name: string;
  description: string;
  createdAt: string;  // date-time format
  events: ClubEventDto[];
  reviews: ReviewDto[];
  subscribers: SubscriberDto[];
}