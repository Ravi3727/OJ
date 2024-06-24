"use client";

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-2 bg-black/[90] text-white">
        <HeroSection/>
      </div>
    </>
  );
}
