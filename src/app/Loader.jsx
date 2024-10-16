"use client"

import React, { useEffect, useState } from 'react'
import { ShoppingCart, Package, Shirt, Laptop, Coffee } from 'lucide-react'
import Image from 'next/image'

export default function Loader() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = oldProgress + 1
                if (newProgress === 100) {
                    clearInterval(timer)
                }
                return newProgress
            })
        }, 30)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const icons = [Package, Shirt, Laptop, Coffee]

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-green-50">
            <div className="relative w-64 h-64">
                {/* Trail of product icons */}
                <div className="flex items-center justify-center">
                    <Image width={200} height={200} src={"/basem_logo.png"} alt='logo' />
                </div>
                {[...Array(20)].map((_, index) => {
                    const Icon = icons[index % icons.length]
                    const delay = index * 0.1
                    return (
                        <Icon
                            key={index}
                            className="absolute text-black animate-float p-2"
                            style={{
                                left: `${(index / 20) * 100}%`,
                                animationDelay: `${delay}s`,
                            }}
                            size={30}
                        />
                    )
                })}

                {/* Shopping cart */}
                <div
                    className="absolute bottom-0 left-0 text-black animate-cart-move"
                    style={{
                        left: `${progress}%`,
                    }}
                >
                    <ShoppingCart size={32} />
                </div>

                {/* Loading text */}
                {/* <div className="absolute -bottom-16 left-0 right-0 text-center text-black text-2xl font-bold">
                    Loading...
                </div> */}
            </div>
        </div>
    )
}