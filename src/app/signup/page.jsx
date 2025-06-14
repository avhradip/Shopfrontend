'use client'

import { signUp } from '../../Feature/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';

function Page() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // <- add this
    try {
      const res = await dispatch(signUp({ name, email, password, number, type }));
      if (res?.meta?.requestStatus === "fulfilled") {
        setEmail("")
        setName("")
        setNumber("")
        setPassword("")
        router.push("/login");
      } else {
        alert("Sign-up failed. Check credentials.");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      alert("Something went wrong.");
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
              Number
            </label>
            <input
              id="number"
              name="number"
              type="number"
              autoComplete="number"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              id="type"
              name="type"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white text-gray-700"
            >
              <option className='w-full' value="">Select Role</option>
              <option className='w-full' value="user">User</option>
              <option className='w-full' value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
          shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-black text-sm font-medium"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/login" className="font-medium text-black hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Page;
