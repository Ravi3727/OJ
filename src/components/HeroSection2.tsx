"use client";

import Image from "next/image";
import codeImage from "../../public/secondCode.png";
function HeroSection2() {
  return (
    <>
      <div className="p-4 w-full md:w-10/12 text-center">
        <h1 className="mt-10 md:mt-0 text-2xl  md:text-6xl md:font-semibold font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Explore Innovation FruitboxFlex and Quick Compiler
        </h1>
      </div>

      <div className="h-full w-full md:w-auto flex flex-col items-start md:items-center justify-start md:justify-evenly overflow-auto overflow-x-hidden mx-auto md:py-0 py-4">
        <div className="w-full md:w-10/12 h-full md:h-screen flex flex-col md:flex-row items-center justify-evenly mx-auto  rounded- lg md:rounded-2xl hover:shadow-lg hover:shadow-orange-500 md:mb-12">
          <div className="w-full md:w-1/3 h-full flex flex-col items-start justify-start p-2 md:p-4">
            <div className="md:text-2xl text-lg font-bold text-yellow-600 leading-10 ">
              Quick Compiler
            </div>
            <div className="md:text-4xl text-2xl text-white font-semibold md:font-extrabold mt-2 md:mt-4">
              Code On-the-Go with Quick Compiler
            </div>
            <div className="text-sm md:text-xl text-white items-start justify-start mt-2 md:mt-4 w-full">
              Whether you&apos;re fine-tuning your code or exploring new languages,
              Quick Compiler simplifies the coding process, making it faster and
              more accessible for every developer
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full p-4">
            <Image
              src={codeImage}
              width={1000}
              height={1000}
              alt="Picture of the author"
              className="rounded-lg md:rounded-xl shadow-sm md:shadow-lg shadow-yellow-300"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection2;
