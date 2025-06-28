import dynamic from "next/dynamic";
import { Suspense } from "react";

const PaymentCallback = dynamic(() => import("@/components/PaymentCallback"), {
  ssr: false,
});

export default function PaymentCallbackPage() {
  return (
    <div className="p-6 my-40">
      <h1 className="text-lg font-bold mb-2">Payment Status</h1>
      <Suspense fallback={<p>Checking payment...</p>}>
        <PaymentCallback />
      </Suspense>
    </div>
  );
}
