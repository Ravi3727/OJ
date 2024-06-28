'use client';
import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(() => getDefaultCode("java")); // Initialize with default code for Java
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("java"); // Default language is Java
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const payload = {
      language,
      code,
    };

    try {
      const { data } = await axios.post("/api/onlineCompiler", payload);
      setOutput(data.data.output);
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data);
      setLoading(false);
    }
  };

  const highlightCode = (code: string) => (
    <SyntaxHighlighter language={language} style={docco}>
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden rounded-e-lg">
      <div className="relative ">
        <div className="absolute z-10 left-[78%] ">
          <select
            className="select-box  rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 border-2 border-gray-400"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option className="rounde-lg " value="cpp">C++</option>
            <option className="rounde-lg " value="c">C</option>
            <option className="rounde-lg " value="js">JavaScript</option>
            <option className="rounde-lg " value="java">Java</option>
            <option className="rounde-lg " value="py">Python</option>
          </select>
        </div>
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
            height: "550px",
            width: "730px",
            overflowY: "auto",
          }}
        />
      </div>

      <div className="flex flex-row justify-evenly w-[100%]  overflow-x-hidden ">
        <div className="w-1/2 ">
          <Button className="text-white w-full rounded-e-none h-16" onClick={handleSubmit}>
            Run
          </Button>
        </div>
        <div className="w-1/2">
          <Button className="text-white w-full rounded-s-none h-16" onClick={handleSubmit}>
            submit
          </Button>
        </div>
      </div>

      <div className="outputbox bg-white h-44 overflow-auto rounded-b-md shadow-md p-4 w-full mx-auto">
        {loading ? <div>
          <Loader2 className="animate-spin mx-auto my-auto  h-8 w-8 text-black" />
        </div> : <p
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
          className="text-black text-lg text-start"
        >
          {output}
        </p>}
      </div>
    </div>
  );
};

export default CodeEditor;
