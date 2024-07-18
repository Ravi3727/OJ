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
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {sendProblemSetterResultEmail} from "@/helpers/sendProblemSetterResultEmail";
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
  verified: boolean;
  
}

const Page: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/api/getApplications`);
      console.log("response Problem added by user ", res.data.data);
      setApplications(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
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

  const handelProblemSetterVarification = async (username: string) => {
    try {
      const res = await axios.post("/api/problemSetterVerification", {
        username,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Problem Setter Verification Successful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchApplications();
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };


  const rejectingApplication = async (username: string) => {
    console.log(username);
    try {
      const email = session?.user.email;
      const res = await axios.post("/api/rejectionProblemSeter", {
        username, email, result:false,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Application Rejected Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchApplications();
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };


  const removeProblemSetter = async (username: string) => {
    try {
      const res = await axios.post("/api/removeProblemSetter", {
        username,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Problem Setter Removed Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchApplications();
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen justify-center items-center p-2 bg-black/[90] text-white my-auto">
        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-hidden">
        <Dashboard user={user} />
      </div>


{/* Problem Setter Applications */}
      {session?.user.Admin && (
        <div className="w-full h-full bg-black/[90] flex flex-col overflow-x-hidden justify-center items-center ">
          <div className="w-10/12 text-white text-xl md:text-2xl font-bold leading-6 mx-auto bg-stone-600 rounded-lg p-6 mt-4 shadow-md h-full">
           Problem Setter Application
          </div>
          {applications.length > 0 ? (
            <div className="w-full md:w-10/12 h-full">
              <div className="w-full h-full">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="overflow-x-auto md:overflow-x-hidden w-11/12 p-4  text-white text-sm md:text-lg leading-6 bg-stone-600 mx-auto flex flex-row justify-evenly md:gap-0 gap-4 items-center rounded-md md:rounded-xl mt-4 mb-6 h-full"
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
                      <Button
                        onClick={() =>
                          router.replace(`/dashboard/${app.username}`)
                        }
                      >
                        Visit
                      </Button>
                    </div>

                    {app.verified === false && <div>
                      <Button
                        onClick={() =>
                          handelProblemSetterVarification(app.username)
                        }
                      >
                        Allow
                      </Button>
                    </div>}

                    {app.verified === false && <div>
                      <Button
                        onClick={() =>
                          rejectingApplication(app.username)
                        }
                      >
                        Reject
                      </Button>
                    </div>}

                    {
                      app.verified === true && <div>
                        <Button
                          onClick={() =>
                            removeProblemSetter(app.username)
                          }
                        >
                          Remove from PS
                        </Button>
                      </div>
                    }
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


      <ToastContainer />
    </>
  );
};

export default Page;
