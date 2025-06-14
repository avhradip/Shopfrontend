'use client'

import { login } from '../../Feature/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from 'lucide-react';


function Page() {
    const { data: session } = useSession();
    const { loading } = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(login({ email, password }));
            if (res?.meta?.requestStatus === "fulfilled") {
                setEmail('')
                setPassword('')
                toast.success("Login successful!");
                router.push("/");
            } else {
                toast.error("Login failed. Check credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <p className="text-sm text-black hover:underline" onClick={() => router.push("forgot-password")}>
                                Forgot password?
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-sm font-medium"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-black hover:underline">
                        Sign up
                    </a>
                </p>
                {/* <div className='w-full flex items-center justify-center'>
                    {session ? (
                        <div className='flex flex-col items-center'>
                            <p>Welcome, {session.user?.name}</p>
                            <button onClick={() => signOut()} className='text-red-500'>Sign out</button>
                        </div>
                    ) : (
                        <button onClick={() => signIn("google")} className='flex items-center'>
                            <FcGoogle size={30} />
                            Sign in with Google
                        </button>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default Page;
