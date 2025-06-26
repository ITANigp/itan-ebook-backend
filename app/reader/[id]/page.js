// pages/reader/[id].jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loadBookContent } from "@/utils/readerTest/contentLoader";
import { showError } from "@/utils/toast";

export default function ReaderPage() {
  const router = useRouter();
  const { id: bookId } = router.query;

  useEffect(() => {
    if (bookId) {
      loadBookContent(bookId, {
        showError,
        loadPdfViewer: (url) => {
          // Your PDF.js integration here
          window.open(url, "_blank"); // Example
        },
        loadEpubReader: (url) => {
          // Your EPUB.js integration here
          console.log("Load EPUB reader with", url);
        },
        loadGenericReader: (url, format) => {
          console.log(`Unsupported format ${format}, open`, url);
        },
        initializeAudioPlayer: (files, duration) => {
          console.log("Init audio player with:", files, duration);
        },
      });
    }
  }, [bookId]);

  return <div className="p-8">Loading book reader...</div>;
}
