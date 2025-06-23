"use client";

import { Loader2 } from "lucide-react";
import { resetPassword } from "../../../Feature/userSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams(); 
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(token);

  const [newPassword, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");

  const updatePassword = async ({ newPassword: newPassword, conformPassword: conformPassword, token: token }) => {
    if (newPassword !== conformPassword) {
      return toast.error("Passwords do not match");
    }

    toast.promise(
      dispatch(resetPassword({ newPassword, conformPassword, token }))
        .unwrap()
        .then(() => router.push("/login")),
      {
        loading: "Resetting password...",
        success: <b>Password reset successful!</b>,
        error: <b>Failed to reset password.</b>,
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl w-full text-center font-bold mb-4">Reset Password</h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="New Password"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Conform Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={conformPassword}
              onChange={(e) => setconformPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Confirm Password"
            />
          </div>

          <button
            onClick={() =>
              updatePassword({ newPassword: newPassword, conformPassword: conformPassword, token:token })
            }
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-sm font-medium"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
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
  );
}

export default ResetPasswordPage;
