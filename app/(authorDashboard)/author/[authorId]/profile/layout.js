"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import LogoutModal from "@/components/LogoutModal";
import { getAuthorProfile } from "@/utils/auth/authorApi";
import { signOutAuthor } from "@/utils/auth/authorApi";

const layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({});
  const pathname = usePathname();
  const isProfilePage = pathname.endsWith("/profile");
  const isPrivacyPage = pathname.endsWith("/security");
  const isNotificationPage = pathname.endsWith("/notification");

  const handleLogout = async () => {
    try {
      await signOutAuthor();
      setShowModal(false);
      alert("You have been logged out!");
      window.location.href = "/";
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await getAuthorProfile();
      setProfile(data);
      console.log("Fetched Profile Data: ", data);
    } catch (err) {
      // setError("Failed to fetch author profile.");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="mx-2  lg:pl-64  lg:pt-24 bg-gray-100 lg:bg-white">
      <div className="lg:flex lg:space-x-6 p-4 bg-gray-100 rounded-md">
        <nav className="hidden lg:flex">
          <ul className="space-y-7">
            {/* <Link href={`/author/${profile.id}/profile`}> */}
            <Link href={`/author/1/profile`}>
              <li
                className={`hover:text-red-500 cursor-pointer ${isProfilePage ? "text-red-500 " : ""} `}
              >
                Profile
              </li>
            </Link>
            <Link href={`/author/${profile.id}/profile/security`}>
              <li
                className={`hover:text-red-500 cursor-pointer ${isPrivacyPage ? "text-red-500 " : ""} `}
              >
                Privacy & Security
              </li>
            </Link>

            {/* <Link href="/author/1/profile/notification">
              <li
                className={`hover:text-red-500 cursor-pointer ${isNotificationPage ? "text-red-500 " : ""} `}
              >
                Notification
              </li>
            </Link> */}

            <Link href="#" onClick={() => setShowModal(true)}>
              <li
                className={`hover:text-red-500 cursor-pointer ${showModal ? "text-red-500 " : ""} `}
              >
                Log Out
              </li>
            </Link>
          </ul>
        </nav>
        <div className="flex-1">{children}</div>
      </div>
      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default layout;
