"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-white">
      <h1 className="text-xl font-semibold text-center">Sign In</h1>
      <p className="text-center text-gray-500 mb-6">
        Hi! Welcome back, you&apos;ve been missed
      </p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full p-3 border rounded-lg"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**************"
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <Link
            href="#"
            className="text-sm text-orange-600 absolute right-3 -bottom-6"
          >
            Forgot Password?
          </Link>
        </div>

        <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium">
          Sign In
        </button>

        <div className="flex items-center justify-between py-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <button className="border p-3 rounded-full">🍎</button>
          <button className="border p-3 rounded-full">🌐</button>
          <button className="border p-3 rounded-full">📘</button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-orange-600 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
