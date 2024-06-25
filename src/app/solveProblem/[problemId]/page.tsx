"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import  CodeEditor  from "@/components/CodeEditor";
const ProblemPage = () => {
  //@ts-ignore
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    const getProblemsById = async () => {
      try {
        const res = await axios.get(`/api/getproblembyid/${problemId}`);
        setProblem(res.data.data);
      } catch (error) {
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

  const parseTestCase = (testCase) => {
    const [input, output] = testCase.split("],");
    return {
      input: input + "]",
      output: output.trim(),
    };
  };

  setTimeout(() => {
    setIsSubmiting(false);
    setIsRunning(false);
  }, 8000);



  return (
    <>
      <div className="flex flex-row justify-center gap-2 p-3 w-full min-h-10 overflow-x-hidden bg-black/[90]">
        <div className="w-32 h-8 flex flex-row justify-center items-center mt-28 ng-black">
        <div className="text-black  opacity-90 font-sans font-medium ">
          <Button
            className="bg-gray-400-800 bg-gray-500 text-white hover:bg-gray-600 focus:outline-none rounded-e-none"
            type="submit"
            disabled={isRunning}
            onClick={()=>setIsRunning(true)}
          >
            {isRunning ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                Runing
              </>
            ) : (
              "Run"
            )}
          </Button>
        </div>
        <div className="text-black opacity-90 font-sans font-medium ">
          <Button
            className="bg-gray-400-800 bg-gray-500 text-white hover:bg-gray-600 focus:outline-none rounded-s-none"
            type="submit"
            disabled={isSubmiting}
            onClick={()=>setIsSubmiting(true)}
          >
            {isSubmiting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                Submiting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
        </div>
      </div>



      <div className="w-full h-[2px] bg-gray-700 font-semibold"></div>


      <div className="flex flex-row justify-between w-full min-h-screen h-full overflow-x-hidden">
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

        <div className="w-1/2 bg-white-400  overflow-auto ">
          <CodeEditor/>
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
