'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password'];

export default function PrivateRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useSelector((state) => state.user);

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

    useEffect(() => {
        if (isAuthenticated && isPublicRoute) {
            router.push('/');
        } else if (!isAuthenticated && !isPublicRoute) {
            router.push('/login');
        }
    }, [isAuthenticated, pathname, router, isPublicRoute]);

    if (
        (isAuthenticated && isPublicRoute) ||
        (!isAuthenticated && !isPublicRoute)
    ) {
        return null;
    }

    return children;
}
