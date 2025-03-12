"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInAuthor } from "@/utils/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await signInAuthor(email, password);
      setMessage("Login successful! Redirecting...");
      router.push("/dashboard/authors/:authorId"); // Adjust this path as needed
    } catch (error) {
      if(!error.response) {
         return {
           success: false,
           message: setError(
             "Cannot connect to the server. Please try again later."
           ),
         };
      } else {
        return { success: false, message: setMessage(error.response?.data?.message || "Invalid Email or password.")}
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-10 my-24 w-[500px] mx-auto">
        <div className="relative">
          <div className="absolute left-28 -top-12">
          <p className="text-2xl font-bold ">Welcome Back</p>
          <p className="text-sm mb-4">
            Don’t have an account?{" "}
            <Link
              href="/authors/sign_up"
              className="font-bold cursor-pointer hover:text-blue-700"
            >
              <span>Create One</span>
            </Link>
          </p>
        </div>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="h-[50px] bg-gray-50 border-0 text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913] block w-full p-2.5"
              placeholder="Johndoe@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="h-[50px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-1 focus:ring-[#E50913] focus:border-[#E50913] block w-full p-2.5"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <div className="relative">
              <button
                type="submit"
                className="h-[50px] font-semibold text-white bg-[#E50913] hover:bg-[#ba2129] rounded-lg px-5 py-2.5 w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <Link
                href="#"
                className="absolute right-0 -bottom-6 text-sm hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="button"
              className="mt-10 h-[50px] hover:text-white text-[#4e4c4c] space-x-5 flex w-full px-3 py-2 font-medium text-center items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-[#E50913]"
            >
              <img src="/images/google.png" className="w-6 h-6" alt="Google" />
              <p>Continue with Google</p>
            </button>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-[#E50913]">{message}</p>
          )}
        </form>
      </div>
      
    </div>
  );
};

export default SignIn;
