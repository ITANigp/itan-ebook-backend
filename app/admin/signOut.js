"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOutAdmin } from "@/utils/auth/authorApi";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    setError(""); // Reset error before making a new request

    try {
      await signOutAdmin();
      router.push("/admin");
    } catch (err) {
      if (!err.response) {
        setError("Cannot connect to the server. Please try again later.");
      } else {
        setError(
          err.response?.data?.error || "Sign-out failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // **Clear error message after 2 seconds**
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Reset error state
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout on re-render
    }
  }, [error]);

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>

      {/* Show error message only when there is an error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSignOut}
        className="w-44 h-14 mt-4 bg-red-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
};

export default AdminDashboard;
