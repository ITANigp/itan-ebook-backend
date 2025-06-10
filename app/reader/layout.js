"use client";

import { usePathname } from "next/navigation";

import ReadersFooter from "@/app/reader/(components)/ReadersFooter";

export default function Layout({ children }) {
  const pathname = usePathname();

  const signUpPage = pathname.endsWith("/reader/sign_up")
  const signInPage = pathname.endsWith("/reader/sign_in")

  const hideRegPage =  signUpPage || signInPage ? "hidden" : "";
  return (
    <main className="bg-gray-100">
      {children}
      <ReadersFooter hiddenPage={hideRegPage}/>
    </main>
  );
}
