"use client";

import ContestSolvingPage from "@/components/ContestSolvingPage";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Contest = {
  _id: string;
  title: string;
  description: string;
  HostedBy: string;
  problems: string[];
  createdAt: string;
  difficulty: string;
  eventDate: string;
};

const Page = () => {
  const [contest, setContest] = useState<Contest | null>(null);
  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  console.log(id);

  useEffect(() => {
    const getContestById = async () => {
      try {
        const response = await axios.get(`/api/getContest/${id}`);
        console.log("Contest by id got it", response.data.data);
        setContest(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getContestById();
  },[id]);

  if (!contest) {
    return <div><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /></div>;
  }

  return (
    <>
      <div className="min-h-screen h-full w-full flex flex-col items-center space-y-20 bg-black/[90]">
        <div className="p-4 relative z-10 w-full text-center mt-28">
          <h1 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Welcome to <span className="text-orange-500">{contest.title}</span> Hosted by <span className="text-orange-500">{contest.HostedBy}</span>
          </h1>

          <div className="mt-12 w-full min-h-screen flex flex-col items-center justify-center space-y-20 rounded-lg overflow-x-hidden">
            {contest.problems.map((problemId, index) => (
              <ContestSolvingPage problemId={problemId} key={index} contestId={id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
