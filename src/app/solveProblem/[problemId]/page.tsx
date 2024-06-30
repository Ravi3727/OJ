"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";

interface Problem {
  title: string;
  difficulty: string;
  statement: string;
  tags: string[];
  testCases: { input: string; expectedOutput: string }[];
  createdAt: string;
}

const ProblemPage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getProblemsById = async () => {
      try {
        const res = await axios.get(`/api/getproblembyid/${problemId}`);
        setProblem(res.data.data);
      } catch (error: any) {
        setErrorMsg(error.message || "Error fetching problem by Id");
      }
    };
    getProblemsById();
  }, [problemId]);

  if (!problem) {
    return (
      <div className="text-center flex bg-black items-center justify-center h-screen my-auto mx-auto ">
        <Loader2 className="animate-spin mx-auto my-auto h-8 w-8 text-white" />
      </div>
    );
  }

  const parseTestCase = (testCase: { input: string; expectedOutput: string }) => {
    return {
      input: testCase.input,
      output: testCase.expectedOutput?.trim(),
    };
  };

  return (
    <>
      <div className="flex flex-row justify-center gap-2 p-3 w-full min-h-screen overflow-x-hidden bg-black/[90]">
        <div className="flex flex-row justify-between w-[98%] min-h-screen h-full overflow-x-hidden mx-auto mt-28">
          <div className="w-1/2 p-6 bg-gray-300 shadow-lg rounded-md overflow-auto">
            <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
            <div className="mb-6">
              <p
                className={`inline-block border-1 rounded-lg bg-${
                  problem.difficulty === "Easy"
                    ? "green-200"
                    : problem.difficulty === "Medium"
                    ? "yellow-200"
                    : "red-200"
                } rounded-full px-3 py-1 text-sm font-semibold text-${
                  problem.difficulty === "Easy"
                    ? "green-500"
                    : problem.difficulty === "Medium"
                    ? "yellow-500"
                    : "red-500"
                } `}
              >
                {problem.difficulty}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
              <p className="whitespace-pre-line">{problem.statement}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <ul className="list-disc list-inside">
                {problem.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
              <ul className="list-disc list-inside">
                {problem.testCases.length > 2
                  ? [...Array(2)].map((_, i) => {
                      const { input, output } = parseTestCase(
                        problem.testCases[i]
                      );
                      return (
                        <li key={i} className="mb-1">
                          <strong>Input:</strong> {input} <br />
                          <strong>Output:</strong> {output}
                        </li>
                      );
                    })
                  : problem.testCases.map((testCase, index) => {
                      const { input, output } = parseTestCase(testCase);
                      return (
                        <li key={index} className="mb-1">
                          <strong>Input:</strong> {input} <br />
                          <strong>Output:</strong> {output}
                        </li>
                      );
                    })}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Added At</h3>
              <p>{new Date(problem.createdAt).toLocaleDateString()}</p>
            </div>
            {errorMsg && <div className="text-red-500 mt-4">{errorMsg}</div>}
          </div>

          <div className="w-1/2 rounded-t-lg bg-white-400 overflow-auto">
            <CodeEditor testCases={problem.testCases} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
