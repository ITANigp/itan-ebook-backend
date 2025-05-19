"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "@/utils/auth/readerApi";

const SignIn = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        const response = await api.post("/readers/sign_in", {
          reader: {
            email,
            password,
          },
        });
      console.log("Reader logged in successfully:", response.data)
        alert("Log in successfully.");
        router.push("/reader/books");
      } catch (error) {
        console.error("Login failed:", error);
      
        const errorMessage =
          error?.response?.data?.error ||
          "Login failed. Please try again.";
      
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
      
  };

  return (
    <main className="w-full mb-9">
      <section className="bg-white max-w-[390px] rounded-2xl p-2 sm:py-5 sm:px-3 sm:w-[600px] mt-24 mx-auto border">
        <header>
          <Link href="/">
            <img
              src="/images/logo2.png"
              alt="Itan Logo"
              className="w-10 h-6 cursor-pointer"
            />
          </Link>
        </header>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome!</h1>
          <p className="text-sm mb-4">
            Already have an account?{" "}
            <Link
              href="/author/sign_in"
              className="font-bold cursor-pointer hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSignup} aria-label="Signup Form">
          <fieldset>
 
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
              <button
                type="submit"
                className="h-[50px] font-semibold text-white bg-[#E50913] hover:bg-[#ba2129] rounded-lg px-5 py-2.5 w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>

              <div className="inline-flex items-center justify-center w-full my-5">
                <p className="ml-10 h-[1px] w-full bg-gray-300" />
                <span className="px-3 font-extralight text-sm text-gray-300">
                  OR
                </span>
                <p className="h-[1px] w-full bg-gray-300 mr-10" />
              </div>

              <button
                type="button"
                className="h-[50px] hover:text-white text-[#4e4c4c] space-x-5 flex w-full px-3 py-2 font-medium text-center items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-[#E50913]"
              >
                <img
                  src="/images/google.png"
                  className="w-6 h-6"
                  alt="Google Logo"
                />
                <p>Continue with Google</p>
              </button>
            </div>

            {message && (
              <p
                className="mt-4 text-center text-sm text-[#E50913]"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
