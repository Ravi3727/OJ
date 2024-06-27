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
import { contestSchema } from "@/schemas/ContestSchema";
import { Textarea } from "@/components/ui/textarea";

const CreateContest = () => {
  const router = useRouter();
  const session = useSession();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof contestSchema>>({
    resolver: zodResolver(contestSchema),
    defaultValues: {
      title: "",
      description: "",
      eventDate: "",
      HostedBy: "",
      problems: [],
      difficulty: "",
    },
  });

  const {
    fields: problems,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: "problems",
  });

  const onSubmit = async (data: z.infer<typeof contestSchema>) => {
    setIsSubmiting(true);

    console.log(session);
    console.log("Create contest", data);

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
      !data.description ||
      !data.title ||
      !data.problems ||
      !data.difficulty ||
      !data.eventDate ||
      !data.HostedBy
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
          "/api/createContest",
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
          router.replace("/contests");
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

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full min-h-screen bg-black/[90] space-y-20">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-lg bg-white mt-24 p-4 rounded-lg m-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-900 ">
              Create Contest
            </h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-9/12"
            >
              <FormField
                control={form.control}
                name="HostedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Your Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        placeholder="username..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Description</FormLabel>
                    <FormControl>
                      {/* <Input
                        className="bg-gray-200 border-black "
                        placeholder="Problem statement..."
                        {...field}
                      /> */}
                      <Textarea
                        className="bg-gray-200 border-black "
                        placeholder="Contest description..."
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
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Contest Date and Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        placeholder="dd-mm-yyyy-9:00-PM"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="problems"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-gray-700">
                      Add Problems ID
                    </FormLabel>
                    {problems.map((problem, index) => (
                      <div
                        key={problem.id}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <Input
                            className="bg-gray-200 border-black"
                            placeholder="problems ID..."
                            {...form.register(`problems.${index}` as const)}
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
                      Add Problems ID
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

export default CreateContest;
