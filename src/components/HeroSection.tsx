"use client";

function HeroSection() {
  return (
    <div className="h-full md:h-[40rem] w-full md:w-auto rounded-md flex flex-col items-center justify-evenly relative overflow-auto overflow-x-hidden mx-auto py-10 md:py-0 ">
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-10 md:mt-0 text-3xl md:text-6xl font-semibold md:font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-10">
          Master the art of problem solving
        </h1>
        <p className="mt-4 md:mt-4 font-normal md:text-lg text-neutral-300 max-w-lg mx-auto text-sm">
          Step into the ultimate coding arena, where each challenge ignites your
          passion and hones your problem-solving prowess, transforming every
          line of code into a masterpiece of logic and creativity
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
