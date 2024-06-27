"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import contests from "@/contests.json";
import Image from "next/image";
import ContestImage from "../../../public/Contest.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <>
      <div className="bg-black min-h-screen w-full">
        <div className="h-full w-full md:w-auto relative overflow-auto overflow-x-hidden mx-auto md:py-0 bg-black">
          <div className="p-4 relative z-10 w-full text-center  mt-28">
            <h1 className="mt-5 md:mt-0 text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Welcome to the Coding Battles
            </h1>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-24 p-4 w-10/12 h-full mt-12 mx-auto">
          <div className="w-full mx-auto h-full flex flex-col gap-4 text-white">
            <div className=" text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Upcoming Contests
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full h-full mt-6">
              {contests.map((contest, index) => (
                <Card
                  key={index}
                  className="shadow-sm rounded-lg shadow-white overflow-hidden hover:scale-105 transition-all duration-500"
                >
                  <Image
                    src={ContestImage}
                    width={200}
                    height={150}
                    alt={contest.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="text-xl text-center p-4">
                    <CardTitle className="text-2xl font-semibold">
                      {contest.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-1">
                    <p className="text-lg text-gray-700 text-center mb-4">
                      {contest.content}
                    </p>
                    <p className="text-md text-orange-500 text-center">
                      {contest.Date} at {contest.Time}
                    </p>
                    <p className="text-md text-gray-500 text-center mt-2">
                      Hosted by {contest.author}
                    </p>
                    <div className="flex justify-center mt-2">
                      <Button>
                        <Link
                          href={contest.ContestLink}
                          className="text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Participate Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full mx-auto h-full flex flex-col gap-4 text-white">
            <div className=" text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Ongoing Contests
            </div>
            {/* Cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full h-full mt-6">
              {contests.map((contest, index) => (
                <Card
                  key={index}
                  className="shadow-sm rounded-lg shadow-white overflow-hidden hover:scale-105 transition-all duration-500"
                >
                  <Image
                    src={ContestImage}
                    width={200}
                    height={150}
                    alt={contest.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="text-xl text-center p-4">
                    <CardTitle className="text-2xl font-semibold">
                      {contest.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-1">
                    <p className="text-lg text-gray-700 text-center mb-4">
                      {contest.content}
                    </p>
                    <p className="text-md text-orange-500 text-center">
                      {contest.Date} at {contest.Time}
                    </p>
                    <p className="text-md text-gray-500 text-center mt-2">
                      Hosted by {contest.author}
                    </p>
                    <div className="flex justify-center mt-2">
                      <Button>
                        <Link
                          href={contest.ContestLink}
                          className="text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Participate Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
