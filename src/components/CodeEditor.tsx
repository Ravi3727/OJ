"use client";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
  problems: Problem;
  contestId: string;
}

interface CodeSubmissionStatus {
  codeSubmisionData: any[];
  codeSubmisionDate: string;
  problemId: string;
  title: string;
  difficulty: string;
  tags: string[];
  userEmail: string;
  contestId: string;
  // language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problems, contestId }) => {
  const session = useSession();
  const [language, setLanguage] = useState<string>("cpp");
  const [code, setCode] = useState<string>(() => {
    const savedCode = localStorage.getItem(language);
    return savedCode ? savedCode : getDefaultCode(language);
  });
  const [output, setOutput] = useState<any[]>([]);
  const [CompileError, setCompileError] = useState<string>("");

  const [loadingRun, setloadingRun] = useState<boolean>(false);
  const [loadingSubmit, setloadingSubmit] = useState<boolean>(false);
  const [copyCode, setCopyCode] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const problem: Problem = problems;

  useEffect(() => {
    if (session.data?.user.email) {
      setUserEmail(session.data.user.email);
    }
  }, [session.data]);

  useEffect(() => {
    const savedCode = localStorage.getItem(language);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(getDefaultCode(language));
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem(language, code);
  }, [language, code]);

  const transformedTestCases = problem.testCases.map((testCase: TestCase) => {
    const input = testCase.input;
    const expectedOutput = testCase.output;
    return { input, expectedOutput };
  });

  localStorage.removeItem("userCode");

  setTimeout(() => {
    localStorage.removeItem("py");
    localStorage.removeItem("cpp");
    localStorage.removeItem("js");
    localStorage.removeItem("java");
    localStorage.removeItem("c");
  }, 1000 * 60 * 60 * 5);

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

  const submitCodeStatusToUser: CodeSubmissionStatus = {
    codeSubmisionData: [],
    // codeSubmisionDate: new Date().toLocaleDateString("en-GB"),
    codeSubmisionDate: new Date().toISOString(),
    problemId: problem._id,
    title: problem.title,
    difficulty: problem.difficulty,
    tags: problem.tags,
    userEmail: userEmail,
    contestId: contestId,
    // language: "",
  };
  const payload = {
    language,
    code,
    testCases: transformedTestCases,
  };

  // Run code 
  const handleRun = async () => {
    if (session.status === "authenticated") {
      setloadingRun(true);

      try {
        const response = await axios.post(
          // "https://aws.ravikant.tech/execute",
          "http://localhost:8000/execute",
          payload
        );

        if (response.data.results[0].passed === false) {
          switch (response.data.results[0].language) {
            case "cpp" || "c":
              const errorMessagecp = response.data.results[0].actualOutput;
              const errorRegexcp = /\.cpp:(\d+:\d+: .*)/;
              // Extract the error message
              const matchcp = errorMessagecp.match(errorRegexcp);
              const errorCppMessage = matchcp
                ? matchcp[1]
                : "Something went wrong, please check your code";

              console.log("Error Message CPP", errorCppMessage);

              if (errorCppMessage.length > 0) {
                setCompileError(errorCppMessage);
              } else {
                setOutput(response.data.results);
              }
              break;

            case "java":
              const errorMessagejava = response.data.results[0].actualOutput;
              const errorRegexjava = /Error: ([^\n\r]*)/;
              // Extract the error message
              const matchjava = errorMessagejava.match(errorRegexjava);
              const errorJavaMessage = matchjava
                ? matchjava[1]
                : "Something went wrong, please check your code";

              console.log("Error Message Java", errorJavaMessage);

              if (errorJavaMessage.length > 0) {
                setCompileError(errorJavaMessage);
              } else {
                setOutput(response.data.results);
              }
              break;

            case "py":
              const errorMessagepy = response.data.results[0].actualOutput;
              const errorRegexpy = /SyntaxError: ([^\r\n]*)/;
              // Extract the error message
              const matchpy = errorMessagepy.match(errorRegexpy);
              const errorPyMessage = matchpy
                ? matchpy[1]
                : "Something went wrong, please check your code";

              console.log("Error Message Python", errorPyMessage);

              if (errorPyMessage.length > 0) {
                setCompileError(errorPyMessage);
              } else {
                setOutput(response.data.results);
              }
              break;

            case "js":
              const errorMessagejs = response.data.results[0].actualOutput;
              const errorRegexjs =
                /codes\\24821276-3d92-4029-b6ec-1a19d64925e1\.js:\d+\r?\n([\s\S]*)/;
              // Extract the error message
              const matchjs = errorMessagejs.match(errorRegexjs);
              const errorJsMessage = matchjs
                ? matchjs[1]
                : "Something went wrong, please check your code";

              console.log("Error Message JS", errorJsMessage);

              if (errorJsMessage.length > 0) {
                setCompileError(errorJsMessage);
              } else {
                setOutput(response.data.results);
              }
              break;

            default:
              break;
          }
        } else {
          setOutput(response.data.results);
        }
        setloadingRun(false);
      } catch (error: any) {
        console.error(error.response?.data);
        setloadingRun(false);
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


  // Submit Code
  
  const handleSubmit = async () => {
    if (session.status === "authenticated") {
      setloadingSubmit(true);
      try {
        if (output.length === 0) {
          const response = await axios.post(
            // "https://aws.ravikant.tech/execute",
            "http://localhost:8000/execute",
            payload
          );
          if (
            response.data.results[0].passed !== false ||
            response.data.results[0].passed !== true
          ) {
            switch (response.data.results[0].language) {
              case "cpp" || "c":
                const errorMessagecp = response.data.results[0].actualOutput;
                const errorRegexcp = /\.cpp:(\d+:\d+: .*)/;
                // Extract the error message
                const matchcp = errorMessagecp.match(errorRegexcp);
                const errorCppMessage = matchcp
                  ? matchcp[1]
                  : "Something went wrong, please check your code";

                console.log("Error Message CPP", errorCppMessage);

                if (errorCppMessage.length > 0) {
                  setCompileError(errorCppMessage);
                } else {
                  setOutput(response.data.results);
                }
                break;

              case "java":
                const errorMessagejava = response.data.results[0].actualOutput;
                const errorRegexjava = /Error: ([^\n\r]*)/;
                // Extract the error message
                const matchjava = errorMessagejava.match(errorRegexjava);
                const errorJavaMessage = matchjava
                  ? matchjava[1]
                  : "Something went wrong, please check your code";

                console.log("Error Message Java", errorJavaMessage);

                if (errorJavaMessage.length > 0) {
                  setCompileError(errorJavaMessage);
                } else {
                  setOutput(response.data.results);
                }
                break;

              case "py":
                const errorMessagepy = response.data.results[0].actualOutput;
                const errorRegexpy = /SyntaxError: ([^\r\n]*)/;
                // Extract the error message
                const matchpy = errorMessagepy.match(errorRegexpy);
                const errorPyMessage = matchpy
                  ? matchpy[1]
                  : "Something went wrong, please check your code";

                console.log("Error Message Python", errorPyMessage);

                if (errorPyMessage.length > 0) {
                  setCompileError(errorPyMessage);
                } else {
                  setOutput(response.data.results);
                }
                break;

              case "js":
                const errorMessagejs = response.data.results[0].actualOutput;
                const errorRegexjs =
                  /codes\\24821276-3d92-4029-b6ec-1a19d64925e1\.js:\d+\r?\n([\s\S]*)/;
                // Extract the error message
                const matchjs = errorMessagejs.match(errorRegexjs);
                const errorJsMessage = matchjs
                  ? matchjs[1]
                  : "Something went wrong, please check your code";

                console.log("Error Message JS", errorJsMessage);

                if (errorJsMessage.length > 0) {
                  setCompileError(errorJsMessage);
                } else {
                  setOutput(response.data.results);
                }
                break;

              default:
                break;
            }
          } else {
            setOutput(response.data.results);
          }
        }
        submitCodeStatusToUser.codeSubmisionData = output;
        // submitCodeStatusToUser.language = output[0].language;
        const addProblemToUser = await axios.post(
          "/api/AddSubmitedProblemsToUser",
          submitCodeStatusToUser
        );

        if (contestId !== "none") {
          const addProblemOfContestGivenByUser = await axios.post(
            "/api/addProblemOfContestGivenByuser",
            submitCodeStatusToUser
          );
        }

        let ContestScore = 0;

        for (let i = 0; i < output.length; i++) {
          if (submitCodeStatusToUser.difficulty === "Easy") {
            if (output[i].passed === true) {
              const score = 20 / problem.testCases.length;
              ContestScore = ContestScore + parseFloat(score.toFixed(4));
            } else {
              const score = 20 / problem.testCases.length;
              ContestScore = ContestScore - parseFloat(score.toFixed(4));
            }
          } else if (submitCodeStatusToUser.difficulty === "Medium") {
            if (output[i].passed === true) {
              const score = 30 / problem.testCases.length;
              ContestScore = ContestScore + parseFloat(score.toFixed(4));
            } else {
              const score = 30 / problem.testCases.length;
              ContestScore = ContestScore - parseFloat(score.toFixed(4));
            }
          } else {
            if (output[i].passed === true) {
              const score = 40 / problem.testCases.length;
              ContestScore = ContestScore + parseFloat(score.toFixed(4));
            } else {
              const score = 40 / problem.testCases.length;
              ContestScore = ContestScore - parseFloat(score.toFixed(4));
            }
          }
        }
        const uniqueId = contestId + userEmail;
        const existingScore = localStorage.getItem(uniqueId);
        if (existingScore === null) {
          localStorage.setItem(uniqueId, ContestScore.toString());
        } else {
          const updatedScore = parseInt(existingScore) + ContestScore;
          localStorage.setItem(uniqueId, updatedScore.toString());
        }
        setTimeout(() => {
          localStorage.removeItem(uniqueId);
        }, 1000 * 60 * 60 * 2);
        // console.log("submitCodeStatusToUser", submitCodeStatusToUser);

        setloadingSubmit(false);
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
        toast.error(error.response?.data, {
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
        setloadingSubmit(false);
      }
    } else {
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
    <SyntaxHighlighter language={language} style={dark}>
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div className="w-full max-h-screen  h-full justify-evenly flex flex-col overflow-x-hidden">
      <div className="relative max-h-full h-[100vh] bg-stone-900">
        <div className="flex flex-row justify-between items-center absolute w-64 z-10 left-[64%]">
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

        <div className=" max-h-[60vh] overflow-y-auto overflow-x-hidden mt-9">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={highlightCode}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              outline: "none",
              border: "none",
              // backgroundColor: "#2d2d2d",
              backgroundColor: "#1C1917",
              color: "#f8f8f2",
              overflowY:"auto",
            }}
          />
        </div>
      </div>
      <div className="min-h-[32vh] mt-1 bg-stone-900  flex flex-col ">
        {/* Buttons  */}
        <div className="flex justify-end gap-2 max-h-14 flex-row mr-17 items-center ">
          <div className="max-w-[33%] text-center">
            <Button
              onClick={handleRun}
              variant="secondary"
              disabled={loadingSubmit}
            >
              <div className="text-lg flex flex-row justify-evenly items-center">
                {loadingRun ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  ""
                )}
                <span>Run</span>
              </div>
            </Button>
          </div>
          <div className="max-w-[33%] text-center">
            <Button
              onClick={handleSubmit}
              variant="secondary"
              disabled={loadingRun}
            >
              <div className="text-lg flex flex-row justify-evenly items-center">
                {loadingSubmit ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  ""
                )}
                <span>Submit</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="w-full h-[1px] mt-1 mb-1 bg-stone-700"></div>

        {/* Output Box */}
        <div className=" overflow-auto rounded-b-md  p-4 w-full mx-auto max-h-full">
          <div
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
            }}
            className="text-white text-lg font-semibold leading-10 text-start"
          >
            {CompileError.length > 0 ? (
              <p className="text-lg font-semibold leading-10 text-start text-red-500">
                {CompileError}
              </p>
            ) : (
              output.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-wrap w-full overflow-x-hidden"
                >
                  <p
                    className={`text-lg font-semibold leading-10 text-start ${
                      result.passed ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    TC:{index + 1} -&gt; {result.passed ? "Passed" : "Failed"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CodeEditor;
