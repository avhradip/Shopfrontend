'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cart, getUserFun } from "@/Feature/userSlice";

export default function ClientWrapper({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserFun());
        dispatch(cart())
    }, [dispatch]);

    return <>{children}</>;
}
