"use client";

import { useState } from "react";
import { api } from "@/utils/api";

export default function TwoFACode() {
  const [code, setCode] = useState("");

  const handle2FACode = async () => {
    const author = {
      code,
    };

    try {
      const response = await api.post("/authors/verify", { author });
      console.log("2FA Code:", response);
    } catch (err) {
      console.error("2FA update error:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={code}
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
