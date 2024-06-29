"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";

interface Problem {
  title: string;
  difficulty: string;
  statement: string;
  tags: string[];
  testCases: string[];
  createdAt: string;
}

const ContestSolvingPage = (props: any) => {
  //@ts-ignore
  const problemId = props.problemId;
  const [problem, setProblem] = useState<Problem | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

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
        <Loader2 className="animate-spin mx-auto my-auto  h-8 w-8 text-white" />
      </div>
    );
  }

  const parseTestCase = (testCase: string) => {
    const [input, output] = testCase.split("],");
    return {
      input: input + "]",
      output: output.trim(),
    };
  };

  setTimeout(() => {
    setIsSubmitting(false);
    setIsRunning(false);
  }, 8000);

  return (
    <>
      <div className="flex flex-row justify-between w-screen min-h-screen h-full mx-auto overflow-x-hidden ">
        <div className="w-1/2 p-4 rounded-s-lg min-h-screen bg-gray-300 shadow-lg items-start text-start overflow-x-hidden">
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
              {problem.testCases.map((testCase, index) => {
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

        <div className="w-1/2 h-full overflow-x-hidden ">
          <CodeEditor />
        </div>
      </div>
    </>
  );
};

export default ContestSolvingPage;
