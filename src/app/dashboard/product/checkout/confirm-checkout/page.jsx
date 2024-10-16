import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"

export default function CheckoutConfirmationPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
                <p className="text-gray-600 mb-6">Order number: #12345</p>
                <div className="space-y-4">
                    <Button asChild className="w-full">
                        <Link href="/order-status">View Order Status</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}