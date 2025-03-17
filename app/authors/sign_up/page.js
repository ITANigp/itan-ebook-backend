"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAuthor } from "@/utils/api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

   const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const author = await registerAuthor(email, password);
      if (author && author.data && author.data.id) {
        setMessage("Registration successful! You can now log in.");
        router.push("/authors/sign_in");
        
      }
      console.log("error message0: ", message);
    } catch (error) {
      if (!error.response) {
        setMessage("Cannot connect to the server. Please try again later.");
        console.log("error message1: ", message);
      } else {
        console.log("error message2: ", message);
        setMessage(error.response?.data?.message || "Registration failed. Try again.");
      }
      console.log("error message3: ", message)
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-10 my-24 w-[500px] mx-auto">
        <div className="relative">
          <div className="absolute left-24 -top-12">
            <p className="text-2xl font-bold">Welcome!</p>
            <p className="text-sm mb-4">
              Already have an account?{" "}
              <Link href="/authors/sign_in" className="font-bold cursor-pointer hover:text-blue-700">
                <span>Log In</span>
              </Link>
            </p>
          </div>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mt-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="h-[50px] bg-gray-50 border-0 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913] block w-full p-2.5"
              placeholder="John Doe"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
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
              {loading ? "Loading..." : "Sign Up"}
            </button>
     
<div className="inline-flex items-center justify-center w-full my-5">
   
    <p className="ml-10 h-[1px] w-full bg-gray-300"/><span className="px-3 font-extralight text-sm text-gray-300">OR</span> <p className="h-[1px] w-full bg-gray-300 mr-10"/>
</div>


            <button
              type="button"
              className="h-[50px] hover:text-white text-[#4e4c4c] space-x-5 flex w-full px-3 py-2 font-medium text-center items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-[#E50913]"
            >
              <img src="/images/google.png" className="w-6 h-6" alt="Google" />
              <p>Continue with Google</p>
            </button>
          </div>

          {message && <p className="mt-4 text-center text-sm text-[#E50913]">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
