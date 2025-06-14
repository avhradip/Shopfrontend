"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./Ui/Loading";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Added "/reset-password" to the publicRoutes array
const publicRoutes = ["/login", "/signup", "/non-existent-page-1", "/forgot-password","/reset-password"];

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs only once on client mount

    if (!isClient || loading) {
        return <Loading />;
    }

    const isPublicRoute = publicRoutes.includes(pathname);

    return (
        <>
            {!isPublicRoute && <Header />}
            {!isPublicRoute && <Navbar />}
            <main>{children}</main>
            {!isPublicRoute && <Footer />}
        </>
    );
}