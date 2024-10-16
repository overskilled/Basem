"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { firestore } from '@/firebase/config'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/navigation'

const ProductList = () => {
    const router = useRouter()
    const [products, loading, error] = useCollection(
        collection(firestore, 'product'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const GoToProduct = (name) => {
        router.push(`./dashboard/product/${name}`)
    }


    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Most-Viewed Items</h2>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {products?.docs
                        .sort(() => Math.random() - 0.5) // Randomize the array
                        .slice(0, 6) // Select the first 6 products
                        .map((product) => {
                            // Capitalize the product name
                            const productName = product.data().name;
                            const capitalizedProductName = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();

                            return (
                                <Card key={product.id}>
                                    <CardContent className="p-4">
                                        <Badge className="mb-2">New</Badge>

                                        {/* Image Wrapper with fixed width and height */}
                                        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
                                            <Image
                                                src={product.data().imageUrl}
                                                alt="Product"
                                                width={200}
                                                height={200}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>

                                        {/* Capitalized product name */}
                                        <h3 className="font-semibold mb-2">{capitalizedProductName}</h3>
                                        <p className="text-primary font-bold">{product.data().price} FCFA</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full bg-green-500 hover:bg-green-400" onClick={() => GoToProduct(product.data().name)}>view</Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}


                </div>
            </div>
        </section>
    )
}

export default ProductList