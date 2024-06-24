'use client'
import { BackgroundBeams } from "./ui/background-beams";


function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full md:w-auto rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
        

      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Master the art of problem solving
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
        Step into the ultimate coding arena, where each challenge ignites your passion and hones your problem-solving prowess, transforming every line of code into a masterpiece of logic and creativity&quot;
        </p>    
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default HeroSection;
