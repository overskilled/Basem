"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StarIcon, HeartIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { firestore } from '@/firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Loader from '@/app/Loader'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/context/CheckoutContext'

export default function Component({ params }) {
    const [selectedColor, setSelectedColor] = useState('Black')
    const [selectedSize, setSelectedSize] = useState('M')
    const [quantity, setQuantity] = useState(1)
    const [productInfo, setProductInfo] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const productName = decodeURIComponent(params.name);


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true)
                const q = query(collection(firestore, "product"), where("name", "==", productName));
                const querySnapshot = await getDocs(q);

                // Assuming only one product is returned, or we select the first match
                if (!querySnapshot.empty) {
                    const productData = querySnapshot.docs[0].data();
                    setProductInfo({ ...productData, id: querySnapshot.docs[0].id });
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchProductData();
    }, [productName]);

    const { addToCheckout } = useCheckout(); // Access the context

    const handleCheckout = () => {
        const checkoutProduct = {
            name: productName,
            description: productInfo.description,
            quantity,
            price: productInfo.price,
        };
        addToCheckout(checkoutProduct); // Add product to checkout context
        console.log("clied")
        // Redirect to checkout page (you can use next/router)
        router.push('/dashboard/product/checkout'); // Ensure to import `useRouter` from 'next/router'
    };


    useEffect(() => {
        if (productInfo) {
            console.log("Fetched product info:", productInfo);
        }
    }, [productInfo]);

    const images = [
        productInfo?.imageUrl,
        productInfo?.imageUrl,
        productInfo?.imageUrl,
        productInfo?.imageUrl,
    ]

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const discountedPrice = productInfo?.price * 1.2

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="container mx-auto p-4">
                    {productInfo && (


                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Product Image Gallery */}
                            <div className="lg:w-1/2">
                                <Card className="relative">
                                    <CardContent className="p-2">
                                        <div className="relative aspect-square">
                                            <img
                                                src={images[currentImageIndex]}
                                                alt={`Product Image ${currentImageIndex + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeftIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                                onClick={nextImage}
                                            >
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex mt-4 gap-2 overflow-x-auto">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-20 h-20 object-cover cursor-pointer border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="lg:w-1/2">
                                <h1 className="text-3xl font-bold mb-2">{productName}</h1>
                                <h1 className="text-xl font-meduim mb-2">{productInfo.description}</h1>
                                <div className="flex items-center mb-4">
                                    <div className="flex">
                                        {[...Array(4)].map((_, i) => (
                                            <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                        {[...Array(1)].map((_, i) => (
                                            <StarIcon key={i} className="w-5 h-5 text-gray-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600">4.0 (2 Reviews)</span>
                                    <Badge variant="secondary" className="ml-4">Hot selling</Badge>
                                </div>

                                <div className="mt-4">
                                    <span className="text-3xl font-bold text-gray-900">{productInfo.price} FCFA</span>
                                    <span className="ml-2 text-gray-500 line-through">{discountedPrice} FCFA</span>
                                </div>
                                
                                <div className="space-y-4 mb-6">
                                {/* 
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Color</h3>
                                        <Select value={selectedColor} onValueChange={setSelectedColor}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Black">Black</SelectItem>
                                                <SelectItem value="Gray">Gray</SelectItem>
                                                <SelectItem value="Green">Green</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Size</h3>
                                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="S">S</SelectItem>
                                                <SelectItem value="M">M</SelectItem>
                                                <SelectItem value="L">L</SelectItem>
                                                <SelectItem value="XL">XL</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                        <div className="mt-2 flex items-center">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                -
                                            </Button>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                className="w-20 mx-2 text-center"
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mb-6">
                                    <Button className="flex-1" onClick={handleCheckout}><ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to Cart</Button>
                                    <Button className="flex-1" variant="secondary">Start Order</Button>
                                    <Button variant="outline" size="icon"><HeartIcon className="h-4 w-4" /></Button>
                                </div>

                                <Tabs defaultValue="specifications" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                        <TabsTrigger value="description">Description</TabsTrigger>
                                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="specifications">
                                        <Card>
                                            <CardContent className="p-4 space-y-2">
                                                <div className="flex">
                                                    <span className="font-semibold w-1/3">Material:</span>
                                                    <span>60% cotton, 40% polyester</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-semibold w-1/3">Style:</span>
                                                    <span>Casual</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-semibold w-1/3">Feature:</span>
                                                    <span>Windproof, Warm</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-semibold w-1/3">Season:</span>
                                                    <span>Autumn, Winter</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="description">
                                        <Card>
                                            <CardContent className="p-4">
                                                <p>The Liu Ming Customized Wholesale 2024 Fashion Men Casual Vest is perfect for the modern man who values both style and comfort. Made with a blend of 60% cotton and 40% polyester, this vest offers excellent warmth and windproof properties, making it ideal for autumn and winter wear.</p>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="shipping">
                                        <Card>
                                            <CardContent className="p-4 space-y-2">
                                                <div className="flex items-center">
                                                    <CheckIcon className="text-green-500 mr-2" />
                                                    <span>Free shipping on orders over $500</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <CheckIcon className="text-green-500 mr-2" />
                                                    <span>Estimated delivery: 7-14 business days</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <CheckIcon className="text-green-500 mr-2" />
                                                    <span>Express shipping available at checkout</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}

                    {/* Recommended Products */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">You may also like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <Card key={item} className="overflow-hidden">
                                    <img
                                        src={`/placeholder.svg?height=200&width=200&text=Product ${item}`}
                                        alt={`Recommended Product ${item}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold mb-2">Recommended Product {item}</h3>
                                        <p className="text-sm text-gray-500 mb-2">$2.69 - $4.76</p>
                                        <Badge variant="secondary">10% off</Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}