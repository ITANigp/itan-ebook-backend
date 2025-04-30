"use client";
import "flowbite";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import TopNav from "../components/TopNav";
import SubMenuNav from "../components/SubMenuNav";
import Footer from "../components/Footer";
import { FormProvider } from "@/context/FormContext";

config.autoAddCss = false;

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isSignIn = pathname.endsWith("/author/sign_in");
  const isSignUp = pathname.endsWith("/author/sign_up");
  const isRegPage = isSignIn || isSignUp

  const authorPages =
    pathname.startsWith("/author") ||
    pathname.startsWith("/dashboard");

  const privacyPages =
    pathname.startsWith("/privacy-policies") ||
    pathname.startsWith("/terms&conditions");

  const PasswordPage =
    pathname.endsWith("/auth/forget-password") ||
    pathname.endsWith("/reset-password");
    
    const shouldHideHeader =
      authorPages || privacyPages || PasswordPage ? "hidden" : "";

    const ProfilePage = pathname.endsWith('/profile')
    const ProfileBackground = ProfilePage ? "bg-gray-100" : ""




  return (
      <div className={`z-10 ${isRegPage ? "bg-slate-800" : ""}`}>
        <FormProvider>
          <Toaster />
          <main className="w-full min-h-screen">
            <div>
              {/* <AnimatedLayout> */}
              <div className="">
                <TopNav styles={shouldHideHeader} />
                <SubMenuNav styles={shouldHideHeader} />
                <div className="py-10 large:py-4 xl:py-0 xl:px-8">
                  {children}
                </div>
                <Footer styles={shouldHideHeader} />
                {/* <ScrollToTop styles={hideIfAuthorPage} /> */}
              </div>
              {/* </AnimatedLayout> */}
            </div>
          </main>
        </FormProvider>
      </div>
  );
}
