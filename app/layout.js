"use client";
import "flowbite";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";
import TopNav from "../components/TopNav";
import SubMenuNav from "../components/SubMenuNav";
import Footer from "../components/Footer";
import AnimatedLayout from "@/components/AnimatedLayout";
import ScrollToTop from "@/components/ScrollToTop";

config.autoAddCss = false;

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isSignIn = pathname.endsWith("/author/sign_in");
  const isSignUp = pathname.endsWith("/author/sign_up");
  const isRegPage = isSignIn || isSignUp;

  const authorPages =
    pathname.startsWith("/author") || pathname.startsWith("/dashboard");
  
  const isRegularAuthorPage = authorPages && !isRegPage;

  return (
    <html lang="en">
      <body className={`z-10 ${isRegPage ? "bg-slate-800" : ""}`}>
        <main className="w-full min-h-screen">
          {isRegPage ? (
            // Auth pages layout (sign in/sign up)
            <div className="flex items-center justify-center min-h-screen px-4">
              {children}
            </div>
          ) : (
            // Regular pages layout
            <div className={isRegularAuthorPage ? "hidden" : ""}>
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
          )}
        </main>
      </body>
    </html>
  );
}
