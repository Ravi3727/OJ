"use client";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { IoMdCheckmark } from "react-icons/io";
import { TiClipboard } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TestCase {
  input: string;
  output: string;
}

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  statement: string;
  tags: string[];
  testCases: TestCase[];
  createdAt: string;
  problems: string[];
  contestId: string;
}

interface CodeEditorProps {
  problems: Problem[];
}

interface CodeSubmissionStatus {
  codeSubmisionData: any[];
  codeSubmisionDate: string;
  problemId: string;
  title: string;
  difficulty: string;
  tags: string[];
  userEmail: string;
}

const ProblemSubmitCodeEditor: React.FC<CodeEditorProps> = (props) => {
  const session = useSession();
  const [code, setCode] = useState<string>(() => getDefaultCode("java"));
  const [output, setOutput] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>("java");
  const [loading, setLoading] = useState<boolean>(false);
  const [copyCode, setCopyCode] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const problem: Problem = props.problems;
  // const contestId = props.contestId;

  //   console.log("Contest Id: " + contestId);
  const transformedTestCases = problem.testCases.map((testCase: TestCase) => {
    const input = testCase.input;
    const expectedOutput = testCase.output;
    return { input, expectedOutput };
  });

  // console.log("TransformedTestCases", transformedTestCases);

  function getDefaultCode(lang: string): string {
    switch (lang) {
      case "cpp":
        return `#include <bits/stdc++.h>
using namespace std;

int main() { 
    std::cout << "Hello World! c++"; 
    return 0; 
}`;

      case "java":
        return `import java.io.*;

class Main {
  public static void main(String[] args) {
    System.out.println("Hello World! from java");
  }
}`;

      case "py":
        return `print("Hello World! from py");`;

      case "js":
        return `function greet(name) {
    return 'Hello, ' + name + ' from js!';
}

let message = greet('World');
console.log(message); `;

      case "c":
        return `#include <stdio.h>

int main() {
    printf("Hello World! from c");
    return 0;
}`;

      default:
        return "";
    }
  }

  useEffect(() => {
    setCode(getDefaultCode(language));
    setUserEmail(session.data?.user.email || "");
  }, [language, session.data]);

  const submitCodeStatusToUser: CodeSubmissionStatus = {
    codeSubmisionData: [],
    codeSubmisionDate: new Date().toLocaleDateString("en-GB"), // Format: dd/mm/yyyy
    problemId: problem._id,
    title: problem.title,
    difficulty: problem.difficulty,
    tags: problem.tags,
    userEmail: userEmail,
  };

  const handleRun = async () => {
    if (session.status === "authenticated") {
      setLoading(true);
      const payload = {
        language,
        code,
        testCases: transformedTestCases,
      };

      try {
        const response = await axios.post("/api/onlineCompiler", payload);
        setOutput(response.data.results);
        setLoading(false);
      } catch (error: any) {
        console.error(error.response?.data);
        setLoading(false);
      }
    } else {
      toast.error("Please sign in to run your code", {
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

  const handleSubmit = async () => {
    if(session.status === "authenticated"){
      setLoading(true);
    try {
      submitCodeStatusToUser.codeSubmisionData = output;
      console.log("submitCodeStatusToUser", submitCodeStatusToUser);
      const addProblemToUser = await axios.post(
        "/api/AddSubmitedProblemsToUser",
        submitCodeStatusToUser
      );
      setLoading(false);
      toast.success("Code Submitted", {
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
    } catch (error: any) {
      console.error(error.response?.data);
      setLoading(false);
    }
    }else {
      toast.error("Please sign in to submit your code", {
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

  const highlightCode = (code: string) => (
    <SyntaxHighlighter language={language} style={darcula}>
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div className="w-full min-h-screen h-full justify-evenly flex flex-col overflow-x-hidden">
      <div className="relative h-full bg-stone-900">
        <div className="flex flex-row justify-between items-center absolute w-64 z-10 left-[61%]">
          <div className="w-full -mt-2 h-10 items-center text-center">
            {copyCode ? (
              <button className="inline-flex items-center">
                <div className="flex flex-row justify-evenly items-center mt-2">
                  <div>
                    <IoMdCheckmark className="text-white font-semibold text-xl" />
                  </div>
                  <div className="text-white font-semibold text-lg ml-1">
                    Copied!
                  </div>
                </div>
              </button>
            ) : (
              <button
                className="inline-flex items-center"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopyCode(true);
                  setTimeout(() => {
                    setCopyCode(false);
                  }, 3000);
                }}
              >
                <div className="flex flex-row justify-evenly items-center mt-2">
                  <div>
                    <TiClipboard className="text-white font-semibold text-xl" />
                  </div>
                  <div className="text-white font-semibold ml-1 font-lg">
                    Copy code
                  </div>
                </div>
              </button>
            )}
          </div>
          <div>
            <select
              className="select-box rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 border-2 border-gray-400"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="js">JavaScript</option>
              <option value="java">Java</option>
              <option value="py">Python</option>
            </select>
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto overflow-x-hidden">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightCode}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              outline: "none",
              border: "none",
              height: "100%",
              width: "730px",
              overflowY: "auto",
              marginTop: "37px",
            }}
          />
        </div>
      </div>

      {/* Buttons save and submit */}
      <div className="flex flex-row justify-evenly w-[100%] h-[92px] overflow-x-hidden">
        <div className="w-1/2">
          <Button
            className="text-white w-full rounded-e-none h-16"
            onClick={handleRun}
          >
            Run
          </Button>
        </div>
        <div className="w-1/2">
          <Button
            className="text-white w-full rounded-s-none h-16"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Output Box */}
      <div className="outputbox bg-stone-800 h-44 overflow-auto rounded-b-md shadow-md p-4 w-full mx-auto">
        {loading ? (
          <div>
            <Loader2 className="animate-spin mx-auto my-auto h-8 w-8 text-white" />
          </div>
        ) : (
          <div
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
            }}
            className="text-white text-lg font-semibold leading-10 text-start"
          >
            {output.map((result, index) => (
              <div
                key={index}
                className="flex flex-row justify-wrap w-full overflow-x-hidden"
              >
                <p className="text-white text-lg font-semibold leading-10 text-start">
                  TC:{index + 1} -&gt; {result.passed ? "Passed" : "Failed"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProblemSubmitCodeEditor;
