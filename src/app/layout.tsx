import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto, Arizonia, Great_Vibes, Meow_Script } from "next/font/google";
import AuthProvider from "@/Context/AuthProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });
const Meow_Script_init = Meow_Script({subsets: ["latin"],
  weight: "400",
  variable: "--Meow_Script_init",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--roboto",
});
const Arizonia_init = Arizonia({
  subsets: ["latin"],
  weight: "400",
  variable: "--Arizonia_init",
});

const Great_Vibes_init = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--Great_Vibes_init",
});
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
          (inter.variable,
          Great_Vibes_init.variable,
          Arizonia_init.variable,
          roboto.variable,Meow_Script_init.variable
        )
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
