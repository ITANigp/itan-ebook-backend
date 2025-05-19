"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/utils/auth/authorApi";

export default function TwoFACode() {
  const [verification_code, setCode] = useState("");
  const router = useRouter();

  const handle2FACode = async () => {
    const code = {
      verification_code,
    };

    try {
      const response = await api.post("/authors/verify", code);
      console.log("2FA Code:", response);
      // router.push(`/dashboard/author/${author.data.id}`);
      router.push(`/dashboard/author/${code.verification_code}`);
    } catch (err) {
      console.error("2FA update error:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={verification_code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your 2FA code"
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handle2FACode}
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
