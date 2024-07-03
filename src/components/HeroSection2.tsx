"use client";

import Image from "next/image";
import codeImage from "../../public/secondCode.png";
function HeroSection2() {
  return (
    <>
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Explore Innovation FruitboxFlex and Quick Compiler
        </h1>
      </div>

      <div className="h-screen  w-10/12 md:w-auto flex flex-col items-center justify-evenly relative overflow-auto overflow-x-hidden mx-auto md:py-0 py-4">
        <div className="w-10/12  h-screen flex flex-row items-center justify-evenly mx-auto  rounded-2xl    hover:shadow-lg hover:shadow-orange-500 mb-12">
          <div className="w-1/3 h-full flex flex-col items-start justify-start p-4">
            <div className="text-2xl font-bold text-yellow-600 leading-10 ">
              Quick Compiler
            </div>
            <div className="text-4xl text-white font-extrabold leading-12 mt-4">
              Code On-the-Go with Quick Compiler
            </div>
            <div className="text-xl text-white items-start justify-start mt-4">
              Whether you&apos;re fine-tuning your code or exploring new languages,
              Quick Compiler simplifies the coding process, making it faster and
              more accessible for every developer
            </div>
          </div>
          <div className="w-1/2 h-full p-4">
            <Image
              src={codeImage}
              width={1000}
              height={1000}
              alt="Picture of the author"
              className="rounded-xl shadow-lg shadow-yellow-300"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection2;
