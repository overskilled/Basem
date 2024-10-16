"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import Image from 'next/image'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState(null)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [authUser, authLoading] = useAuthState(auth);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        // If the user is already logged in, redirect to dashboard
        if (!authLoading && authUser) {
            router.push('/dashboard');
        }
    }, [authUser, authLoading, router]);

    useEffect(() => {
        // Once a new user is created, redirect to dashboard
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setErrors('Please Fill all fields')
        }

        try {

            const userInfo = await signInWithEmailAndPassword(formData.email, formData.password)

            

            if (userInfo) {
                const docRef = doc(firestore, "users", userInfo.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
            }

            if(!userInfo) {
                return
            }
            console.log("user Logged in")

        } catch (error) {
            setErrors("An error occured: ", errors)
        }
    }


    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center">
                        <Image width={200} height={200} src={"/basem_logo.png"} alt='logo' />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Register</h2>
                    <p className="text-gray-600 mb-6">Create New Basem Account</p>
                    <form className="space-y-4" onSubmit={handleOnSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <svg
                                    className=" absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect height="16" rx="2" width="20" x="2" y="4" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <svg
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <>
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                            <line x1="2" x2="22" y1="2" y2="22" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    )}
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the Terms & Privacy
                            </label>
                        </div>
                        <div className="flex w-full justify-center items-center">
                            {errors && <p className='text-lg text-red-600'>{errors}</p>}
                            {error && <p className='text-lg text-red-600'>{error.message}</p>}
                        </div>
                        <Button className="w-full bg-green-500 hover:bg-green-400" type="submit">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                <>
                                    Sign Up
                                </>
                            )}
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account yet?{" "}
                        <Link className="font-medium text-green-600 hover:underline" href="/register">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100">
                <div className="h-full w-full relative">
                    <Image
                        src="/login_banner.jpg"
                        alt="Stock management system"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    )
}