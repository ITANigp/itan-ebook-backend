"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { verify2FA, getTwoFactorStatus } from "@/utils/twoFactorAuth";

const TwoFactorSettings = () => {
  const [status, setStatus] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getTwoFactorStatus();
        setStatus(res);
      } catch (error) {
        console.error("Failed to fetch 2FA status", error);
      }
    };

    fetchStatus();
  }, []);

  const handleVerify2FA = async () => {
    if (!code.trim()) {
      setMessage("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data2FA = await verify2FA(code);
      console.log("2FA Verification Result:", data2FA);
      setMessage("Verification successful.");
      if (data2FA.status.code === 200) {
        localStorage.setItem("authorInfo", JSON.stringify(data2FA.data));
        router.push(`/dashboard/author/${data2FA.data.id}`)
    }
    } catch (error) {
      console.error("Verification failed:", error);
      setMessage("Verification failed. Please check the code and try again.");
    } finally {
      setLoading(false);
      setCode("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>

      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <button
        onClick={handleVerify2FA}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  );
};

export default TwoFactorSettings;
