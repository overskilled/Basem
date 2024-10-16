'use client';  // Ensure this component is client-side only

import Footer from '@/components/Dashboard/Footer';
import Header from '@/components/Dashboard/Header';
import { auth } from '@/firebase/config';
import { usePathname } from 'next/navigation';  // Use usePathname instead of useRouter
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader';

export default function CustomLayout({ children }) {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();  // Get current pathname
    const [user, loading, error] = useAuthState(auth)

    // Define paths where Header and Footer should be excluded
    const excludedPaths = ['/login', '/register'];
    const excludedPathsHeader = ['/login', '/register', '/'];


    // Render layout only when the component is mounted to avoid server-side rendering issues
    return (
        <div className="">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Conditionally render Header if the current path is NOT in excludedPathsHeader */}
                    {!excludedPathsHeader.includes(pathname) && <Header />}

                    {children}

                    {/* Conditionally render Footer if the current path is NOT in excludedPaths */}
                    {!excludedPaths.includes(pathname) && <Footer />}
                </>
            )}
        </div>
    );
}
