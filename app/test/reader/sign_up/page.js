"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-white">
      <h1 className="text-xl font-semibold text-center">Create Account</h1>
      <p className="text-center text-gray-500 mb-6">
        Fill your information below or register with your social account
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Ex. John Doe"
          className="w-full p-3 border rounded-lg"
        />
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
        </div>

        <div className="flex items-center text-sm">
          <input type="checkbox" className="mr-2" defaultChecked />
          <label>
            Agree with{" "}
            <a href="#" className="text-orange-600">
              Terms and Condition
            </a>
          </label>
        </div>

        <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium">
          Sign Up
        </button>

        <div className="flex items-center justify-between py-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <button className="border p-3 rounded-full">🍎</button>
          <button className="border p-3 rounded-full">🌐</button>
          <button className="border p-3 rounded-full">📘</button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-orange-600 font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
