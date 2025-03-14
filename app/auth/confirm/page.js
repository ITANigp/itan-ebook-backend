"use client"; // Ensure this is a Client Component

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmEmail() {

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL    
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
        const response = await fetch(`${BASE_API_URL}/authors/confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({confirmation_token, email }),
        });

        if (response.ok) {
          setStatus("Email confirmed! Redirecting...");
          setTimeout(() => router.push("/sign_in"), 2000);
        } else {
          setStatus("Email confirmation failed.");
        }
      } catch (error) {
        setStatus("An error occurred. Please try again.");
        console.error("Email confirmation error:", error);
      }
    };

    confirmEmail();
  }, [confirmation_token, email, router]);

  return (
    <div>
      <h1>{status}</h1>
    </div>
  );
}
