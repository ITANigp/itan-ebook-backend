"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  verify2FA,
  getTwoFactorStatus,
  resendCode,
} from "@/utils/twoFactorAuth";

const TIMER_KEY = "resend_timer_expiry";

const TwoFactorSettings = () => {
  const [status, setStatus] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0); // seconds

  const router = useRouter();

  // Load 2FA status and check for existing timer
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

    const expiry = localStorage.getItem(TIMER_KEY);
    if (expiry) {
      const remaining = Math.floor((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) setResendTimer(remaining);
    }
  }, []);

  // Countdown interval for resend timer
  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          localStorage.removeItem(TIMER_KEY);
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

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
        // ✅ Clear resend timer
        localStorage.removeItem(TIMER_KEY);
        setResendTimer(0);
        // localStorage.setItem("authorInfo", JSON.stringify(author.data));
        console.log("2fa data: ", data2FA.data);
        localStorage.setItem("authorInfo", JSON.stringify(data2FA.data));
        router.push(`/dashboard/author/${data2FA.data.id}`);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setMessage("Verification failed. Please check the code and try again.");
    } finally {
      setLoading(false);
      setCode("");
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    try {
      await resendCode();
      setMessage("Verification code resent.");
      const expiry = Date.now() + 2 * 60 * 1000;
      localStorage.setItem(TIMER_KEY, expiry.toString());
      setResendTimer(120);
    } catch (err) {
      console.log("Resend code error: ", err);
      setMessage("Failed to resend code. Please try again later.");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
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

      <button
        onClick={handleResendCode}
        disabled={resendTimer > 0}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {resendTimer > 0
          ? `Resend in ${formatTime(resendTimer)}`
          : "Resend Code"}
      </button>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  );
};

export default TwoFactorSettings;
