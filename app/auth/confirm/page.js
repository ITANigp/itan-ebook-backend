import { Suspense } from "react";
import ConfirmEmailContent from "./ConfirmEmailContent";

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-lg">Loading confirmation...</p>
        </div>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}
