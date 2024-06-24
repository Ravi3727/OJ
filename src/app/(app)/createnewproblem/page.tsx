"use client";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { problemSchema } from "@/schemas/problemsSchema";
import { Textarea } from "@/components/ui/textarea";

const Createnewproblem = () => {
  const router = useRouter();
  const session = useSession();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof problemSchema>>({
    resolver: zodResolver(problemSchema),
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
    name: "tags",
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  const onSubmit = async (data: z.infer<typeof problemSchema>) => {
    setIsSubmiting(true);

    console.log(session);

    if (!session) {
      toast.success("Please login to continue", {
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
      setIsSubmiting(false);
    } else if (
      !data.statement ||
      !data.title ||
      !data.tags.length ||
      !data.testCases.length
    ) {
      toast.error("Please fill all the fields", {
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
      setIsSubmiting(false);
    } else if (session.data?.user.isVerified === false) {
      toast.error("Please verify your email to continue", {
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
      setIsSubmiting(false);
    } else if (session.data?.user.isProblemSetter === false) {
      toast.error("You are not a problem setter", {
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
      setIsSubmiting(false);
    } else {
      try {
        const response = await axios.post<ApiResponse>(
          "/api/createProblem",
          data
        );
        console.log("Problem created", data);
        if (response.data.success) {
          toast.success("Thank for contributing to the problem set", {
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
          router.replace("/allproblems");
          setIsSubmiting(false);
        } else {
          toast.error("please fill all the fields", {
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
          setIsSubmiting(false);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        toast.error(
          axiosError.response?.data.message ?? "Error on signing up",
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
        setIsSubmiting(false);
      }
    }
  };


  // const onSubmit = async (data: z.infer<typeof problemSchema>) => {
  //   setIsSubmiting(true);
  
  //   const showToast = (message: string, type: "success" | "error") => {
  //     toast[type](message, {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });
  //   };
  
  //   const validationRules = [
  //     {
  //       condition: !session,
  //       message: "Please login to continue",
  //       type: "success" as const,
  //     },
  //     {
  //       condition: session?.data?.user.isVerified === false,
  //       message: "Please verify your email to continue",
  //       type: "error" as const,
  //     },
  //     {
  //       condition: session?.data?.user.isProblemSetter === false,
  //       message: "You are not a problem setter",
  //       type: "error" as const,
  //     },
  //   ];
  
  //   for (const rule of validationRules) {
  //     if (rule.condition) {
  //       showToast(rule.message, rule.type);
  //       setIsSubmiting(false);
  //       return;
  //     }
  //   }
  
  //   try {
  //     const response = await axios.put<ApiResponse>(`/api/createProblem`, data);
  
  //     if (response.data.success) {
  //       showToast("Problem created successfully than you for contribution", "success");
  //       router.replace("/allproblems");
  //     } else {
  //       showToast("Please fill all the fields", "error");
  //     }
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiResponse>;
  //     showToast(axiosError.response?.data.message ?? "Error on creating problem", error);
  //   } finally {
  //     setIsSubmiting(false);
  //   }
  // };
  




  return (
    <>
      <div className="flex flex-col items-center justify-center h-full bg-gray-200 space-y-20">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-lg bg-white p-4 rounded-lg m-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-900 ">
              Let&apos;s increase some challenge on OJ
            </h1>
            <p className="text-red-500 text-lg ">
              Write problem statement carefully before submitting the problem
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
                      {/* <Input
                        className="bg-gray-200 border-black "
                        placeholder="Problem statement..."
                        {...field}
                      /> */}
                      <Textarea
                        className="bg-gray-200 border-black "
                        placeholder="Problem statement..."
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
                      onClick={() => appendTag("")}
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
                      <div
                        key={testCase.id}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <Input
                            className="bg-gray-200 border-black"
                            placeholder="Keep fromate like this -> [inputs],output"
                            {...form.register(`testCases.${index}` as const)}
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
                    ))}
                    <Button
                      type="button"
                      onClick={() => appendTestCase("")}
                      className="bg-violet-900 hover:bg-violet-800 text-white mt-2"
                    >
                      Add Test Case
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-violet-900 text-white hover:bg-red-600 "
                type="submit"
                disabled={isSubmiting}
              >
                {isSubmiting ? (
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

export default Createnewproblem;
