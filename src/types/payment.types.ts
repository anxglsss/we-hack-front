export interface PaymentRequestDTO {
    orderId: number;
    paymentMethod: string;
    currency: string;
    userId: number;    // Added required field
    amount: number;    // Added required field
}

export interface PaymentResponseDTO {
    id: number;
    orderId: number;
    userId: number;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: 'pending' | 'success' | 'failed';
    paymentUrl: string;
    createdAt: string;
}

export interface PaymentStatusResponseDTO {
    status: string;
    transactionId: string;
    processedAt: string | null;
    receiptUrl: string | null;
}