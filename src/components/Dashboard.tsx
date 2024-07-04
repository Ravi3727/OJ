"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";

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

interface ContestSolved {
  _id: string;
  title: string;
  HostedBy: string;
  description: string;
  difficulty: string;
  duration: string;
  eventDate: string;
  problems: string[];
}

interface UserProfileProps {
  user: User;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Dashboard: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(user.userBio);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddedProblems, setUserAddedProblems] = useState<Problem[]>([]);
  const [contestSolved, setContestSolved] = useState<ContestSolved[]>([]);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const saveBio = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/updateBio", {
        bio: newBio,
        email: user.email,
      });
      console.log(res);
      if (res.status) {
        toast.success("Bio updated successfully", {
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
        setIsSubmitting(false);
      }
      user.userBio = newBio;
      setIsEditingBio(false);
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
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getUserAddedProblems = async () => {
      try {
        const res = await axios.get(`/api/problemAddedByUser/${user.username}`);
        console.log("response Problem added by user ", res.data.data);
        setUserAddedProblems(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const getUserContestsSolved = async () => {
      try {
        // Fetch contest data only if user has participated in contests
        if (user.ParticipatedContests.length > 0) {
          const contests = await Promise.all(
            user.ParticipatedContests.map(async (contest) => {
              const res = await axios.get(`/api/getContest/${contest.contestId}`);
              return res.data.data;
            })
          );
          setContestSolved(contests);
        }
      } catch (error) {
        console.log(`Contest not found`, error);
      }
    };

    getUserContestsSolved();
    getUserAddedProblems();
  }, [user.ParticipatedContests, user.username]);

  console.log("user question solved ", user.QuestionsSolved);
  console.log("user contest solved ", contestSolved);
  console.log("user Problems added ", userAddedProblems);

  return (
    <div className="p-8 bg-gray-900 min-h-screen h-full text-white">
      <div className="w-10/12 mx-auto bg-gray-800 rounded-lg p-6 mt-28 shadow-md h-full">
        <div className="flex items-center justify-center mx-auto mb-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-md ">{user.collegeName}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          {isEditingBio ? (
            <div className="w-full">
              <textarea
                value={newBio}
                onChange={handleBioChange}
                className="w-full p-2 border rounded text-black font-semibold"
              />
              <div className="flex justify-end mt-2">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-400"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={saveBio}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="ml-2 bg-gray-600 text-white py-2 px-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full p-1">
              <p>{user.userBio ? user.userBio : "No bio available."}</p>
              <button
                onClick={() => setIsEditingBio(true)}
                className="mt-2 text-white py-1 px-3 rounded text-2xl"
              >
                <MdOutlineEdit />
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <p className="text-xl">
            {
              user.QuestionsSolved.filter(
                (problem) => problem.status === "Accepted"
              ).length
            }
          </p>
        </div>

        {/* Problem Solved */}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Problems Solved</h2>
          {user.QuestionsSolved.length > 0 ? (
            <ul className="list-disc pl-5">
              {user.QuestionsSolved.map((problem, index) => (
                <li key={index} className="mb-2">
                  <div className="grid grid-cols-6 lg:gap-x-36 md:gap-x-12  items-center p-2 rounded-lg bg-black/[70]">
                    <div
                      className={`font-bold items-start ${
                        problem.difficulty === "Easy"
                          ? "text-green-500"
                          : problem.difficulty === "Medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {problem.title}
                    </div>
                    <div className="items-start">{problem.difficulty}</div>
                    <div
                      className={`items-start text-${
                        problem.status === "Accepted" ? "green-500" : "red-600"
                      }`}
                    >
                      {problem.status}
                    </div>
                    <div>
                      {(() => {
                        const formattedDate = formatDate(
                          problem.codeSubmisionDate.toString()
                        );
                        const parts = formattedDate.split("/");
                        const modifiedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
                        return modifiedDate;
                      })()}
                    </div>

                    <div>{problem.language}</div>
                    <div className="items-start">
                      <Link href={`/solveProblem/${problem.problemId}`}>
                        <Button>Solve</Button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No problems solved yet.</p>
          )}
        </div>

        {/* Contest Solved Data */}
        <div className="mb-6 mt-10">
          <h2 className="text-xl font-semibold mb-2">Contests Participated</h2>
          {user.ParticipatedContests.length > 0 ? (
            user.ParticipatedContests.map((contest) => (
              <div
                key={contest.contestId}
                className="mb-4 border-1 rounded-lg shadow-md "
              >
                <div className="flex flex-row justify-between items-center p-2 rounded-lg ">
                  <div>
                    <h4 className="mt-4 text-orange-500">
                      Contest Name:{" "}
                      {contestSolved.find((c) => c._id === contest.contestId)
                        ?.title || ""}
                    </h4>
                  </div>
                  <div>
                    <Link href={`/contests/${contest.contestId}`}>
                      <Button>View Contest</Button>
                    </Link>
                  </div>
                </div>
                <h5 className="mt-4 mb-4 ">Contest problems</h5>
                <ul className="list-disc pl-5">
                  {contest.problemsSolved.length > 0 ? (
                    contest.problemsSolved.map((problem) => (
                      <li key={problem.problemId} className="mb-2">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div
                            className={`font-bold items-start ${
                              problem.difficulty === "Easy"
                                ? "text-green-500"
                                : problem.difficulty === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {problem.title}
                          </div>
                          <div className="items-start">
                            {problem.difficulty}
                          </div>
                          <div
                            className={`items-start text-${
                              problem.status === "Accepted"
                                ? "green-500"
                                : "red-600"
                            }`}
                          >
                            {problem.status}
                          </div>
                          <div>
                            {(() => {
                              const formattedDate = formatDate(
                                problem.codeSubmisionDate.toString()
                              );
                              const parts = formattedDate.split("/");
                              const modifiedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
                              return modifiedDate;
                            })()}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No problems solved in this contest yet.</p>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p>No contests participated yet.</p>
          )}
        </div>

        {/* Problems Added By You */}

        {userAddedProblems.length > 0 ? (
          <ul className="list-disc pl-5">
            {userAddedProblems.map((problem, index) => (
              <li key={index} className="mb-2">
                <div className="flex flex-row justify-between items-center p-2 rounded-lg bg-black bg-opacity-50">
                  <div className="items-start max-w-[20%] text-red-600">
                    {problem.title}
                  </div>
                  <div className="items-start max-w-[40%] overflow-x-hidden text-red-500 overflow-y-auto">
                    {problem.statement}
                  </div>
                  <div
                    className={`font-bold max-w-[15%] items-start ${
                      problem.difficulty === "Easy"
                        ? "text-green-500"
                        : problem.difficulty === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {problem.difficulty}
                  </div>
                  <div className="items-start max-w-[15%]">
                    {formatDate(problem.createdAt.toString())}
                  </div>
                  <div>
                    <Link href={`/editProblemui/${problem._id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No problems added yet.</p>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
