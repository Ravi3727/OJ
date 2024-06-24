import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import { Toaster } from "@/components/ui/toaster"

import AuthProvider from "@/Context/AuthProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// import { ToastContainer } from './reactToast';
// import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Online Code Judge",
  description: "Real plateform for programers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
         <Navbar/>
          {children}
          
        </AuthProvider>
      </body>
    </html>
  );
}


