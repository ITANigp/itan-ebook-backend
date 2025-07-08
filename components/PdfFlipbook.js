// app/components/PdfFlipbook.js
"use client"; // This directive marks the component as a Client Component

import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useEffect,
} from "react";
import { Document, Page as ReactPdfPage, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

// Import the CSS for react-pdf (annotation layer and text layer)
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// --- IMPORTANT for PDF.js Worker Setup ---
// Directly import the worker from pdfjs-dist. This helps prevent version mismatches.
// import PdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs";
// pdfjs.GlobalWorkerOptions.workerSrc = PdfjsWorker;

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
// If the above line gives a module not found error, try this alternative:
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// A component to represent each page in the flipbook.
// It needs to be forwardRef because HTMLFlipBook passes a ref to its children.
const Page = forwardRef(({ pageNumber, width, height }, ref) => {
  return (
    <div ref={ref} className="pdf-flipbook-page">
      <ReactPdfPage
        pageNumber={pageNumber}
        width={width}
        height={height}
        renderAnnotationLayer={false} // You might want to disable this if it interferes with flipbook styling
        renderTextLayer={false} // Disable text layer for better performance if not needed for selection/copy
      />
      {/* You can add page numbers or other overlays here */}
      <p className="page-number-text">Page {pageNumber}</p>
    </div>
  );
});
Page.displayName = "Page"; // Good practice for debugging with React DevTools

function PdfFlipbook({ pdfUrl }) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bookRef = useRef(null);

  // Define the dimensions for each page of the flipbook.
  // Adjust these values based on your PDF's aspect ratio and desired display size.
  const pageWidth = 450; // Example width
  const pageHeight = 600; // Example height (adjust to match your PDF's aspect ratio)

  // Callback for when the PDF document successfully loads
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  // Callback for when the flipbook page changes
  const onFlip = useCallback((e) => {
    setCurrentPage(e.data + 1); // e.data is 0-indexed page number
    console.log("Current flipbook page: " + (e.data + 1));
  }, []);

  // Functions for navigation buttons
  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="pdf-flipbook-container">
      <h2>PDF Flipbook Viewer</h2>
      <p>
        Current Page: {currentPage} / {numPages}
      </p>

      <div className="flipbook-wrapper">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
          className="pdf-document"
        >
          {numPages > 0 && (
            <HTMLFlipBook
              width={pageWidth}
              height={pageHeight}
              minWidth={300} // Minimum width for responsiveness
              maxWidth={800} // Maximum width for responsiveness
              minHeight={400} // Minimum height
              maxHeight={1200} // Maximum height
              maxShadowOpacity={0.5} // Shadow intensity
              showCover={true} // Show a cover page
              flippingTime={800} // Animation speed in ms
              onFlip={onFlip}
              className="my-flipbook"
              ref={bookRef}
              // Render only if page length changes for performance, default is false
              renderOnlyPageLengthChange={false}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                  height={pageHeight}
                />
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      <div className="navigation-controls">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={goToNextPage} disabled={currentPage === numPages}>
          Next Page
        </button>
      </div>

      {numPages === 0 && <p>Loading PDF...</p>}
    </div>
  );
}

export default PdfFlipbook;
