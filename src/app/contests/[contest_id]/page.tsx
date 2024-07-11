"use client";

import ContestSolvingPage from "@/components/ContestSolvingPage";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContestTimer from "@/components/ContestTimer";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
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
};

const Page = () => {
  const router  = useRouter();
  const session = useSession();
  const [contest, setContest] = useState<Contest | null>(null);
  const params = useParams();
  const contest_id = params.contest_id;
  const [username, setUserName] = useState<string>("");
  const [userEmail, setuserEmail] = useState<string>("");

  useEffect(() => {
    if (session.data?.user.username && session.data?.user.email) {
      setuserEmail(session.data.user.email);
      setUserName(session.data.user.username);
    }
  }, [session.data]);

  useEffect(() => {
    const getContestById = async () => {
      try {
        const response = await axios.get(`/api/getContest/${contest_id}`);
        console.log("Contest by id got it", response.data.data);
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

  const handleSubmitContest = async () => {
    const uniqueId = contest_id + userEmail;
    const score = localStorage.getItem(uniqueId);
    const response = await axios.post(`/api/submitContest/${contest_id}`, {
      score,
      username,
    });
    console.log(response);
    localStorage.setItem(uniqueId, (0).toString());
    router.replace(`/contests/leaderboard/${contest_id}`);
  };

  return (
    <>
      <div className="min-h-screen h-full w-full flex flex-col items-center space-y-20 bg-black/[90]">
        <div className="p-4 relative z-10 w-full text-center mt-28">
          <h1 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Welcome to <span className="text-orange-500">{contest?.title}</span>{" "}
            Hosted by{" "}
            <span className="text-orange-500">{contest?.HostedBy}</span>
            <div>
              <ContestTimer initialTime={contest?.duration} />
            </div>
            <div>
              <Button onClick={handleSubmitContest}>Submit</Button>
            </div>
          </h1>

          <div className="mt-12 w-full min-h-screen flex flex-col items-center justify-center space-y-20 rounded-lg overflow-x-hidden">
            {contest?.problems.map((problemId, index) => (
              <ContestSolvingPage
                problemId={problemId}
                key={index}
                contestId={contest_id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
