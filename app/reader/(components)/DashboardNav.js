import React from 'react';
import { Search, User } from "lucide-react";
import Link from 'next/link';

const DashboardNav = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
      <div className="text-xl font-bold text-red-600">ITAN</div>
      <div className="flex items-center space-x-3">
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li className="text-red-600">
            <Link href="/reader/home">Home</Link>
          </li>
          <li>
            <Link href="/reader/library">Library</Link>
          </li>
        </ul>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for books..."
            className="pl-10 pr-4 py-1.5 border rounded-full text-sm"
          />
          <Search className="absolute top-1.5 left-3 h-4 w-4 text-gray-500" />
        </div>
        <User className="h-6 w-6 text-gray-700" />
      </div>
    </nav>
  );
}

export default DashboardNav