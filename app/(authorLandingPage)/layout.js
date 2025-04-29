// "use client";

import AnimatedLayout from "@/components/AnimatedLayout";
import ScrollToTop from "@/components/ScrollToTop";


export default function RootLayout({ children }) {

  return (
          <AnimatedLayout>
              {/* <div className="px-4 py-10 large:py-4 xl:py-0 xl:px-8"> */}
                {children}
              {/* </div> */}
              <ScrollToTop />
          </AnimatedLayout>
  );
}
