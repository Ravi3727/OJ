"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Contest = {
  _id: string;
  title: string;
  description: string;
  HostedBy: string;
  problems: string[];
  createdAt: string;
  difficulty: string;
  eventDate: string;
  duration: number;
  users: string[];
};
const Page = () => {
  const params = useParams();
  const contest_id = params.contest_id;
  const [contest, setContest] = useState<Contest | null>(null);
  useEffect(() => {
    const getContestById = async () => {
      try {
        const response = await axios.get(`/api/getContest/${contest_id}`);
        console.log("Contest by id got it", response);
        setContest(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (contest_id) {
      getContestById();
    }
  }, [contest_id]);

  if (!contest) {
    return <div>Loading...</div>;
  }

  const ParticipantScors = contest.users.map((user: any) => {
    return {
      username: user.username,
      score: user.score,
    };
  });
  const sortedParticipantScors = ParticipantScors.sort(
    (a, b) => b.score - a.score
  );
  console.log("sortedParticipantScors", sortedParticipantScors);
  return (
    <div className="h-full min-h-screen w-full bg-black/[90] ">
      <div className=" md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pt-40 ml-[18rem]">
        Contest <span className="text-orange-500">{contest.title}</span>{" "}
        Leaderboard{" "}
      </div>
      <div className="p-4 w-6/12 border-2 bg-stone-800 text-center mt-10 mx-auto rounded-xl shadow-white shadow-md">
        <ul className="list-disc text-center text-white p-4">
          {sortedParticipantScors.map((user, index) => (
            <li key={index} className="mb-4 items-start text-center">
              <div className="flex flex-row justify-between">
                <div className="text-xl text-yellow-400">{user.username}</div>
                <div className="text-xl text-yellow-400">{user.score}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
