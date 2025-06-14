// components/TokenSaver.js
'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const TokenSaver = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.backendToken) {
            localStorage.setItem("userToken", session.backendToken);
            console.log("✅ Token stored in localStorage");
        }
    }, [session, status]);

    return null;
};

export default TokenSaver;