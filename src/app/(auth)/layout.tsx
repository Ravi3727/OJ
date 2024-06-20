import { trusted } from "mongoose";

export const metadata = {
  title: "OJ",
  description: "Real plateform for programers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
