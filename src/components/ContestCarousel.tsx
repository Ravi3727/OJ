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
import ContestImage from "../../public/Contest.png"
import Link from "next/link";
import { Button } from "./ui/button";

const ContestCarousel = () => {
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="p-4 w-10/12 h-full items-center justify-center mx-auto"
      >
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center">
          Dive into the world of coding challenges
        </h1>
      </div>

      <div className="mb-10">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {contests.map((contest, index) => (
              <CarouselItem key={index}>
                <div className="max-h-[70vh] p-4 ">
                  <Card className="shadow-lg rounded-lg shadow-white overflow-hidden">
                  <Image
                      src={ContestImage}
                      width={350}
                      height={300}
                      alt={contest.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader className="text-xl text-center p-4">
                      <CardTitle className="text-2xl font-semibold">{contest.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-1">
                      <p className="text-lg text-gray-700 text-center mb-4">{contest.content}</p>
                      <p className="text-md text-orange-500 text-center">{contest.Date} at {contest.Time}</p>
                      <p className="text-md text-gray-500 text-center mt-2">Hosted by {contest.author}</p>
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default ContestCarousel;
