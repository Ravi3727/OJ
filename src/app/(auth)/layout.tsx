export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <body>{children}</body>
    </>
  );
}

// suppressHydrationWarning={true}