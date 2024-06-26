import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning = {true}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
