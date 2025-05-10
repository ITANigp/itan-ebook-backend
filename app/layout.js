export const metadata = {
//   title: {
//     default: "IGP"
//   },
  icons: {
    icon: "/images/itan-favicon.png",
  },
};


import RootLayout from "./RootLayout";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
