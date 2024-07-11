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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { problemSetterSchema } from "@/schemas/problemSetterSchema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/Types/ApiResponse";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const session = useSession();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof problemSetterSchema>>({
    resolver: zodResolver(problemSetterSchema),
    defaultValues: {
      leetCode: "",
      codeForces: "",
      codeCheaf: "",
      other: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof problemSetterSchema>) => {
    setIsSubmiting(true);
    // console.log(JSON.stringify(data));

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

    } else if (!data.leetCode) {
      toast.error("Please fill leetCode URL", {
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
    } else if (session.data?.user.isProblemSetter === true) {
      toast.error("You are already a problem setter", {
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
    }else if(session.data?.user.username !== data.username){
      toast.error("Username is not matching", {
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
     else {
      try {
        const response = await axios.post<ApiResponse>(
          "/api/sumbitProblemSetter",
          data
        );
        if (response.data.success) {
          toast.success(
            "Thank you for being a part of OJ community, We will contact you soon",
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
          router.replace("/dashboard");
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
      <div className="flex flex-col items-center justify-center h-screen bg-black/[90]">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-lg bg-white mt-24 p-4 rounded-lg m-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-900 ">
              Welcome to OJ problem setter community
            </h1>
            <p className="text-gray-600 text-lg ">
              Fill the form to start your problems making journey
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-9/12"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      LeetCode profile
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        placeholder="leetcode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeForces"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Codeforces Profile
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="codeforces"
                        {...field}
                        className="bg-gray-200 border-black "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeCheaf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      codeCheaf Profile
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black "
                        type="text"
                        placeholder="codeCheaf"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Other plateform
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-200 border-black mt-6"
                        type="collegename"
                        placeholder="collegename"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-blue-800 text-white hover:bg-blue-600 "
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

export default Page;
