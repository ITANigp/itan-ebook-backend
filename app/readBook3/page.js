"use client";

import dynamic from "next/dynamic";

const PDFBookWithUI = dynamic(
  () => import("@/components/reader/PDFBookWithUI"),
  { ssr: false }
);

export default function ReadBookPage() {
  const pdfUrl = "/CYBERSECURITY.pdf"; // Ensure the file is in /public

  return (
    <div className="my-20">
      <PDFBookWithUI pdfUrl={pdfUrl} />
    </div>
  );
}
