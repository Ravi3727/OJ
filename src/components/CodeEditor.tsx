import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(() => getDefaultCode("java")); // Initialize with default code for Java
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("java"); // Default language is Java

  // Function to get default code based on language
  function getDefaultCode(lang: string): string {
    switch (lang) {
      case "cpp":
        return `// Include the input/output stream library
  #include <iostream> 

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
    // Update code when language changes
    setCode(getDefaultCode(language));
  }, [language]);

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };

    try {
      const { data } = await axios.post("/api/onlineCompiler", payload);
      setOutput(data.data.output);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const highlightCode = (code: string) => (
    <SyntaxHighlighter language={language} style={docco}>
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div className="container mx-auto w-full h-full flex flex-col justify-start bg-black/[90]">
      <div className="absolute  right-4 ">
        <select
          className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 "
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

      <div
        className="bg-gray-100 shadow-sm shadow-white w-full max-w-lg mb-4 mt-12 justify-center rounded-lg "
        style={{ height: "400px", width: "100%", overflowY: "auto" }}
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={highlightCode}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: "none",
            border: "none",
            backgroundColor: "#f7fafc",
            height: "100%",
            overflowY: "auto",
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-12 mx-auto w-24"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 me-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 1 0 1-18 0 9 9 0 1 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
        Run
      </button>

      {output && (
        <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4 w-full mx-auto">
          <p
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
            className="text-black"
          >
            {output}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
