"use client"

import { forgotPassword } from '../../Feature/userSlice'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

function page() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")

    const handleForgotPassword = async (email) => {
        const res = await dispatch(forgotPassword(email));
        console.log(res);
        
        if (res?.meta?.requestStatus === "fulfilled") {
            toast.success("Reset link sent to your email");
        } else {
            toast.error(res?.message || "Something went wrong");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl w-full text-center font-bold mb-4">Forgot Password</h1>

                <div className="space-y-6">
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

                    <button
                        onClick={() => handleForgotPassword(email)}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-sm font-medium"
                    >
                        Submit
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-black hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default page