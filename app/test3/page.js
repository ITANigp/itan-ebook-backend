"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react"; // or use any icon library

export default function SalesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white w-48">
      <button
        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-800"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center space-x-2">
          <span>🛒</span>
          <span>Sales</span>
        </div>
        <ChevronRight
          className={`transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
        />
      </button>

      {/* Dropdown */}
      <div className={`${open ? "block" : "hidden"} ml-10 mt-1 space-y-1`}>
        <div className="text-red-600 cursor-pointer">Analytics</div>
        <div className="text-gray-500 cursor-not-allowed">Withdrawal</div>
      </div>
    </div>
  );
}
