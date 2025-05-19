"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/utils/auth/authorApi";

export default function ConfirmEmailContent() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmation_token = searchParams.get("confirmation_token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState("Confirming...");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!confirmation_token || !email) {
        setStatus("Invalid confirmation link.");
        return;
      }

      try {
        const response = await api.post(
          `${BASE_API_URL}/authors/confirmation`,
          { confirmation_token, email }
        );

        if (response.ok) {
          setStatus("Email confirmed! Redirecting...");
          setTimeout(() => router.push("/sign_in"), 2000);
        } else {
          const data = await response.json();
          setStatus(
            `Email confirmation failed: ${data.message || "Unknown error"}`
          );
        }
      } catch (error) {
        setStatus("An error occurred. Please try again.");
        console.error("Email confirmation error:", error);
      }
    };

    confirmEmail();
  }, [confirmation_token, email, router, BASE_API_URL]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-4">{status}</h1>
      {status.includes("failed") && (
        <button
          onClick={() => router.push("/sign_in")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Sign In
        </button>
      )}
    </div>
  );
}
