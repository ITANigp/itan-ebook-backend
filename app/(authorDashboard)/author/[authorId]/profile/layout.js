"use client";

import React from "react";
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isProfilePage = pathname.endsWith("/author/1/profile");
  const isPrivacyPage = pathname.endsWith("/author/1/privacy");
  const isNotificationPage = pathname.endsWith("/author/1/notification");
  const isLogOutPage = pathname.endsWith("/author/1/logout");
  return (
    <div className="mx-2  lg:pl-64  lg:pt-24 bg-gray-100 lg:bg-white">
      <div className="lg:flex lg:space-x-6 p-4 bg-gray-100 rounded-md">
        <nav className="hidden lg:flex">
          <ul className="space-y-3">
            <li
              className={`hover:text-red-500 cursor-pointer ${isProfilePage ? "text-red-500 " : ""} `}
            >
              Profile
            </li>
            <li
              className={`hover:text-red-500 cursor-pointer ${isPrivacyPage ? "text-red-500 " : ""} `}
            >
              Privacy & Security
            </li>
            <li
              className={`hover:text-red-500 cursor-pointer ${isNotificationPage ? "text-red-500 " : ""} `}
            >
              Notification
            </li>
            <li
              className={`hover:text-red-500 cursor-pointer ${isLogOutPage ? "text-red-500 " : ""} `}
            >
              Log Out
            </li>
          </ul>
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
