"use client";


import ContestSolvingPage from "@/components/ContestSolvingPage";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [contest, setContests] = useState([]);
  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  console.log(id);

  useEffect(() => {
    const getContestById = async () => {
      try {
        const contest = await axios.get(`/api/getContest/${id}`);

        console.log("Contest by id go it", contest.data.data);
        setContests(contest.data.data.problems);
      } catch (err) {
        console.log(err);
      }
    };
    getContestById();
  }, [id]);

  return (
    <>
      <div className="min-h-screen h-full w-full flex flex-col items-center space-y-20 bg-black/[90]">
      <div className="p-4 relative z-10 w-full text-center mt-28">
        <h1 className=" text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Welcome to <span className="text-orange-500">{contest.title}</span> Hosted by <span className="text-orange-500">{contest.HostedBy}</span>
        </h1>

        <div className="mt-12 w-full min-h-screen flex flex-col items-center justify-center space-y-20 border-2 border-orange-500 rounded-lg overflow-x-hidden">
         {contest.map((problmeId,index) => (
            <ContestSolvingPage problemId={problmeId} key={index}/>
         ))}
      </div>
      </div>


      {/* Code editor page */}

      
      </div>
    </>
  );
};

export default Page;
