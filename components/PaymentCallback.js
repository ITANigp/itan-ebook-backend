"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/auth/readerApi";
import { useSearchParams } from "next/navigation";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    const reference =
      searchParams.get("reference") ||
      localStorage.getItem("purchase_reference");

    const jwtToken = localStorage.getItem("access_token"); // ✅ Safe here

    if (!reference || !jwtToken) {
      setStatus("Missing payment reference or token.");
      return;
    }

    const checkPayment = async () => {
      try {
        const res = await api.get(`/purchases/check_status`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: { reference },
        });

        const { purchase_status, book_title } = res.data.data;

        console.log("API response:", res.data);

        if (purchase_status === "completed") {
          setStatus(`Payment successful for "${book_title}".`);
          localStorage.setItem("purchaseBook", res.data.data);
        } else {
          setStatus("Payment not completed.");
        }
      } catch (error) {
        setStatus("Error checking payment status.");
        console.error(error.response?.data || error.message);
      }
    };

    checkPayment();
  }, [searchParams]);

  return (
    <div className="p-6 my-40">
      <h1 className="text-lg font-bold mb-2">Payment Status</h1>
      <p>{status}</p>
    </div>
  );
}
