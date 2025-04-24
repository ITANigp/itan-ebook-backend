"use client";
import "flowbite";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import TopNav from "../components/TopNav";
import SubMenuNav from "../components/SubMenuNav";
import Footer from "../components/Footer";
import AnimatedLayout from "@/components/AnimatedLayout";
import ScrollToTop from "@/components/ScrollToTop";
import { FormProvider } from "@/context/FormContext";

config.autoAddCss = false;

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isSignIn = pathname.endsWith("/author/sign_in");
  const isSignUp = pathname.endsWith("/author/sign_up");
  const isRegPage = isSignIn || isSignUp

  const authorPages =
<<<<<<< HEAD
    pathname.startsWith("/author") ||
    pathname.startsWith("/dashboard");

  const hideIfAuthorPage = authorPages ? "hidden" : ""


=======
    pathname.startsWith("/author") || pathname.startsWith("/dashboard");
>>>>>>> develop

  return (
    <html lang="en">
      <body className={`z-10 ${isRegPage ? "bg-slate-800" : ""}`}>
<<<<<<< HEAD
        <FormProvider>
          <Toaster />
          <main className="w-full min-h-screen">
            <div>
              {/* <AnimatedLayout> */}
                <div className="">
                  <TopNav styles={hideIfAuthorPage} />
                  <SubMenuNav styles={hideIfAuthorPage} />
                  <div className="px-4 py-10 large:py-4 xl:py-0 xl:px-8">
                    {children}
                  </div>
                  <Footer />
                  {/* <ScrollToTop styles={hideIfAuthorPage} /> */}
                </div>
              {/* </AnimatedLayout> */}
            </div>
          </main>
        </FormProvider>
=======
        <main className="w-full min-h-screen">
          <div className={`${authorPages ? "hidden" : ""}`}>
            <AnimatedLayout>
              <div className="">
                <TopNav />
                <SubMenuNav />
                <div className="px-4 py-10 large:py-4 xl:py-0 xl:px-8">
                  {children}
                </div>
                <Footer />
                <ScrollToTop />
              </div>
            </AnimatedLayout>
          </div>
        </main>
>>>>>>> develop
      </body>
    </html>
  );
}
