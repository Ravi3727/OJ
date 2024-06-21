"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { redirect, useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/Types/ApiResponse";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/utils/googleIcon";
import { FaGithub } from "react-icons/fa6";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      collegename: "",
    },
  });

  useEffect(() => {
    const userNameUniqueness = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMsg("");
      }
      
      // Debouncing Logic
      try {
        const response = await axios.get<ApiResponse>(
          `/api/checkUserNameUniqueness?username=${username}`
        );

        // let message = response.data.message;
        setUsernameMsg(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMsg(
          axiosError.response?.data.message ??
            "Error on checking username uniqueness"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };
    
    userNameUniqueness();
    
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmiting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signUp", data);
      if (response.data.success) {
        toast.success("You have successfully signed up", {
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
        router.replace(`/verify/${username}`);
        setIsSubmiting(false);
      } else {
        toast.error(response.data.message, {
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

      toast.error(axiosError.response?.data.message ?? "Error on signing up", {
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
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200 ">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-lg bg-white p-4 rounded-lg m-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-gray-900 ">
              Welcome to OJ
            </h1>
            <p className="text-gray-600 text-lg ">
              SignUp to start your problem solving journey
            </p>  
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-9/12">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Username</FormLabel>
                    <FormControl>
                      <Input className="bg-gray-200 border-black "
                        placeholder="Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    <div
                      className={`text-sm ${
                        usernameMsg === "Username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {" "}
                      {usernameMsg}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field}  className="bg-gray-200 border-black " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                       className="bg-gray-200 border-black "
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collegename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">College Name</FormLabel>
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
                  "SignUp"
                )}
              </Button>
            </form>
          </Form>

          {/* SignUp with Google and Github */}

          {/* <div className="mt-6 flex flex-col items-center justify-center w-8/12 gap-2">
          <button onClick={handelGoogleSignUp} className="focus:shadow-outline h-12 w-full rounded-3xl border-2 border-gray-400 bg-background text-lg hover:bg-gray-700 focus:outline-none" type="button">
            <div className="flex items-center justify-center">
              <GoogleIcon />
              <div className="mx-4 text-sm">Google</div>
            </div>
          </button>
          <button onClick={()=> signIn("github")} className="focus:shadow-outline h-12 w-full rounded-3xl border-2 border-gray-400  bg-background text-lg hover:bg-gray-700 focus:outline-none" type="button">
            <div className="flex items-center justify-center">
            <FaGithub/>
              <div className="mx-4 text-sm">GitHub</div>
            </div>
          </button>
          </div> */}
          
            <div className="text-gray-900 mt-4">
              Already a member ?{" "}
              <Link
                href="/signIn"
                className="text-blue-400 hover:text-blue-700"
              >
                SignIn
              </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
