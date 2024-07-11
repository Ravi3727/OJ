"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

interface Application {
  username: string;
  leetCode: string;
  codeForces: string;
  codeCheaf: string;
  other: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { username2 } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/getApplications`);
        console.log("response Problem added by user ", res.data.data);
        setApplications(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchData = async () => {
      if (session) {
        setLoading(true);
        try {
          const username = session.user?.username;
          // console.log("Dashboard", username);

          if (username) {
            const result = await axios.get(`/api/getUserDetails/${username}`);
            // console.log("Dashboard User Details", result);
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
    if (session?.user.Admin === true) {
      fetchApplications();
    }
  }, [session]);

  if (loading || !user) {
    return (
      <div className="flex h-screen justify-center items-center p-2 bg-black/[90] text-white my-auto">
        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Dashboard user={user} />
      </div>

      {session?.user.Admin && (
        <div className="w-full h-full bg-black/[90] flex flex-col justify-center items-center ">
          <div className="w-10/12 text-white text-2xl font-bold leading-6 mx-auto bg-stone-600 rounded-lg p-6 mt-4 shadow-md h-full">
            Problems Setter Applications
          </div>
          {applications.length > 0 ? (
            <div className="w-10/12 h-full">
              <div className="w-full h-full">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="w-11/12 p-4 text-white text-lg leading-6 bg-stone-600 mx-auto flex flex-row justify-evenly items-center rounded-xl mt-4 mb-6 h-16"
                  >
                    <div className="text-orange-500">{app.username}</div>
                    <div className="">
                      <Link href={app.leetCode} target="_blank">
                        {app.leetCode !== "" ? "LeetCode Profile" : "not given"}
                      </Link>
                    </div>
                    <div className="">
                      <Link href={app.codeForces} target="_blank">
                        {app.codeForces !== ""
                          ? "CodeForces Profile"
                          : "not given"}
                      </Link>
                    </div>

                    <div>
                      <Link href={app.codeCheaf} target="_blank">
                        {app.codeCheaf !== ""
                          ? "CodeCheaf Profile"
                          : "not given"}
                      </Link>
                    </div>
                    <div>
                      <Link href={app.other} target="_blank">
                        {app.other !== "" ? "other Profile" : "not given"}
                      </Link>
                    </div>

                    <div>
                      <Button  onClick={()=> router.replace(`/dashboard/${app.username}`)}>
                        verify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-10/12 text-white text-2xl font-bold leading-6 mx-auto bg-gray-800 rounded-lg p-6 mt-4 shadow-md  h-24 mb-4 ">
              No applications found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
