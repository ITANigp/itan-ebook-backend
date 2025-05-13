"use client";

import { useState } from "react";
import { api } from "@/utils/auth/authorApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/authors/password", {
        author: { email },
      });
      setMessage("If the email exists, reset instructions have been sent.");
    } catch (err) {
      setMessage("If the email exists, reset instructions have been sent.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border rounded-xl">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
