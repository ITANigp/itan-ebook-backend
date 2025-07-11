"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { api } from "@/utils/auth/readerApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const reader = await api.post("/readers", {
        reader: {
          email,
          password,
          password_confirmation: passwordConfirmation,
          first_name: firstName,
          last_name: lastName,
        },
      });

      if (reader?.data?.data?.id) {
        setMessage("Registration successful! Redirecting...");
        router.push("/reader/sign_in");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex py-12">
      <div className="relative">
        <Image
          src="/images/readers/registration/register-picture.png"
          width={950}
          height={1600}
          alt="register"
          className="ml-8"
        />
        <h2 className="absolute left-20 top-12 text-4xl text-red-600 font-bold">
          ITAN
        </h2>
        <div className="absolute left-20 top-48 text-white w-[400px]">
          <h2 className="text-4xl">
            Dive into African stories that keep you hooked from page one.
          </h2>
          <p className="mt-3">
            Whether you're searching for inspiration, escape — we've got the
            perfect story waiting for you.
          </p>
        </div>
      </div>

      <div className="min-h-screen flex flex-col justify-center px-6 w-full mt-10">
        <h2 className="ml-16 -mt-10 mb-4 text-3xl font-semibold ">Welcome!</h2>

        <form
          onSubmit={handleSignup}
          className="space-y-4 max-w-md w-full mx-auto"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">First Name</label>
            <input
              type="text"
              className="h-[50px] w-full p-2.5 rounded-lg bg-gray-50 focus:ring-1 focus:border-0 focus:ring-blue-300 outline-none"
              placeholder="Enter Your First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="h-[50px] w-full p-2.5 rounded-lg bg-gray-50 focus:ring-1 focus:border-0 focus:ring-blue-300 outline-none"
              placeholder="Enter Your Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-4 text-gray-500">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              className="pl-10 h-[50px] w-full p-2.5 rounded-lg bg-gray-50 focus:ring-1 focus:border-0 focus:ring-blue-300 outline-none"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="pl-10 h-[50px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-1 focus:border-0 focus:ring-blue-300 focus:border-[#E50913] block w-full p-2.5"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-4 right-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="h-[50px] w-full p-2.5 rounded-lg bg-gray-50 border focus:ring-1 focus:border-0 focus:ring-blue-300 outline-none"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <div className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" defaultChecked />
            <label>
              Agree with{" "}
              <a href="#" className="text-orange-600">
                Terms and Conditions
              </a>
            </label>
          </div>

          {message && (
            <p
              className="text-sm text-[#E50913] text-center"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#E50913] hover:bg-[#ba2129] text-white font-semibold py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <div className="inline-flex items-center justify-center w-full my-5">
            <p className="h-[1px] w-full bg-gray-300" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <p className="h-[1px] w-full bg-gray-300" />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full bg-gray-200 hover:bg-gray-400 text-[#4e4c4c] font-medium py-3 rounded-lg"
          >
            <Image
              src="/images/google.png"
              width={24}
              height={24}
              alt="Google Logo"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              href="/reader/sign_in"
              className="text-orange-600 font-medium"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
