// src/stores/payment.store.ts
import { create } from 'zustand';

import { toast } from 'sonner';
import {PaymentRequestDTO, PaymentResponseDTO, PaymentStatusResponseDTO} from "@/types/payment.types";
import {PaymentService} from "@/api/services/payment.service";

interface PaymentState {
    payments: PaymentResponseDTO[];
    currentPayment: PaymentResponseDTO | null;
    paymentStatus: PaymentStatusResponseDTO | null;
    isLoading: boolean;
    error: string | null;

    // Methods
    initiatePayment: (data: PaymentRequestDTO) => Promise<PaymentResponseDTO>;
    getPaymentStatus: (paymentId: number) => Promise<void>;
    pollPaymentStatus: (paymentId: number) => Promise<void>;
    resetCurrentPayment: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
    payments: [],
    currentPayment: null,
    paymentStatus: null,
    isLoading: false,
    error: null,

    async initiatePayment(data): Promise<PaymentResponseDTO> {
        set({ isLoading: true, error: null });
        try {
            const payment = await PaymentService.initiatePayment(data);
            set({
                currentPayment: payment,
                payments: [...this.payments, payment]
            });

            // Redirect to payment URL if available
            if (payment.paymentUrl) {
                window.location.href = payment.paymentUrl;
            }

            toast.success('Payment initiated successfully');
            return payment;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to initiate payment';
            set({ error: errorMessage });
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    async getPaymentStatus(paymentId) {
        set({ isLoading: true, error: null });
        try {
            const status = await PaymentService.getPaymentStatus(paymentId);
            set({ paymentStatus: status });

            if (status.status === 'success') {
                toast.success('Payment completed successfully');
            } else if (status.status === 'failed') {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to get payment status';
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    async pollPaymentStatus(paymentId) {
        set({ isLoading: true, error: null });
        try {
            const status = await PaymentService.pollPaymentStatus(paymentId);
            set({ paymentStatus: status });

            if (status.status === 'success') {
                toast.success('Payment completed successfully');
            } else if (status.status === 'failed') {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to poll payment status';
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    resetCurrentPayment() {
        set({
            currentPayment: null,
            paymentStatus: null
        });
    }
}));