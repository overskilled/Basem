"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, ChevronDown, Search, Heart, ShoppingCart, ChevronRight, ChevronLeft, Container, TabletSmartphone, Headset } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Header from '@/components/Dashboard/Header'
import Categorie from '@/components/Dashboard/Categorie'
import Footer from '@/components/Dashboard/Footer'
import ProductList from '@/components/Dashboard/ProductList'
import SupplierPage from '@/components/Dashboard/Supplier'

const carousel = [
    {
        title: "Cheap shoes",
        image: "/shoe.png",
    },
    {
        title: "Quality shirts",
        image: "/shoe.png",
    },
    {
        title: "Affortable opportunities",
        image: "/shoe.png",
    },
]

export default function Homepage() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )






    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex">
                    <aside className="w-64 mr-8">
                        {/* Product categories list  */}
                        <Categorie />
                    </aside>
                    <div className="flex-1">
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full max-w-4xl"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent >
                                {carousel.map((item, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <div className="rounded-lg bg-red-400 overflow-hidden" >
                                                <div className="p-8 flex justify-between items-center">
                                                    <CardContent className="flex items-center justify-center p-2">
                                                        <div className="text-white">
                                                            <p className="text-sm mb-2">Limited time</p>
                                                            <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                                                            <Button variant="secondary">Shop now</Button>
                                                        </div>
                                                        <Image
                                                            src={item.image}
                                                            alt="Smartwatch"
                                                            width={500}
                                                            height={500}
                                                            className="object-contain"
                                                        />
                                                    </CardContent>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>

                <section className="py-8 bg-gray-100">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Container className="h-6 w-6" />
                            <span>Find the most raliable suppliers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TabletSmartphone className="h-6 w-6" />
                            <span>Local mobile payment method (OM & MOMO)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Headset className="h-6 w-6" />
                            <span>Active 24/7 customer support</span>
                        </div>
                    </div>
                </section>

                {/* <section className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-6">Our Featured Offers</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="p-4">
                                    <Image src="/placeholder.svg" alt="Samsung Galaxy" width={300} height={200} className="w-full object-cover mb-4" />
                                    <h3 className="font-bold mb-2">Save $300 on Samsung Galaxy S10, S10+ or Note9</h3>
                                    <p className="text-sm text-gray-600">The award-winning smartphone with enhanced functionality, powerful camera, and stunning display.</p>
                                </CardContent>
                                <CardFooter>
                                    <Link href="#" className="text-primary hover:underline">See the Samsung Galaxy</Link>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <Image src="/placeholder.svg" alt="Women's Dresses" width={300} height={200} className="w-full object-cover mb-4" />
                                    <h3 className="font-bold mb-2">Save 10% on Women's Dresses</h3>
                                    <p className="text-sm text-gray-600">Explore the new collection of women's dresses and refresh your look.</p>
                                </CardContent>
                                <CardFooter>
                                    <Link href="#" className="text-primary hover:underline">See the Women's Dresses</Link>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <Image src="/placeholder.svg" alt="Today's Deals" width={300} height={200} className="w-full object-cover mb-4" />
                                    <h3 className="font-bold mb-2">Shop Today's Deals, Lightning Deals</h3>
                                    <p className="text-sm text-gray-600">The best ceiling lights, chandeliers, pendant lights, flush-mount, island lights, wall lights, lamps are available.</p>
                                </CardContent>
                                <CardFooter>
                                    <Link href="#" className="text-primary hover:underline">See Today's Deals</Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section> */}

                <SupplierPage />

                <ProductList />

                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Deal Of The Week</h2>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <Card key={item}>
                                    <CardContent className="p-4">
                                        <Badge className="mb-2">-17%</Badge>
                                        <Image src="/placeholder.svg" alt="Product" width={200} height={200} className="w-full object-cover mb-4" />
                                        <h3 className="font-semibold mb-2">Torba Product</h3>
                                        <p className="text-primary font-bold">$150.00 <span className="text-gray-400 line-through">$180.00</span></p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Add to cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Best Sellers</h2>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Card key={item}>
                                    <CardContent className="p-4">
                                        <Badge className="mb-2">New</Badge>
                                        <Image src="/placeholder.svg" alt="Product" width={200} height={200} className="w-full object-cover mb-4" />
                                        <h3 className="font-semibold mb-2">Torba Display Full HD IPS</h3>
                                        <p className="text-primary font-bold">$1,800.00</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Add to cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto px-4 grid grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-0">
                                <Image src="/placeholder.svg" alt="10% off" width={600} height={300} className="w-full object-cover" />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-0">
                                <Image src="/placeholder.svg" alt="Deal of the Day" width={600} height={300} className="w-full object-cover" />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Popular Categories</h2>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                                <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Card key={item}>
                                    <CardContent className="p-4 text-center">
                                        <Image src="/placeholder.svg" alt="Category" width={100} height={100} className="mx-auto mb-4" />
                                        <h3 className="font-semibold">Category Name</h3>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main >


        </div >
    )
}