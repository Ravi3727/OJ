"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
// import contests from "@/contests.json";
import Image from "next/image";
import ContestImage from "../../../public/Contest.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/Types/ApiResponse";

type Contest = {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  duration: number;
  HostedBy: string;
};

const Page = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const router = useRouter();
  const session = useSession();
  // console.log(session.data?.user.isProblemSetter);
  const isProblemSetter = session.data?.user.isProblemSetter;

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
    try {
      const response = await axios.post("/api/AddContestIdToUserContestModel/" + contestId);
      console.log("Response from AddContestIdToUserContestModel", response);
      router.replace(`/contests/${contestId}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("Error", axiosError);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen w-full">
        <div className="h-full w-full md:w-auto relative overflow-auto overflow-x-hidden mx-auto md:py-0 bg-black">
          <div className="p-4 relative z-10 w-full text-center mt-28">
            <h1 className="mt-5 md:mt-0 text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Welcome to the Coding Battles
            </h1>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-24 p-4 w-10/12 h-full mt-12 mx-auto">
          <div className="w-full mx-auto h-full flex flex-col gap-4 text-white">
            <div className="flex flex-row justify-between items-center">
              <div className="text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Upcoming Contests | Ongoing Contests
              </div>
              {isProblemSetter && (
                <div className="flex flex-row justify-center items-center">
                  <Button
                    onClick={() => router.replace("/contests/createContest")}
                  >
                    Create+
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full h-full mt-6">
              {contests
                .filter(
                  (contest) =>
                    new Date(contest.eventDate).getTime() >= Date.now()
                )
                .map((contest, index) => (
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
                ))}
            </div>
          </div>

          <div className="w-full mx-auto h-full flex flex-col gap-4 text-white">
            <div className="text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Past Contests
            </div>
            {/* Cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full h-full mt-6">
              {contests
                .filter(
                  (contest) =>
                    new Date(contest.eventDate).getTime() < Date.now()
                )
                .map((contest, index) => (
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
                          {(() => {
                            const parts = contest.eventDate.split("/");
                            const modifiedDate = `${parts[2]}/${parts[2]}/${parts[0]}`;
                            return modifiedDate;
                          })()}
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
                          onClick={() =>
                            router.replace(`/contests/${contest._id}`)
                          }
                        >
                          Participate Now
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

export default Page;
