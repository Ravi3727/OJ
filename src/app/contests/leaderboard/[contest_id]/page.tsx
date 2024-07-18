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

  const ParticipantScores = contest.users.map((user: any) => {
    return {
      username: user.username,
      score: user.score,
    };
  });

  const sortedParticipantScores = ParticipantScores.sort(
    (a, b) => b.score - a.score
  );

  console.log("sortedParticipantScores", sortedParticipantScores);

  return (
    <div className="h-full min-h-screen w-full bg-black/[90] flex flex-col items-center py-10 px-4">
      <div className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pt-20 md:pt-40 text-center">
        Contest <span className="text-orange-500">{contest.title}</span> Leaderboard
      </div>
      <div className="w-full max-w-4xl border-2 bg-stone-800 text-center mt-10 mx-auto rounded-xl shadow-white shadow-md">
        <ul className="list-disc text-center text-white p-6">
          {sortedParticipantScores.map((user, index) => (
            <li key={index} className="mb-4 items-start text-center">
              <div className="flex flex-row justify-between px-4 md:px-10">
                <div className="text-xl text-yellow-400">{user.username}</div>
                <div className="text-xl text-yellow-400">{Number(user.score).toFixed(4)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
