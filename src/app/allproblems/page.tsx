"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { columns } from "./columns";

// Sample data for initial rendering

export interface Allproblems {
  id: string;
  Title: string;
  Tags: string[];
  Difficulty: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<Allproblems[]>([]);
  const [loading, setLoading] = useState(false);
  const [isProblemSetter, setIsProblemSetter] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       // Call your API to fetch all problems
  //       console.log("inside fetchData");
  //       const response = await axios.get("https://oj-frontend-rust.vercel.app/api/getAllProblems");
  //       if (response.status === 200 && Array.isArray(response.data.data)) {
  //         const transformedData: Allproblems[] = response.data.data.map((problem: any) => ({
  //           id: problem._id,
  //           Title: problem.title,
  //           Tags: problem.tags,
  //           Difficulty: problem.difficulty,
  //         }));
  //         // Append initialData if needed
  //         transformedData.push(...initialData);
  //         setData(transformedData);
  //       } else {
  //         console.error("Failed to fetch problems or data format is incorrect");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching problems:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const checkProblemSetter = () => {
  //     setIsProblemSetter(session?.user.isProblemSetter || false);
  //   };

  //   if (status === "authenticated") {
  //     checkProblemSetter();
  //     fetchData();
  //   }
  // }, [session?.user.isProblemSetter, status]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/getAllProblems");
        if (response.data.success) {
          const problems = response.data.data;
          const transformedData: Allproblems[] = problems.map((problem: any) => ({
            id: problem._id,
            Title: problem.title,
            Tags: problem.tags,
            Difficulty: problem.difficulty,
          }));
          // Append initialData if needed
          // transformedData.push(...initialData);
          setData(transformedData);
        } else {
          console.error("Failed to fetch problems:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };
    const checkProblemSetter = () => {
          setIsProblemSetter(session?.user.isProblemSetter || false);
        };
    
  
    if (status === "authenticated") {
      checkProblemSetter();
      fetchData();
    }
  }, [session?.user.isProblemSetter, status]);
  

  return (
    <section className="py-40 bg-black/[90] text-white leading-6">
      <div className="container">
        <div className="flex flex-row justify-between w-full p-2">
          <div>
            <h1 className="text-3xl font-bold">All problems</h1>
          </div>
          {isProblemSetter ? (
            <Link href="/createnewproblem">
              <div>
                <Button>Create+</Button>
              </div>
            </Link>
          ) : (
            <Link href="/problemsetterform">
              <div>
                <Button>Collaborate</Button>
              </div>
            </Link>
          )}
        </div>
        {loading ? (
          <div className="flex h-screen justify-center items-center p-2 bg-black/[90] text-white my-auto">
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </section>
  );
};

export default Page;
