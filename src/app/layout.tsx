import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

import AuthProvider from "@/Context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
// import Navbar from "@/components/Navbar";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

<meta
  name="format-detection"
  content="telephone=no, date=no, email=no, address=no"
/>

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
    <html lang="en" suppressHydrationWarning = {true}>
      
        <body className={inter.className}>
        {/* <AuthProvider> */}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
          {/* </AuthProvider> */}
        </body>
      
    </html>
  );
}