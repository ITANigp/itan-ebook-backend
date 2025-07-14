"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUpload,
  faClipboard,
  faShoppingCart,
  faQuestionCircle,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { getAuthorProfile } from "@/utils/auth/authorApi";

export default function AuthorDashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [authorId, setAuthorId] = useState(null);
  const [profile, setProfile] = useState({});
  const sidebarRef = useRef(null);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("authorInfo") || "{}");
    if (!stored?.id) {
      alert("Sign in to continue!");
      router.push("/author/sign_in");
    } else {
      setAuthorId(stored.id);
    }
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getAuthorProfile();
        setProfile(data);
        console.log("Fetched Profile Data: ", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!authorId) {
    return null;
  }

  const isDashboard = pathName.startsWith("/dashboard/author/")
    ? "text-[#E50913]"
    : "text-gray-300";
  const isBookDetails = pathName.endsWith("/books/create/book-details");
  const isBookContent = pathName.endsWith("/books/create/book-content");
  const isBookPricing = pathName.endsWith("/books/create/book-pricing");
  const isSignIn = pathName.endsWith("/author/sign_in");
  const isSignUp = pathName.endsWith("/author/sign_up");
  const isRegPage = isSignIn || isSignUp;

  const textColor =
    isBookDetails || isBookContent || isBookPricing
      ? "text-[#E50913]"
      : "text-gray-300";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      <button onClick={toggleSidebar} className="lg:hidden text-gray-700">
        <FontAwesomeIcon
          icon={isSidebarOpen ? faTimes : faBars}
          size="sm"
          className="right-0 top-0 ml-3 mt-2 p-1 cursor-pointer text-white bg-slate-700 rounded-full"
        />
      </button>

      <div
        className={`lg:flex hidden items-center justify-between ${
          isRegPage ? "hidden" : "fixed top-0 left-0"
        } w-full h-16 py-2 shadow-md z-10 bg-white`}
      >
        <div className="flex-1 relative mr-8">
          <Image
            width={50}
            height={50}
            className={`w-12 h-12 absolute right-0 -top-6 rounded-full bg-slate-400 object-cover ${profile.author_profile_image_url ? "" : "bg-slate-400 p-2"}`}
            alt="Profile"
            src={
              profile.author_profile_image_url
                ? profile.author_profile_image_url
                : `/images/avatar.png`
            }
          />
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"></div>
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 pt-6 h-full bg-gray-900 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 sm:block`}
        aria-label="Sidebar"
      >
        <div className="w-full relative">
          <button onClick={toggleSidebar} className="lg:hidden text-gray-700">
            <FontAwesomeIcon
              icon={isSidebarOpen ? faTimes : faBars}
              className="hover:bg-red-100 hover:border-2 w-4 h-4 rounded-full hover:border-red-600 text-red-600 absolute right-3 top-2"
            />
          </button>
        </div>
        <div className="h-full px-4 py-4 overflow-y-auto bg-gray-900 dark:bg-gray-800">
          <Link href="/">
            <img src="/images/logo.png" className="w-16 mb-8 ml-3" alt="Logo" />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={`/dashboard/author/${authorId}`}
                className="flex items-center p-2 text-[#C5C5C5] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faChartPie}
                  className={`text-lg group-hover:text-[#E50913] ${isDashboard}`}
                />
                <span
                  className={`ml-2 text-[#C5C5C5] group-hover:text-[#E50913] ${isDashboard}`}
                >
                  Overview
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/author/${authorId}/books/create/book-details`}
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faUpload}
                  className={`text-lg group-hover:text-[#E50913] ${textColor}`}
                />
                <span
                  className={`ml-2 text-[#C5C5C5] text-lg group-hover:text-[#E50913] ${textColor}`}
                >
                  Make an Upload
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/author/${authorId}/books`}
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faClipboard}
                  className={`text-lg group-hover:text-[#E50913] ${
                    pathName.endsWith("/books")
                      ? "text-[#E50913]"
                      : "text-gray-300"
                  }`}
                />
                <span
                  className={`ml-2 text-[#C5C5C5] group-hover:text-[#E50913] ${
                    pathName.endsWith("/books")
                      ? "text-[#E50913]"
                      : "text-gray-300"
                  }`}
                >
                  Book Shelf
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={() => setOpenSales(!openSales)}
                className="flex justify-between items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-gray-300 text-lg group-hover:text-[#E50913]"
                  />
                  <span className="ml-2 text-[#C5C5C5] group-hover:text-[#E50913]">
                    Sales
                  </span>
                </div>
                <ChevronRight
                  className={`transition-transform duration-300 group-hover:text-[#E50913] ${openSales ? "rotate-90" : "rotate-0"}`}
                />
              </Link>
              {/* Dropdown */}
              <div
                className={`${openSales ? "block" : "hidden"} ml-10 mt-1 space-y-1`}
              >
                <div className="flex flex-col">
                  <Link
                    href="/author/analytics"
                    className="text-[#C5C5C5] hover:text-[#E50913] cursor-pointer"
                  >
                    Analytics
                  </Link>
                  <Link
                    href="/author/withdrawal"
                    className="text-[#C5C5C5] hover:text-[#E50913] cursor-pointer mt-4"
                  >
                    Withdrawal
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/help"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="text-gray-300 text-lg group-hover:text-[#E50913]"
                />
                <span className="ml-2 text-[#C5C5C5] group-hover:text-[#E50913]">
                  Help
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/author/${authorId}/profile`}
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-300 text-lg group-hover:text-[#E50913]"
                />
                <span className="ml-2 text-[#C5C5C5] group-hover:text-[#E50913]">
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      {children}
    </div>
  );
}
