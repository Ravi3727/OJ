"use client";
import * as React from "react";

import {
  Card,
  CardContent,
 
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/Types/ApiResponse";
import { useSession } from "next-auth/react";
type Contest = {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  duration: number;
  HostedBy: string;
};
const ContestCarousel = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const router = useRouter();
  const session = useSession();
  // console.log("session", session);
  useEffect(() => {
    const getAllContests = async () => {
      try {
        if (!contests.length) {
          const contest = await axios.get("/api/getContests");
          console.log("Contest", contest.data.data);
          setContests(contest.data.data);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.log("Error", axiosError);
      }
    };

    getAllContests();
  }, [contests]);


  const handleParticipateContest = async (contestId: string) => {
   if(session.status === "authenticated"){

   
    try {
      const response = await axios.post("/api/AddContestIdToUserContestModel/" + contestId);
      console.log("Response from AddContestIdToUserContestModel", response);
      router.replace(`/contests/${contestId}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("Error", axiosError);
    }

  }else{
    router.replace("/signIn");
  }
  };
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
                        {contest.description}
                      </p>
                      <div className="flex flex-row justify-evenly p-2 mt-2">
                        <p className="text-md text-orange-500 text-center">
                          {/* {contest.eventDate.split("T")[0]} */}
                          <div>
                            {(() => {
                              const formattedDate =
                                contest.eventDate.split("T")[0]; // '2024-07-01'
                              const parts = formattedDate.split("-"); // ['2024', '07', '01']
                              const modifiedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // '01-07-2024'
                              return modifiedDate;
                            })()}
                          </div>
                        </p>
                        <p className="text-md text-orange-500 text-center">
                          {contest.duration} minutes
                        </p>
                      </div>
                      <p className="text-md text-gray-500 text-center mt-2">
                        Hosted by {contest.HostedBy}
                      </p>
                      <div className="flex justify-center mt-2">
                        <Button
                          className=""

                          onClick={() => handleParticipateContest(contest._id)}
                        >
                          Participate Now
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
