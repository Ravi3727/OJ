"use client";

import Image from "next/image";
import codeImage from "../../public/ProblemTable.png";
function HeroSection3() {
  return (
    <>
      <div className="p-2 md:p-4  w-full text-center">
        <h1 className="mt-10 md:mt-0 text-2xl md:text-6xl md:font-semibold font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Explore Innovation Problem Set 
        </h1>
      </div>

      <div
        className="h-full md:h-screen w-full md:w-auto flex flex-col items-center justify-evenly overflow-auto overflow-x-hidden mx-auto md:py-0 mt-10 md:mt-28"
      >
        <div className="w-full md:w-10/12 h-full md:h-screen flex flex-col md:flex-row items-center justify-evenly mx-auto hover:border-0 border-t-black border-l-black  rounded-xl md:rounded-2xl  hover:shadow-lg hover:shadow-orange-500 mb-20">
          <div className="w-full md:w-1/3 h-full flex flex-col items-start justify-start p-4">
          <div className="text-lg md:text-2xl font-semibold md:font-bold text-yellow-600 leading-5 md:leading-10 ">Customizable Table</div>
          <div className="text-xl md:text-4xl text-white font-bold md:font-extrabold leading-6 md:leading-12 mt-4">Pick challenges from your customizable problem set table </div>
          <div className="text-sm md:text-xl text-white items-start justify-start mt-2 md:mt-4">Whether you&apos;re fine-tuning your problem solving skills or exploring new problems, Quick Compiler simplifies the coding process, making it faster and more accessible for every problem solver</div>
          </div>
          <div className="w-[80%] md:w-1/2 mt-12 md:mt-0 h-full p-1 md:p-4">
            <Image
             src={codeImage}
             width={1000}
             height={2000}
             alt="Picture of the author"
             className="rounded-lg md:rounded-xl shadow-sm shadow-red-500"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection3;