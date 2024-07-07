"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/Types/ApiResponse";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { EditProblemSchema } from "@/schemas/EditProblemSchema";
import { Textarea } from "@/components/ui/textarea";
import ProblemsModel from "@/models/Problems";

const Page = () => {
  const router = useRouter();
  const session = useSession();

  const { problemId } = useParams<{ problemId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof EditProblemSchema>>({
    resolver: zodResolver(EditProblemSchema),
    defaultValues: {
      title: "",
      statement: "",
      tags: [],
      testCases: [],
      difficulty: "",
    },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await axios.get(`/api/getproblembyid/${problemId}`);
        if (response.data.success) {
          const problemData = response.data.data;
          console.log("Problem data fetched successfully", problemData);
          form.reset(problemData);
        } else {
          toast.error("Failed to fetch problem data", {
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
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message ?? "Error fetching problem data",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
    };

    fetchProblemData();
  }, [problemId, form]);

  const onSubmit = async (data: z.infer<typeof EditProblemSchema>) => {
    setIsSubmitting(true);

    const showToast = (message: string, type: "success" | "error") => {
      toast[type](message, {
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
    };

    const validationRules = [
      {
        condition: !session,
        message: "Please login to continue",
        type: "success" as const,
      },
      {
        condition: session?.data?.user.isVerified === false,
        message: "Please verify your email to continue",
        type: "error" as const,
      },
      {
        condition: session?.data?.user.isProblemSetter === false,
        message: "You are not a problem setter",
        type: "error" as const,
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        showToast(rule.message, rule.type);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await axios.put<ApiResponse>(
        `/api/editProblem/${problemId}`,
        data
      );

      if (response.data.success) {
        showToast("Problem updated successfully", "success");
        router.replace("/allproblems");
      } else {
        showToast("Please fill all the fields", "error");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      showToast(
        axiosError.response?.data.message ?? "Error updating problem",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full bg-black space-y-20">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-lg bg-white p-4 rounded-lg m-4 mt-28 ">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-900 ">
              Update Problems
            </h1>
            <p className="text-red-500 text-lg ">
              Write problems statement carefully before submitting the problems
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-9/12"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        placeholder="title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="statement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Statement</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-gray-200 border-black "
                        placeholder="Problems statement..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Difficulty</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        placeholder="Easy, Medium, Hard"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-gray-700">Add tags</FormLabel>
                    {tagFields.map((tag, index) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                            className="bg-gray-200 border-black"
                            placeholder="tags..."
                            {...form.register(`tags.${index}` as const)}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="bg-red-500 text-white"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => appendTag({ input: "", output: "" })}
                      className="bg-violet-900 hover:bg-violet-800 text-white mt-2"
                    >
                      Add Tag
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="testCases"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-gray-700">Test Cases</FormLabel>
                    {testCaseFields.map((testCase, index) => (
                      <div key={testCase.id} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Textarea
                              className="bg-gray-200 border-black"
                              placeholder="Input"
                              {...form.register(
                                `testCases.${index}.input` as const
                              )}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.stopPropagation();
                                }
                              }}
                            />
                          </FormControl>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Textarea
                              className="bg-gray-200 border-black"
                              placeholder="Output"
                              {...form.register(
                                `testCases.${index}.output` as const
                              )}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.stopPropagation();
                                }
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => removeTestCase(index)}
                            className="bg-red-500 text-white"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => appendTestCase({ input: "", output: "" })}
                      className="bg-violet-900 hover:bg-violet-800 text-white mt-2"
                    >
                      Add Test Case
                    </Button>
                  </FormItem>
                )}
              />

              <Button
                className="bg-violet-900 text-white hover:bg-red-600 "
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                    Loading
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Page;
