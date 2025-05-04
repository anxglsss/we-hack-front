import {PaymentRequestDTO, PaymentResponseDTO, PaymentStatusResponseDTO} from "@/types/payment.types";
import {axiosInstance} from "@/api/axios-instance";


export const PaymentService = {
    async initiatePayment(request: PaymentRequestDTO): Promise<PaymentResponseDTO> {
        try {
            const response = await axiosInstance.post<PaymentResponseDTO>(
                '/payments',
                request
            );
            return response.data;
        } catch (error) {
            console.error('Payment initiation failed:', error);
            throw error;
        }
    },

    async getPaymentStatus(paymentId: number): Promise<PaymentStatusResponseDTO> {
        try {
            const response = await axiosInstance.get<PaymentStatusResponseDTO>(
                `/payments/${paymentId}/status`
            );
            return response.data;
        } catch (error) {
            console.error('Failed to get payment status:', error);
            throw error;
        }
    },

    async pollPaymentStatus(
        paymentId: number,
        interval = 3000,
        maxAttempts = 20
    ): Promise<PaymentStatusResponseDTO> {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const checkStatus = async () => {
                try {
                    const status = await this.getPaymentStatus(paymentId);

                    if (status.status !== 'pending' || attempts >= maxAttempts) {
                        resolve(status);
                    } else {
                        attempts++;
                        setTimeout(checkStatus, interval);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            checkStatus();
        });
    }
};