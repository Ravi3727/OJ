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

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface CodeEditorProps {
  testCases: TestCase[];
}

const CodeEditor: React.FC<CodeEditorProps> = ({ testCases }) => {
  const [code, setCode] = useState<string>(() => getDefaultCode("java"));
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("java");
  const [loading, setLoading] = useState<boolean>(false);
  const [copyCode, setCopyCode] = useState<boolean>(false);

  console.log("TestCases", testCases);

  const transformedTestCases = testCases.map(testCase => {
    // Trim whitespace and split into input and expectedOutput
    const [inputStr, expectedOutputStr] = testCase.trim().split(',');
  
    // Remove leading and trailing brackets from input string
    const cleanedInputStr = inputStr.replace(/^\[|\]$/g, '');
  
    // Parse input string to array
    const input = JSON.parse(`[${cleanedInputStr}]`);
  
    return { input, expectedOutput: expectedOutputStr.trim() };
  });

  console.log("TransformedTestCases", transformedTestCases);

  function getDefaultCode(lang: string): string {
    switch (lang) {
      case "cpp":
        return `// Include the input/output stream library
  #include <bits/stdc++.h>
  using namespace std;

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World! c++"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`;

      case "java":
        return `import java.io.*;

// Define the main class (without public keyword)
class Main {

  // Define the main method
  public static void main(String[] args) {
    // Output "Hello World!" to the console
    System.out.println("Hello World! from java");
  }
}`;

      case "py":
        return `print("Hello World! from py");`;

      case "js":
        return `function greet(name) {
    return 'Hello, ' + name + ' from js!';
}

// Example: Using the function
let message = greet('World');
console.log(message); `;

      case "c":
        return `#include <stdio.h>

  int main() {
      // Output "Hello World!" to the console
      printf("Hello World! from c");
      
      // Return 0 to indicate successful execution
      return 0;
  }`;

      default:
        return "";
    }
  }

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      language,
      code,
      testCases,
    };

      const mockRequest = {
        language: 'cpp',
        // code: '#include <iostream>\nint main() { std::cout << "Hello World!"; return 0; }',
        code: code,
        testCases: [
            { input: '1,2', expectedOutput: '3' },
            { input: '2,3', expectedOutput: '5' },
            { input: '3,4', expectedOutput: '7' },
        ]
    };

    try {
      const { data } = await axios.post("/api/onlineCompiler", mockRequest);
      setOutput(data.data.output);
      setLoading(false);
    } catch (error: any) {
      console.error(error.response?.data);
      setLoading(false);
    }
  };

  const highlightCode = (code: string) => (
    <SyntaxHighlighter language={language} style={darcula}>
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <div className="relative bg-stone-900">
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
        <div className="max-h-[470px] overflow-y-auto overflow-x-hidden">
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
            // backgroundColor: "#1E293B.",
            height: "470px",
            width: "730px",
            overflowY: "auto",
            marginTop: "37px",
          }}
        />
        </div>
      </div>

      <div className="flex flex-row justify-evenly w-[100%] overflow-x-hidden">
        <div className="w-1/2">
          <Button
            className="text-white w-full rounded-e-none h-16"
            onClick={handleSubmit}
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

      <div className="outputbox bg-stone-800 h-44 overflow-auto rounded-b-md shadow-md p-4 w-full mx-auto">
        {loading ? (
          <div>
            <Loader2 className="animate-spin mx-auto my-auto h-8 w-8 text-white" />
          </div>
        ) : (
          <p
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
            }}
            className="text-white text-lg font-semibold leading-10 text-start"
          >
            {output}
          </p>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
