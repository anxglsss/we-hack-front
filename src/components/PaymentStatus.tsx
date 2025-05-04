import React, { useEffect } from 'react'
import { usePaymentStore } from '@/stores/payment.store'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import {Icons} from "@/components/ui/icons";
import {Badge} from "@/components/ui/badge";

interface PaymentStatusProps {
    paymentId: number
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ paymentId }) => {
    const { paymentStatus, getPaymentStatus, pollPaymentStatus, isLoading } = usePaymentStore()

    useEffect(() => {
        if (!paymentId) return

        getPaymentStatus(paymentId)
        let polling: NodeJS.Timeout

        if (!paymentStatus || paymentStatus.status === 'pending') {
            polling = setInterval(() => pollPaymentStatus(paymentId), 5000)
        }

        return () => {
            if (polling) clearInterval(polling)
        }
    }, [paymentId, paymentStatus?.status, getPaymentStatus, pollPaymentStatus])

    if (!paymentStatus) {
        return (
            <div className="flex items-center justify-center p-8">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <Card className="space-y-0">
            <CardHeader className="flex items-center justify-between p-4">
                <CardTitle className="text-lg">Payment Status</CardTitle>
                <Badge
                    variant={
                        paymentStatus.status === 'success'
                            ? 'default'
                            : paymentStatus.status === 'failed'
                                ? 'destructive'
                                : 'secondary'
                    }
                >
                    {paymentStatus.status.toUpperCase()}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-2 px-4">
                {paymentStatus.transactionId && (
                    <div className="text-sm">
                        <span className="text-muted-foreground">Transaction ID:</span>{' '}
                        <span className="font-mono">{paymentStatus.transactionId}</span>
                    </div>
                )}
                {paymentStatus.processedAt && (
                    <div className="text-sm">
                        <span className="text-muted-foreground">Processed At:</span>{' '}
                        <span>{new Date(paymentStatus.processedAt).toLocaleString()}</span>
                    </div>
                )}
            </CardContent>

            {paymentStatus.receiptUrl && (
                <CardFooter className="px-4">
                    <Button variant="outline" asChild className="w-full">
                        <a href={paymentStatus.receiptUrl} target="_blank" rel="noopener noreferrer">
                            View Receipt
                        </a>
                    </Button>
                </CardFooter>
            )}

            {isLoading && (
                <CardFooter className="flex items-center justify-center space-x-2 px-4">
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                    <span>Updating status...</span>
                </CardFooter>
            )}
        </Card>
    )
}