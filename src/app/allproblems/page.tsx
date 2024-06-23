import { Allproblems, columns} from "./columns";
import { DataTable } from "@/components/data-table";
import axios from "axios";



const data2: Allproblems[] = [
  {
    id: "1",
    Title: "Problem 1",
    Tags: ["DP", "greedy"],
    Difficulty: "Easy",
  },
  {
    id: "2",
    Title: "Problem 2",
    Tags: ["searching", "graph"],
    Difficulty: "Medium",
  },
  {
    id: "3",
    Title: "Problem 3",
    Tags: ["number theory", "maths"],
    Difficulty: "Hard",
  },
  {
    id: "4",
    Title: "Problem 4",
    Tags: ["array", "sorting"],
    Difficulty: "Easy",
  },
  {
    id: "5",
    Title: "Problem 5",
    Tags: ["tree", "graph"],
    Difficulty: "Medium",
  },
  {
    id: "6",
    Title: "Problem 6",
    Tags: ["greedy", "dp"],
    Difficulty: "Hard",
  },
  {
    id: "7",
    Title: "Problem 7",
    Tags: ["maths", "number theory"],
    Difficulty: "Easy",
  },
  {
    id: "8",
    Title: "Problem 8",
    Tags: ["graph", "bfs"],
    Difficulty: "Medium",
  },
  {
    id: "9",
    Title: "Problem 9",
    Tags: ["dfs", "graph"],
    Difficulty: "Hard",
  },
  {
    id: "10",
    Title: "Problem 10",
    Tags: ["string", "searching"],
    Difficulty: "Easy",
  },
  {
    id: "11",
    Title: "Problem 11",
    Tags: ["dp", "combinatorics"],
    Difficulty: "Medium",
  },
  {
    id: "12",
    Title: "Problem 12",
    Tags: ["maths", "number theory"],
    Difficulty: "Hard",
  },
  {
    id: "13",
    Title: "Problem 13",
    Tags: ["dp", "greedy"],
    Difficulty: "Easy",
  },
  {
    id: "14",
    Title: "Problem 14",
    Tags: ["tree", "dfs"],
    Difficulty: "Medium",
  },
  {
    id: "15",
    Title: "Problem 15",
    Tags: ["sorting", "array"],
    Difficulty: "Hard",
  },
  {
    id: "16",
    Title: "Problem 16",
    Tags: ["greedy", "dp"],
    Difficulty: "Easy",
  },
  {
    id: "17",
    Title: "Problem 17",
    Tags: ["graph", "dfs"],
    Difficulty: "Medium",
  },
];

export interface object3 {
  _id: string;
  title: string;
  tags: string[];
  difficulty: string;
  testCases:string[];
};

export interface object1 extends Object{
  success: boolean,
  data : object3,
}
async function getAllProblems() {
  const response = await axios.get("http://localhost:3000/api/getAllProblems");
  return response.data;
}

export interface problem {
  _id:string;
  title:string; 
  tags:string[];
  difficulty:string;
}
async function transformProblems() {
  const UnstructuredData = await getAllProblems();
  
  if (UnstructuredData.success && Array.isArray(UnstructuredData.data)) {
    const newData = UnstructuredData.data.map((problem:problem, index:Number) => ({
      id: problem._id, 
      Title: problem.title,
      Tags: problem.tags,
      Difficulty: problem.difficulty,
    }));
    
    // console.log("newdata is here ", newData);
    return newData;
  } else {
    console.error('Failed to fetch problems or data format is incorrect');
  }
}

const appendData2ToData = async () => {
  const data = await transformProblems();
  data2.forEach(item => {
    data.push(item);
  });
  return data;
};

const Page = async () => {
  const data = await appendData2ToData();
  
  return (
    <>
      <section className="py-20">
        <div className="container">
          <h1 className="text-3xl font-bold">All problems</h1>
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </>
  );
};

export default Page;
