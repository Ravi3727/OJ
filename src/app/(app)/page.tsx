"use client";

import HeroSection from "@/components/HeroSection";
import HeroSection2 from "@/components/HeroSection2";
import { BackgroundBeams } from "../../components/ui/background-beams";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection3 from "@/components/HeroSecton3";
import ContestCarousel from "@/components/ContestCarousel";
import Fottor from "@/components/Fottor";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="flex min-h-screen h-full flex-col items-center justify-between p-2 bg-black/[90] text-white">
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="flex min-h-screen flex-col items-center justify-between p-2 bg-black/[90] text-white"
        >
          <HeroSection />
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="h-screen w-full flex flex-col items-center justify-center space-y-20"
        >
          <HeroSection2 />
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="h-screen w-full flex flex-col items-center justify-center space-y-20"
        >
          <HeroSection3 />
        </div>
        <div className="h-screen w-full flex flex-col items-center justify-center space-y-20">
          <ContestCarousel />
        </div>
        <div className="h-[24rem] w-full mt-20 mb- 16 mb-flex flex-col items-center justify-center space-y-20">
          <Fottor />
        </div>
      </div>
      <BackgroundBeams />
    </>
  );
};

export default Home;
