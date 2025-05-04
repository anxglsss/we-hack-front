import React, { useState } from 'react';
import { usePaymentStore } from '@/stores/payment.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {PaymentRequestDTO} from "@/types/payment.types";

export const PaymentForm = ({ orderId }: { orderId: number }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const { initiatePayment, isLoading } = usePaymentStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const paymentRequest: PaymentRequestDTO = {
            orderId,
            paymentMethod,
            currency: 'USD' // or get from order
        };

        await initiatePayment(paymentRequest);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="wallet">Digital Wallet</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Processing...' : 'Pay Now'}
            </Button>
        </form>
    );
};