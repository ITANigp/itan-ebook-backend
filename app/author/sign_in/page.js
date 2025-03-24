"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {signInAuthor} from "@/utils/api"; // Ensure api is properly imported

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
      const author = await signInAuthor(email, password);

      if (author && author.data && author.data.id) {
        // Save the author info as a string in localStorage
        localStorage.setItem("authorInfo", JSON.stringify(author.data));
        console.log("Author Info saved:", author.data);

        // Retrieve and parse the stored data
        const storedAuthorInfo = JSON.parse(localStorage.getItem("authorInfo"));
        console.log("Stored Author Info:", storedAuthorInfo);

        // Extract the ID and navigate
        const { id } = storedAuthorInfo;
        router.push(`/dashboard/author/${id}`);
      }
    } catch (error) {
      if (!error.response) {
        setMessage("Cannot connect to the server. Please try again later.");
      } else {
        setMessage(
          error.response?.data?.error ||
            "Sign-in failed. Please check your credentials."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  //**Clear error message after 2 seconds**
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage(""); // Reset error state
        }, 2000);
  
        return () => clearTimeout(timer); // Cleanup timeout on re-render
      }
    }, [message]);

  return (
    <div className="w-full mb-9">
      <div className="bg-white rounded-2xl p-5 md:p-10 md:w-[500px] mt-24 mx-7 sm:mx-24 md:mx-auto border ">
        <Link href="/">
          <img src="/images/logo2.png" alt="logo" className="w-10 h-6 cursor-pointer" />
        </Link>
        <div className="">
          <div className="text-center">
            <p className="md:text-2xl font-bold ">Welcome Back</p>
            <p className="text-xs md:text-sm mb-4">
              Don’t have an account?{" "}
              <Link
                href="/author/sign_up"
                className="font-bold cursor-pointer hover:text-blue-700"
              >
                <span className="text-xs md:text-sm">Create One</span>
              </Link>
            </p>
          </div>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 mt-7 sm:mt-0"
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
