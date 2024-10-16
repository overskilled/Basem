import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronDown, Heart, LogOut, Mail, Phone, Search, Settings, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const [signOut, logOutLoading, logOutError] = useSignOut(auth);
    const router = useRouter()
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // This will run only in the browser, not during SSR
        const userInfo = localStorage.getItem('user-info');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setUserName(parsedUserInfo.name);
        }
    }, []);


    const GoToRegister = () => {
        router.push('/register')
    }

    const GoToLogin = () => {
        router.push('/login')
    }

    const GoDashboard = () => {
        router.push('/dashboard')
    }

    const onLogOut = async () => {

        try {
            await signOut()

            console.log("logout successful")
        } catch (error) {
            console.log("An error occured while loging out: ", error.message)
        }
    }

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center"><Phone className="h-4 w-4 mr-2" />+237 680 46 25 09</span>
                    <span className="flex items-center"><Mail className="h-4 w-4 mr-2" />contact@basem.com</span>
                </div>
                <nav className="flex items-center space-x-4">
                    <Link href="/delivery">Delivery</Link>
                    <Link href="/about">About us</Link>
                    <Link href="/contact">Contact us</Link>
                    <Link href="/blog">Blog</Link>
                    <Select defaultValue="xaf">
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="XAF" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="xaf">XAF</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                        </SelectContent>
                    </Select>
                </nav>
            </div>
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Image width={150} height={150} src={"/basem_logo_chop.png"} alt='logo' onClick={() => {GoDashboard}} />
                    <span className="text-sm">Buy and selam easy market</span>
                </Link>
                <div className="flex-1 max-w-xl mx-4">
                    <div className="relative">
                        <Input type="search" placeholder="Search" className="w-full pl-10" />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost">
                        <Heart className="h-5 w-5 mr-2" />
                        Wishlist
                    </Button>
                    <Button variant="ghost">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Cart (0)
                    </Button>
                    {!user ? (
                        <>
                            <div className="flex gap-x-2">
                                <Button variant="secondary" onClick={GoToLogin}>Login</Button>
                                <Button onClick={GoToRegister}>Register</Button>
                            </div>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-2">
                                    <img
                                        src="/avatar.jpeg"
                                        alt="User"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <div className="text-left">
                                        <div className="text-sm font-medium">{userName}</div>
                                    </div>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>My Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onLogOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
            <nav className="bg-green-400 text-primary-foreground">
                <div className="container mx-auto px-4 py-2 flex items-center space-x-4">
                    <Button variant="secondary" className="flex items-center">
                        Shop by Collection
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Link href="/collection" className="hover:underline">Collection</Link>
                    <Link href="/product" className="hover:underline">Product</Link>
                </div>
            </nav>
        </header>)
}

export default Header