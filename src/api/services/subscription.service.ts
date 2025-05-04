import { axiosInstance } from '@/api/axios-instance'
import { SubscriptionResponseDto } from '@/types/subscription.types'
import { AxiosResponse } from 'axios'

export class SubscriptionService {
  private static readonly BASE_URL = '/subscriptions'

  /**
   * Subscribe to a club (STUDENT role required)
   * @param clubId - ID of the club to subscribe to
   */
  static async subscribe(clubId: number): Promise<SubscriptionResponseDto> {
    const response: AxiosResponse<SubscriptionResponseDto> = await axiosInstance.post(
      `${this.BASE_URL}/${clubId}`
    )
    return response.data
  }

  /**
   * Unsubscribe from a club (STUDENT role required)
   * @param clubId - ID of the club to unsubscribe from
   */
  static async unsubscribe(clubId: number): Promise<void> {
    await axiosInstance.delete(`${this.BASE_URL}/${clubId}`)
  }

  /**
   * Get current user's subscriptions (STUDENT role required)
   */
  static async getMySubscriptions(): Promise<SubscriptionResponseDto[]> {
    const response: AxiosResponse<SubscriptionResponseDto[]> = await axiosInstance.get(
      `${this.BASE_URL}/my`
    )
    return response.data
  }
}
