"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import { Loader2 } from "lucide-react";

interface Problem {
  statement: string;
  createdAt: Date;
  _id: string;
  problemId: string;
  language: string;
  title: string;
  status: string;
  difficulty: string;
  codeSubmisionDate: Date;
}

interface SolvedProblem {
  problemId: string;
  title: string;
  difficulty: string;
  status: string;
  codeSubmisionDate: Date;
}

interface ParticipatedContest {
  contestId: string;
  problemsSolved: SolvedProblem[];
}

interface User {
  username: string;
  email: string;
  userBio: string;
  collegeName: string;
  rating: number;
  isProblemSetter: boolean;
  QuestionsSolved: Problem[];
  ParticipatedContests: ParticipatedContest[];
}


const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setLoading(true);
        try {
          const username = session.user?.username;
          console.log("Dashboard",username);

          if (username) {
            const result = await axios.get(`/api/getUserDetails/${username}`);
            console.log("Dashboard User Details",result);
            setUser(result.data.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  if (loading || !user) {
    return <div className="flex h-screen justify-center items-center p-2 bg-black/[90] text-white my-auto">
      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
    </div>;
  }

  return (
    <div>
     <Dashboard user={user} /> 
    </div>
  );
};

export default Page;
