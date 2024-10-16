"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCheckout } from '@/context/CheckoutContext'

const product = {
    name: "Detergent",
    price: 3500,
    quantity: 2,
}

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('mtn-momo')
    const { checkoutItems } = useCheckout();
    const [formData, setFormData] = useState({
        name: '',
        number: '',
    })
    const router = useRouter()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real application, you would process the payment here
        console.log(checkoutItems.name)
        router.push('./checkout/confirm-checkout')
    }

    const totalAmount = product.price * product.quantity

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Checkout</CardTitle>
                        <CardDescription className="text-center">Complete your purchase</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                                <div className="flex justify-between items-center mb-2">
                                    <span>{product.name}</span>
                                    <span>x{product.quantity}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold">
                                    <span>Total</span>
                                    <span>{totalAmount.toFixed(2)} FCFA</span>
                                </div>
                            </div>
                            {checkoutItems.length === 0 ? (
                                <p>No items in the checkout.</p>
                            ) : (
                                <div>
                                    {checkoutItems.map((item, index) => (
                                        <div key={index} className="flex justify-between mb-2">
                                            <div>{item.name} ({item.size}, {item.color})</div>
                                            <div>{item.quantity} x {item.price} FCFA</div>
                                        </div>
                                    ))}
                                    <Button onClick={handlePayment}>Proceed to Payment</Button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="mtn-momo">
                                            <div className="flex items-center">
                                                <Image src="/momo.jpeg" alt="MTN MoMo" width={24} height={24} className="mr-2" />
                                                MTN MoMo
                                            </div>
                                        </TabsTrigger>
                                        <TabsTrigger value="orange-money">
                                            <div className="flex items-center">
                                                <Image src="/orange.jpeg" alt="Orange Money" width={24} height={24} className="mr-2" />
                                                Orange Money
                                            </div>
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="mtn-momo">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>MTN Mobile Money</CardTitle>
                                                <CardDescription>Pay using your MTN MoMo account</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div>
                                                    <Label htmlFor="mtn-name">Name</Label>
                                                    <Input
                                                        id="mtn-name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="mtn-number">Mobile Number</Label>
                                                    <Input
                                                        id="mtn-number"
                                                        name="number"
                                                        type="tel"
                                                        value={formData.number}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="orange-money">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Orange Money</CardTitle>
                                                <CardDescription>Pay using your Orange Money account</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div>
                                                    <Label htmlFor="orange-name">Name</Label>
                                                    <Input
                                                        id="orange-name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="orange-number">Mobile Number</Label>
                                                    <Input
                                                        id="orange-number"
                                                        name="number"
                                                        type="tel"
                                                        value={formData.number}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>

                                <Button type="submit" className="w-full mt-6">Pay {totalAmount.toFixed(2)} FCFA</Button>
                            </form>
                        </div>
                    </CardContent>
                    <CardFooter className="text-center text-sm text-gray-500">
                        Your payment information is securely processed
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}