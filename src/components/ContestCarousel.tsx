"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import "aos/dist/aos.css";
import Image from "next/image";
import ContestImage from "../../public/contestDemo.png";
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

  useEffect(() => {
    const getAllContests = async () => {
      try {
        if (contests.length === 0) {
          const response = await axios.get("/api/getContests");
          // console.log("Contest", response.data.data);
          setContests(response.data.data);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.log("Error fetching contests", axiosError);
      }
    };

    getAllContests();
  }, [contests]);

  const handleParticipateContest = async (contest_id: string) => {
    try {
      const response = await axios.post(
        "/api/AddContestIdToUserContestModel/" + contest_id
      );
      console.log("Response from AddContestIdToUserContestModel", response);

      if (response.status === 200) {
        router.replace(`/contests/${contest_id}`);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("Error participating in contest", axiosError);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col ">
        <div
          className="p-2 md:p-4 md:w-10/12 h-60 items-center justify-center md:mx-auto "
        >
          <h1 className="mt-10 md:mt-0 text-3xl md:text-6xl font-semibold md:font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-10">
            Dive into the world of coding challenges
          </h1>
        </div>

        <div className="md:w-[80%] w-full mx-auto">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full md:max-w-4xl w-2xl md:mx-auto"
          >
            <CarouselContent>
              {contests.map((contest, index) => (
                <CarouselItem key={index}>
                  <div className="max-h-[70vh] w-full md:w-full p-2">
                    <Card
                      key={index}
                      className="shadow-sm rounded-lg shadow-white overflow-hidden hover:scale-105 transition-all duration-500"
                    >
                      <Image
                        src={ContestImage}
                        width={200}
                        height={150}
                        alt={contest.title}
                        className="w-full h-32 md:h-48 object-cover"
                      />
                      <CardHeader className="text-lg md:text-xl text-center p-2 md:p-4">
                        <CardTitle className="text-xl md:text-2xl font-semibold">
                          {contest.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-1">
                        <p className="text-sm md:text-lg text-gray-700 text-center mb-4">
                          {contest.description}
                        </p>
                        <div className="flex flex-col md:flex-row justify-evenly p-2 mt-2">
                          <p className="text-sm md:text-md text-orange-500 text-center">
                            {(() => {
                              const formattedDate =
                                contest.eventDate.split("T")[0]; // '2024-07-01'
                              const parts = formattedDate.split("-"); // ['2024', '07', '01']
                              const modifiedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // '01-07-2024'
                              return modifiedDate;
                            })()}
                          </p>
                          <p className="text-sm md:text-md text-orange-500 text-center">
                            {contest.duration} minutes
                          </p>
                        </div>
                        <p className="text-sm md:text-md text-gray-500 text-center mt-2">
                          Hosted by {contest.HostedBy}
                        </p>
                        <div className="flex justify-center mt-2">
                          <Button
                            className=""
                            onClick={() =>
                              handleParticipateContest(contest._id)
                            }
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
      </div>
    </>
  );
};

export default ContestCarousel;
