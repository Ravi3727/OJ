"use client";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from 'usehooks-ts';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
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

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
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
      collegename:"",
    },
  });

  useEffect(() => {
    const userNameUniqueness = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMsg("");
      }
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
        toast({
          title: "Success",
          description: "You have successfully signed up",
        });
        router.replace(`/verify/${username}`);
        setIsSubmiting(false);
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Error on signing up",
        variant: "destructive",
      });
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center w-full max-w-md bg-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5">Welcome to OJ</h1>
            <p className="text-gray-600 text-lg mb-4">
              SignUp to start your problem solving journey
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    <p className={`text-sm ${usernameMsg=== "Username is unique" ? "text-green-500":"text-red-500"}`}> {usernameMsg}</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input
                        type="collegename"
                        placeholder="collegename"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmiting}>
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
          <div>
            <p>
              Already a member ?{" "}
              <Link
                href="/signIn"
                className="text-green-400 hover:text-green-700"
              >
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;