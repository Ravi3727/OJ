import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto, Arizonia, Great_Vibes, Meow_Script } from "next/font/google";
import AuthProvider from "@/Context/AuthProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });
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
      <body
        className={
          (inter.variable)
        }
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
